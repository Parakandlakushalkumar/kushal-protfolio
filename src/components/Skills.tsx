import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, LayoutGrid as Layout, Server, Database, Brain, Wrench } from 'lucide-react';

const skillGroups = [
  {
    category: 'Languages',
    icon: Code2,
    color: '#00d4ff',
    skills: ['C', 'Java', 'Python', 'JavaScript'],
  },
  {
    category: 'Frontend',
    icon: Layout,
    color: '#06b6d4',
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: Server,
    color: '#0ea5e9',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Databases',
    icon: Database,
    color: '#38bdf8',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    category: 'AI / ML',
    icon: Brain,
    color: '#7dd3fc',
    skills: ['TensorFlow', 'Scikit-learn'],
  },
  {
    category: 'Tools & DevOps',
    icon: Wrench,
    color: '#bae6fd',
    skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'Render', 'VS Code'],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#00d4ff]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="section-heading">Skills & Technologies</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map(({ category, icon: Icon, color, skills }) => (
            <motion.div
              key={category}
              variants={item}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 group transition-all duration-300"
              style={{
                borderColor: `${color}20`,
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-white font-semibold">{category}</h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      background: `${color}10`,
                      color: color,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Bottom accent bar */}
              <div
                className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
