import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WorkItem {
  id: string;
  title: string;
  client: string;
  role: string;
  description: string;
  outcome: string;
  image: string;
  tags: string[];
  category: string;
  problem: string;
  solution: string;
  tools: string[];
}

interface WorkModalProps {
  work: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkModal = ({ work, isOpen, onClose }: WorkModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!work) return null;

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={onClose}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed bottom-0 left-0 right-0 bg-brand-secondary rounded-t-2xl shadow-medium z-50 max-h-[90vh] overflow-hidden"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              <div className="h-full overflow-y-auto">
                {/* Handle */}
                <div className="flex justify-center pt-4 pb-2">
                  <div className="w-12 h-1.5 bg-brand-dark-gray rounded-full"></div>
                </div>

                {/* Header */}
                <div className="relative px-6 pb-4">
                  <button
                    onClick={onClose}
                    className="absolute top-0 right-4 w-10 h-10 flex items-center justify-center text-brand-light-gray hover:text-brand-white transition-colors rounded-full hover:bg-brand-dark-gray"
                  >
                    <i className="fas fa-times text-lg"></i>
                  </button>

                  <div>
                    <h2 className="text-2xl font-semibold text-brand-white mb-2">{work.title}</h2>
                    <p className="text-brand-light-gray text-lg mb-4">{work.client}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-brand-accent text-brand-light-gray text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-brand-white mb-2">Category</h3>
                    <p className="text-brand-light-gray">{work.category}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-brand-white mb-2">Role</h3>
                    <p className="text-brand-light-gray">{work.role}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-brand-white mb-3">The Problem</h3>
                    <p className="text-brand-light-gray leading-relaxed">{work.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-brand-white mb-3">Our Solution</h3>
                    <p className="text-brand-light-gray leading-relaxed">{work.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-brand-white mb-3">Tools & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {work.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-brand-dark-gray text-brand-light-gray text-sm rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand-accent rounded-lg p-6">
                    <h3 className="text-lg font-medium text-brand-white mb-3">Results & Impact</h3>
                    <p className="text-brand-white text-lg font-medium">{work.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-brand-secondary rounded-lg shadow-medium z-50 overflow-hidden"
          >
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="relative p-6 md:p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-light-gray hover:text-brand-white transition-colors rounded-full hover:bg-brand-dark-gray"
                >
                  <i className="fas fa-times"></i>
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Project Image */}
                  <div className="lg:w-2/3">
                    <div className="aspect-video bg-brand-dark-gray rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-brand-light-gray text-lg">{work.title}</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="lg:w-1/3 space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-brand-white mb-2">{work.title}</h2>
                      <p className="text-brand-light-gray text-lg mb-4">{work.client}</p>
                      <div className="flex flex-wrap gap-2">
                        {work.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-brand-accent text-brand-light-gray text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-brand-white mb-2">Category</h3>
                        <p className="text-brand-light-gray">{work.category}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-brand-white mb-2">Role</h3>
                        <p className="text-brand-light-gray">{work.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 pb-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-brand-white mb-4">The Problem</h3>
                    <p className="text-brand-light-gray leading-relaxed">{work.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-brand-white mb-4">Our Solution</h3>
                    <p className="text-brand-light-gray leading-relaxed">{work.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-brand-white mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-brand-dark-gray text-brand-light-gray text-sm rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-accent rounded-lg p-6">
                  <h3 className="text-xl font-medium text-brand-white mb-4">Results & Impact</h3>
                  <p className="text-brand-white text-lg font-medium">{work.outcome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WorkModal;