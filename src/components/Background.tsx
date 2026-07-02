import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Persistent background used on every page: aurora gradient, twinkling
 * starfield, softly drifting light particles, and a glow that follows
 * the mouse (or last touch point) around the screen.
 */
function Comet() {
  return (
    <motion.div
      className="pointer-events-none fixed -z-10 h-px w-24"
      style={{
        left: "6%",
        bottom: "18%",
        background: "linear-gradient(90deg, transparent, rgba(233,220,255,0.9))",
        borderRadius: 999,
        transformOrigin: "right center",
        rotate: -35,
      }}
      initial={{ opacity: 0, x: -40, y: 30 }}
      animate={{ opacity: [0, 1, 0], x: [-40, 60], y: [30, -50] }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 6, ease: "easeOut" }}
    />
  );
}

export default function Background() {
  const starsRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Mouse-following glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const move = (x: number, y: number) => {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = "1";
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) move(t.clientX, t.clientY);
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // Starfield
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let stars: { x: number; y: number; r: number; speed: number; phase: number }[] = [];
    let raf = 0;
    let t = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      const count = Math.floor((canvas!.width * canvas!.height) / 11000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.1 + 0.2,
        speed: Math.random() * 0.5 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.018;
      stars.forEach((s) => {
        const tw = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = 0.15 + tw * 0.55;
        ctx.fillStyle = "#f3edf9";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Drifting light particles
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    type Orb = { x: number; y: number; r: number; speed: number; drift: number; hue: string };
    const spawn = (randomY: boolean): Orb => ({
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * canvas!.height : canvas!.height + 30,
      r: 2 + Math.random() * 3,
      speed: 0.14 + Math.random() * 0.26,
      drift: (Math.random() - 0.5) * 0.4,
      hue: Math.random() > 0.5 ? "201,168,232" : "232,200,128",
    });

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    let orbs: Orb[] = Array.from({ length: 16 }, () => spawn(true));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach((o) => {
        o.y -= o.speed;
        o.x += Math.sin(o.y * 0.008) * o.drift;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 4);
        grad.addColorStop(0, `rgba(${o.hue},0.5)`);
        grad.addColorStop(1, `rgba(${o.hue},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 4, 0, Math.PI * 2);
        ctx.fill();
        if (o.y < -20) Object.assign(o, spawn(false));
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Occasional shooting star / comet streak */}
      <Comet />

      {/* Base aurora gradient — stays identical across every page */}
      <div
        className="fixed inset-0 -z-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 18% 8%, rgba(166,99,209,0.26), transparent 60%), radial-gradient(ellipse 65% 45% at 85% 12%, rgba(201,168,232,0.16), transparent 60%), radial-gradient(ellipse 55% 35% at 50% 100%, rgba(232,200,128,0.08), transparent 60%), linear-gradient(180deg, #08040f 0%, #120a22 45%, #1c0f34 100%)",
        }}
      />
      <motion.div
        className="fixed inset-0 -z-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(166,99,209,0.10), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <canvas ref={starsRef} className="fixed inset-0 -z-20 pointer-events-none" />
      <canvas ref={particlesRef} className="fixed inset-0 -z-10 pointer-events-none" />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -z-10 pointer-events-none rounded-full opacity-0 transition-opacity duration-500"
        style={{
          width: 440,
          height: 440,
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(201,168,232,0.18) 0%, rgba(166,99,209,0.09) 35%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </>
  );
}
