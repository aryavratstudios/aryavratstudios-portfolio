import { motion } from 'framer-motion';

const Community = () => {
  const socialLinks = [
    { name: 'Discord', url: 'https://discord.gg/aryavrat', icon: '🔗', hoverColor: 'hover:text-blue-400' },
    { name: 'YouTube', url: 'https://youtube.com/@aryavratstudios', icon: '📺', hoverColor: 'hover:text-red-500' },
    { name: 'YTJobs', url: 'https://ytjobs.co/aryavrat', icon: '💼', hoverColor: 'hover:text-green-400' },
    { name: 'Behance', url: 'https://behance.net/aryavratstudios', icon: '🎨', hoverColor: 'hover:text-blue-500' },
    { name: 'X (Twitter)', url: 'https://twitter.com/aryavratstudios', icon: '🐦', hoverColor: 'hover:text-gray-400' },
  ];

  return (
    <section id="community" className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white mb-8"
        >
          Join Our Creator Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-body text-brand-light-gray mb-12 max-w-2xl mx-auto"
        >
          Connect with fellow creators, get exclusive tips, and stay updated on the latest creator tools and trends. Our Discord community is where creators support each other and grow together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <iframe
            src="https://discord.com/widget?id=1234567890123456789&theme=dark"
            width="350"
            height="500"
            allowTransparency={true}
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="mx-auto border-0 rounded-lg"
          ></iframe>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-brand-light-gray ${link.hoverColor} transition-colors duration-200 text-2xl`}
              aria-label={`Follow us on ${link.name}`}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Community;