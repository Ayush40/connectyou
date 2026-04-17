import Loader from "@/components/Loader";
import { useAuth } from "@/context/authContext";
import { profileColors } from "@/utils/constants";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";
import { auth, db, storage } from "../firebase/firebase";
import { toast } from "react-toastify";
import ToastMessage from "@/components/ToastMessage";
import Navbar from "@/components/Navbar";

const gProvider = new GoogleAuthProvider();

const Register = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();

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
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const file = e.target[4]?.files?.[0];
        const colorIndex = Math.floor(Math.random() * profileColors.length);

        const validEmailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@icloud.com"];
        const isValidEmail = validEmailDomains.some((domain) => email.endsWith(domain));

        if (!isValidEmail) {
            toast.error("Invalid email domain");
            return;
        }

        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password doesn't match");
            return;
        }

        /**
         * Registers a new user with email/password and additional profile data.
         *
         * Creates user with Firebase auth.
         * Uploads profile photo if provided.
         * Writes user profile data to Firestore.
         * Navigates to home page on success.
         */
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (file) {
                const storageRef = ref(storage, displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        switch (snapshot.state) {
                            case "paused":
                                break;
                            case "running":
                                break;
                        }
                    },
                    (error) => {
                        // console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await updateProfile(user, {
                                    displayName,
                                    photoURL: downloadURL,
                                });

                                await setDoc(doc(db, "users", user.uid), {
                                    uid: user.uid,
                                    displayName,
                                    email,
                                    photoURL: downloadURL,
                                    color: profileColors[colorIndex],
                                    credits: 0,
                                });

                                await setDoc(
                                    doc(db, "userChats", user.uid),
                                    {}
                                );

                                router.push("/");
                            }
                        );
                    }
                );
            } else {
                await updateProfile(user, {
                    displayName,
                });
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName,
                    email,
                    color: profileColors[colorIndex],
                    credits: 100,
                });
                await setDoc(doc(db, "userChats", user.uid), {});
                router.push("/");
            }
        } catch (error) {
            // console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            // console.error("An error occured", error);
        }
    };

    return isLoading || (!isLoading && !!currentUser) ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <div className="md:min-h-screen min-h-[120vh] flex justify-center items-center bg-gradient-to-b from-c1 via-c2 to-c1 mt-16 relative overflow-hidden px-5">
                <div className="absolute -left-20 top-20 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full"></div>
                <div className="absolute -right-24 bottom-10 w-80 h-80 bg-emerald-400/20 blur-3xl rounded-full"></div>
                <ToastMessage />

                <div className="flex items-center flex-col w-full max-w-xl rounded-3xl border border-c5 bg-c1/75 backdrop-blur-md shadow-2xl shadow-black/40 py-8 md:py-10 px-4 md:px-8 z-10">
                    <div className="text-center mb-6 px-3">
                        <p className="text-c3 uppercase tracking-[0.2em] text-xs mb-2">Get started</p>
                        <div className="text-3xl md:text-4xl font-bold">Create New Account</div>
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
                                <span>Create with Google</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full max-w-md mb-1">
                        <span className="flex-1 h-[1px] bg-c5"></span>
                        <span className="text-c3 font-semibold">OR</span>
                        <span className="flex-1 h-[1px] bg-c5"></span>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center gap-3 w-full max-w-md mt-3"
                    >
                        <input
                            type="text"
                            placeholder="Display Name"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full h-14 bg-c2 rounded-xl outline-none border border-c5 px-5 text-white"
                            autoComplete="off"
                            required
                        />
                        <button className="mt-3 w-full h-14 rounded-full outline-none text-base font-semibold bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 text-black transition duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            Sign Up
                            <FiArrowRight />
                        </button>
                    </form>
                    <div className="flex justify-center gap-1 text-c3 mt-5">
                        <span>Already have an account?</span>
                        <Link
                            href="/login"
                            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
