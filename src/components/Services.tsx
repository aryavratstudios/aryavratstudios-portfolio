import { motion } from 'framer-motion';

const services = [
  {
    icon: 'fas fa-image',
    title: 'Thumbnail Design',
    description: 'Custom thumbnails that boost CTR by up to 300% for engagement-driven growth. We create eye-catching designs that convert viewers into subscribers.',
    primary: true,
  },
  {
    icon: 'fas fa-video',
    title: 'Video Editing',
    description: 'Cinematic-quality edits delivered in under 24 hours. From raw footage to polished content, we handle the technical magic.',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Content Management',
    description: 'Streamlined workflows and systems for creator pipelines. Organize, optimize, and scale your content production efficiently.',
  },
  {
    icon: 'fas fa-tools',
    title: 'IT / Technical Support',
    description: 'Reliable backend support for creators. From channel optimization to troubleshooting, we keep your digital presence running smoothly.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 ${
                service.primary
                  ? 'bg-brand-secondary border border-brand-white/20 shadow-inner-glow'
                  : 'bg-brand-secondary/60 hover:bg-brand-secondary/80'
              }`}
            >
              <div className="text-4xl mb-6 text-brand-white/90"><i className={service.icon}></i></div>
              <h3 className="text-xl font-semibold text-brand-white mb-4 leading-tight">{service.title}</h3>
              <p className="text-brand-light-gray leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Services;