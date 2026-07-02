interface Props {
  className?: string;
}

/** Small "— ♡ —" divider used between text blocks across every page. */
export default function Divider({ className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 text-lilac/50 ${className}`}>
      <span className="h-px w-8 bg-current opacity-60" />
      <span className="text-xs">♡</span>
      <span className="h-px w-8 bg-current opacity-60" />
    </div>
  );
}
