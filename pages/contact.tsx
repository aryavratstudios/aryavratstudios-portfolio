import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div>
      <Head>
        <title>Contact – Aryavrat Studios | Start Your Creator Journey</title>
        <meta name="description" content="Ready to scale your creator business? Contact Aryavrat Studios for thumbnails, editing, and technical support. Long-term retainers available." />
        <meta property="og:title" content="Contact – Aryavrat Studios" />
        <meta property="og:description" content="Get in touch for premium creator services. We work with serious creators building sustainable businesses." />
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
              <h1 className="text-h1 font-bold text-brand-white mb-6">Let's Build Something Together</h1>
              <p className="text-body text-brand-light-gray max-w-3xl mx-auto">
                We work with serious creators who want to scale. If you're committed to growing your audience and building a sustainable business, we're here to help.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-h2 font-semibold text-brand-white mb-8">Get In Touch</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-white mb-2">Email</h3>
                    <a
                      href="mailto:aryavrat.studios@gmail.com"
                      className="text-brand-light-gray hover:text-brand-white transition-colors text-lg"
                    >
                      aryavrat.studios@gmail.com
                    </a>
                    <p className="text-brand-light-gray text-sm mt-1">Best for project inquiries and retainer discussions</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-brand-white mb-2">Response Time</h3>
                    <p className="text-brand-light-gray">We respond to all inquiries within 24 hours during business days.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-brand-white mb-2">Location</h3>
                    <p className="text-brand-light-gray">India-based studio serving global creators</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-brand-secondary p-8 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-brand-white mb-6">What We Look For</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-brand-white mr-3 mt-1">✓</span>
                    <div>
                      <h4 className="text-brand-white font-medium">Serious Creators</h4>
                      <p className="text-brand-light-gray text-sm">You're not just posting – you're building a business</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-brand-white mr-3 mt-1">✓</span>
                    <div>
                      <h4 className="text-brand-white font-medium">Growth Mindset</h4>
                      <p className="text-brand-light-gray text-sm">You want to scale, not just maintain</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-brand-white mr-3 mt-1">✓</span>
                    <div>
                      <h4 className="text-brand-white font-medium">Clear Communication</h4>
                      <p className="text-brand-light-gray text-sm">You value honest feedback and collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-brand-white mr-3 mt-1">✓</span>
                    <div>
                      <h4 className="text-brand-white font-medium">Long-Term Vision</h4>
                      <p className="text-brand-light-gray text-sm">You're in this for the marathon, not the sprint</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="section-divider mt-20"></div>
        </section>

        <section className="py-20 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-h2 font-semibold text-brand-white mb-8">Retainer Programs</h2>
              <p className="text-body text-brand-light-gray max-w-3xl mx-auto mb-12">
                Most of our clients start with individual projects and scale to retainers. Here's what that looks like:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-black p-8 rounded-lg text-center"
              >
                <h3 className="text-lg font-semibold text-brand-white mb-4">Starter Retainer</h3>
                <div className="text-2xl font-bold text-brand-white mb-4">$500/month</div>
                <ul className="text-brand-light-gray text-sm space-y-2 mb-6">
                  <li>• 8 custom thumbnails</li>
                  <li>• Priority support</li>
                  <li>• Monthly strategy call</li>
                  <li>• 10% discount on additional services</li>
                </ul>
                <p className="text-brand-light-gray text-xs">Perfect for growing channels (10k-50k subs)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-brand-black p-8 rounded-lg text-center border-2 border-brand-white"
              >
                <h3 className="text-lg font-semibold text-brand-white mb-4">Growth Retainer</h3>
                <div className="text-2xl font-bold text-brand-white mb-4">$1,200/month</div>
                <ul className="text-brand-light-gray text-sm space-y-2 mb-6">
                  <li>• 20 custom thumbnails</li>
                  <li>• 4 video edits (up to 5 min)</li>
                  <li>• Content strategy consultation</li>
                  <li>• Weekly check-ins</li>
                  <li>• 20% discount on additional services</li>
                </ul>
                <p className="text-brand-light-gray text-xs">Ideal for established channels (50k-200k subs)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-brand-black p-8 rounded-lg text-center"
              >
                <h3 className="text-lg font-semibold text-brand-white mb-4">Scale Retainer</h3>
                <div className="text-2xl font-bold text-brand-white mb-4">$2,500/month</div>
                <ul className="text-brand-light-gray text-sm space-y-2 mb-6">
                  <li>• Unlimited thumbnails</li>
                  <li>• 8 video edits (up to 10 min)</li>
                  <li>• Full backend support</li>
                  <li>• Custom workflow systems</li>
                  <li>• Daily communication</li>
                </ul>
                <p className="text-brand-light-gray text-xs">For serious creators scaling to 200k+ subs</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-brand-light-gray mb-8">
                All retainers include 24/7 support, unlimited revisions, and the peace of mind that comes with a dedicated partner.
              </p>
              <a
                href="mailto:aryavrat.studios@gmail.com?subject=Retainer Inquiry"
                className="inline-block bg-brand-white text-brand-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-light-gray transition-colors duration-200"
              >
                Discuss Retainer Options
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;