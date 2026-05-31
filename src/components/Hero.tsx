import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const TITLES = ['Full Stack Developer', 'MERN Stack Engineer', 'AI/ML Enthusiast', 'DSA Problem Solver'];
const PROFILE_IMAGE_SRC = '/absolute me.png';
const LazyHeroModel = lazy(() => import('./HeroModel'));

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function TypewriterText() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 40);
      } else {
        setDeleting(false);
        setTitleIdx((t) => (t + 1) % TITLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, titleIdx]);

  return (
    <span className="text-[#00d4ff]">
      {displayText}
      <span className="animate-[blink_1s_step-end_infinite] text-[#00d4ff]/70">|</span>
    </span>
  );
}

function ProfileHeroImage() {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);

  return (
    <div className="relative flex min-h-[410px] sm:min-h-[500px] lg:min-h-[620px] items-center justify-center -mt-4 lg:mt-0 overflow-visible">
      <motion.div
        aria-hidden
        className="absolute h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.2),transparent_68%)] blur-xl"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.94, 1.04, 0.94] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 0.25 },
          scale: { duration: 0.7, delay: 0.25 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        onPointerEnter={() => setShouldLoadModel(true)}
        onFocus={() => setShouldLoadModel(true)}
        className="group relative h-[310px] w-[310px] cursor-pointer rounded-full outline-none [perspective:1000px] sm:h-[390px] sm:w-[390px] lg:h-[450px] lg:w-[450px]"
        tabIndex={0}
        role="img"
        aria-label="Kushal Kumar Parakandla profile image. Hover to reveal 3D model."
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,255,255,0),rgba(0,255,255,0.85),rgba(14,165,233,0.18),rgba(0,255,255,0))] opacity-70 blur-[1px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        <div className="absolute inset-2 rounded-full [transform-style:preserve-3d] transition-transform duration-[600ms] ease-in-out group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex items-center justify-center rounded-full [backface-visibility:hidden]">
            <img
              src={PROFILE_IMAGE_SRC}
              alt="Kushal Kumar Parakandla"
              draggable={false}
              className="h-full w-full rounded-full object-cover shadow-[0_0_42px_rgba(0,255,255,0.32),inset_0_0_22px_rgba(0,255,255,0.14)] ring-[3px] ring-[#00ffff]/55 transition-shadow duration-300 group-hover:shadow-[0_0_64px_rgba(0,255,255,0.48),inset_0_0_24px_rgba(0,255,255,0.16)]"
            />
          </div>

          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_58px_rgba(0,255,255,0.34)] ring-[3px] ring-[#00ffff]/45 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {shouldLoadModel && (
              <Canvas
                camera={{ position: [0, 1, 4], fov: 35 }}
                dpr={[1, 1.5]}
                frameloop="demand"
                gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
                className="h-full w-full"
              >
                <ambientLight intensity={1.8} />
                <directionalLight position={[3, 4, 5]} intensity={2.2} />
                <directionalLight position={[-3, 2, 2]} intensity={0.9} />
                <Suspense fallback={null}>
                  <LazyHeroModel />
                </Suspense>
              </Canvas>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080810]"
    >
      <ParticleCanvas />
      <div className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00d4ff]/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] gap-6 lg:gap-10 items-center min-h-[calc(100vh-80px)]">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-[#00d4ff] text-sm font-medium">B.Tech CSE — Vignan University</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight"
            >
              Kushal Kumar
              <br />
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">
                Parakandla
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-6 h-10"
            >
              <TypewriterText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Building scalable full-stack applications and intelligent AI-driven solutions.
              Technical Team Lead with a passion for solving real-world problems through code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <a href="#projects" className="btn-primary flex items-center justify-center gap-2 text-base group">
                View Projects
                <motion.div whileHover={{ x: 4 }}>
                  <ArrowRight size={18} />
                </motion.div>
              </a>
              <a href="#contact" className="btn-ghost flex items-center justify-center gap-2 text-base">
                <Download size={18} /> Hire Me
              </a>
            </motion.div>
          </div>

          {/* Right: animated profile */}
          <ProfileHeroImage />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00d4ff]/50 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
