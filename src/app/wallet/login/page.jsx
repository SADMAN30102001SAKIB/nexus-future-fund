"use client";

import { account } from "../../../appwrite/config";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      try {
        await account.get();
        router.push("/wallet");
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    checkLogin();
  }, [router]);

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
    <div className="bg-gray-800 h-screen flex items-center justify-center flex-col">
      {!loading ? (
        <button
          onClick={handleLogin}
          className="bg-pink-600 text-white p-4 rounded-lg flex">
          <KeyRound className="mr-2" />
          Login with Google
        </button>
      ) : (
        <p className="text-white">Checking login status...</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
