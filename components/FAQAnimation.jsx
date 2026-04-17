"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHelpCircle, FiMessageSquare, FiShield, FiUserPlus } from "react-icons/fi";

const faqItems = [
  {
    q: "What is ConnectYou?",
    a: "ConnectYou is a modern messaging platform for real-time communication, file sharing, and connection building.",
  },
  {
    q: "How do I sign up?",
    a: "Click Sign Up, add your details, and complete account creation in under a minute.",
  },
  {
    q: "Is ConnectYou free to use?",
    a: "Yes. Core messaging and profile features are available for free.",
  },
  {
    q: "How can I connect with others?",
    a: "Use user search, send connection requests, and start chatting once accepted.",
  },
  {
    q: "Can I customize my profile?",
    a: "Yes, you can update profile photo, display name, and account appearance preferences.",
  },
  {
    q: "How do I report inappropriate content?",
    a: "Use the report flow in-app or contact support with details for quick moderation.",
  },
  {
    q: "Does ConnectYou support media sharing?",
    a: "Yes. You can share images, attachments, links, and additional content types in chat.",
  },
  {
    q: "Is my data secure?",
    a: "ConnectYou uses secure authentication and controlled access flows to protect account data.",
  },
];

const quickHelp = [
  { icon: FiUserPlus, title: "Account setup", text: "Sign up and profile configuration help." },
  { icon: FiMessageSquare, title: "Messaging tips", text: "Faster chat workflow and content sharing." },
  { icon: FiShield, title: "Safety guidance", text: "Privacy controls and secure account practices." },
];

const FAQAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`w-11/12 max-w-7xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
      <div className="text-center mb-12 md:mb-16">
        <p className="text-c3 uppercase tracking-[0.2em] text-xs mb-2">Help center</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-c3 mt-4 max-w-2xl mx-auto">
          Everything you need to get started, customize your profile, and use ConnectYou with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <aside className="rounded-3xl border border-c5 bg-c2/70 backdrop-blur-sm p-6 lg:col-span-1 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Need quick help?</h2>
          <div className="space-y-4">
            {quickHelp.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-c5 bg-c1/70 p-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-c1 flex items-center justify-center mb-3">
                    <Icon />
                  </div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-c3 text-sm mt-1">{item.text}</p>
                </div>
              );
            })}
          </div>

          <Link
            href="/register"
            className="mt-6 inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black font-semibold hover:scale-[1.02] transition duration-300"
          >
            Create account
          </Link>
        </aside>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {faqItems.map((item) => (
            <article
              key={item.q}
              className="rounded-2xl bg-gradient-to-br from-cyan-300/40 via-sky-500/30 to-emerald-400/40 p-[1px]"
            >
              <div className="h-full w-full bg-c2/90 border border-c5 rounded-2xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <FiHelpCircle className="text-cyan-300 mt-1 shrink-0" />
                  <h3 className="font-semibold text-white">{item.q}</h3>
                </div>
                <p className="text-c3 text-sm leading-6">{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAnimation;
