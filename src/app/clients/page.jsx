"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import Confetti from "react-confetti";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("decs");
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Simulate confetti celebration
  useEffect(() => {
    if (data.length > 0 && !hasFetched) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-clients");
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
        } else {
          console.error("Error fetching data:", result.error);
          setData([]);
        }
      } catch (error) {
        console.error("Client-side error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortData = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (key === "joined") {
        const dateA = new Date(a[key].split("-").reverse().join("-"));
        const dateB = new Date(b[key].split("-").reverse().join("-"));
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = typeof a[key] === "number" ? a[key] : parseFloat(a[key]);
        const valueB = typeof b[key] === "number" ? b[key] : parseFloat(b[key]);
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <motion.div
          className="text-2xl font-semibold text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}>
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] py-10 px-5">
      {showConfetti && <Confetti />}

      {/* Page Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-[#EC4899] mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}>
        Our Clients
      </motion.h1>

      {/* Toolbar for Sorting and Searching */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-[#1F2937] p-2 rounded-lg shadow-md">
          <FiSearch className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by name"
            className="bg-transparent text-gray-300 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Options */}
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
              sortBy === "balance"
                ? sortOrder === "asc"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#EF4444] text-white"
                : "bg-[#1F2937] text-gray-300 hover:bg-[#374151] hover:text-white"
            }`}
            onClick={() => {
              setSortBy("balance");
              sortData("balance");
            }}>
            Sort by Balance
            {sortBy === "balance" && (
              <FiChevronDown
                className={`transform ${
                  sortOrder === "asc" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
              sortBy === "roi"
                ? sortOrder === "asc"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#EF4444] text-white"
                : "bg-[#1F2937] text-gray-300 hover:bg-[#374151] hover:text-white"
            }`}
            onClick={() => {
              setSortBy("roi");
              sortData("roi");
            }}>
            Sort by ROI
            {sortBy === "roi" && (
              <FiChevronDown
                className={`transform ${
                  sortOrder === "asc" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
              sortBy === "joined"
                ? sortOrder === "asc"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#EF4444] text-white"
                : "bg-[#1F2937] text-gray-300 hover:bg-[#374151] hover:text-white"
            }`}
            onClick={() => {
              setSortBy("joined");
              sortData("joined");
            }}>
            Sort by Date
            {sortBy === "joined" && (
              <FiChevronDown
                className={`transform ${
                  sortOrder === "asc" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
        <div className="bg-[#1F2937] p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-[#EC4899]">
            Total Clients
          </h3>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-[#EC4899]">
            Average Monthly ROI
          </h3>
          <p
            className={`text-2xl font-bold ${
              (data.reduce((acc, user) => {
                const joinedDate = new Date(
                  user.joined.split("-").reverse().join("-"),
                );
                const now = new Date();
                const daysPassed = Math.floor(
                  (now - joinedDate) / (1000 * 60 * 60 * 24),
                );
                const monthsPassed = daysPassed / 30 || 1;
                const avgMonthlyROI = parseFloat(user.roi) / monthsPassed;
                return acc + avgMonthlyROI;
              }, 0) / data.length || 0) > 0
                ? "text-green-400"
                : "text-red-400"
            }`}>
            {(
              data.reduce((acc, user) => {
                const joinedDate = new Date(
                  user.joined.split("-").reverse().join("-"),
                );
                const now = new Date();
                const daysPassed = Math.floor(
                  (now - joinedDate) / (1000 * 60 * 60 * 24),
                );
                const monthsPassed = daysPassed / 30 || 1 / 30;
                const avgMonthlyROI = parseFloat(user.roi) / monthsPassed;
                return acc + avgMonthlyROI;
              }, 0) / data.length || 0
            ).toFixed(2)}{" "}
            %
          </p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-[#EC4899]">
            Total Capital
          </h3>
          <p className="text-2xl font-bold">
            $
            {data
              .reduce((acc, user) => acc + parseFloat(user.balance), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}>
        {filteredData.map((user, index) => (
          <motion.div
            key={index}
            className={`relative bg-gradient-to-br from-[#1F2937] via-[#2A3748] to-[#111827] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${
              parseFloat(user.roi) /
                (Math.floor(
                  (new Date() -
                    new Date(user.joined.split("-").reverse().join("-"))) /
                    (1000 * 60 * 60 * 24),
                ) / 30 || 1 / 30) >
              5
                ? "ring-4 ring-green-500"
                : "ring-1 ring-white"
            }`}
            whileHover={{ scale: 1.05 }}>
            <div className="relative z-10">
              {/* Name Section */}
              <h2 className="text-2xl font-bold text-[#F3F4F6] flex items-center space-x-2">
                <span className="truncate max-w-[11.5rem] md:max-w-[20rem] lg:max-w-[15rem]">
                  {user.name}
                </span>
                {parseFloat(user.roi) /
                  (Math.floor(
                    (new Date() -
                      new Date(user.joined.split("-").reverse().join("-"))) /
                      (1000 * 60 * 60 * 24),
                  ) / 30 || 1 / 30) >
                  5 && (
                  <span className="text-xs bg-green-600 text-white px-1.5 py-1 rounded-full">
                    High ROI
                  </span>
                )}
              </h2>

              {/* ROI Section */}
              <div className="mt-4 flex items-center space-x-2">
                {parseFloat(user.roi) > 0 ? (
                  <FiTrendingUp className="text-green-400" size={20} />
                ) : (
                  <FiTrendingDown className="text-red-400" size={20} />
                )}
                <p className="font-semibold text-lg text-[#D1D5DB]">
                  ROI:{" "}
                  <span
                    className={`${
                      user.roi > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                    {user.roi}%{" "}
                  </span>
                  <span className="font-medium text-sm text-[#9CA3AF]">
                    (Monthly{" "}
                    <span
                      className={`${
                        parseFloat(user.roi) /
                          (Math.floor(
                            (new Date() -
                              new Date(
                                user.joined.split("-").reverse().join("-"),
                              )) /
                              (1000 * 60 * 60 * 24),
                          ) / 30 || 1 / 30) >
                        0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}>
                      {(
                        parseFloat(user.roi) /
                        (Math.floor(
                          (new Date() -
                            new Date(
                              user.joined.split("-").reverse().join("-"),
                            )) /
                            (1000 * 60 * 60 * 24),
                        ) / 30 || 1 / 30)
                      ).toFixed(2)}
                      %)
                    </span>
                  </span>
                </p>
              </div>

              {/* Balance Section */}
              <div className="mt-2 flex items-center space-x-2">
                <FiDollarSign className="text-yellow-400" size={20} />
                <p className="text-lg text-[#D1D5DB]">
                  Balance:{" "}
                  <span className="font-semibold">{user.balance} USD</span>
                </p>
              </div>

              {/* Capital Section */}
              <div className="mt-2 flex items-center space-x-2">
                <GiMoneyStack className="text-green-400" size={20} />
                <p className="text-lg text-[#D1D5DB]">
                  Capital: {user.capital} USD
                </p>
              </div>

              {/* Joined Section */}
              <div className="mt-2 flex items-center space-x-2">
                <FiClock className="text-blue-400" size={20} />
                <p className="text-sm text-[#9CA3AF]">
                  Joined: <span className="text-[#D1D5DB]">{user.joined}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
