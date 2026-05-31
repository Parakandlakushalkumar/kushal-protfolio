import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BugDodger from './components/BugDodger';

const whatsappMessage = encodeURIComponent(
  "Hi Kushal! I came across your portfolio and I'm impressed by your work. I'd like to discuss potential internship/collaboration opportunities with you."
);

export default function App() {
  return (
    <div className="bg-[#080810] min-h-screen">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {/* Bug Dodger Game */}
      <BugDodger />

      {/* Floating WhatsApp button */}
      <motion.a
        href={`https://wa.me/919392019653?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 30px rgba(37, 211, 102, 0.4)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}
