"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";
import { MdWarning } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedTrades, setPaginatedTrades] = useState([]);
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [profitFilter, setProfitFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [stats, setStats] = useState({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    pnl: 0,
    maxDrawdown: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetch("/api/get-trades")
      .then((res) => res.json())
      .then((data) => {
        const initialTrades = data.filter((trade) =>
          ["buy", "sell"].includes(trade.type),
        );
        setTrades(initialTrades);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trades:", error);
        setIsLoading(false);
      });
  }, []);

  // Apply filters whenever filters or trades change
  useEffect(() => {
    let filtered = [...trades];

    if (typeFilter !== "all") {
      filtered = filtered.filter((trade) => trade.type === typeFilter);
    }

    if (profitFilter !== "all") {
      filtered = filtered.filter((trade) =>
        profitFilter === "profit" ? trade.profit > 0 : trade.profit < 0,
      );
    }

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((trade) => {
        const openTime = new Date(trade.open_time);
        return openTime >= startDate && openTime <= endDate;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [trades, typeFilter, profitFilter, dateRange, perPage]);

  // Handle pagination changes
  useEffect(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    setPaginatedTrades(filteredData.slice(start, end));
    updateStatistics(filteredData);
  }, [filteredData, currentPage, perPage]);

  const updateStatistics = (data) => {
    const totalTrades = data.length;
    const wins = data.filter(
      (trade) => trade.profit + trade.commission > 0,
    ).length;
    const losses = totalTrades - wins;
    const pnl = data
      .reduce((sum, trade) => sum + trade.profit + trade.commission, 0)
      .toFixed(2);
    const winRate =
      totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(2) : 0;

    let maxDrawdown = 0;
    let currentDrawdown = 0;

    for (const trade of data) {
      const profitOrLoss = parseFloat(trade.profit + trade.commission || 0);

      if (profitOrLoss < 0) {
        currentDrawdown += profitOrLoss;
        maxDrawdown = Math.min(maxDrawdown, currentDrawdown);
      } else {
        currentDrawdown = 0;
      }
    }

    const formattedMaxDrawdown = maxDrawdown.toFixed(2);
    setStats({
      totalTrades,
      wins,
      losses,
      winRate,
      pnl,
      maxDrawdown: formattedMaxDrawdown,
    });
  };

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  };

  const Card = ({ children, bgClass, icon: Icon }) => (
    <motion.div
      className={`relative p-4 sm:p-6 rounded-2xl shadow-lg ${bgClass} text-white transition-all duration-100 hover:ring-2 ring-white`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{ duration: 0.1 }}>
      <div className="flex items-center space-x-2 sm:space-x-4 relative z-10">
        <Icon className="w-6 h-6 sm:w-10 sm:h-10" />{" "}
        {/* Responsive icon size */}
        <div>{children}</div>
      </div>
    </motion.div>
  );

  const PaginationControls = () => {
    const totalPages = Math.ceil(filteredData.length / perPage);

    return (
      <div className="flex flex-row justify-center items-center gap-4">
        {/* Previous Button */}
        <button
          className="flex items-center px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 disabled:opacity-50 transition-all"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <FiChevronLeft className="text-lg" />
        </button>

        {/* Page Info & Per Page Selector */}
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-md">
            {currentPage} of {totalPages}
          </span>
          <select
            className="p-2 bg-gray-800 text-gray-300 rounded-md focus:ring-2 focus:ring-white"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}>
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>

        {/* Next Button */}
        <button
          className="flex items-center px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 disabled:opacity-50 transition-all"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-t-green-500 border-gray-700 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p className="text-gray-300 mt-4">Loading trades...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {/* First Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-purple-500 to-purple-700"
            icon={FiBarChart2}>
            <h2 className="text-base sm:text-lg font-semibold">Trades</h2>
            <p className="text-xl sm:text-2xl font-bold">{stats.totalTrades}</p>
          </Card>
        </div>

        {/* Second Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-green-400 to-green-600"
            icon={FiTrendingUp}>
            <h2 className="text-base sm:text-lg font-semibold">Wins</h2>
            <p className="text-xl sm:text-2xl font-bold">{stats.wins}</p>
          </Card>
        </div>

        {/* Third Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-red-400 to-red-600"
            icon={FiTrendingDown}>
            <h2 className="text-base sm:text-lg font-semibold">Losses</h2>
            <p className="text-xl sm:text-2xl font-bold">{stats.losses}</p>
          </Card>
        </div>

        {/* Fourth Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-yellow-500 to-yellow-600"
            icon={FiDollarSign}>
            <h2 className="text-base sm:text-lg font-semibold">Accuracy</h2>
            <p className="text-xl sm:text-2xl font-bold">{stats.winRate}%</p>
          </Card>
        </div>

        {/* Fifth Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-blue-500 to-blue-600"
            icon={GiMoneyStack}>
            <h2 className="text-base sm:text-lg font-semibold">PnL</h2>
            <p className="text-xl sm:text-2xl font-bold">${stats.pnl}</p>
          </Card>
        </div>

        {/* Sixth Card */}
        <div className="col-span-1 md:col-span-1 text-center">
          <Card
            bgClass="bg-gradient-to-r from-orange-500 to-orange-600"
            icon={MdWarning}>
            <h2 className="text-base sm:text-lg font-semibold">Drawdown</h2>
            <p className="text-xl sm:text-2xl font-bold">
              -${Math.abs(stats.maxDrawdown)}
            </p>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 md:mt-12">
        {/* Left Filters */}
        <div className="flex flex-row gap-4 flex-grow sm:flex-grow-0 w-full lg:w-auto justify-between">
          <select
            className="p-2 bg-gray-800 text-white rounded-md shadow-sm border border-gray-600 focus:ring-2 focus:ring-white w-full sm:w-auto"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <select
            className="p-2 bg-gray-800 text-white rounded-md shadow-sm border border-gray-600 focus:ring-2 focus:ring-white w-full sm:w-auto"
            value={profitFilter}
            onChange={(e) => setProfitFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="profit">Profits</option>
            <option value="loss">Losses</option>
          </select>
        </div>

        {/* Right Date Range */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <label htmlFor="start-date" className="text-white">
              From:
            </label>
            <input
              id="start-date"
              type="date"
              className="p-2 bg-gray-800 text-white rounded-md shadow-sm border border-gray-600 focus:ring-2 focus:ring-white w-full sm:w-auto"
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="end-date" className="text-white">
              To:
            </label>
            <input
              id="end-date"
              type="date"
              className="p-2 bg-gray-800 text-white rounded-md shadow-sm border border-gray-600 focus:ring-2 focus:ring-white w-full sm:w-auto"
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <PaginationControls />
        </div>
      </div>

      {/* Trades Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-4 text-center">Type</th>
              <th className="p-4 text-center">Open Date</th>
              <th className="p-4 text-center">Close Date</th>
              <th className="p-4 text-center">Open Time</th>
              <th className="p-4 text-center">Close Time</th>
              <th className="p-4 text-center">Open Price</th>
              <th className="p-4 text-center">Close Price</th>
              <th className="p-4 text-center">Commission (USD)</th>
              <th className="p-4 text-center">Lots</th>
              <th className="p-4 text-center">Profit (USD)</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTrades.map((trade) => {
              const openDate = new Date(trade.open_time).toLocaleDateString();
              const openTime = new Date(trade.open_time).toLocaleTimeString();
              const closeDate = new Date(trade.close_time).toLocaleDateString();
              const closeTime = new Date(trade.close_time).toLocaleTimeString();

              return (
                <tr
                  key={trade.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}>
                  <td
                    className={`p-4 text-center font-bold ${
                      trade.type === "buy" ? "text-green-400" : "text-red-400"
                    }`}>
                    {trade.type}
                  </td>
                  <td className="p-4 text-center">{openDate}</td>
                  <td className="p-4 text-center">{closeDate}</td>
                  <td className="p-4 text-center">{openTime}</td>
                  <td className="p-4 text-center">{closeTime}</td>
                  <td className="p-4 text-center">{trade.open_price}</td>
                  <td className="p-4 text-center">{trade.close_price}</td>
                  <td className="p-4 text-center text-red-400">
                    {trade.commission}
                  </td>
                  <td className="p-4 text-center">{trade.lots}</td>
                  <td
                    className={`p-4 text-center font-bold ${
                      trade.profit + trade.commission > 0
                        ? "text-green-400"
                        : "text-red-500"
                    }`}>
                    {trade.profit.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TradesPage;
