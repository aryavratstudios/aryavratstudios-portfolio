import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faYoutube, faBehance, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const socialLinks = [
    { name: 'Discord', url: 'https://discord.gg/aUZuXcZvYa', icon: faDiscord, color: 'text-indigo-500 hover:text-indigo-400' },
    { name: 'YouTube', url: 'https://youtube.com/@aryavratstudios', icon: faYoutube, color: 'text-red-500 hover:text-red-400' },
    { name: 'YTJobs', url: 'https://ytjobs.co/talent/profile/487729', icon: faBriefcase, color: 'text-green-500 hover:text-green-400' },
    { name: 'X (Twitter)', url: 'https://x.com/Aryavrat369', icon: faTwitter, color: 'text-gray-300 hover:text-gray-200' },
    { name: 'Behance', url: 'https://www.behance.net/aryavrat', icon: faBehance, color: 'text-blue-500 hover:text-blue-400' },
  ];

  return (
    <footer className="bg-brand-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-brand-white font-bold text-xl mb-4">Aryavrat Studios</h3>
            <p className="text-brand-light-gray mb-4">
              Empowering creators with premium thumbnails, fast edits, and reliable support systems.
            </p>
            <p className="text-brand-light-gray text-sm">© 2026 Aryavrat Studios. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-brand-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-brand-light-gray hover:text-brand-white transition-colors">Services</Link></li>
              <li><Link href="/work" className="text-brand-light-gray hover:text-brand-white transition-colors">Work</Link></li>
              <li><Link href="/about" className="text-brand-light-gray hover:text-brand-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-brand-light-gray hover:text-brand-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} transition-colors text-2xl`}
                  aria-label={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
            <div className="mt-4 text-sm text-brand-light-gray">
              <p>Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;