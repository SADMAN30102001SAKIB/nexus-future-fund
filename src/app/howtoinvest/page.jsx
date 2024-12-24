"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { DollarSign, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";

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

const howToDetails = [
  "<p>Before you begin, it's important to understand how our fund works. Take your time to read all the information provided on our website about our services, returns, and how we manage your investments.<br/><br/><b style='color:hotpink'>Need Help?</b><br/>If anything is unclear, or if you have any questions, don't hesitate to reach out to us. Contact our support team and we'll guide you through the process step by step.</p>",

  "<p>Click on the 'My Wallet' button and Sign up for a new account using your gmail, personal information & bank/binance details.<br/>Complete the verification by providing your ID to ensure your account is secure and ready for investment. Verification helps protect your funds and ensures the safety of our platform.</p>",

  "<p>You can also install the Nexus Future Fund app (even though everything can be done in the website), available for both:<br/>Android & iOS<br/>While you're on our website with your phone, simply tap 'Add to Home Screen' in your browser and this will automatically install the app on your device.</p>",

  "<p>Now that your account is set up and verified, it's time to deposit the amount you wish to invest.<br/><b style='color:hotpink'>Important:</b> Submit the deposit request only after completing the payment via your selected method (bank or Binance).<br/><br/>Select the deposit option in the app.<br/>Choose the amount you want to invest and complete the deposit.</p><b style='color:hotpink'>Note:</b> You can only deposit money between the 21st and 28th of each month.",

  "<p>Your investment will officially start counting from the 1st of the next month. From then on, you will receive a guaranteed 24% return every year on your investment.</p>",

  "<p>You are free to withdraw your money at any time!<br/>Open the app, select the withdrawal option & enter the ammount you wish to withdraw.<br/>Your withdrawal request will be processed within 1 hour.<br/><b style='color:hotpink'>Note:</b> To receive your 2% monthly return, it is best to withdraw after the month is complete.</p>",
];

export default function HowToInvest() {
  const [showScrollUp, setShowScrollUp] = useState(false);

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

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" passHref>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <Image
                  src={logo}
                  alt="logo"
                  width={256}
                  height={256}
                  className="w-full"
                />
              </div>
            </div>
          </Link>
          <div>
            <Link href="/wallet" passHref>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                My Wallet
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/*How To*/}
        <Element name="howto">
          <section className="pt-36 pb-12">
            <div className="container mx-auto lg:px-36">
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2
                    className="text-3xl font-bold mb-6"
                    variants={fadeIn}>
                    How to Join Nexus Future Fund and Start Growing Your Money -
                    Step by Step Guide
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-6 text-justify"
                    variants={fadeIn}>
                    At Nexus Future Fund, we make it easy for you to start
                    investing and earning a guaranteed 24% yearly return. Follow
                    these simple steps to join us and begin your journey toward
                    financial growth:
                  </motion.p>
                  <motion.ul className="space-y-4" variants={staggerChildren}>
                    {[
                      "Read the Information on Our Website",
                      "Sign Up and Verify Your Account",
                      "Install Our App",
                      "Deposit Your Investment",
                      "Start Earning 24% Yearly return",
                      "Withdraw Anytime You Want",
                    ].map((item, index) => (
                      <motion.div variants={fadeIn} key={index}>
                        <li className="flex items-center" variants={fadeIn}>
                          <svg
                            className="w-6 h-6 text-pink-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <b>{item}</b>
                        </li>
                        <div
                          className="mt-2 mb-8 pl-8 text-gray-300 text-justify"
                          dangerouslySetInnerHTML={{
                            __html: howToDetails[index],
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.ul>
                  <motion.h2
                    className="text-3xl font-bold mt-12"
                    variants={fadeIn}>
                    Join Us and Grow Your Money Smartly and Securely
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-6 text-justify"
                    variants={fadeIn}>
                    Feel free to join Nexus Future Fund and start growing your
                    money with confidence. Our platform is designed to be safe,
                    risk-free, and transparent. Let us help you secure your
                    financial future with ease!
                  </motion.p>
                  <motion.h2 className="text-3xl font-bold" variants={fadeIn}>
                    Ready to Invest?
                  </motion.h2>
                  <Link href="/wallet" passHref>
                    <button className="px-4 py-2 my-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                      Invest
                    </button>
                  </Link>
                  <motion.p className="text-gray-300" variants={fadeIn}>
                    Join us and start your journey today!
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <DollarSign className="text-white" size={20} />
                </div>
                <span className="text-2xl font-bold">Nexus Future Fund</span>
              </div>
              <b className="text-white">Follow Us & Stay Connected.</b>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.facebook.com/nexusfuturefundofficial"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Facebook">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/nexusfuturefund"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Instagram">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0C8.742 0 8.333.014 7.053.072 5.773.129 4.729.273 3.803.66 2.862 1.051 2.083 1.63 1.366 2.366c-.73.717-1.315 1.496-1.707 2.438-.387.925-.531 1.97-.588 3.25C.014 8.742 0 9.151 0 12s.014 3.258.072 4.538c.057 1.28.201 2.325.588 3.25.392.942.977 1.721 1.707 2.438.717.736 1.496 1.315 2.438 1.707.925.387 1.97.531 3.25.588 1.28.057 1.688.072 4.538.072s3.258-.014 4.538-.072c1.28-.057 2.325-.201 3.25-.588.942-.392 1.721-.977 2.438-1.707.736-.717 1.315-1.496 1.707-2.438.387-.925.531-1.97.588-3.25.057-1.28.072-1.688.072-4.538s-.014-3.258-.072-4.538c-.057-1.28-.201-2.325-.588-3.25-.392-.942-.977-1.721-1.707-2.438-.717-.736-1.496-1.315-2.438-1.707-.925-.387-1.97-.531-3.25-.588C15.258.014 14.849 0 12 0zm0 5.838c3.403 0 6.162 2.759 6.162 6.162S15.403 18.162 12 18.162 5.838 15.403 5.838 12 8.597 5.838 12 5.838zm0 1.838a4.324 4.324 0 100 8.648 4.324 4.324 0 000-8.648zm6.406-3.676a1.308 1.308 0 100 2.617 1.308 1.308 0 000-2.617z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/nexusfuturefund"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Twitter">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@nexusfuturefundofficial"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="YouTube">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/nexusfuturefund"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0zM7.12 20.452H3.56V9.033h3.56v11.419zM5.34 7.536a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.452 20.452h-3.555v-5.763c0-1.374-.026-3.14-1.913-3.14-1.917 0-2.21 1.497-2.21 3.043v5.86h-3.553V9.033h3.413v1.559h.049c.475-.9 1.634-1.848 3.364-1.848 3.598 0 4.265 2.368 4.265 5.448v6.26z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/nexusfuturefund"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Telegram">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.247-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-400 mt-2">
                Stay up-to-date with our market insights and live trading
                results by following us.
              </p>
            </div>
            {[
              {
                title: "Links",
                links: ["Home", "About", "Our Policies"],
                href: ["/", "/about", "/policy"],
              },
              {
                title: "Other Services",
                links: ["Nexus Future Trade Signals"],
                href: ["/signals"],
              },
              {
                title: "Contact",
                links: [
                  "nexusfuturefund@gmail.com",
                  "Address: 4 Endsleigh Street, London, WC1H 0DS",
                ],
              },
            ].map((column, index) => (
              <div key={index} className="w-full lg:w-1/5 mb-8 lg:mb-0">
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {column.href ? (
                        <a
                          href={column.href[linkIndex]}
                          className="text-gray-400 hover:text-white transition-colors duration-300">
                          {link}
                        </a>
                      ) : (
                        <div className="text-gray-400 hover:text-white transition-colors duration-300">
                          {link}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>Copyright © 2025 Nexus Future Fund. All Right Reserved.</p>
          </div>
        </div>
      </footer>

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
