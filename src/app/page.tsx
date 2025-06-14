import Navbar from "./components/navbar";
import Homepage from "./components/landingpage/home";
import HowItWorks from "./components/landingpage/howItWorks";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Homepage />
      <HowItWorks />
    </div>
  );
}
