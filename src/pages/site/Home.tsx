import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import About from '../../components/sections/About';
import Contact from '../../components/sections/Contact';
import FAQ from '../../components/sections/FAQ';
import CurrencyRates from '../../components/sections/CurrencyRates';
import FeaturedTestimonials from '../../components/sections/FeaturedTestimonials';


const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FeaturedTestimonials />
      <Contact />
      <FAQ />
      <CurrencyRates />
    </>
  );
};

export default Home;
