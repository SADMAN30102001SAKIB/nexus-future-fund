"use client";

import { account } from "../../../appwrite/config";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // await account.createOAuth2Session(
      //   "google",
      //   `http://localhost:3000/wallet`,
      //   `http://localhost:3000/wallet/login`,
      // );
      await account.createOAuth2Session(
        "google",
        `https://nexusfuturefund.vercel.app/wallet`,
        `https://nexusfuturefund.vercel.app/wallet/login`,
      );
    } catch (e) {
      console.log(e);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-4 rounded-lg">
        Login with Google
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
