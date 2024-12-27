"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, Bell, History, UserPen, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import { Permission, Role } from "appwrite";
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

function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="px-4 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}>
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.3 }}>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all"
            onClick={onClose}>
            <X size={24} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const TransactionModal = ({
  onClose,
  type,
  currency,
  amount,
  addressOrNumber,
  selectedOption,
  errorMessage,
  confirmAction,
  proceeding,
  onConfirm,
  onCurrencyChange,
  onAmountChange,
  onAddressOrNumberChange,
  onOptionClick,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black mb-6">
          {type === "deposit" ? "Deposit Amount" : "Withdraw Amount"}
        </h2>
        {!confirmAction && (
          <>
            <select
              value={currency}
              onChange={onCurrencyChange}
              className="text-black w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-black">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="BDT">BDT</option>
            </select>
            <input
              type="number"
              value={amount}
              onChange={onAmountChange}
              className="text-black w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-black"
              placeholder="Enter amount"
            />
            <div className="flex justify-around mb-4">
              <button
                className={`w-1/2 py-2 px-4 mr-2 rounded-lg text-black ${
                  selectedOption === "bank"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => onOptionClick("bank")}>
                Bank
              </button>
              <button
                className={`w-1/2 py-2 px-4 ml-2 rounded-lg text-black ${
                  selectedOption === "binancePay"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => onOptionClick("binancePay")}>
                Binance Pay
              </button>
            </div>
            {selectedOption && (
              <input
                type="text"
                value={addressOrNumber}
                onChange={onAddressOrNumberChange}
                className="text-black w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none"
                placeholder={
                  selectedOption === "bank"
                    ? "Account Number For This Transaction"
                    : "Wallet Address For This Transaction"
                }
              />
            )}
          </>
        )}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {!confirmAction ? (
          <button
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            onClick={() => onConfirm(type)}>
            Confirm
          </button>
        ) : (
          <>
            <div className="text-black mb-6 font-semibold">
              {type == "deposit" && (
                <p className="text-gray-700 font-normal">
                  We&apos;re assuming that you already deposited to our account!
                  If not then deposite first.
                </p>
              )}
              You are about to {type} amount {parseFloat(amount)} {currency}{" "}
              through {selectedOption}!
            </div>
            <button
              disabled={proceeding}
              className={`bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 mb-4 mr-4 ${
                proceeding && "cursor-not-allowed from-pink-200 to-pink-300"
              }`}
              onClick={() => onConfirm(type)}>
              Ok
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow transform transition-transform hover:scale-105"
              onClick={onClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default function Wallet() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);
  const [fileExist, setFileExist] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState(0);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [confirmAction, setConfirmAction] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [proceeding, setProceeding] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [selectedOption, setSelectedOption] = useState("bank");
  const [addressOrNumber, setAddressOrNumber] = useState("");

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
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
        console.log(
          "User not authenticated or error fetching user data: " + error,
        );
        router.push("/wallet/login");
      }

      try {
        const userDoc = await db.users.get(sessionUser.$id);
        if (
          !userDoc ||
          !userDoc.name ||
          !userDoc.phoneNumber ||
          (userDoc.bankName && !userDoc.bankAccountNumber) ||
          (userDoc.bankAccountNumber && !userDoc.bankName) ||
          (!userDoc.bankName &&
            !userDoc.bankAccountNumber &&
            !userDoc.binancePayId)
        ) {
          setShowModal(true);
        }
        if (userDoc?.bankAccountNumber) {
          setSelectedOption("bank");
          setAddressOrNumber(userDoc.bankAccountNumber);
        } else if (userDoc?.binancePayId) {
          setSelectedOption("binancePay");
          setAddressOrNumber(userDoc.binancePayId);
        }
        setUserDoc(userDoc);
      } catch (err) {
        console.log("Error fetching userDoc:", err);
        setShowModal(true);
      }

      try {
        await storage.getFile("6714e08d002ef06db7d0", sessionUser.$id);
        setFileExist(true);
      } catch (error) {
        console.log("File does not exist:", error);
        setFileExist(false);
      } finally {
        setLoading(false);
      }

      try {
        const systemNotifications = await db.notifications.list();
        const userNotifications = await db.userNotifications.get(
          sessionUser.$id,
        );
        const systemNotificationsLength = systemNotifications.documents.length;
        const userNotificationsLength = userNotifications.notifications.length;

        const seenSystemNotifications = localStorage.getItem(
          "systemNotificationCount" + sessionUser.$id,
        );
        const seenUserNotifications = localStorage.getItem(
          "userNotificationCount" + sessionUser.$id,
        );
        if (!seenSystemNotifications) {
          localStorage.setItem("systemNotificationCount" + sessionUser.$id, 0);
        }
        if (!seenUserNotifications) {
          localStorage.setItem("userNotificationCount" + sessionUser.$id, 0);
        }

        setNotificationBadge(
          systemNotificationsLength +
            userNotificationsLength -
            (parseInt(seenSystemNotifications) +
              parseInt(seenUserNotifications)),
        );
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
    getUser();
  }, [router, loading]);

  const openDepositModal = async () => {
    setAmount("");
    if (userDoc?.bankAccountNumber) {
      setSelectedOption("bank");
      setAddressOrNumber(userDoc.bankAccountNumber);
    } else if (userDoc?.binancePayId) {
      setSelectedOption("binancePay");
      setAddressOrNumber(userDoc.binancePayId);
    }
    setShowDepositModal(true);
    setUserDoc(await db.users.get(user.$id));
    let isPending = false;
    try {
      const depositRequest = await db.pendingDeposit.get(user.$id);
      isPending = !!depositRequest;
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("not be found")) {
      } else {
        console.log(error);
        setErrorMessage("Failed to check pending requests. Please try again.");
      }
    }
    if (isPending) {
      setErrorMessage(`You already have a pending deposit request.`);
    }
  };

  const openWithdrawModal = async () => {
    setAmount("");
    if (userDoc?.bankAccountNumber) {
      setSelectedOption("bank");
      setAddressOrNumber(userDoc.bankAccountNumber);
    } else if (userDoc?.binancePayId) {
      setSelectedOption("binancePay");
      setAddressOrNumber(userDoc.binancePayId);
    }
    setShowWithdrawModal(true);
    setUserDoc(await db.users.get(user.$id));
    let isPending = false;
    try {
      const withdrawRequest = await db.pendingWithdraw.get(user.$id);
      isPending = !!withdrawRequest;
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("not be found")) {
      } else {
        console.log(error);
        setErrorMessage("Failed to check pending requests. Please try again.");
      }
    }
    if (isPending) {
      setErrorMessage(`You already have a pending withdraw request.`);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "bank") {
      setAddressOrNumber(userDoc.bankAccountNumber);
    } else {
      setAddressOrNumber(userDoc.binancePayId);
    }
  };

  const handleConfirm = async (type) => {
    setErrorMessage(null);
    if (!userDoc.verified) {
      setErrorMessage("You are not verified! Cannot proceed.");
      return;
    }

    if (!amount || amount < 1) {
      setErrorMessage("Amount can't be this low.");
      return;
    }

    if (type === "withdraw" && userDoc.balance == 0) {
      setErrorMessage("Insufficient balance.");
      return;
    }

    let isPending = false;
    try {
      if (type === "deposit") {
        const depositRequest = await db.pendingDeposit.get(user.$id);
        isPending = !!depositRequest;
      } else {
        const withdrawRequest = await db.pendingWithdraw.get(user.$id);
        isPending = !!withdrawRequest;
      }
    } catch (error) {
      if (error.message.includes("not be found")) {
      } else {
        console.log(error);
        setErrorMessage("Failed to check pending requests. Please try again.");
        return;
      }
    }

    if (isPending) {
      setErrorMessage(`You already have a pending ${type} request.`);
      return;
    }

    if (
      !addressOrNumber ||
      (selectedOption === "bank" &&
        (addressOrNumber.length < 5 || addressOrNumber.length > 50)) ||
      (selectedOption === "binancePay" &&
        (addressOrNumber.length != 9 || addressOrNumber.length != 10))
    ) {
      if (selectedOption === "bank") {
        setErrorMessage(
          "Bank account number must be at least 5 to 50 characters long",
        );
      } else {
        setErrorMessage("Binance Pay ID must be 9-10 characters long");
      }
      return;
    }

    if (!confirmAction) {
      setConfirmAction(true);
      return;
    }

    try {
      if (type === "deposit") {
        setProceeding(true);
        await db.pendingDeposit.create(
          {
            email: user.email,
            amount: parseFloat(amount),
            currency: currency,
            medium: selectedOption,
            addressOrNumber: addressOrNumber,
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
      } else if (type === "withdraw") {
        setProceeding(true);
        await db.pendingWithdraw.create(
          {
            email: user.email,
            amount: parseFloat(amount),
            currency: currency,
            medium: selectedOption,
            addressOrNumber: addressOrNumber,
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
      }
      setProceeding(false);
      setShowDepositModal(false);
      setShowWithdrawModal(false);
      setConfirmAction(false);
      setErrorMessage(null);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to complete the action. Please try again.");
      setProceeding(false);
    }
  };

  const closeModal = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setConfirmAction(false);
    setErrorMessage(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNotificationClick = () => {
    router.push("/wallet/notifications");
  };

  const handleHistoryClick = () => {
    router.push("/wallet/history");
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
  };

  const closeProfileModal = () => {
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
            router={router}
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
    <div className="bg-gray-900 h-screen text-gray-100 touch-pan-y">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto p-6 flex items-center justify-between">
          <h1 className="text-2xl font-black truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px] overflow-hidden whitespace-nowrap">
            {userDoc.name}{" "}
            {userDoc.verified ? (
              <p className="text-green-500 text-sm">(verified)</p>
            ) : (
              <p className="text-red-500 text-sm">(not verified)</p>
            )}
          </h1>
          <div className="flex items-start md:items-center">
            <button
              className="mr-4 relative text-white focus:outline-none"
              onClick={handleHistoryClick}>
              <History size={24} />
            </button>
            <button
              className="mr-4 relative text-white focus:outline-none"
              onClick={handleNotificationClick}>
              <Bell size={24} />
              {notificationBadge > 0 &&
                (notificationBadge > 9 ? (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1 py-1 rounded-full">
                    9+
                  </span>
                ) : (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1 rounded-full">
                    {notificationBadge}
                  </span>
                ))}
            </button>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
              <button
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
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={handleProfileClick}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-300 flex justify-between">
                Profile <UserPen className="ml-2" />
              </button>
              <button
                onClick={async () => {
                  setLoggingOut(true);
                  await account.deleteSession("current");
                  router.push("/wallet/login");
                }}
                disabled={loggingOut}
                className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 flex justify-between
                ${
                  loggingOut
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}>
                {loggingOut ? "Exiting" : "Log Out"} <LogOut className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`h-screen fixed inset-y-0 right-0 bg-gray-800 text-white w-64 p-6 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden z-40`}>
          <button
            onClick={toggleSidebar}
            className="absolute top-8 right-8 text-white">
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
          </button>
          <div className="flex flex-col items-center mt-16">
            <button
              onClick={handleProfileClick}
              className="bg-pink-600 text-white w-2/3 px-4 py-2 rounded-lg mb-2 hover:bg-pink-700 transition duration-300 flex justify-between">
              Profile <UserPen className="ml-2" />
            </button>
            <button
              onClick={async () => {
                setLoggingOut(true);
                await account.deleteSession("current");
                router.push("/wallet/login");
              }}
              disabled={loggingOut}
              className={`bg-red-600 text-white w-2/3 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 focus:ring-red-400 flex justify-between
              ${
                loggingOut
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}>
              {loggingOut ? "Exiting" : "Log Out"} <LogOut className="ml-2" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/*Wallet*/}
        <Element name="about-us">
          <section className="bg-gray-800 rounded-3xl pt-8 lg:pb-8  text-gray-300 mx-4 md:mx-24 mb-8">
            <div className="container md:px-8 flex lg:flex-row items-center">
              <motion.div
                className="mb-8 lg:mb-0"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <motion.h1
                  className="text-xl md:text-5xl font-bold mb-8 text-white"
                  variants={fadeIn}>
                  Balance: ${userDoc.balance ? userDoc.balance : 0}
                </motion.h1>
                <motion.span
                  className="mr-4 text-lg text-justify"
                  variants={fadeIn}>
                  <button
                    onClick={openDepositModal}
                    className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                    Deposit
                  </button>
                </motion.span>
                <motion.span className="text-lg text-justify" variants={fadeIn}>
                  <button
                    onClick={openWithdrawModal}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                    Withdraw
                  </button>
                </motion.span>
              </motion.div>
            </div>
          </section>
        </Element>
      </main>

      {/* Deposit Modal */}
      {showDepositModal && (
        <TransactionModal
          onClose={closeModal}
          type="deposit"
          currency={currency}
          amount={amount}
          addressOrNumber={addressOrNumber}
          selectedOption={selectedOption}
          errorMessage={errorMessage}
          confirmAction={confirmAction}
          proceeding={proceeding}
          onConfirm={handleConfirm}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={(e) => setAmount(e.target.value)}
          onAddressOrNumberChange={(e) => setAddressOrNumber(e.target.value)}
          onOptionClick={handleOptionClick}
        />
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <TransactionModal
          onClose={closeModal}
          type="withdraw"
          currency={currency}
          amount={amount}
          addressOrNumber={addressOrNumber}
          selectedOption={selectedOption}
          errorMessage={errorMessage}
          confirmAction={confirmAction}
          proceeding={proceeding}
          onConfirm={handleConfirm}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={(e) => setAmount(e.target.value)}
          onAddressOrNumberChange={(e) => setAddressOrNumber(e.target.value)}
          onOptionClick={handleOptionClick}
        />
      )}

      {/* Upload File */}
      {!userDoc.verified && !fileExist && (
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
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 ${
                uploading
                  ? "bg-pink-400 hover:bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
            {fileUploadError && (
              <p className="text-red-500 mt-4">{fileUploadError}</p>
            )}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          userDoc={userDoc}
          setUserDoc={setUserDoc}
          onClose={closeProfileModal}
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
            <ChevronUp size={30} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
