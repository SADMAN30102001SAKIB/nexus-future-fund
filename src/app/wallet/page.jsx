"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import { Button } from "../../components/Button";
import { account, storage } from "../../appwrite/config";
import db from "../../appwrite/database";
import UserDetailsModal from "../../components/userDetailModal";
import ProfileModal from "../../components/profileModal";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Wallet() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [fileExist, setFileExist] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getUser = async () => {
      let sessionUser = "";
      try {
        sessionUser = await account.get();
        setUser(sessionUser);
      } catch (error) {
        // alert("User not authenticated or error fetching user data: " + error);
        console.log(
          "User not authenticated or error fetching user data: " + error,
        );
        router.push("/wallet/login");
        return;
      }

      try {
        const userDoc = await db.users.get(sessionUser.$id);

        if (
          !userDoc ||
          !userDoc.name ||
          !userDoc.phoneNumber ||
          !userDoc.bankName ||
          !userDoc.bankAccountNumber
        ) {
          setShowModal(true);
        }
        setUserDoc(userDoc);
        setVerified(userDoc.verified);

        const promise = storage.getFile(
          "6714e08d002ef06db7d0",
          sessionUser.$id,
        );
        promise.then(
          function (response) {
            console.log("File exists:", response);
            setFileExist(true);
            setLoading(false);
          },
          function (error) {
            console.log("File does not exist:", error);
            setFileExist(false);
            setLoading(false);
          },
        );
      } catch (err) {
        console.log("Error fetching:", err);
        setShowModal(true);
      }
    };
    getUser();
  }, [router, loading]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNotificationClick = () => {
    router.push("/wallet/notifications");
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
  };

  const handleCloseModal = () => {
    setProfileOpen(false);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      setFileUploadError("No file selected");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setFileUploadError("Only .jpg and .png files are allowed");
      return;
    }

    setUploading(true);
    const fileExtension = file.type === "image/jpeg" ? ".jpg" : ".png";
    const renamedFile = new File([file], user.$id + fileExtension, {
      type: file.type,
    });

    try {
      await storage.createFile("6714e08d002ef06db7d0", user.$id, renamedFile);
      setFileExist(true);
      setFileUploadError(null);
      setUploading(false);
    } catch (error) {
      console.log("Error uploading file:", error);
      setFileUploadError("Error uploading file. Please try again.");
      setFileExist(false);
      setUploading(false);
    }
  };

  if (loading || showModal) {
    return (
      <div>
        {showModal ? (
          <UserDetailsModal
            user={user}
            userDoc={userDoc}
            setUserDoc={setUserDoc}
            onClose={() => {
              setLoading(false);
              setShowModal(false);
            }}
          />
        ) : (
          <div className="flex items-center justify-center text-6xl lg:text-9xl h-screen">
            Loading...
          </div>
        )}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 touch-pan-y">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto p-6 flex items-center justify-between">
          <h1 className="text-2xl font-black">
            {userDoc.name}{" "}
            {verified ? (
              <p className="text-green-500 text-sm">(verified)</p>
            ) : (
              <p className="text-red-500 text-sm">(not verified)</p>
            )}
          </h1>
          <div className="flex items-start md:items-center">
            <button
              className="mr-4 relative text-white focus:outline-none"
              onClick={handleNotificationClick}>
              <Bell size={24} />
            </button>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
              <Button
                onClick={toggleSidebar}
                className="text-white focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isSidebarOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </Button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <Button
                onClick={handleProfileClick}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300">
                Profile
              </Button>
              <Button
                onClick={async () => {
                  setLoggingOut(true);
                  await account.deleteSession("current");
                  window.location.reload();
                }}
                disabled={loggingOut}
                className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400
                ${
                  loggingOut
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}>
                {loggingOut ? "Logging out" : "Log Out"}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`h-screen fixed inset-y-0 right-0 bg-gray-800 text-white w-64 p-6 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden z-40`}>
          <Button
            onClick={toggleSidebar}
            className="absolute top-6 right-6 text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
          <div className="flex flex-col items-center mt-16">
            <Button
              onClick={handleProfileClick}
              className="block bg-pink-600 text-white w-1/2 px-4 py-2 rounded-md mb-2 hover:bg-pink-700 transition duration-300">
              Profile
            </Button>
            <Button
              onClick={async () => {
                setLoggingOut(true);
                await account.deleteSession("current");
                window.location.reload();
              }}
              disabled={loggingOut}
              className={`block bg-red-600 text-white w-1/2 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 focus:ring-red-400
              ${
                loggingOut
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}>
              {loggingOut ? "Logging out" : "Log Out"}
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/*Wallet*/}
        <Element name="about-us">
          <section className="pt-36 lg:pb-12 bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <motion.h1
                  className="text-4xl lg:text-5xl font-bold mb-4 text-white"
                  variants={fadeIn}>
                  Your Ballance: ${userDoc.balance}
                </motion.h1>
                <motion.span
                  className="mr-4 text-lg text-justify"
                  variants={fadeIn}>
                  <Button className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                    Deposit
                  </Button>
                </motion.span>
                <motion.span className="text-lg text-justify" variants={fadeIn}>
                  <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                    Withdraw
                  </Button>
                </motion.span>
              </motion.div>
            </div>
          </section>
        </Element>
      </main>

      {/* Upload File */}
      {!verified && !fileExist && (
        <div className="flex flex-col items-center justify-center bg-gray-900">
          <div className="bg-white shadow-lg rounded-lg p-8 w-72 md:w-96">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Verify Yourself
            </h2>
            <p className="text-gray-500 mb-4">
              Please upload your valid ID card.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg, .png"
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-blue-700
            hover:file:bg-pink-100
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent
            mb-4
          "
            />
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className={`text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 ${
                uploading
                  ? "bg-pink-400 hover:bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            {fileUploadError && (
              <p className="text-red-500 mt-4">{fileUploadError}</p>
            )}
          </div>
        </div>
      )}

      {isProfileOpen && (
        <ProfileModal
          userDoc={userDoc}
          setUserDoc={setUserDoc}
          onClose={handleCloseModal}
        />
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            className="fixed bottom-8 right-8 p-2 bg-pink-600 text-white rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
