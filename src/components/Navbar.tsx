import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: 'fas fa-home' },
    { href: '/services', label: 'Services', icon: 'fas fa-cogs' },
    { href: '/work', label: 'Work', icon: 'fas fa-briefcase' },
    { href: '/about', label: 'About', icon: 'fas fa-users' },
    { href: '/contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-brand-black/95 backdrop-blur-glass z-50 border-t border-brand-dark-gray/30 pb-safe-bottom">
        <div className="flex justify-around items-center h-16 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[60px] min-h-[60px] ${
                router.pathname === item.href
                  ? 'text-brand-white bg-brand-secondary shadow-soft'
                  : 'text-brand-light-gray hover:text-brand-white hover:bg-brand-secondary/50 active:scale-95'
              }`}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-brand-black/20 backdrop-blur-glass rounded-full px-4 md:px-6 py-3 border border-white/10 shadow-glass hover:shadow-glass-hover transition-all duration-300">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-brand-white font-bold text-base md:text-lg hover:text-brand-light-gray transition-colors">
            Aryavrat Studios
          </Link>
          <div className="flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2 md:px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  router.pathname === item.href
                    ? 'text-brand-blue'
                    : 'text-brand-light-gray hover:text-brand-blue'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue transition-all duration-300 origin-left ${
                  router.pathname === item.href
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;