import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Lightbulb, Users, Award } from 'lucide-react';

const stats = [
  { label: 'CGPA', value: 7.7, icon: Award, suffix: '' },
  { label: 'Projects Built', value: 10, icon: Code2, suffix: '+' },
  { label: 'Hackathons', value: 3, icon: Lightbulb, suffix: '+' },
  { label: 'Team Leads', value: 5, icon: Users, suffix: '+' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = value * eased;
      setCount(progress >= 1 ? value : Math.floor(next * 100) / 100);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      {typeof count === 'number' && count % 1 !== 0 ? count.toFixed(2) : Math.floor(count)}
      {suffix}
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const revealInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-[#080810] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#00d4ff]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={revealInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Personal Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={revealInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-white font-bold text-lg mb-3">The Developer</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                I'm a <span className="text-[#00d4ff] font-semibold">Computer Science Engineer</span> from
                Vignan's Foundation for Science, Technology & Research, with a deep passion for building
                products that solve real-world problems. My expertise spans the full stack—from elegant React
                frontends to robust Node.js backends, and cutting-edge AI/ML integrations.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-3">The Problem Solver</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                I don't just write code—I architect solutions. Whether it's a MERN platform connecting farmers
                to markets with AI-powered crop disease detection, or a gamified learning portal breaking
                barriers in rural education, I focus on <span className="text-[#00d4ff] font-semibold">impact over features</span>.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-3">The Leader</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                As a Technical Team Lead, I bring both technical depth and strategic vision. I've coordinated
                cross-functional teams, managed project lifecycles, and delivered results under pressure. I
                believe <span className="text-[#00d4ff] font-semibold">great code comes from great teams</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {['Full-Stack Developer', 'Problem Solver', 'AI Enthusiast', 'Team Leader'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={revealInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={revealInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card neon-border p-6 flex items-center gap-4 group transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-[#00d4ff]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={value} suffix={stats[i].suffix} />
                  </div>
                  <div className="text-slate-400 text-sm">{label}</div>
                </div>
              </motion.div>
            ))}

            {/* University Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={revealInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card p-6 border border-white/10 rounded-2xl mt-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center flex-shrink-0">
                  <Award size={22} className="text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Vignan's Foundation for Science,
                  </div>
                  <div className="text-white font-semibold text-sm">Technology & Research</div>
                  <div className="text-slate-400 text-xs mt-1">B.Tech Computer Science Engineering</div>
                  <div className="text-slate-500 text-xs">Class of 2026 • CGPA: 7.7</div>
                </div>
              </div>
            </motion.div>

            {/* Mindset section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card p-5 border border-white/10 rounded-xl"
            >
              <h4 className="text-white font-semibold text-sm mb-2">My Mindset</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Code is a tool to create impact. Performance matters. User experience is sacred. Collaboration
                multiplies results. Every project is an opportunity to learn and grow.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
