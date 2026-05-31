import { Linkedin, Github, Code2, ChefHat, Heart } from 'lucide-react';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kushalkumar-tech/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/parakandlakushalkumar', icon: Github },
  { label: 'LeetCode', href: 'https://leetcode.com/u/kushalkumarf58/', icon: Code2 },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/kushalkumarf58', icon: ChefHat },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#04040a] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center font-bold text-black text-sm">
                K
              </div>
              <span className="font-semibold text-white">
                Kushal<span className="text-[#00d4ff]">.</span>dev
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Full Stack Developer & AI Enthusiast building solutions that matter.
              Based in India, open to global opportunities.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white text-sm font-semibold mb-3">Navigation</p>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-slate-500 hover:text-[#00d4ff] text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-white text-sm font-semibold mb-3">Social</p>
            <div className="flex gap-3">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">Available for Internships</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Kushal Kumar Parakandla. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            Built with <Heart size={13} className="text-red-500/70" /> using React, Three.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
