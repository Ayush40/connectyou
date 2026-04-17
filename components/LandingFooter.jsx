import logo from "@/public/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUp, FiGithub, FiMail } from "react-icons/fi";
import { Link as SLink } from "react-scroll";

const LandingFooter = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-c1 via-c2 to-c1 text-white border-t border-c5/80">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex gap-2 text-3xl font-semibold items-center">
              <Image src={logo} alt="ConnectYouLogo" height={52} width={52} className="rounded-lg" />
              ConnectYou
            </div>
            <p className="text-c3 mt-4 leading-7 max-w-sm">
              A modern communication platform built to feel clean, fast, and professional across every screen.
            </p>
            <div className="mt-5">
              <SLink to="home" smooth={true} offset={-100}>
                <button className="px-4 py-2 rounded-full border border-c5 bg-c2/70 hover:bg-c5/80 transition duration-300 inline-flex items-center gap-2">
                  Back to top
                  <FiArrowUp />
                </button>
              </SLink>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-c3">Quick links</p>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition duration-300">Home</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-300 transition duration-300">FAQ</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-300 transition duration-300">Log In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-cyan-300 transition duration-300">Sign Up</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-c3">Team</p>
            <p className="mt-4 text-lg">Ayush Aggarwal</p>
            <p className="text-c3">Full Stack Developer</p>
            <div className="mt-5 flex flex-col gap-3 text-c3">
              <Link href="https://github.com/Ayush40" target="_blank" className="inline-flex items-center gap-2 hover:text-white transition duration-300">
                <FiGithub />
                GitHub profile
              </Link>
              <div className="inline-flex items-center gap-2">
                <FiMail />
                Contact available on request
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-c5/70 text-c3 text-sm md:text-base flex flex-col md:flex-row items-center justify-between gap-2">
          <p>Made by Team ConnectYou</p>
          <p>Copyright 2026 ConnectYou. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
