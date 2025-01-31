import pLimit from "p-limit";
import pRetry from "p-retry";
import os from "os";
import { getBalance } from "../../../lib/getBalance";

const users = [
  {
    name: "Mahmudul Hasan Ridoy",
    initialBalance: 200,
    capital: 200,
    joined: "07-01-2025",
    accountId: "34250426-f5ca-4824-85a2-4578fe5d7e37",
  },
  {
    name: "Sadman",
    initialBalance: 1000,
    capital: 1000,
    joined: "01-01-2025",
    accountId: "aaf10741-5b68-4a43-aec1-bad6f101c9d3",
  },
];

const concurrency = Math.min(users.length, os.cpus().length * 5);
const limit = pLimit(concurrency);

function parseBalanceData(user, numericBalance) {
  const roi = user.capital
    ? ((numericBalance - user.initialBalance) / user.capital) * 100
    : 0;

  return {
    name: user.name,
    balance:
      (numericBalance - user.initialBalance + user.capital).toFixed(2) || "N/A",
    joined: user.joined || "N/A",
    roi: roi.toFixed(2),
    capital: user.capital,
    status: "fulfilled",
  };
}

export async function GET(request) {
  try {
    const results = [];
    const batchSize = Math.min(10, concurrency);

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((user) =>
          limit(async () => {
            try {
              const balance = await pRetry(
                async () => {
                  return await getBalance(user.accountId);
                },
                {
                  retries: 3,
                  factor: 2,
                  minTimeout: 200,
                  maxTimeout: 2000,
                },
              );

              return parseBalanceData(user, balance);
            } catch (error) {
              console.error(`Failed to fetch balance for ${user.name}:`, error);
              return {
                name: user.name,
                balance: "Error",
                joined: "N/A",
                roi: "N/A",
                capital: user.capital,
                status: "rejected",
              };
            }
          }),
        ),
      );
      results.push(...batchResults);
    }

    const successResults = results.filter(
      (result) => result.status === "fulfilled",
    );

    return new Response(JSON.stringify({ data: successResults }), {
      status: 200,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
