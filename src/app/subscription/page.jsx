"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home.png";
import benefitsImage from "../../assets/benefits.png";
import investmentsImage from "../../assets/investments.png";
import placeholderImage from "../../assets/userPlaceholder.jpg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/accordion";
import {
  DollarSign,
  Eye,
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
import blogs from "../data/blogs.js";

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
    name: "Sophia Williams",
    role: "Full-Time Trader",
    comment:
      "Nexus Future Trade Signals has completely changed how I trade. The real-time signals are incredibly accurate, and I've seen a consistent 10%+ growth in my capital every month. Their transparency is what sets them apart; I always know exactly what's happening with my trades.",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4E03AQHvlN_c_3tT2Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679663026342?e=1733961600&v=beta&t=UZsfSWvA2aKPWMXaUxD5VwCOFXpll0fCharkAb-zlEQ",
  },
  {
    name: "James Pascal",
    role: "Entrepreneur",
    comment:
      "I was skeptical at first, but after joining the premium group, I'm impressed. The team walks you through every trade, and the second entry strategy has saved me multiple times. Definitely the most reliable service I've used for Bitcoin futures.",
    rating: 4,
    img: "https://media.licdn.com/dms/image/v2/D4E03AQHUOaXSKpY1Ng/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724499115353?e=1733961600&v=beta&t=5VP-q3jgzYbXrGkF1YiGybxBpy7Y8_VhogPkSdM5l-8",
  },
  {
    name: "Liam T.",
    role: "Software Engineer",
    comment:
      "The 70% accuracy rate is no joke. I joined for the transparency, stayed for the results. The daily signals have become part of my routine, and I've already made back the subscription fee within the first week. Can't recommend it enough!",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4D03AQFaR7ScpR7CnA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702585617004?e=1733961600&v=beta&t=Qtg7h2jFTZPgUpbMX2QenJf5mBptHYK4pGohXFPhWUY",
  },
  {
    name: "Daniel Raffalo",
    role: "Small Business Owner",
    comment:
      "I've been burned by a lot of platforms before, but this one is the real deal. The refund guarantee gives me peace of mind, and the trading strategies actually work. The fact that they document all their trades publicly really helps build trust.",
    rating: 4,
    img: "https://media.licdn.com/dms/image/v2/D5603AQFQT1CouRj9gg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1676912920297?e=1733961600&v=beta&t=Ibc4W4nnha5q1_LEcwGoQ2ZcqpYjLsA1kZTPM-0zRAw",
  },
  {
    name: "Aisha",
    role: "Freelancer",
    comment:
      "What I love most is how transparent Nexus Future Trade Signals is. I can see every trade in real time, and the Excel sheet showing all the trades really builds trust. My portfolio has grown steadily, and the 24/7 support is a huge plus!",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/C4E03AQEqdL1hNelu8A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1621878420085?e=1733961600&v=beta&t=bcX21wxVKzebQVc4xEd1CoOI2Iddc5NBFnNDO03QEvU",
  },
  {
    name: "Olivia Morison",
    role: "Part-Time Trader",
    comment:
      "Joining Nexus was the best decision I've made for my financial future. The real-time signals are so accurate, and I've had incredible returns. The best part? They're always there to help whenever I have questions, no matter what time it is.",
    rating: 5,
    img: "https://media.licdn.com/dms/image/v2/D4E03AQG-mLFE_y7p5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724335569133?e=1733961600&v=beta&t=gAq2m-aw2aAjiDSJcvT_PIIqCpkCwdeYFi-2IaHt3y8",
  },
];

const offerDetails = [
  "Once you subscribe you'll get immediate access to our real-time trade signals and our premium Discord group to follow trades live.",
  "Want proof of our success? See the results of our trades in action with <b class='text-pink-500'>live trading recordings</b> available on YouTube. Nothing is hidden.",
  "Our goal is simple. To help you achieve a <b class='text-pink-500'>10%+ return</b> on your capital each month.",
];

const faq = [
  {
    question: "What is Nexus Future Trade Signals?",
    answer:
      "Nexus Future Trade Signals is a subscription-based service that provides real-time Bitcoin trading signals with a 70% accuracy rate. Our expert traders help you grow your capital securely with transparent and professional strategies. Learn more on our 'About Us' page.",
  },
  {
    question: "How do I start earning with Nexus Future Trade Signals?",
    answer:
      "To start, simply subscribe to our premium service. Once subscribed, you'll receive real-time trade signals, access to our live Discord channel, and step-by-step guidance from our professional traders. Head over to the 'How to Subscribe' section to get started.",
  },
  {
    question: "Can I see the results of previous trades?",
    answer:
      "Absolutely! We pride ourselves on transparency. You can view all of our trades, including entry points, stop loss, and take profit levels, in a public Excel sheet shared across our social media platforms. We also post 30-day live trading recordings on our YouTube channel.",
  },
  {
    question: "Do I need experience to join Nexus Future Trade Signals?",
    answer:
      "No experience is required. Our service is designed for both beginners and seasoned traders. Our expert traders provide all the necessary signals, updates, and support to help you trade confidently, regardless of your experience level.",
  },
  {
    question: "How much gain can I expect?",
    answer:
      "Our monthly target is a 10%+ gain on your capital, with a historical success rate of over 70%. We use deep market research and strategic trade decisions to help you achieve steady and reliable growth.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We stand behind our performance. If we ever close a month with a negative ROI, we'll refund your subscription fee. This has never happened, but our refund policy ensures your peace of mind.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our dedicated support team 24/7 through our premium Discord group or any of our social media channels. We're here to assist you with any questions or concerns you may have.",
  },
  {
    question: "Is there a discount available for new subscribers?",
    answer:
      "Yes! For a limited time, we're offering a discounted subscription price of $100/month, down from the regular $500. This gives you full access to our real-time trade signals and premium group.",
  },
];

export default function Subscription() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitionError, setSubmitionError] = useState("");
  const headerHeight = 80;

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeedbackIndex(
        (prevIndex) => (prevIndex + 1) % feedbackData.length,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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

  const nextFeedbackSlide = () => {
    setCurrentFeedbackIndex(
      (prevIndex) => (prevIndex + 1) % feedbackData.length,
    );
  };

  const prevFeedbackSlide = () => {
    setCurrentFeedbackIndex(
      (prevIndex) =>
        (prevIndex - 1 + feedbackData.length) % feedbackData.length,
    );
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
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://sadman30102001.pythonanywhere.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      console.log("hi");

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitionError(data.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitionError("");
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
              className="hover:text-pink-600 cursor-pointer">
              <b>Home</b>
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Features</b>
            </ScrollLink>
            <ScrollLink
              to="scams"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Awareness</b>
            </ScrollLink>
            <ScrollLink
              to="benefits"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Benefits</b>
            </ScrollLink>
            <ScrollLink
              to="workflow"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Workflow</b>
            </ScrollLink>
            <ScrollLink
              to="feedback"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Feedback</b>
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>FAQ</b>
            </ScrollLink>
            <ScrollLink
              to="blogs"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Blogs</b>
            </ScrollLink>
            <ScrollLink
              to="newsletter"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className="hover:text-pink-600 cursor-pointer">
              <b>Newsletter</b>
            </ScrollLink>
          </nav>
          <div className="hidden lg:block">
            <Link href="https://t.me/nexusfuturefund" passHref>
              <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                Join Us
              </Button>
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
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Home
              </ScrollLink>
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Features
              </ScrollLink>
              <ScrollLink
                to="scams"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Awareness
              </ScrollLink>
              <ScrollLink
                to="benefits"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Benefits
              </ScrollLink>
              <ScrollLink
                to="workflow"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Workflow
              </ScrollLink>
              <ScrollLink
                to="feedback"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Feedback
              </ScrollLink>
              <ScrollLink
                to="faq"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                FAQ
              </ScrollLink>
              <ScrollLink
                to="blogs"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Blogs
              </ScrollLink>
              <ScrollLink
                to="newsletter"
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-sm border-b-2"
                onClick={closeMenu}>
                Newsletter
              </ScrollLink>
              <Link href="https://t.me/nexusfuturefund" passHref>
                <Button className="px-2 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm">
                  Join Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Home Section */}
        <Element name="home">
          <section className="pt-36 lg:pt-24 pb-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <motion.h1
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  variants={fadeIn}>
                  Welcome to Nexus Future Trade Signals -{" "}
                  <span className="text-pink-600">
                    Your Trusted Partner for Bitcoin Trading Success
                  </span>
                  .
                </motion.h1>
                <motion.p
                  className="text-gray-300 mb-6 text-justify"
                  variants={fadeIn}>
                  Looking to maximize your Bitcoin profits while following
                  expert trade signals from{" "}
                  <b className="text-pink-500">trusted professionals</b>?<br />
                  You&apos;re in the right place!
                  <br /> At Nexus Future Trade Signals, we offer a powerful
                  subscription service designed to help you grow your capital
                  safely with our professional traders, who specialize in the
                  Bitcoin market. Our{" "}
                  <b className="text-pink-500">70% accuracy rate</b> means you
                  get the best chance at profitable trades, while our
                  transparency ensures that what you see is what you get.
                </motion.p>
                <motion.div className="flex space-x-4" variants={fadeIn}>
                  <Link href="/about" passHref>
                    <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                      About Us
                    </Button>
                  </Link>
                  <Link href="/howtosubscribe" passHref>
                    <Button
                      className="px-4 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                      variant="outline">
                      How To Subscribe →
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex space-x-8 mt-8"
                  variants={staggerChildren}>
                  <motion.div
                    variants={fadeIn}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">2+</div>
                    <div>Years of Experience</div>
                  </motion.div>
                  <motion.div
                    variants={fadeIn}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">200+</div>
                    <div>Satisfied Customers</div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 lg:pl-8"
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
        <Element name="features">
          <section className="py-8 lg:py-16 bg-gray-800">
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
                    icon: Eye,
                    title: "Transparency",
                    description:
                      "We provide <b class='text-pink-500'>real-time access</b> to all our trade information, including entry points, stop loss, profit, and results published in a <b class='text-pink-500'>Excel sheet</b> linked in the footer section under 'Special Link'.",
                  },
                  {
                    icon: DollarSign,
                    title: "Refund Guarantee",
                    description:
                      "It is highly unlikely that we close a month with a negative Return Of Investment. But if we do, then we'll refund your <b class='text-pink-500'>full subscription fee</b>. That's how confident we are in our performance.",
                  },
                  {
                    icon: Headphones,
                    title: "Friendly support",
                    description:
                      "Our premium group comes with <b class='text-pink-500'>round-the-clock support</b>, which is for guiding you through each trade on our <b class='text-pink-500'>Discord channel </b> live. Don't hesitate to reach out - we're always happy to help!",
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
        <Element name="scams">
          <section className="py-8 lg:py-4">
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
                    Beware of Scamers: Stay Safe, Stay Smart
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-6 text-justify"
                    variants={fadeIn}>
                    In today&apos;s world, there are countless scam platforms
                    claiming to offer high returns with no risk. These scammers
                    promise huge profits but end up stealing your money. Be
                    cautious of any platform that:
                  </motion.p>
                  <motion.ul className="space-y-4" variants={staggerChildren}>
                    {[
                      "Promises unrealistically high returns without risk",
                      "Manipulates trade details/results",
                      "Pressures you to invest quickly without clear information",
                      "Has Lack of Transparency",
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
                  <motion.p
                    className="text-gray-300 mt-6 text-justify"
                    variants={fadeIn}>
                    At Nexus Future Trade Signals, we pride ourselves on being{" "}
                    <b className="text-pink-500">transparent</b> and{" "}
                    <b className="text-pink-500">trustworthy</b>. We don&apos;t
                    make false promises or hide anything from you. Every trade,
                    every result is visible to you, ensuring that you can trust
                    your investment with us.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Benefits Section */}
        <Element name="benefits">
          <section className="py-8 lg:py-4 bg-gray-800">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
              <motion.div
                className="lg:w-1/2 mb-8 lg:mb-0 lg:px-16"
                variants={staggerChildren}
                initial="initial"
                animate="animate">
                <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2 className="text-2xl font-bold" variants={fadeIn}>
                    What We Offer
                  </motion.h2>
                  <motion.div className="space-y-4" variants={staggerChildren}>
                    {[
                      "Premium Discord support",
                      "Live Trading Recordings",
                      "Monthly Target",
                    ].map((item, index) => (
                      <motion.ul variants={fadeIn} key={index}>
                        <li className="flex items-center mt-8">
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
                          <span className="text-white">
                            <b>{item}</b>
                          </span>
                        </li>
                        <div
                          className="pl-8 text-gray-300 text-justify"
                          dangerouslySetInnerHTML={{
                            __html: offerDetails[index],
                          }}
                        />
                      </motion.ul>
                    ))}
                  </motion.div>
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

        {/* Workflow Section */}
        <Element name="workflow">
          <section className="py-8 lg:py-4">
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
                <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2
                    className="text-2xl font-bold mb-6"
                    variants={fadeIn}>
                    How It Works
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 text-justify"
                    variants={fadeIn}>
                    Our team of professional Bitcoin traders sends real-time
                    trade signals that include:
                    <br />
                    <b className="text-pink-500">Entry Points:</b>{" "}
                    <span className="text-white">
                      Where and when to buy Bitcoin.
                    </span>
                    <br />
                    <b className="text-pink-500">Equity Usage:</b>{" "}
                    <span className="text-white">
                      How much of your capital to invest in each trade.
                    </span>
                    <br />
                    <b className="text-pink-500">Second Entry:</b>{" "}
                    <span className="text-white">
                      Opportunities to optimize your trade positions.
                    </span>
                    <br />
                    <b className="text-pink-500">
                      Stop Loss & Take Profit:
                    </b>{" "}
                    <span className="text-white">
                      Clear levels for managing your risk and maximizing gains.
                    </span>
                  </motion.p>
                  <motion.p
                    className="mt-6 text-gray-300 text-justify"
                    variants={fadeIn}>
                    Don&apos;t miss out on this opportunity to trade alongside
                    the world&apos;s best Bitcoin traders. Every trade is backed
                    by deep research, ensuring you can trade like a pro.
                    <br />
                    Join with our limited{" "}
                    <b className="text-pink-500">$100/month offer</b>, full
                    transparency, and a refund guarantee if we close a month
                    negatively (which has never happened!)
                  </motion.p>
                  <motion.div className="flex space-x-4 mt-3" variants={fadeIn}>
                    <Link href="https://t.me/nexusfuturefund" passHref>
                      <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                        Join
                      </Button>
                    </Link>
                    <Link href="/howtosubscribe" passHref>
                      <Button
                        className="px-4 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                        variant="outline">
                        Learn More →
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        {/* Feedback Section */}
        <Element name="feedback">
          <section className="py-8 lg:py-16 lg:px-36 bg-gray-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">
                What Our Subscribers Say
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
                <Button
                  onClick={prevFeedbackSlide}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Previous testimonial">
                  Previous
                </Button>
                <Button
                  onClick={nextFeedbackSlide}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Next testimonial">
                  Next
                </Button>
              </div>
            </div>
          </section>
        </Element>

        {/* FAQ Section */}
        <Element name="faq">
          <section className="py-8 lg:py-16">
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
        <Element name="blogs">
          <section className="py-8 lg:py-16 bg-gray-800">
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
        <Element name="newsletter">
          <section className="py-8 px-8 lg:px-16 lg:py-16 bg-gray-900">
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
                      <Input
                        type="email"
                        placeholder="Your email address"
                        className="rounded-r-none bg-gray-700 text-white placeholder-gray-400 border-gray-600 w-full lg:w-64 focus:ring-opacity-0"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <Button
                        type="submit"
                        className="px-4 py-2 bg-pink-600 text-white rounded-tr-md rounded-br-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
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
                        {submitionError
                          ? submitionError
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
                  href="https://www.facebook.com/nexusfundfuture"
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
                  href="https://www.youtube.com/@NexusFutureFund"
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
                  href="https://www.linkedin.com/company/nexus-future-fund"
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
                links: ["Nexus Future Fund", "About", "Terms & Conditions"],
                href: ["/", "/about", "/terms"],
              },
              {
                title: "Special Link",
                links: ["See Our Results"],
                href: [
                  "https://docs.google.com/spreadsheets/d/1BAKN4CWq4dlS9xsxRF4xwNFSKMqU-bKG/edit?usp=sharing&rtpof=true&sd=true",
                ],
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
            <p>Copyright © 2024 Nexus Future Fund. All Right Reserved.</p>
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
