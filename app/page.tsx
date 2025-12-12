import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Shows from '@/components/Shows';
import Discography from '@/components/Discography';
import Shop from '@/components/Shop';
import Media from '@/components/Media';
import PhotoGallery from '@/components/PhotoGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Media />
      <Shows />
      <Shop />
      <About />
      <Discography />
      <PhotoGallery />
      <Contact />
      <Footer />
    </main>
  );
}
