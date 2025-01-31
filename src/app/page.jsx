"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import homeImage from "../assets/home.png";
import benefitsImage from "../assets/benefits.png";
import investmentsImage from "../assets/investments.png";
import placeholderImage from "../assets/userPlaceholder.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";
import {
  DollarSign,
  Shield,
  Headphones,
  ChevronUp,
  Menu,
  X,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll";
import blogs from "./data/blogs.js";

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

const feedbackData = [
  {
    name: "Jeda Rowen",
    role: "Small Business Owner",
    comment:
      "I was hesitant at first, but after a year with Nexus Future Fund, I can honestly say it's been one of the best decisions for my business. The 2% monthly return really takes the stress out of investing, and I love how hands-off it is. Highly recommended!",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4E03AQG72eA_wpqfKQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718239210818?e=1740614400&v=beta&t=ibyCSBYP_P-p3GdxfyrXgFxNSsxm4LJIFErdyS4NYOo",
  },
  {
    name: "Jane Smith",
    role: "Freelance Designer",
    comment:
      "I'm not a finance person, so I was skeptical about crypto. But Nexus Future Fund has been so easy to use. They break everything down in a way that makes sense, and the support team is always there to answer my questions. Now, I feel way more in control of my money.",
    rating: 4,
    img: "",
  },
  {
    name: "Robert Johnson",
    role: "Retired Teacher",
    comment:
      "I've tried other investment options over the years, but none have been as steady as Nexus Future Fund. The guaranteed return really gives me peace of mind. And being able to access my money whenever I need it without extra fees has been a game changer.",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/C4E03AQEdoYimO4B8tw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1550247415483?e=1740614400&v=beta&t=lwToDnP6HXoAV5XtXku9dU21Fkeu3juBM69aqICbLx8",
  },
  {
    name: "Emily Chen",
    role: "Tech Entrepreneur",
    comment:
      "I'm someone who likes to stay informed, and the support from Nexus Future Fund is always there when I need it. Their 24/7 availability and the expertise behind their strategy make me feel confident about where my money is going. It's like having my own financial team!",
    rating: 5,
    img: "",
  },
  {
    name: "Michael Brown",
    role: "Corporate Executive",
    comment:
      "I've always been cautious with crypto due to the volatility, but Nexus Future Fund changed my mind. I've been getting steady returns every month without worrying about market swings. It's taken the stress out of investing in crypto.",
    rating: 4,
    img: "",
  },
];

const faq = [
  {
    question: "What is Nexus Future Fund?",
    answer:
      "Nexus Future Fund is a hedge fund designed to simplify your investments. It helps you track your portfolio, plan for the future, and earn steady returns. Visit our 'About Us' section to learn more.",
  },
  {
    question: "How do I start earning 24% yearly returns?",
    answer:
      "Getting started is easy. Create an account, deposit your funds, and your investment will begin growing with a 24% yearly return. For more details, click on 'How To Invest' in the header section.",
  },
  {
    question: "Is my investment safe?",
    answer:
      "Yes, we prioritize your security. Nexus Future Fund takes all necessary precautions to protect your funds, and we offer a guaranteed 24% yearly return to give you peace of mind.",
  },
  {
    question: "Can I withdraw my money whenever I want?",
    answer:
      "Absolutely! You have full control over your funds. You can withdraw your investment anytime, without any penalties or delays.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "We're excited to announce that our mobile app is officially launched! You'll be able to manage your investments, receive real-time updates, and access your account from anywhere. While you're on our website with your phone, simply tap 'Add to Home Screen' in your browser and this will automatically install the app on your device.",
  },
  {
    question: "I prefer to trade on my own. Can I get the trading signals?",
    answer:
      "Yes, we offer a dedicated Discord server for trading signals. To access it, join our Telegram channel first. You can find the 'Nexus Future Trade Signals' link in the footer for more information.",
  },
  {
    question: "I have more questions or need help. How can I reach support?",
    answer:
      "You can message our support team through any of our social media channels. We're always happy to assist you with any questions or concerns.",
  },
];

export default function Home() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submissionError, setSubmissionError] = useState("");
  const timerRef = useRef(null);
  const headerHeight = 80;

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

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentFeedbackIndex(
          (prevIndex) => (prevIndex + 1) % feedbackData.length,
        );
      }, 5000);
    };

    startTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentFeedbackIndex(
        (prevIndex) => (prevIndex + 1) % feedbackData.length,
      );
    }, 5000);
  };

  const nextFeedbackSlide = () => {
    setCurrentFeedbackIndex(
      (prevIndex) => (prevIndex + 1) % feedbackData.length,
    );
    resetTimer();
  };

  const prevFeedbackSlide = () => {
    setCurrentFeedbackIndex(
      (prevIndex) =>
        (prevIndex - 1 + feedbackData.length) % feedbackData.length,
    );
    resetTimer();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setSubmitStatus("error");
      setSubmissionError("Invalid email format!");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        if (response.status === 409) {
          setSubmissionError("This email is already subscribed!");
        } else {
          setSubmissionError(data.error || "Something went wrong!");
        }
        setSubmitStatus("error");
      }
    } catch (error) {
      console.log(error);
      setSubmissionError("Network error. Please try again!");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
          <nav className="hidden lg:flex space-x-6">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Home</b>
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Features</b>
            </ScrollLink>
            <ScrollLink
              to="scams"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Awareness</b>
            </ScrollLink>
            <ScrollLink
              to="workflow"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Workflow</b>
            </ScrollLink>
            <ScrollLink
              to="benefits"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Benefits</b>
            </ScrollLink>
            <ScrollLink
              to="feedback"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Feedback</b>
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>FAQ</b>
            </ScrollLink>
            <ScrollLink
              to="blogs"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Blogs</b>
            </ScrollLink>
            <ScrollLink
              to="newsletter"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 hover:scale-110 transition-all cursor-pointer">
              <b>Newsletter</b>
            </ScrollLink>
          </nav>
          <div className="hidden lg:block">
            <Link href="/wallet/login" passHref>
              <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                Dashboard
              </button>
            </Link>
          </div>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <ScrollLink
                to="home"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Home
              </ScrollLink>
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Features
              </ScrollLink>
              <ScrollLink
                to="scams"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Awareness
              </ScrollLink>
              <ScrollLink
                to="workflow"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Workflow
              </ScrollLink>
              <ScrollLink
                to="benefits"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Benefits
              </ScrollLink>
              <ScrollLink
                to="feedback"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Feedback
              </ScrollLink>
              <ScrollLink
                to="faq"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                FAQ
              </ScrollLink>
              <ScrollLink
                to="blogs"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Blogs
              </ScrollLink>
              <ScrollLink
                to="newsletter"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm font-black border-b-2"
                onClick={closeMenu}>
                Newsletter
              </ScrollLink>
              <Link href="/wallet/login" passHref>
                <button className="px-2 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm">
                  Dashboard
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Home Section */}
        <Element name="home" className="relative">
          <section className="pt-36 lg:pt-24 bg-gray-900">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <motion.div
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-md inline-block px-3 py-1 rounded-full text-sm mb-4"
                  variants={fadeIn}>
                  Update: We have an installable app now!
                </motion.div>
                <motion.h1
                  className="text-2xl lg:text-3xl mb-4 font-black"
                  variants={fadeIn}>
                  Welcome to Nexus Future Fund -{" "}
                  <span className="text-pink-600">
                    Where Your Wealth Grows Safely and Steadily
                  </span>
                  !
                </motion.h1>
                <motion.p
                  className="text-gray-300 mb-6 text-justify"
                  variants={fadeIn}>
                  At Nexus Future Fund, we don&apos;t just promise growth - we
                  guarantee it. Imagine earning a steady{" "}
                  <b className="text-pink-500">24% return every year</b>,
                  without the usual risks that come with investing. It&apos;s
                  safe. It&apos;s smart. It&apos;s the future of
                  wealth-building.
                  <br />
                  Our top-tier team of market researchers and traders handpick
                  the best cryptocurrency investments, ensuring your money works
                  harder for you, while you relax. You&apos;re in the best
                  hands, and your financial future has never looked brighter.
                </motion.p>
                <motion.div className="flex space-x-4" variants={fadeIn}>
                  <Link href="/clients" passHref>
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                      Our Clients
                    </button>
                  </Link>
                  <Link href="/howtoinvest" passHref>
                    <button
                      className="px-4 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                      variant="outline">
                      How To Invest →
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex space-x-8 mt-8"
                  variants={staggerChildren}>
                  <motion.div
                    variants={fadeIn}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">2.5+</div>
                    <div>Years of Experience</div>
                  </motion.div>
                  <motion.div
                    variants={fadeIn}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">55+</div>
                    <div>Satisfied Customers</div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 pr-6 md:pr-12"
                variants={fadeIn}
                initial="initial"
                animate="animate">
                <div className="relative">
                  <Image
                    src={homeImage}
                    alt="Nexus Future Fund secure investment strategies for high returns and financial growth"
                    width={1280}
                    height={1280}
                    className="w-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Features Section */}
        <Element name="features" className="relative">
          <section className="pb-8 lg:pb-12 pt-8 lg:pt-16 bg-gray-800 lg:section-angle3">
            <div className="container mx-auto lg:px-36">
              <h2 className="text-3xl font-bold text-center mb-10">
                Why Should You Choose Us
              </h2>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                {[
                  {
                    icon: CheckCircle,
                    title: "Relaiability",
                    description:
                      "We understand it can be tought to find a safe and reliable platform in a world full of scams. That's why we prioritize <b class='text-pink-500'>transparency</b>, <b class='text-pink-500'>security</b>, and <b class='text-pink-500'>guaranteed returns</b> to ensure that your money is always in trusted hands.",
                  },
                  {
                    icon: Shield,
                    title: "Guaranteed safety",
                    description:
                      "We use secure process to protect your information and help prevent unauthorized use. We take pride by offering you a <b class='text-pink-500'>guaranteed 24% yearly</b> return of investment, supported by our expert market researchers.",
                  },
                  {
                    icon: Headphones,
                    title: "Friendly support",
                    description:
                      "Whether you're a new investor with questions or a current client looking for support, our team is <b class='text-pink-500'>available 24/7</b> to ensure you have the best possible experience. Don't hesitate to reach out - we're always happy to help!",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    variants={fadeIn}>
                    <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-xl">
                      <div className="w-16 h-16 bg-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p
                        className="text-gray-300 text-justify"
                        dangerouslySetInnerHTML={{
                          __html: feature.description,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Scams Section */}
        <Element name="scams" className="relative">
          <section className="py-16 lg:pt-8 pb-8 lg:pb-4 bg-gray-900 lg:section-angle4">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 lg:pl-8 hidden lg:block"
                variants={fadeIn}
                initial="initial"
                animate="animate">
                <div className="relative">
                  <Image
                    src={benefitsImage}
                    alt="Nexus Future Fund secure investment strategies for high returns and financial growth"
                    width={1280}
                    height={1280}
                    className="w-full"
                  />
                </div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2
                    className="text-2xl font-bold mb-6"
                    variants={fadeIn}>
                    Beware of Investment Scams
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-6 text-justify"
                    variants={fadeIn}>
                    Scammers often set up professional-looking websites, use
                    complex jargon, and claim to have expert knowledge in
                    specific markets, like cryptocurrency or forex trading.
                    Here&apos;s how to identify:
                  </motion.p>
                  <motion.ul className="space-y-4" variants={staggerChildren}>
                    {[
                      "<i>Get rich quick</i>&nbsp; schemes",
                      "Unrealistic returns in a short period",
                      "No-risk, high-reward investments",
                      "Pressure to Invest Quickly",
                      "Lack of Transparency",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        variants={fadeIn}>
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
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.p
                    className="text-gray-300 mt-6 text-justify"
                    variants={fadeIn}>
                    Before investing, always check the company&apos;s
                    background, reviews, and credentials. No legitimate
                    investment can offer{" "}
                    <b className="text-pink-500">100% guaranteed</b> high
                    returns without some level of{" "}
                    <b className="text-pink-500">risk</b>.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Workflow Section */}
        <Element name="workflow">
          <section className="py-8 lg:py-4 bg-gray-800 rounded-3xl">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2
                    className="text-2xl font-bold mb-6"
                    variants={fadeIn}>
                    Here&apos;s how we work our magic behind the scenes
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 text-justify"
                    variants={fadeIn}>
                    <b className="text-white">Top-Tier Research:</b> Our expert
                    team monitors the crypto market 24/7, identifying
                    high-potential assets before they boom. Using advanced tools
                    and insights, we target investments with strong growth
                    potential.
                    <br />
                    <b className="text-white">Strategic Investments:</b> We act
                    quickly and strategically, placing your money where it will
                    grow the fastest, balancing both returns and safety.
                    <br />
                    <br />
                    <br />
                    <b className="text-pink-500">Why Cryptocurrency?</b>
                    <br />
                    Crypto is the future, and the future is now. With Nexus
                    Future Fund, you&apos;re not just investing in a trend -
                    you&apos;re securing your piece of a financial revolution.
                    The crypto market is growing fast, and we&apos;re here to
                    help you capitalize on it, without the fear of risks.
                  </motion.p>
                </div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 lg:pl-8 hidden lg:block"
                variants={fadeIn}
                initial="initial"
                animate="animate">
                <div className="relative">
                  <Image
                    src={investmentsImage}
                    alt="Nexus Future Fund secure investment strategies for high returns and financial growth"
                    width={1280}
                    height={1280}
                    className="w-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Benefits Section */}
        <Element name="benefits" className="relative">
          <section className="py-8 lg:py-4 bg-gray-900">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 lg:pl-8 hidden lg:block"
                variants={fadeIn}
                initial="initial"
                animate="animate">
                <div className="relative">
                  <Image
                    src={benefitsImage}
                    alt="Nexus Future Fund secure investment strategies for high returns and financial growth"
                    width={1280}
                    height={1280}
                    className="w-full"
                  />
                </div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2
                    className="text-2xl font-bold mb-6"
                    variants={fadeIn}>
                    Boost Your Wealth with Nexus Future Fund
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-6 text-justify"
                    variants={fadeIn}>
                    Choosing the right investment strategy can make all the
                    difference in reaching your financial goals. At Nexus Future
                    Fund, we offer a safe, reliable platform where you can grow
                    your savings with confidence. Our investment approach is
                    tailored to match your goals, timeline, and risk preferences
                    - all while ensuring your funds are secure.
                  </motion.p>
                  <motion.ul className="space-y-4" variants={staggerChildren}>
                    {[
                      "Guaranteed 24% Yearly Returns",
                      "Risk-Free Cryptocurrency Investing",
                      "24/7 Support Backed by Top Industry Experts",
                      "Simple & Hassle-Free Experience",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        variants={fadeIn}>
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
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div className="flex space-x-4 mt-6" variants={fadeIn}>
                    <Link href="/trades" passHref>
                      <button
                        className="px-4 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                        variant="outline">
                        Our Performance
                      </button>
                    </Link>
                    <Link href="/about" passHref>
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                        About Us
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Feedback Section */}
        <Element name="feedback" className="relative">
          <section className="py-6 lg:py-12 lg:px-36 bg-gray-800 rounded-3xl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">
                What Our Clients Say
              </h2>
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `${-currentFeedbackIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                  {feedbackData.map((feedback, index) => (
                    <motion.div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}>
                      <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-xl">
                        <div className="flex items-center mb-4">
                          <Image
                            src={feedback.img ? feedback.img : placeholderImage}
                            alt={feedback.name}
                            width={120}
                            height={120}
                            className="w-12 h-12 rounded-full mr-4 border-2 border-pink-500"
                          />
                          <div>
                            <h3 className="font-semibold">{feedback.name}</h3>
                            <p className="text-sm text-gray-400">
                              {feedback.role}
                            </p>
                          </div>
                        </div>
                        <p className="mb-4 text-justify">{feedback.comment}</p>
                        <div className="flex">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={prevFeedbackSlide}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Previous testimonial">
                  Previous
                </button>
                <button
                  onClick={nextFeedbackSlide}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Next testimonial">
                  Next
                </button>
              </div>
            </div>
          </section>
        </Element>

        {/* FAQ Section */}
        <Element name="faq" className="relative">
          <section className="py-8 lg:py-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">
                Frequently Asked Questions
              </h2>
              <motion.div
                className="max-w-3xl mx-auto"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4">
                  {faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <h3>{item.question}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="text-justify">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Blogs Section */}
        <Element name="blogs" className="relative">
          <section className="pb-8 lg:pb-12 pt-8 lg:pt-24 bg-gray-800 lg:section-wavy-combined2">
            <div className="container mx-auto lg:px-24">
              <h2 className="text-3xl font-bold text-center mb-10">
                Latest Blogs
              </h2>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                {blogs.slice(0, 3).map((blog, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    variants={fadeIn}>
                    <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-xl h-full flex flex-col justify-between">
                      <Image
                        src={blog.img}
                        alt={blog.title}
                        width={500}
                        height={300}
                        className="w-full h-36 object-cover rounded-lg"
                      />
                      <div className="pt-4 flex flex-col justify-between flex-grow">
                        <h3 className="text-lg font-semibold mb-2 text-white">
                          {blog.title}
                        </h3>
                        <div className="flex-grow">
                          <p className="text-gray-300">{blog.description}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-400 text-sm">
                            Published on:{" "}
                            {new Date(blog.date).toLocaleDateString()}
                          </p>
                          <a
                            href={blog.url}
                            className="text-pink-500 mt-2 inline-block"
                            target="_blank"
                            rel="noopener noreferrer">
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="text-center mt-8">
                <Link href="/blogs">
                  <div className="text-pink-500 font-semibold hover:underline">
                    See All Blogs
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </Element>

        {/* Subscribe Section */}
        <Element name="newsletter" className="relative">
          <section className="py-16 lg:py-24 px-8 lg:px-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 flex flex-col lg:flex-row items-center justify-between"
                variants={fadeIn}
                initial="initial"
                animate="animate">
                <div className="mb-4 lg:mb-0 lg:mr-8">
                  <h2 className="text-2xl font-bold mb-2">
                    Get the latest information from Us
                  </h2>
                </div>
                <div className="w-full lg:w-auto">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="rounded-r-none rounded-l-lg pl-2 focus:outline-none bg-gray-700 text-white placeholder-gray-400 border-gray-600 w-full lg:w-64 focus:ring-opacity-0"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-pink-600 text-white rounded-tr-md rounded-br-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    {submitStatus === "success" && (
                      <motion.p
                        className="text-green-500 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}>
                        <CheckCircle className="mr-2" /> Successfully submitted!
                      </motion.p>
                    )}
                    {submitStatus === "error" && (
                      <motion.p
                        className="text-red-500 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}>
                        <XCircle className="mr-2" />
                        {submissionError
                          ? submissionError
                          : "Something went wrong. Please try again later."}
                      </motion.p>
                    )}
                  </form>
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
            <ChevronUp size={30} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
