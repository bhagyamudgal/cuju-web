import CommunityCard from "../components/home-page/CommunityCard";
import FeaturesSection from "../components/home-page/FeaturesSection";
import GoalsSection from "../components/home-page/GoalsSection";
import HeroSection from "../components/home-page/HeroSection";

function Home() {
    return (
        <main>
            <HeroSection />
            <FeaturesSection />
            <GoalsSection />
            <CommunityCard />
        </main>
    );
}

export default Home;
