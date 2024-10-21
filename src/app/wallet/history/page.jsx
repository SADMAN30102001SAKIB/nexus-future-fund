"use client";

import { useEffect, useState } from "react";
import { account } from "../../../appwrite/config";
import { useRouter } from "next/navigation";
import db from "../../../appwrite/database";
import { SortAsc, SortDesc } from "lucide-react";

export default function History() {
  const [depositHisory, setDepositHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deposit");
  const [sortOrder, setSortOrder] = useState("desc");
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      let userId = "";
      try {
        const sessionUser = await account.get();
        userId = sessionUser.$id;
      } catch (error) {
        console.log("Error fetching:", error);
        router.push("/wallet/login");
      }
      try {
        let userDoc = await db.userWithdrawHistory.get(userId);
        setWithdrawHistory(userDoc.histories || []);
        userDoc = await db.userDepositHistory.get(userId);
        setDepositHistory(userDoc.histories || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching histories:", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  const handleSort = (histories) => {
    const sortedHistories = [...histories];
    return sortOrder === "desc" ? sortedHistories.reverse() : sortedHistories;
  };

  const renderHistories = (histories) => {
    const sortedHistories = handleSort(histories);

    return (
      <ul>
        {sortedHistories.map((message, index) => {
          const match = message.match(
            /^(.*?)(\s*[\[\(\<\{]\s*([^\[\]\(\)\<\>\{\}]*?)\s*[\]\)\>\}]\s*)$/,
          );
          const actualMessage = match ? match[1].trim() : message;
          const dateOrContent = match ? match[3].trim() : "";

          return (
            <li key={index} className="mb-4 p-4 bg-black rounded-lg shadow-md">
              <p>{actualMessage}</p>
              {dateOrContent && (
                <p className="text-sm text-gray-400 mt-2">{dateOrContent}</p>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-6xl lg:text-9xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="lg:px-48 container mx-auto p-6 bg-gray-800 h-screen touch-pan-y">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <button
            onClick={() => setActiveTab("deposit")}
            className={`px-4 py-2 rounded-lg mr-2 ${
              activeTab === "deposit" ? "bg-pink-600" : "bg-gray-700"
            } text-white`}>
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "withdraw" ? "bg-pink-600" : "bg-gray-700"
            } text-white`}>
            Withdrawal
          </button>
        </div>
        <div>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 rounded-full bg-pink-600 text-white">
            {sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
          </button>
        </div>
      </div>

      {activeTab === "deposit" ? (
        depositHisory.length === 0 ? (
          <p>No history to display.</p>
        ) : (
          renderHistories(depositHisory)
        )
      ) : withdrawHistory.length === 0 ? (
        <p>No history to display.</p>
      ) : (
        renderHistories(withdrawHistory)
      )}
    </div>
  );
}
