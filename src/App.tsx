import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ChatBot from './components/ChatBot/ChatBot';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Inicializa AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      once: true,
    });
    
    // Rola para o topo quando a rota muda
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
