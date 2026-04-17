/**
 * Login component for ConnectYou web application.
 * @returns {JSX.Element} Login form with options to sign in with Google or Facebook.
 */
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ToastMessage from "@/components/ToastMessage";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebase/firebase";
import {
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";
import { toast } from "react-toastify";

const gProvider = new GoogleAuthProvider();

const Login = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();
    const [email, setEmail] = useState("");

    const pushToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        if (!isLoading && currentUser) {
            pushToHome();
        }
    }, [currentUser, isLoading, pushToHome]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            const errorMessage = getFirebaseAuthErrorMessage(error.code);
            toast.error(errorMessage);
        }
    };

    // Function to map Firebase Auth error codes to user-friendly error messages
    const getFirebaseAuthErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'User not found. Please check your email.';
            case 'auth/wrong-password':
                return 'Invalid password. Please try again.';
            default:
                return 'Authentication failed. Please try again.';
        }
    };

    const resetPassword = async () => {
        try {
            toast.promise(
                async () => {
                    await sendPasswordResetEmail(auth, email);
                },
                {
                    pending: "Generating reset link",
                    success: "Reset email sent to your registered email.",
                    error: "You may have entered the wrong email!",
                },
                {
                    autoClose: 5000,
                }
            );
        } catch (error) {
            // console.error("An error occurred", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            // console.error("An error occurred", error);
        }
    };

    return isLoading || (!isLoading && !!currentUser) ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <div className="min-h-[120vh] md:min-h-screen flex justify-center items-center bg-gradient-to-b from-c1 via-c2 to-c1 mt-16 relative overflow-hidden px-5">
                <div className="absolute -left-20 top-20 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full"></div>
                <div className="absolute -right-24 bottom-10 w-80 h-80 bg-emerald-400/20 blur-3xl rounded-full"></div>
                <ToastMessage />
                <div className="flex items-center flex-col w-full max-w-xl rounded-3xl border border-c5 bg-c1/75 backdrop-blur-md shadow-2xl shadow-black/40 py-8 md:py-10 px-4 md:px-8 z-10">
                    <div className="text-center mb-6 px-3">
                        <p className="text-c3 uppercase tracking-[0.2em] text-xs mb-2">Welcome back</p>
                        <div className="text-3xl md:text-4xl font-bold">
                            Login to Your Account
                        </div>
                        <div className="mt-3 text-c3 text-sm md:text-base">
                            Connect and chat with anyone, anywhere
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full mt-4 mb-5 max-w-md">
                        <div
                            className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 w-full h-14 rounded-full cursor-pointer p-[1px]"
                            onClick={signInWithGoogle}
                        >
                            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-full">
                                <IoLogoGoogle size={24} />
                                <span>Login with Google</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full max-w-md mb-1">
                        <span className="flex-1 h-[1px] bg-c5"></span>
                        <span className="text-c3 font-semibold">OR</span>
                        <span className="flex-1 h-[1px] bg-c5"></span>
                    </div>
                    <form
                        className="flex flex-col items-center gap-3 w-full max-w-md mt-3"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                        />
                        <div className="text-right w-full text-c3">
                            <span
                                className="cursor-pointer"
                                onClick={resetPassword}
                            >
                                Forgot Password?
                            </span>
                        </div>
                        <button className="mt-3 w-full h-14 rounded-full outline-none text-base font-semibold bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black transition duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            Login to Your Account
                            <FiArrowRight />
                        </button>
                    </form>
                    <div className="flex justify-center gap-1 text-c3 mt-5">
                        <span>Not a member yet?</span>
                        <Link
                            href="/register"
                            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                        >
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
