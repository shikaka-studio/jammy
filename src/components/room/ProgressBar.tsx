import { formatTime } from '@/utils/format';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek?: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSeek) return;
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, clickPosition * duration));
    onSeek(newTime);
  };

  return (
    <div className="w-full">
      <div
        className="group relative h-2 cursor-pointer rounded-full bg-background-light"
        onClick={handleClick}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-text-primary transition-all group-hover:bg-primary pointer-events-none"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          aria-label="Seek"
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-text-secondary">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

