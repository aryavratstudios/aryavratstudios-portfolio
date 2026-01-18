import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkCard from '@/components/WorkCard';
import WorkModal from '@/components/WorkModal';
import { motion } from 'framer-motion';

const workItems = [
  {
    id: 'thumbnail-series',
    title: 'Thumbnail Design Series',
    client: 'Tech Review Channel (50k+ subs)',
    category: 'Thumbnail Design',
    role: 'Lead Thumbnail Designer',
    description: 'Created a complete thumbnail system for a growing tech channel, focusing on A/B testing and conversion optimization.',
    problem: 'Inconsistent click-through rates and unclear visual branding leading to missed growth opportunities.',
    solution: 'Developed a comprehensive thumbnail system with A/B testing framework, brand guidelines, and conversion-optimized design templates.',
    outcome: '350% increase in average CTR, consistent 15-20% click rates',
    tools: ['Photoshop', 'Canva', 'YouTube Analytics', 'A/B Testing Tools'],
    image: '/work-thumbnail-1.jpg',
    tags: ['Thumbnail Design', 'A/B Testing', 'Brand Identity'],
    color: 'brand-blue',
  },
  {
    id: 'video-edit-suite',
    title: 'Video Editing Workflow',
    client: 'Lifestyle Vlogger (100k+ subs)',
    category: 'Video Editing',
    role: 'Video Editor & Colorist',
    description: 'Built a scalable editing workflow including custom presets, sound design, and motion graphics templates.',
    problem: 'Time-consuming editing process leading to inconsistent upload schedule and quality drops under deadline pressure.',
    solution: 'Implemented streamlined workflow with custom Premiere Pro presets, standardized sound design templates, and batch processing systems.',
    outcome: '50% reduction in editing time, improved video quality scores',
    tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audacity'],
    image: '/work-edit-1.jpg',
    tags: ['Video Editing', 'Workflow', 'Motion Graphics'],
  },
  {
    id: 'content-management',
    title: 'Content Pipeline Optimization',
    client: 'Educational Creator (25k+ subs)',
    category: 'Content Management',
    role: 'Content Strategy & Systems',
    description: 'Designed and implemented a content management system for consistent publishing and analytics tracking.',
    problem: 'Disorganized content creation process causing missed deadlines and inefficient resource allocation.',
    solution: 'Built comprehensive content management system with automated scheduling, performance tracking, and workflow optimization.',
    outcome: '200% increase in content output, 40% improvement in engagement',
    tools: ['Notion', 'Google Workspace', 'Buffer', 'YouTube Studio', 'Analytics APIs'],
    image: '/work-system-1.jpg',
    tags: ['Content Management', 'Analytics', 'Automation'],
  },
  {
    id: 'technical-support',
    title: 'Channel Optimization',
    client: 'Gaming Influencer (75k+ subs)',
    category: 'IT / Technical Support',
    role: 'Technical Consultant',
    description: 'Comprehensive channel audit and optimization including SEO, thumbnails, and algorithm strategy.',
    problem: 'Underperforming channel despite quality content, unclear technical issues affecting discoverability and engagement.',
    solution: 'Conducted full technical audit, optimized channel settings, improved SEO strategy, and implemented performance monitoring systems.',
    outcome: '300% increase in organic reach, improved search rankings',
    tools: ['YouTube Studio', 'Google Analytics', 'SEMrush', 'TubeBuddy', 'Custom Dashboards'],
    image: '/work-tech-1.jpg',
    tags: ['SEO', 'Analytics', 'Strategy'],
  },
  {
    id: 'brand-redesign',
    title: 'Complete Brand Refresh',
    client: 'Business Coach (30k+ subs)',
    category: 'Thumbnail Design',
    role: 'Brand Designer & Strategist',
    description: 'Full brand redesign including thumbnails, channel art, and content strategy for professional positioning.',
    problem: 'Generic branding failing to communicate expertise and attract premium clients in competitive market.',
    solution: 'Complete brand overhaul with professional visual identity, consistent thumbnail system, and strategic content positioning.',
    outcome: '250% increase in subscriber growth rate, premium client acquisition',
    tools: ['Figma', 'Photoshop', 'Illustrator', 'Brand Strategy Framework', 'Content Strategy'],
    image: '/work-brand-1.jpg',
    tags: ['Branding', 'Strategy', 'Design'],
  },
  {
    id: 'viral-campaign',
    title: 'Viral Content Series',
    client: 'Comedy Skits Creator (200k+ subs)',
    category: 'Video Editing',
    role: 'Creative Director & Editor',
    description: 'Directed and edited a viral content series with rapid turnaround and trend analysis.',
    problem: 'Missed viral opportunities due to slow editing turnaround and lack of trend awareness.',
    solution: 'Established rapid-response editing pipeline with trend monitoring, quick-turnaround editing, and strategic release timing.',
    outcome: 'Multiple videos exceeding 1M+ views, significant follower growth',
    tools: ['CapCut', 'TikTok Analytics', 'Trend Research Tools', 'Rapid Editing Suite'],
    image: '/work-viral-1.jpg',
    tags: ['Viral Content', 'Editing', 'Trend Analysis'],
  },
];

const WorkPage = () => {
  const [selectedWork, setSelectedWork] = useState<typeof workItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (work: typeof workItems[0]) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  return (
    <div>
      <Head>
        <title>Our Work – Aryavrat Studios | Creator Portfolio & Case Studies</title>
        <meta name="description" content="See how we've helped creators scale with custom thumbnails, video editing, and technical support. Real results and case studies." />
        <meta property="og:title" content="Our Work – Aryavrat Studios" />
        <meta property="og:description" content="Portfolio of successful creator collaborations. From thumbnails that convert to systems that scale." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20">
        <section className="py-20 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-h1 font-bold text-brand-white mb-6">Our Work</h1>
              <p className="text-body text-brand-light-gray max-w-3xl mx-auto">
                Real projects, real results. We work with creators at every stage, from emerging channels to established brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {workItems.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <WorkCard work={work} onClick={() => openModal(work)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="section-divider mt-20"></div>
        </section>

        <section className="py-20 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold text-brand-white mb-8">Ready to See Results Like These?</h2>
            <p className="text-body text-brand-light-gray mb-12 max-w-2xl mx-auto">
              Most of our clients see measurable improvements within the first month. Let's discuss your goals.
            </p>
            <a
              href="mailto:aryavrat.studios@gmail.com"
              className="inline-block bg-brand-white/95 text-brand-black px-8 py-4 rounded-lg font-semibold hover:bg-brand-white shadow-soft hover:shadow-medium transition-all duration-300 backdrop-blur-sm"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WorkModal work={selectedWork} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default WorkPage;