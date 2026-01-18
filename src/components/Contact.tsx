import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-h2 font-semibold text-brand-white mb-8">Ready to Grow Your Creator Business?</h2>
          <p className="text-body text-brand-light-gray mb-12 max-w-2xl mx-auto">
            Join our retainer program for exclusive rates and priority support. Let's discuss how we can help you scale faster and focus on what matters most – creating amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-white mb-2">Email</h3>
              <a href="mailto:aryavrat.studios@gmail.com" className="text-brand-light-gray hover:text-brand-white transition-colors">
                aryavrat.studios@gmail.com
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-brand-white mb-2">Phone</h3>
              <a href="tel:+91-9876543210" className="text-brand-light-gray hover:text-brand-white transition-colors">
                +91 98765 43210
              </a>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            href="https://calendly.com/aryavratstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-brand-blue to-brand-purple text-brand-white px-8 py-4 rounded-lg font-semibold hover:from-brand-blue-light hover:to-brand-purple-light shadow-soft hover:shadow-medium transition-all duration-300"
          >
            Book Your Free Discovery Call
          </motion.a>
          <p className="text-sm text-brand-light-gray mt-6">
            No commitment required. Let's explore how we can support your creator journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;