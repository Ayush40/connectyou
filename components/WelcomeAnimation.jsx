"use client";
import imgDesktop from "@/public/desktopViewImg.png";
import imgMobile from "@/public/mobileViewImg.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaMicrosoft, FaSlack } from "react-icons/fa";
import { FiArrowRight, FiShield, FiZap } from "react-icons/fi";

const WelcomeAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-c1 via-c2 to-c1 flex items-center justify-center mt-16 relative overflow-hidden py-6">
      <div className="absolute -left-20 top-16 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full" />
      <div className="absolute right-[-100px] top-24 w-80 h-80 bg-cyan-300/15 blur-3xl rounded-full" />
      <div className="absolute -right-12 bottom-0 w-96 h-96 bg-emerald-400/15 blur-3xl rounded-full" />

      <div className={`w-full transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="w-[96%] md:w-[95%] 2xl:w-[90%] mx-auto rounded-3xl border border-c5/80 bg-c1/65 backdrop-blur-md p-6 md:p-8 lg:px-12 xl:px-14 shadow-2xl shadow-black/40 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div>
            <p className="text-c3 uppercase tracking-[0.25em] text-xs md:text-sm mb-5">Connect smarter</p>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight max-w-4xl">
            Enterprise-Grade Conversations
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              Crafted for Teams That Value Clarity and Speed
            </span>
            </h1>

            <p className="text-c3 text-base md:text-lg mt-5 max-w-3xl leading-relaxed">
            ConnectYou helps you chat, share, and collaborate in one clean and secure workspace. Fast onboarding,
            smooth interactions, and a modern UI that feels premium on every screen.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm">
                <FiZap className="text-cyan-300" />
                Fast and responsive
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm">
                <FiShield className="text-emerald-300" />
                Secure by design
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href="/register"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black font-semibold flex items-center gap-2 hover:scale-105 transition duration-300"
              >
                Start Free
                <FiArrowRight />
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-full border border-c5 bg-c2/70 text-white font-semibold hover:bg-c5/80 transition duration-300"
              >
                Log In
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 rounded-full border border-c5 bg-c2/70 text-white font-semibold hover:bg-c5/80 transition duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-7 pt-5 border-t border-c5/80 flex flex-wrap items-center gap-3 md:gap-4 text-c3">
              <span className="text-sm uppercase tracking-[0.2em]">Works great with</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm"><FaGoogle /> Google</div>
              <div className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm"><FaMicrosoft /> Microsoft</div>
              <div className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm"><FaGithub /> GitHub</div>
              <div className="inline-flex items-center gap-2 rounded-full border border-c5 bg-c2/70 px-4 py-2 text-sm"><FaSlack /> Slack</div>
            </div>
          </div>

          <div className="relative min-h-[430px] hidden lg:block">
            <div className="absolute right-0 top-10 w-[66%] rounded-2xl border border-c5/80 bg-c2/70 p-2 shadow-xl shadow-black/40 [transform:perspective(1200px)_rotateY(-12deg)_rotateX(5deg)] origin-bottom-right">
              <Image
                src={imgDesktop}
                alt="ConnectYou desktop chat preview"
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
            <div className="absolute left-1 bottom-8 w-[30%] rounded-2xl border border-c5/80 bg-c2/80 p-2 shadow-2xl shadow-black/50 [transform:perspective(1000px)_rotateY(12deg)_rotateX(4deg)] origin-bottom-left">
              <Image
                src={imgMobile}
                alt="ConnectYou mobile chat preview"
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeAnimation;
