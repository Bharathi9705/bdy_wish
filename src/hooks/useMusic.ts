import { useRef, useState, useCallback, useEffect } from "react";

/**
 * IMPORTANT:
 * This project does not, and will not, ship with the actual copyrighted
 * "Remo" film score bundled in code. Instead, it looks for a local file
 * named `theme.mp3` inside the `public/` folder at runtime. Drop your own
 * legally-owned copy of the audio there (renamed to theme.mp3) and it will
 * play automatically. If that file isn't present, this hook falls back to
 * a short original synthesized instrumental so the experience is never
 * silent.
 */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const usingLocalFileRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/theme.mp3");
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const stopSynth = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  const playSynth = useCallback(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    const ctx = audioCtxRef.current;
    const NOTES: Record<string, number> = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
      G4: 392.0, A4: 440.0, Bb4: 466.16, C5: 523.25,
    };
    const melody: [number, number][] = [
      [NOTES.C4, 1], [NOTES.E4, 1], [NOTES.G4, 1], [NOTES.C5, 2],
      [NOTES.A4, 1], [NOTES.G4, 1], [NOTES.E4, 1], [NOTES.D4, 2],
      [NOTES.E4, 1], [NOTES.F4, 1], [NOTES.G4, 1], [NOTES.A4, 2],
      [NOTES.G4, 1], [NOTES.E4, 1], [NOTES.C4, 2],
    ];
    const beatLen = 0.42;
    let time = ctx.currentTime + 0.05;
    let totalDur = 0;
    melody.forEach(([freq, beats]) => {
      const dur = beats * beatLen;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.13, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.95);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
      time += dur;
      totalDur += dur;
    });
    const id = window.setTimeout(() => {
      if (!usingLocalFileRef.current) playSynth();
    }, totalDur * 1000 + 500);
    timeoutsRef.current.push(id);
  }, []);

  const toggle = useCallback(async () => {
    if (!playing) {
      setPlaying(true);
      try {
        await audioRef.current?.play();
        usingLocalFileRef.current = true;
      } catch {
        usingLocalFileRef.current = false;
        if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
        playSynth();
      }
    } else {
      setPlaying(false);
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      stopSynth();
    }
  }, [playing, playSynth]);

  return { playing, toggle };
}
