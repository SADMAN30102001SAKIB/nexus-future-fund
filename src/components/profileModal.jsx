import React, { useState } from "react";
import { Permission, Role } from "appwrite";
import db from "../appwrite/database";

const ProfileModal = ({ userDoc, setUserDoc, onClose }) => {
  const [profileData, setProfileData] = useState({
    name: userDoc.name || "",
    phoneNumber: userDoc.phoneNumber || "",
    bankName: userDoc.bankName || "",
    bankAccountNumber: userDoc.bankAccountNumber || "",
    binanceWalletAddress: userDoc.binanceWalletAddress || "",
  });
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    setError("");
    if (!formData.name || !formData.phoneNumber) {
      setError("Please fill in the required fields");
      return;
    }
    if (
      (formData.bankName && !formData.bankAccountNumber) ||
      (formData.bankAccountNumber && !formData.bankName)
    ) {
      setError("Bank name and account number must be given together");
      return;
    }
    if (
      !formData.bankName &&
      !formData.bankAccountNumber &&
      !formData.binanceWalletAddress
    ) {
      setError("At least one of the transaction medium must be given");
      return;
    }
    if (formData.name.length < 3 || formData.name.length > 100) {
      setError("Name must be at least 3 to 100 characters long");
      return;
    }
    if (formData.phoneNumber.length < 5 || formData.phoneNumber.length > 20) {
      setError("Phone number must be at least 5 to 20 characters long");
      return;
    }
    if (
      formData.bankName &&
      (formData.bankName.length < 2 || formData.bankName.length > 100)
    ) {
      setError("Bank name must be at least 3 to 100 characters long");
      return;
    }
    if (
      formData.bankAccountNumber &&
      (formData.bankAccountNumber.length < 5 ||
        formData.bankAccountNumber.length > 50)
    ) {
      setError("Bank account number must be at least 5 to 20 characters long");
      return;
    }
    if (
      formData.binanceWalletAddress &&
      (formData.binanceWalletAddress.length < 5 ||
        formData.binanceWalletAddress.length > 50)
    ) {
      setError(
        "Binance wallet address must be at least 5 to 100 characters long",
      );
      return;
    }
    setProfileData(formData);
    setSaving(true);
    setUserDoc({ ...userDoc, ...formData });
    try {
      await db.users.update(userDoc.$id, formData, [
        Permission.update(Role.user(userDoc.$id)),
      ]);
    } catch (error) {
      console.log("Error updating user details:", error);
      setError("Failed to save changes.");
    }
    setSaving(false);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-72 md:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-900 rounded-md text-black"
              />
            ) : (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                {profileData.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-900 rounded-md text-black"
              />
            ) : (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                {profileData.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Name:
            </label>
            {editMode ? (
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-900 rounded-md text-black"
              />
            ) : profileData.bankName ? (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                {profileData.bankName}
              </p>
            ) : (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                Not provided
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Account Number:
            </label>
            {editMode ? (
              <input
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-900 rounded-md text-black"
              />
            ) : profileData.bankAccountNumber ? (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                {profileData.bankAccountNumber}
              </p>
            ) : (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                Not provided
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Binance Wallet Address:
            </label>
            {editMode ? (
              <input
                type="text"
                name="binanceWalletAddress"
                value={formData.binanceWalletAddress}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-900 rounded-md text-black"
              />
            ) : profileData.binanceWalletAddress ? (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                {profileData.binanceWalletAddress}
              </p>
            ) : (
              <p className="mt-1 text-gray-800 font-black border-b border-gray-400">
                Not provided
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex justify-end space-x-2 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSaveClick}
                disabled={saving}
                className={`text-white px-4 py-2 rounded-full
                ${
                  saving
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}>
                {saving ? "Saving" : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setError("");
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400">
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600">
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
