"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    question: "What is algo trading?",
    answer:
      "Algo trading uses automated systems to execute trades based on pre-defined strategies, removing human emotions and enhancing efficiency.",
  },
  {
    question: "How do I start using House of Algo's?",
    answer:
      "Simply sign up, install MT4, and connect to our strategies. Our system will handle the trades automatically.",
  },
  {
    question: "Do I need trading experience?",
    answer: "No, our automated strategies are designed for both beginners and experienced traders.",
  },
  {
    question: "What is the minimum investment required?",
    answer:
      "YOU can invest a minimum of $100 in your trading account. If you want to invest more, it will be in multiples of $1000 (e.g., $2000, $4000, $6000, $8000, $10000).",
  },
  {
    question: "What are the expected returns and risks?",
    answer:
      "Returns are 2% to 5% monthly (after deducting the company's share of 30%). The highest drawdown so far has been 30%.",
  },
  {
    question: "Is there a locking period?",
    answer:
      "There is no locking period like in bank FDs or mutual funds. You can stop copy trading anytime and withdraw your funds immediately.",
  },
  {
    question: "What is the account opening procedure?",
    answer:
      "A link will be sent to you. By clicking it, you must fill in all the details (Aadhar Card, Driving License, Bank Statement, Email ID, Mobile Number). The account will be opened in 24 hours with support from our team through Anydesk.",
  },
  {
    question: "Can I earn extra rewards?",
    answer:
      "Yes! You can earn extra rewards by referring people. This is NOT MLM. You'll receive 50% of the company's profit from referred accounts.",
  },
  {
    question: "What is the highest drawdown experienced?",
    answer:
      "Based on backtesting, the highest drawdown has reached 53% under extreme conditions like market crashes or trade wars.",
  },
  {
    question: "What if there's a server problem?",
    answer:
      "Occasionally, VPS server issues may arise. However, our team is equipped to handle trades manually when needed.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="backdrop-blur-md rounded-md border border-purple-700 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(65, 12, 90, 0.4), rgba(154, 28, 94, 0.4))" }}
          data-aos="fade-up"
          data-aos-delay={index * 50}
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
            onClick={() => toggleFaq(index)}
          >
            <span className="font-medium text-amber-400">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-amber-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <div className={`px-4 pb-4 ${openIndex === index ? "block" : "hidden"}`}>
            <p className="text-white">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

