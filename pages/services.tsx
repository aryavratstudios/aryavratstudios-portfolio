import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const services = [
  {
    icon: 'fas fa-image',
    title: 'Thumbnail Design',
    description: 'Our primary service and revenue driver. Custom thumbnails designed to maximize click-through rates for YouTube, Instagram, and TikTok. We understand what drives engagement in creator economies.',
    features: [
      'A/B testing optimized designs',
      'Brand-consistent styling',
      'High-resolution exports for all platforms',
      'Fast 24-48 hour turnaround',
      'Unlimited revisions during development',
    ],
    pricing: 'Starting at $25 per thumbnail',
  },
  {
    icon: 'fas fa-video',
    title: 'Video Editing',
    description: 'Professional video editing with cinematic quality. From raw footage to polished content ready for upload. We handle color grading, sound design, and effects.',
    features: [
      'Cinematic color grading',
      'Custom sound design and music',
      'Text animations and graphics',
      'Multiple format exports',
      'Quality assurance checks',
    ],
    pricing: 'Starting at $50 per minute',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Content Management Systems',
    description: 'Workflow optimization and content pipelines. We build systems that help creators scale without burning out. From upload schedules to analytics tracking.',
    features: [
      'Custom workflow design',
      'Tool recommendations and setup',
      'Content calendar management',
      'Analytics dashboard setup',
      'Process documentation',
    ],
    pricing: 'Starting at $200 per month retainer',
  },
  {
    icon: 'fas fa-tools',
    title: 'Technical Support & IT',
    description: 'Backend technical support for creators. Channel optimization, software troubleshooting, equipment recommendations, and digital infrastructure management.',
    features: [
      'Channel and algorithm optimization',
      'Software and hardware recommendations',
      'Technical troubleshooting',
      'Digital asset management',
      'Backup and security setup',
    ],
    pricing: 'Starting at $100 per month retainer',
  },
];

const ServicesPage = () => {
  return (
    <div>
      <Head>
        <title>Services – Aryavrat Studios | Thumbnail Design, Video Editing & Creator Support</title>
        <meta name="description" content="Professional thumbnail design, video editing, and technical support for creators. Fast turnaround, affordable pricing, and creator-first approach." />
        <meta property="og:title" content="Services – Aryavrat Studios" />
        <meta property="og:description" content="Custom thumbnails that drive clicks, cinematic video edits, and reliable technical support for growing creators." />
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
              <h1 className="text-h1 font-bold text-brand-white mb-6">Our Services</h1>
              <p className="text-body text-brand-light-gray max-w-3xl mx-auto">
                We focus on the creative and technical backend that creators need to scale. From thumbnails that convert to systems that sustain growth.
              </p>
            </motion.div>
            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="text-center lg:text-left">
                    <div className="text-6xl mb-6"><i className={service.icon}></i></div>
                    <h2 className="text-h2 font-semibold text-brand-white mb-4">{service.title}</h2>
                    <p className="text-body text-brand-light-gray mb-6">{service.description}</p>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-brand-white mb-3">What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-brand-light-gray flex items-center">
                            <span className="text-brand-white mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-brand-white font-semibold text-lg">{service.pricing}</div>
                  </div>
                  <div className="bg-brand-secondary p-8 rounded-lg">
                    <div className="text-4xl mb-4"><i className={service.icon}></i></div>
                    <h3 className="text-xl font-semibold text-brand-white mb-4">{service.title}</h3>
                    <p className="text-brand-light-gray">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="section-divider mt-20"></div>
        </section>
        <section className="py-20 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-brand-white mb-8">Ready to Get Started?</h2>
            <p className="text-body text-brand-light-gray mb-12 max-w-2xl mx-auto">
              Most of our clients start with thumbnails and scale to full retainers. Let's discuss your needs.
            </p>
            <a
              href="mailto:aryavrat.studios@gmail.com"
              className="inline-block bg-brand-white/95 text-brand-black px-8 py-4 rounded-lg font-semibold hover:bg-brand-white shadow-soft hover:shadow-medium transition-all duration-300 backdrop-blur-sm"
            >
              Start a Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;