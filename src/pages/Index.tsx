
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Header />
      <Hero />
      <Benefits />
      <BeforeAfterSection />
      <Process />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
