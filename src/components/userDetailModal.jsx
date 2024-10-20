import { useState } from "react";
import { Permission, Role } from "appwrite";
import db from "../appwrite/database";
import { account } from "../appwrite/config";
import { Button } from "./Button";

const UserDetailsModal = ({ user, userDoc, setUserDoc, onClose }) => {
  const [name, setName] = useState(userDoc?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(userDoc?.phoneNumber || "");
  const [bankName, setBankName] = useState(userDoc?.bankName || "");
  const [bankAccountNumber, setBankAccountNumber] = useState(
    userDoc?.bankAccountNumber || "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name || !phoneNumber || !bankName || !bankAccountNumber) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    const userObj = {
      name: name,
      phoneNumber: phoneNumber,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Complete Your Profile
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
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
              Phone Number
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
              required
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
              required
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-4 text-white rounded-md ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}>
              {loading ? "Saving..." : "Submit"}
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
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal;
