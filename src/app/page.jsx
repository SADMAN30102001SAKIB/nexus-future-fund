'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import pic1 from "../assets/1.png"
import pic2 from "../assets/2.png"
import pic3 from "../assets/3.png"
import pic4 from "../assets/4.png"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { DollarSign, Shield, Headphones, ChevronUp, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link as ScrollLink, Element } from 'react-scroll'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollUp(true)
      } else {
        setShowScrollUp(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
              <DollarSign className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold">Nexus Future Fund</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <ScrollLink to="home" smooth={true} duration={500} className="text-gray-300 hover:text-white cursor-pointer">Home</ScrollLink>
            <ScrollLink to="features" smooth={true} duration={500} className="text-gray-300 hover:text-white cursor-pointer">Features</ScrollLink>
            <ScrollLink to="benefits" smooth={true} duration={500} className="text-gray-300 hover:text-white cursor-pointer">Benefits</ScrollLink>
            <ScrollLink to="investments" smooth={true} duration={500} className="text-gray-300 hover:text-white cursor-pointer">Investments</ScrollLink>
            <ScrollLink to="subscribe" smooth={true} duration={500} className="text-gray-300 hover:text-white cursor-pointer">Subscribe</ScrollLink>
          </nav>
          <div className="hidden md:block">
            <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">Register</Button>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <ScrollLink to="home" smooth={true} duration={500} className="text-white text-2xl" onClick={closeMenu}>Home</ScrollLink>
              <ScrollLink to="features" smooth={true} duration={500} className="text-white text-2xl" onClick={closeMenu}>Features</ScrollLink>
              <ScrollLink to="benefits" smooth={true} duration={500} className="text-white text-2xl" onClick={closeMenu}>Benefits</ScrollLink>
              <ScrollLink to="investments" smooth={true} duration={500} className="text-white text-2xl" onClick={closeMenu}>Investments</ScrollLink>
              <ScrollLink to="subscribe" smooth={true} duration={500} className="text-white text-2xl" onClick={closeMenu}>Subscribe</ScrollLink>
              <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400" onClick={closeMenu}>Register</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Element name="home">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={staggerChildren} initial="initial" animate="animate">
                <motion.div
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-md inline-block px-3 py-1 rounded-full text-sm mb-4"
                  variants={fadeIn}
                >
                  Coming Soon: We will have a mobile app soon!
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" variants={fadeIn}>We&apos;re creating a better way to invest for the future!</motion.h1>
                <motion.p className="text-gray-300 mb-6" variants={fadeIn}>Intelligent management software to simplify future investment. All of your funds are taken into account for future.</motion.p>
                <motion.div className="flex space-x-4" variants={fadeIn}>
                  <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400" >Discover Now</Button>
                  <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400" variant="outline" >Learn more →</Button>
                </motion.div>
                <motion.div className="flex space-x-8 mt-8" variants={staggerChildren}>
                  <motion.div variants={fadeIn} className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">0</div>
                    <div className="text-gray-300">Years of Experience</div>
                  </motion.div>
                  <motion.div variants={fadeIn} className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
                    <div className="text-3xl font-bold text-pink-500">0</div>
                    <div className="text-gray-300">Satisfied Customers</div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="md:w-1/2 md:pl-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <Image src={pic3} alt="Investment illustration" width={1024} height={1024} className="w-full rounded-lg shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 to-purple-600 opacity-20 rounded-lg"></div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        <Element name="features">
          <section className="py-16 md:py-24 bg-gray-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">Why should you choose us</h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {[
                  { icon: DollarSign, title: "Trusted by many", description: "Free admin fees up to $100 paid up to 2 days in advance with initial direct deposit" },
                  { icon: Shield, title: "Guaranteed safety", description: "We use secure process security to protect your information and help prevent unauthorized use" },
                  { icon: Headphones, title: "Friendly support", description: "If you have any questions, send message to our member service team" }
                ].map((feature, index) => (
                  <motion.div key={index} className="text-center" variants={fadeIn}>
                    <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-xl">
                      <div className="w-16 h-16 bg-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </Element>

        <Element name="benefits">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={staggerChildren} initial="initial" animate="animate">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2 className="text-3xl font-bold mb-6" variants={fadeIn}>Increase your savings by investing in Nexus Future Fund with trusted security</motion.h2>
                  <motion.p className="text-gray-300 mb-6" variants={fadeIn}>It is very helpful for you to choose an investment strategy that reflects your goals, timeline, and risk tolerance with a trusted platform.</motion.p>
                  <motion.ul className="space-y-4" variants={staggerChildren}>
                    {[
                      "You can easily manage your finances",
                      "You easily see profits by investing for the future",
                      "Can easily send messages to our team",
                      "Different from other investment platforms"
                    ].map((item, index) => (
                      <motion.li key={index} className="flex items-center" variants={fadeIn}>
                        <svg className="w-6 h-6 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/2 md:pl-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <Image src={pic2} alt="Investment growth" width={1024} height={1024} className="w-full rounded-lg shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-20 rounded-lg"></div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        <Element name="investments">
          <section className="py-16 md:py-24 bg-gray-800">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={staggerChildren} initial="initial" animate="animate">
                <div className="bg-gray-700 bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl">
                  <motion.h2 className="text-3xl font-bold mb-6" variants={fadeIn}>Investments make your money growing fasted guaranteed best security</motion.h2>
                  <motion.p className="text-gray-300 mb-6" variants={fadeIn}>The benefit of investing is to provide additional income. Your income can come from more than one source and you may no longer depend on your living salary that you get every month. Finance increases in value slowly.</motion.p>
                  <motion.div className="flex space-x-4" variants={fadeIn}>
                    <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400" >Contact Now</Button>
                    <Button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400" variant="outline">Learn more →</Button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/2 md:pl-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <Image src={pic4} alt="Investment growth chart" width={1024} height={1024} className="w-full rounded-lg shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 to-purple-600 opacity-20 rounded-lg"></div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>

        <Element name="subscribe">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 flex flex-col md:flex-row items-center justify-between"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h2 className="text-2xl font-bold mb-2">Subscribe to get the latest information from Nexus Future Fund</h2>
                  <Image src={pic1} alt="Credit cards" width={256} height={256} className="w-24 rounded-2xl" />
                </div>
                <div className="w-full md:w-auto">
                  <div className="flex">
                    <Input type="email" placeholder="Your email address" className="rounded-r-none bg-gray-700 text-white placeholder-gray-400 border-gray-600" />
                    <Button className="px-4 py-2 bg-pink-600 text-white rounded-tr-md rounded-br-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">Subscribe</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </Element>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <DollarSign className="text-white" size={20} />
                </div>
                <span className="text-2xl font-bold">Nexus Future Fund</span>
              </div>
              <p className="text-gray-400 mb-4">Better way of investing with trusted security for your promising future</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" /></svg>
                </a>
              </div>
            </div>
            {[
              { title: "Information", links: ["Home", "About", "Pricing", "Service"] },
              { title: "Special Link", links: ["Start Investment", "Special offers", "Help center", "Testimonials"] },
              { title: "Get In Touch", links: ["investink@gmail.com", "021-2345-6789"] }
            ].map((column, index) => (
              <div key={index} className="w-full md:w-1/5 mb-8 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>Copyright © 2023 Nexus Future Fund. All Right Reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            className="fixed bottom-8 right-8 p-2 bg-pink-600 text-white rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
