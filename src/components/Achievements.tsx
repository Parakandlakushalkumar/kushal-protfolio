import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Calendar } from 'lucide-react';

const TARGO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4';

const achievements = [
  {
    icon: Trophy,
    iconColor: '#f59e0b',
    badge: '1st Place',
    badgeColor: '#f59e0b',
    title: 'BYTEXL Hackathon (MongoDB-Sponsored)',
    description:
      'Won first place in a department-level hackathon sponsored by MongoDB at BYTEXL. Built a full-stack application leveraging MongoDB Atlas.',
    year: '2025',
  },
  {
    icon: Award,
    iconColor: '#00d4ff',
    badge: '3rd Place',
    badgeColor: '#00d4ff',
    title: 'AI API Design Hackathon',
    description:
      'Ranked 3rd in a competitive AI-focused hackathon. Designed and implemented a RESTful API integrating multiple AI models for intelligent data processing and response generation.',
    year: '2024',
  },
  {
    icon: Calendar,
    iconColor: '#22c55e',
    badge: 'Leadership',
    badgeColor: '#22c55e',
    title: 'Logistics Lead — College Fest',
    description:
      'Served as the Logistics Lead for the college fest, managing and overseeing 30+ volunteers to ensure smooth coordination and execution of the event.',
    year: '2026',
  },
  {
    icon: Award,
    iconColor: '#f59e0b',
    badge: 'NPTEL Elite',
    badgeColor: '#f59e0b',
    title: 'HR Analytics',
    description:
      'Earned the NPTEL Elite certification in HR Analytics, demonstrating knowledge of data-driven human resource decision-making and workforce analytics.',
    year: '2024',
  },
  {
    icon: Award,
    iconColor: '#f59e0b',
    badge: 'NPTEL Elite',
    badgeColor: '#f59e0b',
    title: 'Principles of Management',
    description:
      'Earned the NPTEL Elite certification in Principles of Management, covering core management concepts, planning, organizing, leadership, and control.',
    year: '2026',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const isSectionActive = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSectionActive) {
      video.currentTime = 0;
      void video.play();
    } else {
      video.pause();
    }
  }, [isSectionActive]);

  return (
    <section id="achievements" ref={sectionRef} className="py-24 bg-[#0a0a12] relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.22]"
        >
          <source src={TARGO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgba(0,10,20,0.45)] mix-blend-color" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.25)_40%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_55%_65%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
      </div>
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00d4ff]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Recognition</p>
          <h2 className="section-heading">Achievements & Leadership</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/40 via-[#00d4ff]/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {achievements.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div
                      className="w-5 h-5 rounded-full border-2 bg-[#080810]"
                      style={{ borderColor: item.iconColor, boxShadow: `0 0 12px ${item.iconColor}60` }}
                    />
                  </div>

                  {/* Spacer for center alignment (desktop) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-6 border border-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30` }}
                        >
                          <item.icon size={22} style={{ color: item.iconColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                              style={{
                                background: `${item.badgeColor}1`,
                                color: item.badgeColor,
                                border: `1px solid ${item.badgeColor}30`,
                              }}
                            >
                              {item.badge}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">{item.year}</span>
                          </div>
                          <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div
                        className="mt-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(90deg, ${item.iconColor}, transparent)` }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
