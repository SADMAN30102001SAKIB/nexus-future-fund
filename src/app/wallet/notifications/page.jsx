"use client";

import { useEffect, useState } from "react";
import { SortAsc, SortDesc } from "lucide-react";
import { account } from "../../../appwrite/config";
import { useRouter } from "next/navigation";
import db from "../../../appwrite/database";

export default function Notifications() {
  const [systemNotifications, setSystemNotifications] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("system");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const sessionUser = await account.get();
        const userId = sessionUser.$id;
        if (userId) {
          const userDoc = await db.userNotifications.get(userId);
          setUserNotifications(userDoc.notifications || []);
        }
      } catch (error) {
        console.log("Error fetching:", error);
        router.push("/wallet/login");
      }
      try {
        const response = await db.notifications.list();
        setSystemNotifications(response.documents);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [router]);

  const handleSystemSearch = (notifications) => {
    return notifications.filter((notification) =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const handleUserSearch = (notifications) => {
    return notifications.filter((notification) =>
      notification.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const handleSort = (notifications) => {
    return sortOrder === "desc" ? notifications.reverse() : notifications;
  };

  const renderSystemNotifications = () => {
    const filteredNotifications = handleSystemSearch(systemNotifications);
    const sortedNotifications = handleSort(filteredNotifications);

    return (
      <ul>
        {sortedNotifications.map((notification) => (
          <li
            key={notification.$id}
            className="mb-4 p-4 bg-black rounded-lg shadow-md">
            <p>{notification.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(notification.$updatedAt).toLocaleDateString()} -{" "}
              {new Date(notification.$updatedAt).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const renderUserNotifications = () => {
    const filteredNotifications = handleUserSearch(userNotifications);
    const sortedNotifications = handleSort(filteredNotifications);

    return (
      <ul>
        {sortedNotifications.map((message, index) => {
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
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="mb-6 flex flex-col md:flex-row lg:justify-between">
        <input
          type="text"
          placeholder="Search notifications"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 md:mb-0 p-2 rounded-lg text-black focus:outline-none"
        />
        <div className="w-full flex ml-2 justify-between">
          <div>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-4 py-2 rounded-lg mr-2 ${
                activeTab === "system" ? "bg-pink-600" : "bg-gray-700"
              } text-white`}>
              System
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "user" ? "bg-pink-600" : "bg-gray-700"
              } text-white`}>
              Personal
            </button>
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 rounded-full bg-pink-600 text-white">
            {sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
          </button>
        </div>
      </div>

      {activeTab === "system" ? (
        systemNotifications.length === 0 ? (
          <p>No system notifications to display.</p>
        ) : (
          renderSystemNotifications()
        )
      ) : userNotifications.length === 0 ? (
        <p>No user notifications to display.</p>
      ) : (
        renderUserNotifications()
      )}
    </div>
  );
}
