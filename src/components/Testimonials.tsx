import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Tech YouTuber',
    content: 'Aryavrat Studios transformed my channel with stunning thumbnails and fast edits. My CTR jumped 250% and I can finally focus on creating content instead of editing.',
    avatar: '/placeholder-avatar-1.jpg',
  },
  {
    name: 'Sarah Johnson',
    role: 'Lifestyle Creator',
    content: 'The team\'s creator-first approach is genuine. They understand the grind and deliver quality work consistently. Highly recommend for any growing creator.',
    avatar: '/placeholder-avatar-2.jpg',
  },
  {
    name: 'Mike Rodriguez',
    role: 'Gaming Influencer',
    content: 'Reliable, fast, and affordable. Aryavrat handles my entire backend so I can game and create without worrying about the technical stuff.',
    avatar: '/placeholder-avatar-3.jpg',
  },
  {
    name: 'Emma Davis',
    role: 'Educational Content Creator',
    content: 'Their retainer program is a game-changer. Consistent support and priority delivery has helped me scale from 10k to 100k subscribers.',
    avatar: '/placeholder-avatar-4.jpg',
  },
  {
    name: 'David Kim',
    role: 'Business Coach',
    content: 'Professional quality at creator prices. The thumbnails and edits look like they cost thousands but fit my budget perfectly.',
    avatar: '/placeholder-avatar-5.jpg',
  },
  {
    name: 'Lisa Wang',
    role: 'Comedy Skits Creator',
    content: 'Fast turnaround is crucial for viral content. Aryavrat delivers polished edits in hours, not days. Essential for staying relevant.',
    avatar: '/placeholder-avatar-6.jpg',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const visibleTestimonials = testimonials.slice(currentIndex * 3, (currentIndex + 1) * 3);

  return (
    <section id="testimonials" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          What Our Clients Say
        </motion.h2>
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-brand-secondary p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-dark-gray rounded-full mr-4 flex items-center justify-center">
                    <span className="text-brand-light-gray font-bold">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="text-brand-white font-semibold">{testimonial.name}</h4>
                    <p className="text-brand-light-gray text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-brand-light-gray italic">"{testimonial.content}"</p>
              </div>
            ))}
          </motion.div>
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

export default Testimonials;