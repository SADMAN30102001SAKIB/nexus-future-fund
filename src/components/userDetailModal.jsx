import { useState } from "react";
import { Permission, Role } from "appwrite";
import db from "../appwrite/database";

const UserDetailsModal = ({ user, onClose }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phoneNumber || !bankAddress) {
      return;
    }
    setLoading(true);
    try {
      await db.users.create(
        {
          email: user.email,
          name: name,
          phoneNumber: phoneNumber,
          bankAddress: bankAddress,
        },
        [Permission.write(Role.user(user.$id))],
        user.$id,
      );
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error updating user details:", error);
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
            <label className="block text-gray-700 mb-1" htmlFor="bankAddress">
              Bank Address
            </label>
            <input
              type="text"
              id="bankAddress"
              placeholder="Enter your bank address"
              value={bankAddress}
              onChange={(e) => setBankAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>
          <div className="flex justify-between">
            {/* <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </button> */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-4 text-white rounded-md ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}>
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal;
