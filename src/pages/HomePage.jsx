import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Slider />
      <Services />
      <Reviews />
      <Footer />
    </div>
  );
}

export default HomePage;
