import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-black via-brand-secondary/20 to-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-h1 font-bold text-brand-white mb-8 leading-tight"
        >
          Empower Your Creator Journey with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue">
            Aryavrat Studios
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-body text-brand-light-gray mb-16 max-w-4xl mx-auto leading-relaxed"
        >
          We handle the creative and technical backend so you can focus on what you love – growing your audience faster with premium thumbnails, lightning-fast edits, and robust support systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="https://calendly.com/aryavratstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-white/95 text-brand-black px-8 py-4 rounded-lg font-semibold hover:bg-brand-white shadow-soft hover:shadow-medium transition-all duration-300 backdrop-blur-sm"
          >
            Book a Free Discovery Call
          </a>
          <a
            href="/work"
            className="border border-brand-white/30 text-brand-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-white/10 hover:border-brand-white/50 transition-all duration-300 backdrop-blur-sm shadow-glow hover:shadow-medium"
          >
            View Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;