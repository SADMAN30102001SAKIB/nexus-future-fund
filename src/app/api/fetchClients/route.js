import * as cheerio from "cheerio";
import pLimit from "p-limit";
import pRetry from "p-retry";
import os from "os";

const urls = [
  {
    name: "Sadman",
    initialBalance: 200,
    link: "https://my.socialtradertools.com/view/86SOq3yhFN4k4uMK",
  },
  {
    name: "Sakib",
    initialBalance: 1000,
    link: "https://my.socialtradertools.com/view/PBxy6UNHwzEwStSx",
  },
];

const concurrency = Math.min(urls.length, os.cpus().length * 5);
const limit = pLimit(concurrency);

function parseHTML(html, user) {
  const $ = cheerio.load(html);

  const balanceTag = $("h4:contains('Balance')")
    .next("div")
    .find("strong")
    .text()
    .trim();
  const numericBalance = parseFloat(balanceTag.replace(/[^0-9.-]+/g, "")) || 0;

  const roi = user.initialBalance
    ? ((numericBalance - user.initialBalance) / user.initialBalance) * 100
    : 0;

  const lastUpdated = $("span.text-muted")
    .text()
    .replace("Updated: ", "")
    .trim();

  return {
    name: user.name,
    balance: balanceTag || "N/A",
    lastUpdated: lastUpdated || "N/A",
    roi: roi.toFixed(2),
    status: "fulfilled",
  };
}

async function fetchWithTimeout(url, timeoutMs = 2000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export async function GET(request) {
  try {
    const results = [];

    // Batch processing for scalability
    const batchSize = Math.min(10, concurrency);
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((user) =>
          limit(async () => {
            try {
              const html = await pRetry(
                async () => {
                  const res = await fetchWithTimeout(user.link, 2000);
                  if (res.status === 404)
                    throw new pRetry.AbortError("404 Not Found");
                  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                  return res.text();
                },
                {
                  retries: 3,
                  factor: 2,
                  minTimeout: 200,
                  maxTimeout: 2000,
                  randomize: true,
                },
              );

              return parseHTML(html, user);
            } catch (error) {
              console.error(`Failed to fetch ${user.link}:`, error);
              return {
                name: user.name,
                balance: "Error",
                lastUpdated: "N/A",
                roi: "N/A",
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
