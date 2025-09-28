"use client";

import { StructuredData } from "./structured-data";

const faqData = {
  questions: [
    {
      question: "What is Menteeno?",
      answer:
        "Menteeno is a professional skill development platform that provides personalized mentorship, real-world training, and expert guidance to help professionals grow their careers and enhance their soft skills.",
    },
    {
      question: "How does Menteeno's mentorship program work?",
      answer:
        "Our mentorship program connects you with experienced professionals who provide personalized guidance through three private mentorship sessions, helping you develop specific skills and advance your career.",
    },
    {
      question: "What types of skills can I develop on Menteeno?",
      answer:
        "Menteeno focuses on soft skills development including leadership, teamwork, communication, networking, problem-solving, and other essential workplace competencies that drive professional success.",
    },
    {
      question: "Is Menteeno suitable for beginners?",
      answer:
        "Yes, Menteeno is designed for professionals at all levels, from beginners to advanced practitioners. Our personalized learning paths adapt to your current skill level and career goals.",
    },
    {
      question: "How long does the program take to complete?",
      answer:
        "The program duration varies based on your personalized learning path and goals. Most participants see significant improvement within 3-6 months of consistent engagement with the platform.",
    },
    {
      question: "What makes Menteeno different from other learning platforms?",
      answer:
        "Menteeno combines personalized mentorship with real-world practice, expert feedback, and a supportive community. We focus on practical application rather than just theoretical knowledge.",
    },
    {
      question: "Can I practice skills in a safe environment?",
      answer:
        "Absolutely! Menteeno provides a simulated environment where you can practice teamwork, leadership, and networking skills without real-world consequences, allowing you to learn from mistakes safely.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Our platform includes tailored evaluations and progress tracking tools that measure your skill development over time, providing clear insights into your growth and areas for improvement.",
    },
  ],
};

export function FAQStructuredData() {
  return <StructuredData type="faq" data={faqData} />;
}
