import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Mail, Linkedin, Github, Code2, ChefHat } from 'lucide-react';

const whatsappMessage = encodeURIComponent(
  "Hi Kushal! I came across your portfolio and I'm impressed by your work. I'd like to discuss potential internship/collaboration opportunities with you."
);

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kushalkumar-tech/',
    icon: Linkedin,
    color: '#0077b5',
    description: 'Professional network',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/parakandlakushalkumar',
    icon: Github,
    color: '#e2e8f0',
    description: 'Open source projects',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/kushalkumarf58/',
    icon: Code2,
    color: '#ffa116',
    description: 'DSA practice',
  },
  {
    label: 'CodeChef',
    href: 'https://www.codechef.com/users/kushalkumarf58',
    icon: ChefHat,
    color: '#5b4638',
    description: 'Competitive programming',
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 bg-[#080810] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4ff]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading">Let's Work Together</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Open to internships and collaborative opportunities.
            <span className="text-white"> Let's build something remarkable.</span>
          </p>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/919392019653?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              boxShadow: '0 0 30px rgba(37, 211, 102, 0.3)',
            }}
          >
            <MessageCircle size={22} />
            <span>Message on WhatsApp</span>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:parakandlakushal10@gmail.com?subject=Internship%20Opportunity&body=Hi%20Kushal%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20potential%20opportunity."
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 btn-primary"
          >
            <Mail size={22} />
            <span>Hire Me via Email</span>
          </motion.a>
        </motion.div>

        {/* Contact info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card border border-white/10 p-8 mb-12 text-center"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                <Mail size={18} className="text-[#00d4ff]" />
              </div>
              <div className="text-slate-400 text-sm">Email</div>
              <a
                href="mailto:parakandlakushal10@gmail.com"
                className="text-white font-medium hover:text-[#00d4ff] transition-colors text-sm"
              >
                parakandlakushal10@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div className="text-slate-400 text-sm">WhatsApp</div>
              <a
                href={`https://wa.me/919392019653`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-green-400 transition-colors text-sm"
              >
                +91 93920 19653
              </a>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-center text-slate-500 text-sm mb-6 font-mono tracking-widest uppercase">Find me online</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map(({ label, href, icon: Icon, color, description }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card border border-white/10 p-4 flex flex-col items-center gap-2 text-center group transition-all duration-300 hover:border-white/20"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="text-white font-medium text-sm">{label}</div>
                <div className="text-slate-500 text-xs">{description}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
