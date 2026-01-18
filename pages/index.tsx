import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyAryavrat from '@/components/WhyAryavrat';
import Process from '@/components/Process';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Aryavrat Studios – Premium Thumbnail Design & Video Editing for Creators</title>
        <meta name="description" content="India-based service studio for global creators. We handle thumbnails, video editing, and technical backend so you can focus on growing your audience." />
        <meta property="og:title" content="Aryavrat Studios – Premium Thumbnail Design & Video Editing for Creators" />
        <meta property="og:description" content="Empower your creator journey with Aryavrat Studios. Custom thumbnails that drive clicks, lightning-fast edits, and reliable support." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20">
        <Hero />
        <Services />
        <WhyAryavrat />
        <Process />
        <section className="py-20 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-brand-white mb-8">Ready to Scale Your Creator Business?</h2>
            <p className="text-body text-brand-light-gray mb-12 max-w-2xl mx-auto">
              Join creators who trust us with their growth. From thumbnails that convert to systems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/work" className="bg-brand-white/95 text-brand-black px-8 py-4 rounded-lg font-semibold hover:bg-brand-white shadow-soft hover:shadow-medium transition-all duration-300 backdrop-blur-sm">
                View Our Work
              </Link>
              <Link href="/contact" className="border border-brand-white/30 text-brand-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-white/10 hover:border-brand-white/50 transition-all duration-300 backdrop-blur-sm shadow-glow hover:shadow-medium">
                Start a Conversation
              </Link>
            </div>
          </div>
          <div className="section-divider mt-20"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}