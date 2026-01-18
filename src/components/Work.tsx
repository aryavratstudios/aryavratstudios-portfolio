import { motion } from 'framer-motion';
import { useState } from 'react';

const caseStudies = [
  {
    title: 'Tech Review Channel',
    description: '250% CTR Increase on YouTube Shorts',
    image: '/placeholder-thumbnail-1.jpg',
    stats: 'CTR: +250%',
  },
  {
    title: 'Gaming Creator',
    description: 'Consistent branding across 100+ videos',
    image: '/placeholder-thumbnail-2.jpg',
    stats: 'Consistency: 95%',
  },
  {
    title: 'Educational Content',
    description: 'Professional thumbnails for course promotions',
    image: '/placeholder-thumbnail-3.jpg',
    stats: 'Conversions: +180%',
  },
  {
    title: 'Lifestyle Vlogger',
    description: 'Cinematic edits with custom music integration',
    image: '/placeholder-thumbnail-4.jpg',
    stats: 'Engagement: +300%',
  },
  {
    title: 'Business Coaching',
    description: 'High-quality edits for professional presentations',
    image: '/placeholder-thumbnail-5.jpg',
    stats: 'Views: +400%',
  },
  {
    title: 'Comedy Skits',
    description: 'Fast turnaround on viral content edits',
    image: '/placeholder-thumbnail-6.jpg',
    stats: 'Delivery: <12hrs',
  },
  {
    title: 'Music Production',
    description: 'Visual effects for music video promos',
    image: '/placeholder-thumbnail-7.jpg',
    stats: 'CTR: +220%',
  },
  {
    title: 'Fitness Influencer',
    description: 'Motivational thumbnails and quick cuts',
    image: '/placeholder-thumbnail-8.jpg',
    stats: 'Retention: +25%',
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section id="work" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          Our Work & Results
        </motion.h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * 100 + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {caseStudies.map((study, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-brand-black p-8 rounded-lg text-center">
                    <div className="w-full h-48 bg-brand-dark-gray rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-brand-light-gray">{study.title}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-brand-white mb-2">{study.title}</h3>
                    <p className="text-brand-light-gray mb-4">{study.description}</p>
                    <div className="text-brand-white font-bold">{study.stats}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-brand-white text-brand-black p-2 rounded-full hover:bg-brand-light-gray transition-colors"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-brand-white text-brand-black p-2 rounded-full hover:bg-brand-light-gray transition-colors"
          >
            ›
          </button>
        </div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Work;