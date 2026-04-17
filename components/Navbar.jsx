"use client";
import { useScreenSize } from "@/context/screenSizeContext";
import logo from "@/public/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";
import { Link as SLink } from "react-scroll";

const Navbar = () => {
  const path = usePathname();
  const { isSmallScreen, openMainSidebar, setOpenMainSidebar } = useScreenSize();

  const [sidebarPosition, setSidebarPosition] = useState('-right-[70vw]');

  useEffect(() => {
    openMainSidebar ?
      setSidebarPosition('-right-0')
      : setSidebarPosition('-right-[70vw]');

  }, [openMainSidebar]);

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="bg-c1/90 backdrop-blur-xl px-4 py-2 md:px-8 md:py-2.5 h-auto w-[100vw] flex items-center justify-between border-b border-c5/70">
        {/* Logo and name  */}
        <Link href="/">
          <div className="text-xl md:text-3xl font-bold text-white flex items-center gap-2 leading-none">
            <Image src={logo} alt="ConnectYouLogo" height={38} width={38} className="rounded-lg" />
            <span className="tracking-tight">ConnectYou</span>
          </div>
        </Link>

        {isSmallScreen ? (
          <>
            {/* For small screens  */}
            <div className="border border-c5 bg-c2/80 p-[6px] rounded-xl">
              {openMainSidebar ? (
                <IoClose
                  className={`text-md font-bold text-c3`}
                  onClick={() => setOpenMainSidebar(false)}
                />
              ) : (
                <RxHamburgerMenu
                  className={`text-md font-bold text-c3`}
                  onClick={() => setOpenMainSidebar(true)}
                />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Nav links  */}
            <div className="flex gap-6 text-lg text-c3 list-none items-center font-medium">
              <Link href="/">
                <li className="hover:text-white duration-300">Home</li>
              </Link>
              <Link href="/faq">
                <li className="hover:text-white duration-300">FAQ</li>
              </Link>
              {path === "/" ? (
                <SLink to="features" smooth={true}>
                  <li className="hover:text-white duration-300 cursor-pointer">
                    Features
                  </li>
                </SLink>
              ) : (
                <Link href="/#features">
                  <li className="hover:text-white duration-300 cursor-pointer">
                    Features
                  </li>
                </Link>
              )}
            </div>

            {/* Login and Sign Up buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-5 py-2 rounded-full border border-c5 bg-c2/80 text-white font-semibold hover:bg-c5/80 transition duration-300">
                Log In
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black font-semibold whitespace-nowrap flex items-center gap-2 hover:scale-105 transition duration-300"
              >
                Sign Up
                <FiArrowRight />
              </Link>
            </div>
          </>
        )}

        {/* Main sidebar for small screens  */}

        <div className={`w-[72vw] h-[92vh] bg-c1/95 backdrop-blur-lg absolute top-14 ${sidebarPosition} transition-all ease-in-out duration-500
          rounded-l-2xl shadow-lg shadow-black/40 border-l border-c5 p-8 overflow-hidden flex flex-col justify-between md:hidden`} >
          {/* Nav links  */}
          <div className="text-2xl text-c3 list-none">
            <Link href="/" onClick={() => setOpenMainSidebar(false)}>
              <li className="hover:text-white duration-300 py-3">Home</li>
            </Link>
            <Link href="/faq" onClick={() => setOpenMainSidebar(false)}>
              <li className="hover:text-white duration-300 py-3">FAQ</li>
            </Link>
            {path === "/" ? (
              <SLink to="features" smooth={true}>
                <li className="hover:text-white duration-300 cursor-pointer py-3" onClick={() => setOpenMainSidebar(false)}>
                  Features
                </li>
              </SLink>
            ) : (
              <Link href="/#features" onClick={() => setOpenMainSidebar(false)}>
                <li className="hover:text-white duration-300 cursor-pointer py-3">
                  Features
                </li>
              </Link>
            )}
          </div>

          {/* Login and Sign Up buttons */}
          <div className="flex flex-col items-center gap-4 pb-3">
            <Link
              href="/login"
              onClick={() => setOpenMainSidebar(false)}
              className="w-full text-center px-5 py-3 rounded-full border border-c5 bg-c2/70 text-white font-semibold hover:bg-c5/80 transition duration-300"
            >
              Log In
            </Link>

            <Link
              href="/register"
              onClick={() => setOpenMainSidebar(false)}
              className="w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black font-semibold whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105 transition duration-300"
            >
              Sign Up
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500"></div>
    </div>
  );
};

export default Navbar;
