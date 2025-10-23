import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import { Footer } from './components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  useEffect(() => {
    // Inicializa AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-grow w-full">
        <Hero />
        <div className="w-full max-w-7xl mx-auto px-4">
          <Services />
          <About />
          <Contact />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
