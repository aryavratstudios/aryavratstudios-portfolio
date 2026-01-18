import { motion } from 'framer-motion';

const pillars = [
  {
    icon: 'fas fa-bolt',
    title: 'Fast Delivery',
    description: '24-48 hour turnarounds on all projects. We understand the fast-paced nature of content creation and deliver quality work on time.',
  },
  {
    icon: 'fas fa-dollar-sign',
    title: 'Affordable Pricing',
    description: 'Transparent, budget-friendly rates with dynamic pricing models. No hidden fees, just reliable service at creator-first prices.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Creator-First Systems',
    description: 'Tailored workflows designed specifically for creators. We build systems that fit your process, not the other way around.',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Long-Term Partnerships',
    description: 'Built for retainer relationships with exclusive rates and priority support. Grow with us as your channel scales.',
  },
];

const WhyAryavrat = () => {
  return (
    <section id="why-aryavrat" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          Why Choose Aryavrat Studios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg hover:bg-brand-accent/20 transition-colors duration-300"
            >
              <div className="text-4xl mb-6 text-brand-white/90"><i className={pillar.icon}></i></div>
              <h3 className="text-lg font-semibold text-brand-white mb-4 leading-tight">{pillar.title}</h3>
              <p className="text-brand-light-gray text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default WhyAryavrat;