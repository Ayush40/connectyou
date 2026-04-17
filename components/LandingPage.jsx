import Feature from "./Feature";
import LandingFooter from "./LandingFooter";
import Navbar from "./Navbar";
import WelcomeAnimation from "./WelcomeAnimation";

// Define the LandingPage component
const LandingPage = () => {
    return (
        <div className="min-h-screen bg-c1 text-white overflow-x-hidden" id="home">
            <Navbar />
            <WelcomeAnimation />
            <Feature />
            <LandingFooter />
        </div>
    );
};

// Export the LandingPage component
export default LandingPage;
