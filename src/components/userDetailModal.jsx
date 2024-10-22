import { useState } from "react";
import { Permission, Role } from "appwrite";
import db from "../appwrite/database";
import { account } from "../appwrite/config";

const UserDetailsModal = ({ user, userDoc, setUserDoc, onClose, router }) => {
  const [name, setName] = useState(userDoc?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(userDoc?.phoneNumber || "");
  const [bankName, setBankName] = useState(userDoc?.bankName || "");
  const [bankAccountNumber, setBankAccountNumber] = useState(
    userDoc?.bankAccountNumber || "",
  );
  const [binanceWalletAddress, setBinanceWalletAddress] = useState(
    userDoc?.binanceWalletAddress || "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name || !phoneNumber) {
      setError("Please fill in the required fields");
      return;
    }
    if ((bankName && !bankAccountNumber) || (bankAccountNumber && !bankName)) {
      setError("Bank name and account number must be given together");
      return;
    }
    if (!bankName && !bankAccountNumber && !binanceWalletAddress) {
      setError("At least one of the transaction medium must be given");
      return;
    }
    if (name.length < 3 || name.length > 100) {
      setError("Name must be at least 3 to 100 characters long");
      return;
    }
    if (phoneNumber.length < 5 || phoneNumber.length > 20) {
      setError("Phone number must be at least 5 to 20 characters long");
      return;
    }
    if (bankName && (bankName.length < 2 || bankName.length > 100)) {
      setError("Bank name must be at least 3 to 100 characters long");
      return;
    }
    if (
      bankAccountNumber &&
      (bankAccountNumber.length < 5 || bankAccountNumber.length > 50)
    ) {
      setError("Bank account number must be at least 5 to 20 characters long");
      return;
    }
    if (
      binanceWalletAddress &&
      (binanceWalletAddress.length < 5 || binanceWalletAddress.length > 50)
    ) {
      setError(
        "Binance wallet address must be at least 5 to 100 characters long",
      );
      return;
    }
    setLoading(true);
    const userObj = {
      name: name,
      phoneNumber: phoneNumber,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
      binanceWalletAddress: binanceWalletAddress,
    };
    setUserDoc({ ...userDoc, ...userObj });

    try {
      if (userDoc) {
        await db.users.update(user.$id, userObj, [
          Permission.update(Role.user(user.$id)),
        ]);
      } else {
        await db.users.create(
          {
            email: user.email,
            name: name,
            phoneNumber: phoneNumber,
            bankName: bankName,
            bankAccountNumber: bankAccountNumber,
            binanceWalletAddress: binanceWalletAddress,
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
        await db.userNotifications.create(
          {
            email: user.email,
            notifications: [],
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
        await db.userDepositHistory.create(
          {
            email: user.email,
            histories: [],
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
        await db.userWithdrawHistory.create(
          {
            email: user.email,
            histories: [],
          },
          [Permission.write(Role.user(user.$id))],
          user.$id,
        );
      }
      setLoading(false);
      onClose();
    } catch (error) {
      console.log("Error updating user details:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Complete Your Profile
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">
              Phone Number (with country code)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="bankName">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              placeholder="Enter your bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="bankAccountNumber">
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankAccountNumber"
              placeholder="Enter your bank account number"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <p className="text-black flex justify-center items-cente mb-4">
            -OR-
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="binanceWalletAddress">
              Binance Wallet Address
            </label>
            <input
              type="text"
              id="binanceWalletAddress"
              placeholder="Enter your binance wallet address"
              value={binanceWalletAddress}
              onChange={(e) => setBinanceWalletAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-4 text-white rounded-md ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}>
              {loading ? "Submitting" : "Submit"}
            </button>
            <button
              onClick={async () => {
                setLoggingOut(true);
                await account.deleteSession("current");
                router.push("/wallet/login");
              }}
              disabled={loggingOut}
              className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400
              ${
                loggingOut
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}>
              {loggingOut ? "Exiting" : "Log Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal;
