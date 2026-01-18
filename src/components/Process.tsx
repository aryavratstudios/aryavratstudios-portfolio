import { motion } from 'framer-motion';

const steps = [
  {
    step: '1',
    title: 'Discovery & Strategy',
    description: 'We start with understanding your brand, goals, and current challenges. Together, we craft a strategy tailored to your creator journey.',
  },
  {
    step: '2',
    title: 'Execution & Delivery',
    description: 'Our team handles the creative and technical work, delivering high-quality results within agreed timelines.',
  },
  {
    step: '3',
    title: 'Continuous Feedback & Scaling',
    description: 'We provide ongoing support, analyze performance, and scale our services as your channel grows.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          Our Process
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div className="w-16 h-16 bg-brand-white text-brand-black rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-brand-white mb-4">{step.title}</h3>
              <p className="text-brand-light-gray text-sm">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-8 w-8 h-0.5 bg-brand-light-gray transform translate-x-4"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Process;