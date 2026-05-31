import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, RotateCcw } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'bug' | 'error' | 'warning' | 'shield' | 'boost';
}

interface Bug extends GameObject {
  type: 'bug';
  vx: number;
  vy: number;
}

interface PowerUp extends GameObject {
  type: 'shield' | 'boost';
  life: number;
}

export default function BugDodger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const stored = localStorage.getItem('bugDodgerHighScore');
    return stored ? parseInt(stored) : 0;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef({
    player: { x: 150, y: 300, width: 30, height: 30 } as GameObject,
    bugs: [] as Bug[],
    powerups: [] as PowerUp[],
    score: 0,
    combo: 0,
    difficulty: 1,
    shield: false,
    shieldLife: 0,
    boost: false,
    boostTime: 0,
  });

  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isGameActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;

    const spawnBug = () => {
      const types: ('bug' | 'error' | 'warning')[] = ['bug', 'error', 'warning'];
      const type = types[Math.floor(Math.random() * types.length)];
      const bug: Bug = {
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        type: type as any,
        vx: (Math.random() - 0.5) * 1.1,
        vy: 0.75 + gameState.difficulty * 0.16,
      };
      gameState.bugs.push(bug);
    };

    const spawnPowerUp = () => {
      if (Math.random() > 0.95) {
        const type: ('shield' | 'boost')[] = Math.random() > 0.5 ? ['shield'] : ['boost'];
        const powerUp: PowerUp = {
          x: Math.random() * (canvas.width - 20),
          y: -20,
          width: 20,
          height: 20,
          type: type[0],
          life: 300,
        };
        gameState.powerups.push(powerUp);
      }
    };

    const drawEntity = (obj: GameObject, color: string, icon: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(obj.x, obj.y, obj.width, obj.height, 5);
      ctx.fill();

      ctx.fillStyle = '#080810';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, obj.x + obj.width / 2, obj.y + obj.height / 2);

      if (gameState.shield && obj === gameState.player) {
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, 25, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const checkCollision = (rect1: GameObject, rect2: GameObject) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };

    let frameCount = 0;
    let animId: number;

    const gameLoop = () => {
      frameCount++;

      // Clear canvas
      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Update player
      const moveSpeed = gameState.boost ? 6 : 4;
      if (keys.current['arrowleft'] || keys.current['a']) gameState.player.x -= moveSpeed;
      if (keys.current['arrowright'] || keys.current['d']) gameState.player.x += moveSpeed;
      if (keys.current['arrowup'] || keys.current['w']) gameState.player.y -= moveSpeed;
      if (keys.current['arrowdown'] || keys.current['s']) gameState.player.y += moveSpeed;

      gameState.player.x = Math.max(0, Math.min(canvas.width - gameState.player.width, gameState.player.x));
      gameState.player.y = Math.max(0, Math.min(canvas.height - gameState.player.height, gameState.player.y));

      // Draw player
      drawEntity(gameState.player, gameState.boost ? '#fbbf24' : '#00d4ff', '◆');

      // Spawn bugs
      const bugSpawnInterval = Math.round(Math.max(80 - gameState.difficulty * 6, 42)); // reduced for better playability
      if (frameCount % bugSpawnInterval === 0 && gameState.bugs.length < 5) {
        spawnBug();
      }

      // Spawn powerups
      if (frameCount % 100 === 0) {
        spawnPowerUp();
      }

      // Update and draw bugs
      gameState.bugs = gameState.bugs.filter((bug) => {
        bug.x += bug.vx;
        bug.y += bug.vy;

        if (bug.y > canvas.height) return false;

        const colors: Record<string, string> = {
          bug: '#ef4444',
          error: '#dc2626',
          warning: '#f97316',
        };
        drawEntity(bug, colors[bug.type] || '#ef4444', bug.type === 'bug' ? '◇' : '⚠');

        if (checkCollision(gameState.player, bug)) {
          if (gameState.shield) {
            gameState.shield = false;
            gameState.shieldLife = 0;
            gameState.score += 50;
            gameState.combo++;
            return false;
          } else {
            setIsGameActive(false);
            if (gameState.score > highScore) {
              setHighScore(gameState.score);
              localStorage.setItem('bugDodgerHighScore', gameState.score.toString());
            }
            setScore(gameState.score);
            return false;
          }
        }

        return true;
      });

      // Update and draw powerups
      gameState.powerups = gameState.powerups.filter((powerup) => {
        powerup.life--;
        powerup.y += 1;

        if (powerup.y > canvas.height || powerup.life <= 0) return false;

        const color = powerup.type === 'shield' ? '#06b6d4' : '#fbbf24';
        const icon = powerup.type === 'shield' ? '◉' : '↑';
        drawEntity(powerup, color, icon);

        if (checkCollision(gameState.player, powerup)) {
          if (powerup.type === 'shield') {
            gameState.shield = true;
            gameState.shieldLife = 300;
          } else {
            gameState.boost = true;
            gameState.boostTime = 200;
          }
          gameState.score += 100;
          gameState.combo++;
          return false;
        }

        return true;
      });

      // Update buffs
      if (gameState.shield) {
        gameState.shieldLife--;
        if (gameState.shieldLife <= 0) gameState.shield = false;
      }
      if (gameState.boost) {
        gameState.boostTime--;
        if (gameState.boostTime <= 0) gameState.boost = false;
      }

      // Update score
      gameState.score += 1;
      if (frameCount % 300 === 0) gameState.difficulty += 0.25;

      setScore(gameState.score);

      // Draw HUD
      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${Math.floor(gameState.score)}`, 10, 30);
      ctx.fillText(`Combo: ${gameState.combo}x`, 10, 55);

      if (gameState.shield) {
        ctx.fillStyle = '#06b6d4';
        ctx.fillText('SHIELD ACTIVE', 10, 80);
      }
      if (gameState.boost) {
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('SPEED BOOST', 10, 80);
      }

      animId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => cancelAnimationFrame(animId);
  }, [isGameActive, highScore]);

  const startGame = () => {
    gameStateRef.current = {
      player: { x: 150, y: 300, width: 30, height: 30 },
      bugs: [],
      powerups: [],
      score: 0,
      combo: 0,
      difficulty: 1,
      shield: false,
      shieldLife: 0,
      boost: false,
      boostTime: 0,
    };
    setScore(0);
    setIsGameActive(true);
  };

  const closeGame = () => {
    setIsOpen(false);
    setIsGameActive(false);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            boxShadow: '0 4px 30px rgba(168, 85, 247, 0.4)',
          }}
          aria-label="Play Bug Dodger game"
        >
          <Play size={20} className="ml-1" />
        </motion.button>
      )}

      {/* Game modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={closeGame}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#080810] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Bug Dodger</h2>
                  <p className="text-slate-400 text-sm">Dodge bugs, avoid errors, stay sharp!</p>
                </div>
                <button
                  onClick={closeGame}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Game area */}
              {!isGameActive ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-6">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold text-[#00d4ff]">{score}</div>
                      <div className="text-slate-400 text-xs mt-1">Last Score</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold text-[#fbbf24]">{highScore}</div>
                      <div className="text-slate-400 text-xs mt-1">High Score</div>
                    </div>
                  </div>

                  <div className="space-y-3 w-full text-sm text-slate-300">
                    <p>Arrow keys / WASD to move</p>
                    <p>Dodge red bugs and warnings</p>
                    <p>Collect shields and boosts</p>
                    <p>Difficulty increases over time</p>
                  </div>

                  <button
                    onClick={startGame}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Play size={18} />
                    {score > 0 ? 'Play Again' : 'Start Game'}
                  </button>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={400}
                  className="w-full h-auto block bg-[#0a0a12]"
                  style={{ imageRendering: 'pixelated' }}
                />
              )}

              {/* Controls hint */}
              {isGameActive && (
                <div className="p-4 bg-[#0a0a12] border-t border-white/5 text-xs text-slate-400 flex items-center justify-between">
                  <span>🎮 Arrow keys or WASD to move</span>
                  <button
                    onClick={closeGame}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Close (ESC)
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
