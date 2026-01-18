import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div>
      <Head>
        <title>About – Aryavrat Studios | India-Based Creator Service Studio</title>
        <meta name="description" content="India-based, founder-led service studio for global creators. We handle thumbnails, editing, and technical backend so creators can focus on growth." />
        <meta property="og:title" content="About – Aryavrat Studios" />
        <meta property="og:description" content="Built by creators who understand the grind. Fast, reliable, and affordable creator support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20">
        <section className="py-20 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-h1 font-bold text-brand-white mb-6">About Aryavrat Studios</h1>
              <p className="text-body text-brand-light-gray max-w-3xl mx-auto">
                India-based, founder-led service studio working with global creators and businesses. We handle the creative and technical backend so you can focus on growing your audience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-h2 font-semibold text-brand-white mb-6">Built by Creators, for Creators</h2>
                <p className="text-body text-brand-light-gray mb-6">
                  We're hands-on creators ourselves, having built and grown multiple channels from scratch. We understand the creator grind – the late nights, the technical frustrations, the constant pressure to perform. That's why we built Aryavrat Studios: to provide the reliable creative and technical support that every creator deserves.
                </p>
                <p className="text-body text-brand-light-gray">
                  Your success is our priority. We don't just deliver work – we partner with you to grow your audience and build sustainable creator businesses.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-brand-secondary p-8 rounded-lg"
              >
                <div className="w-32 h-32 bg-brand-dark-gray rounded-full mx-auto mb-6 flex items-center justify-center">
                  <i className="fas fa-user-tie text-4xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-brand-white text-center mb-4">Founder-Led Studio</h3>
                <p className="text-brand-light-gray text-center">
                  No corporate fluff, no buzzwords. Just practical solutions from people who live the creator life.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-h2 font-semibold text-brand-white text-center mb-12">Our Strengths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4"><i className="fas fa-bolt"></i></div>
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Speed</h3>
                  <p className="text-brand-light-gray text-sm">24-48 hour turnarounds on all projects. We respect your timelines.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4"><i className="fas fa-dollar-sign"></i></div>
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Affordability</h3>
                  <p className="text-brand-light-gray text-sm">Transparent pricing that makes sense for growing creators.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4"><i className="fas fa-shield-alt"></i></div>
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Reliability</h3>
                  <p className="text-brand-light-gray text-sm">99% uptime guarantee. Your success depends on our delivery.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4"><i className="fas fa-bullseye"></i></div>
                  <h3 className="text-lg font-semibold text-brand-white mb-2">Creator-First</h3>
                  <p className="text-brand-light-gray text-sm">We speak your language and understand your challenges.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 font-semibold text-brand-white text-center mb-12">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-brand-white mb-4">Primary Revenue Driver</h3>
                  <p className="text-brand-light-gray mb-6">
                    Thumbnail design is our core service. We create custom thumbnails that drive clicks and grow channels. This is where we make our money and deliver the most value.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-white mb-4">Full-Service Support</h3>
                  <ul className="text-brand-light-gray space-y-2">
                    <li>• Video editing with cinematic quality</li>
                    <li>• Content management and workflow systems</li>
                    <li>• Technical support and channel optimization</li>
                    <li>• Strategy consulting for scaling creators</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="section-divider mt-20"></div>
        </section>

        <section className="py-20 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-brand-white mb-8">Our Philosophy</h2>
            <p className="text-body text-brand-light-gray mb-12 max-w-3xl mx-auto">
              We focus on long-term retainers, not one-off gigs. Most creators start with thumbnails and scale to full backend support. We're here for the journey – from emerging channels to established brands.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-brand-black p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-white mb-4">Lean Operations</h3>
                <p className="text-brand-light-gray">No bloated teams or fancy offices. Just efficient processes that deliver results.</p>
              </div>
              <div className="bg-brand-black p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-white mb-4">Clear Communication</h3>
                <p className="text-brand-light-gray">No jargon, no confusion. We explain everything and keep you in the loop.</p>
              </div>
              <div className="bg-brand-black p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-brand-white mb-4">Execution Focus</h3>
                <p className="text-brand-light-gray">Ideas are cheap. What matters is shipping quality work on time, every time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;