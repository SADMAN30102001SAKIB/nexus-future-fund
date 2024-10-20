"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import db from "../../../appwrite/database";
import { account, storage } from "../../../appwrite/config";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const user = await account.get();
        if (user.email === "nexusfuturefund@gmail.com") {
          setIsAuthorized(true);
        } else {
          setError("You are not authorized to view this page.");
          setLoading(false);
        }
      } catch (err) {
        setError("You must be logged in to view this page.");
        console.log("Error:", err);
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchData = async () => {
      try {
        const response = await db.users.list();
        setUsers(response.documents);

        // Fetch previews for each user
        const previews = response.documents.map((user) => {
          const previewUrl = storage.getFileView(
            "6714e08d002ef06db7d0",
            user.$id,
          );
          return previewUrl + "&mode=admin";
        });

        setPreviews(previews);
      } catch (err) {
        setError("Failed to fetch users.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthorized]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profiles...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">User Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.length > 0 ? (
            users.map((user, i) => (
              <motion.div
                key={user.$id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 text-white"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}>
                {previews[i] && (
                  <Image
                    src={previews[i]}
                    alt={`${user.name}'s Profile`}
                    className="rounded-lg mb-4 w-full h-48 object-cover"
                    width={500}
                    height={500}
                    unoptimized
                  />
                )}
                <h2 className="text-2xl font-semibold mb-2">
                  {user.name || "Unnamed User"}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {user.verified ? "Verified" : "Not Verified"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Phone Number:</span>{" "}
                  {user.phoneNumber || "Not provided"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Bank Account Number:</span>{" "}
                  {user.bankAccountNumber || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Balance:</span> $
                  {user.balance?.toFixed(2) || "0.00"}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg col-span-full">
              No profiles found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
