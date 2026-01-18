import { motion } from 'framer-motion';

const Founder = () => {
  return (
    <section id="founder" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-brand-dark-gray rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl">👨‍💻</span>
          </div>
          <h2 className="text-h2 font-semibold text-brand-white mb-6">Built by Creators, for Creators</h2>
          <p className="text-body text-brand-light-gray max-w-3xl mx-auto mb-8">
            We're hands-on creators ourselves, having built and grown multiple channels from scratch. We understand the creator grind – the late nights, the technical frustrations, the constant pressure to perform. That's why we built Aryavrat Studios: to provide the reliable creative and technical support that every creator deserves.
          </p>
          <p className="text-brand-light-gray italic">
            "Your success is our priority. We don't just deliver work – we partner with you to grow your audience and build sustainable creator businesses."
          </p>
        </motion.div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Founder;