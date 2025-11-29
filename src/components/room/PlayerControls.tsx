interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const PlayerControls = ({ isPlaying, onTogglePlay }: PlayerControlsProps) => (
  <div className="flex items-center justify-center gap-6">
    <button
      onClick={onTogglePlay}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-primary transition hover:scale-105 active:scale-95"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <PauseIcon className="h-6 w-6 text-gray-900" />
      ) : (
        <PlayIcon className="h-6 w-6 text-gray-900" />
      )}
    </button>
  </div>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export default PlayerControls;

