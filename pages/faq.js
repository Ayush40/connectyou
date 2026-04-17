import FAQAnimation from "@/components/FAQAnimation";
import Navbar from "@/components/Navbar";

const FAQ = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] py-16 md:py-20 max-h-auto flex justify-center items-start bg-gradient-to-b from-c1 via-c2 to-c1 mt-16 cursor-default relative overflow-hidden">
        <div className="absolute -left-20 top-20 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full"></div>
        <FAQAnimation />
      </div>
    </>
  );
};

export default FAQ;
