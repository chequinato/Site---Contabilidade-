import { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';
import ChatBot from './components/ChatBot/ChatBot';
import FeaturedTestimonials from './components/sections/FeaturedTestimonials';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  useEffect(() => {
    // Inicializa AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        {/* Seção Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* Seção Serviços */}
        <section id="services" className="py-16 bg-white">
          <Services />
        </section>

        {/* Seção Sobre Nós */}
        <section id="about" className="py-16 bg-gray-50">
          <About />
        </section>

        {/* Seção de Avaliações em Destaque */}
        <section className="py-16 bg-white">
          <FeaturedTestimonials />
        </section>

        {/* Seção Contato */}
        <section id="contact" className="py-16 bg-gray-50">
          <Contact />
        </section>

        {/* Seção FAQ */}
        <section id="faq" className="py-16 bg-gray-50">
          <FAQ />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* ChatBot Flutuante */}
      <ChatBot />
    </div>
  );
}

export default App;
