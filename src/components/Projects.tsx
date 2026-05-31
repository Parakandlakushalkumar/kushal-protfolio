import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp, Leaf, BookOpen, Building2, Zap, Users } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string[];
  icon: React.ElementType;
  iconColor: string;
  tags: string[];
  metrics: Array<{ label: string; value: string; icon: React.ElementType }>;
  github: string;
  demo: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'agrismart',
    title: 'AgriSmart',
    role: 'Full Stack Developer',
    tagline: 'AI-powered agricultural platform',
    description: 'MERN-based platform connecting farmers and consumers with AI-driven crop disease detection.',
    problem: 'Farmers lack access to real-time market pricing, expert advice, and quality checking. Consumers cannot verify product authenticity.',
    solution: 'Built a two-sided marketplace with TensorFlow-powered disease detection and real-time price tracking. Optimized API workflows for reliable performance.',
    impact: [
      'Reduced disease detection time by 80%',
      'Improved API response time by 60%',
      'Support for 500+ concurrent users',
      'Multi-language interface for rural accessibility',
    ],
    icon: Leaf,
    iconColor: '#22c55e',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TensorFlow', 'REST API'],
    metrics: [
      { label: 'Disease Detection Accuracy', value: '92%', icon: Zap },
      { label: 'API Response Time', value: '120ms', icon: Zap },
      { label: 'Concurrent Users', value: '500+', icon: Users },
    ],
    github: 'https://github.com/parakandlakushalkumar/Aggrismart',
    demo: 'https://digital-agrimart.onrender.com/',
    featured: true,
  },
  {
    id: 'gamified-learning',
    title: 'Gamified Learning Portal',
    role: 'Full Stack Developer',
    tagline: 'Engagement-driven e-learning platform',
    description: 'Interactive platform with gamification mechanics designed for rural and semi-urban students.',
    problem: 'Rural students lack engaging learning experiences due to poor infrastructure and monotonous teaching methods. High dropout rates among underprivileged learners.',
    solution: 'Created a gamified platform with leaderboards, achievement badges, and progress rewards. Optimized for low-bandwidth environments and offline functionality.',
    impact: [
      'Increased student engagement by 45%',
      'Reduced course dropout rate by 35%',
      'Accessible on slow networks (< 2G speeds)',
      'Offline-ready progressive web app',
    ],
    icon: BookOpen,
    iconColor: '#f59e0b',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'PWA'],
    metrics: [
      { label: 'Engagement Increase', value: '45%', icon: Zap },
      { label: 'Dropout Reduction', value: '35%', icon: Users },
      { label: 'Load Time', value: '1.2s', icon: Zap },
    ],
    github: 'https://github.com/parakandlakushalkumar/Digital-Gaming-Website_for-Rural-Education1',
    demo: 'https://dainty-alpaca-a5c263.netlify.app/',
  },
  {
    id: 'hostel-management',
    title: 'Hostel Management System',
    role: 'Full Stack Developer',
    tagline: 'Automated hostel operations',
    description: 'Comprehensive system automating room allocation, complaint tracking, and fee management.',
    problem: 'Manual hostel operations lead to delays, errors in room allocation, and poor complaint resolution. High administrative overhead.',
    solution: 'Developed an automated system with intelligent room allocation algorithm, real-time complaint tracking, and integrated fee management with payment history.',
    impact: [
      'Reduced admin processing time by 70%',
      'Complaint resolution time cut from days to hours',
      'Zero allocation conflicts',
      'Automated fee tracking and reminders',
    ],
    icon: Building2,
    iconColor: '#8b5cf6',
    tags: ['React', 'Express.js', 'MySQL', 'Node.js', 'REST API', 'Admin Dashboard'],
    metrics: [
      { label: 'Admin Time Saved', value: '70%', icon: Zap },
      { label: 'Avg Resolution Time', value: '4hrs', icon: Users },
      { label: 'Monthly Users', value: '300+', icon: Users },
    ],
    github: '#',
    demo: '#',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`glass-card overflow-hidden transition-all duration-300 group ${
        project.featured ? 'border border-[#00d4ff]/30 lg:scale-105' : 'border border-white/10'
      }`}
    >
      {project.featured && (
        <div className="h-1 bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9]" />
      )}

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
              style={{ background: `${project.iconColor}15`, border: `1px solid ${project.iconColor}30` }}
            >
              <project.icon size={24} style={{ color: project.iconColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-bold animate-pulse">
                    Featured
                  </span>
                )}
              </div>
              <div className="text-slate-500 text-xs font-mono">{project.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all group/btn"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/40 transition-all group/btn"
              aria-label="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Tagline & Description */}
        <p className="text-slate-300 font-medium mb-2">{project.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-5 pb-5 border-b border-white/5">
          {project.metrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Icon size={16} className="text-[#00d4ff]" />
              </div>
              <div className="text-white font-bold text-sm">{value}</div>
              <div className="text-slate-500 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-mono hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable case study */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[#00d4ff] text-sm font-medium hover:text-[#00d4ff]/80 transition-colors"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? 'Hide Case Study' : 'View Case Study'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 space-y-4 border-t border-white/5">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-mono font-bold">Problem</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-mono font-bold">Solution</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-mono font-bold">Impact</p>
                  <ul className="space-y-1.5">
                    {project.impact.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="py-24 bg-[#080810] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-[#00d4ff]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">What I've Built</p>
            <h2 className="section-heading">Projects & Case Studies</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto" />
          </motion.div>
        </div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
