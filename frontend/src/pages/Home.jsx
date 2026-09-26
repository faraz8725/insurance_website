import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Products />
        <WhyChooseUs />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default Home;