import { motion } from 'framer-motion';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Thumbnail Design Trends for 2024: What Creators Need to Know',
    excerpt: 'Stay ahead of the curve with the latest thumbnail design trends that are driving clicks and engagement on YouTube and social platforms.',
    readTime: '5 min read',
    date: 'Dec 15, 2024',
  },
  {
    title: 'Video Editing Tips for Faster Turnarounds Without Sacrificing Quality',
    excerpt: 'Learn professional editing techniques that can cut your production time in half while maintaining cinematic-quality results.',
    readTime: '7 min read',
    date: 'Dec 10, 2024',
  },
  {
    title: 'Building Sustainable Creator Systems: From Freelancer to Studio',
    excerpt: 'How to scale your creator business with proper workflows, tools, and team structures that support long-term growth.',
    readTime: '10 min read',
    date: 'Dec 5, 2024',
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-h2 font-semibold text-brand-white text-center mb-16"
        >
          Creator Insights & Tips
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-black p-6 rounded-lg hover:bg-brand-dark-gray transition-colors duration-200"
            >
              <div className="mb-4">
                <span className="text-sm text-brand-light-gray">{post.date}</span>
                <span className="text-sm text-brand-light-gray ml-4">•</span>
                <span className="text-sm text-brand-light-gray ml-4">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-white mb-4">{post.title}</h3>
              <p className="text-brand-light-gray mb-6">{post.excerpt}</p>
              <Link href="#" className="text-brand-white hover:text-brand-light-gray transition-colors font-medium">
                Read More →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default Blog;