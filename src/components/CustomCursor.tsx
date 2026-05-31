import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let isHover = false;
    let frameId = 0;
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const current = { x: target.x, y: target.y };

    const render = () => {
      current.x += (target.x - current.x) * 0.28;
      current.y += (target.y - current.y) * 0.28;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x - 4}px, ${current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        const offset = isHover ? 24 : 16;
        ringRef.current.style.transform = `translate3d(${current.x - offset}px, ${current.y - offset}px, 0)`;
      }

      frameId = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label');
      const nextHover = !!interactive;
      if (nextHover !== isHover) {
        isHover = nextHover;
        setIsHovering(nextHover);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    frameId = requestAnimationFrame(render);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          borderRadius: '50%',
          background: '#00d4ff',
          transition: 'width 0.1s, height 0.1s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1.5px solid rgba(0, 212, 255, ${isHovering ? 0.8 : 0.4})`,
          background: isHovering ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(0, 212, 255, 0.3)' : 'none',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
