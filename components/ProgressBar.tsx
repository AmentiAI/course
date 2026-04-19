interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProgressBar({
  progress,
  showLabel = false,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={className}>
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className="h-full gradient-brand transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs font-medium text-slate-500 mt-1.5">
          {clampedProgress}% complete
        </p>
      )}
    </div>
  );
}

export function CircularProgress({
  progress,
  size = 48,
}: {
  progress: number;
  size?: number;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-[#0a2540] transition-all duration-300"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-slate-700">
        {Math.round(clampedProgress)}%
      </span>
    </div>
  );
}
