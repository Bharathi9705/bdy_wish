interface TopBarProps {
  page: number;
  total: number;
  playing: boolean;
  onToggleMusic: () => void;
}

export default function TopBar({ page, total, playing, onToggleMusic }: TopBarProps) {
  return (
    <>
      <div className="fixed top-6 left-6 md:top-7 md:left-8 z-40 text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-white/60">
        for <span className="text-lilac font-semibold">Barani</span>
      </div>

      <div className="fixed top-5 right-5 md:top-6 md:right-7 z-40 flex items-center gap-3">
        <span className="text-[0.65rem] tracking-[0.25em] text-white/40">
          {page} / {total}
        </span>
        <button
          onClick={onToggleMusic}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur-md transition-all duration-300 ${
            playing
              ? "border-white/25 text-white bg-white/10"
              : "border-white/15 text-white/75 bg-white/5 hover:border-lilac/50"
          }`}
        >
          {playing ? (
            <span className="flex items-center gap-[3px]">
              <span className="block h-3 w-[3px] rounded-sm bg-current" />
              <span className="block h-3 w-[3px] rounded-sm bg-current" />
            </span>
          ) : (
            <span>🎵</span>
          )}
          {playing ? "Pause" : "Play Score"}
        </button>
      </div>
    </>
  );
}
