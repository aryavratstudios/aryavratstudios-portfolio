import { motion } from 'framer-motion';
import { useState } from 'react';

interface WorkItem {
  id: string;
  title: string;
  client: string;
  category: string;
  role: string;
  description: string;
  outcome: string;
  image: string;
  tags: string[];
}

interface WorkCardProps {
  work: WorkItem;
  onClick?: () => void;
}

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer shadow-soft hover:shadow-medium transition-shadow duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative bg-brand-secondary p-6 h-80 flex flex-col justify-between shadow-inner-glow"
        animate={{
          backgroundColor: isHovered ? '#1A1A1A' : '#111111',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center shadow-soft">
              <i className="fas fa-folder-open text-brand-light-gray text-lg"></i>
            </div>
            <div className="flex gap-2">
              {work.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-brand-accent text-brand-light-gray text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.h3
            className="text-xl font-semibold text-brand-white mb-3 leading-tight"
            animate={{ fontSize: isHovered ? '1.375rem' : '1.25rem' }}
            transition={{ duration: 0.3 }}
          >
            {work.title}
          </motion.h3>

          <p className="text-brand-light-gray text-sm mb-4 font-medium">{work.client}</p>
          <p className="text-brand-light-gray text-sm leading-relaxed">{work.description}</p>
        </div>

        {/* Category and CTA */}
        <div className="flex items-center justify-between">
          <span className={`text-brand-white text-xs font-medium px-3 py-1 rounded-full ${
            work.category === 'Thumbnail Design' ? 'bg-brand-blue' :
            work.category === 'Video Editing' ? 'bg-brand-purple' :
            work.category === 'Content Management' ? 'bg-brand-emerald' :
            'bg-brand-orange'
          }`}>
            {work.category}
          </span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-brand-light-gray"
          >
            <i className="fas fa-arrow-right text-sm"></i>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkCard;