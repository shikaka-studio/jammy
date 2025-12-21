import { formatTime } from '@/utils/format';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek?: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek?.(newTime);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, clickPosition * duration));
    onSeek?.(newTime);
  };

  return (
    <div className='w-full'>
      <div
        className='group bg-background-light relative h-2 cursor-pointer rounded-full'
        onClick={handleClick}
      >
        <div
          className='bg-text-primary group-hover:bg-primary pointer-events-none absolute top-0 left-0 h-full rounded-full transition-all'
          style={{ width: `${progress}%` }}
        />
        <input
          type='range'
          min='0'
          max={duration}
          step='0.1'
          value={currentTime}
          onChange={handleChange}
          className='absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0'
          aria-label='Seek'
        />
      </div>
      <div className='text-text-secondary mt-2 flex justify-between text-xs'>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
