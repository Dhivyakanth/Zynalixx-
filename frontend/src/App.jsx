import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section id="home" className="scroll-mt-16"><Home /></section>
        <section id="services" className="scroll-mt-16"><Services /></section>
        <section id="projects" className="scroll-mt-16"><Projects /></section>
        <section id="events" className="scroll-mt-16"><Events /></section>
        <section id="about" className="scroll-mt-16"><About /></section>
        <section id="contact" className="scroll-mt-16"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}
