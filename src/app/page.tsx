import HeroSection from "@/components/Home/HeroSection";
import Navbar from "@/components/NavigationBar/Navbar";
import TopBar from "@/components/NavigationBar/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <Navbar logoSrc="" logoAlt="Exotic Birds" />
      <HeroSection />
    </div>
  );
}

export default App;