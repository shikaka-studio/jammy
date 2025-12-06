import { useState, useRef, useCallback, useEffect } from 'react';
import type { QueueSong, HistorySong, RoomSession, QueueTabType, ChatMessage } from '@/types/room';
import { QUEUE_TABS } from '@/constants/room';
import QueueItem from './QueueItem';
import SessionHistoryModal from './SessionHistoryModal';
import RoomChat from './RoomChat';

const MIN_WIDTH = 320;
const MAX_WIDTH = 640;

interface SongQueueTabsProps {
  queue: QueueSong[];
  recentSongs: HistorySong[];
  sessions: RoomSession[];
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SongQueueTabs = ({ queue, recentSongs, sessions, messages, onSendMessage }: SongQueueTabsProps) => {
  const [activeTab, setActiveTab] = useState<QueueTabType>('queue');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;

      setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    // Change body cursor while resizing
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const tabs: { key: QueueTabType; label: string }[] = [
    { key: 'queue', label: QUEUE_TABS.QUEUE },
    { key: 'recent', label: QUEUE_TABS.RECENT },
    { key: 'chat', label: QUEUE_TABS.CHAT },
  ];

  const renderContent = () => {
    if (activeTab === 'queue') {
      if (queue.length === 0) {
        return (
          <p className="text-center text-sm text-text-secondary">
            No songs in queue
          </p>
        );
      }
      return queue.map((song) => <QueueItem key={song.id} song={song} />);
    }

    if (activeTab === 'chat') {
      return <RoomChat messages={messages} onSendMessage={onSendMessage} />;
    }

    if (recentSongs.length === 0) {
      return (
        <p className="text-center text-sm text-text-secondary">
          No recent songs
        </p>
      );
    }

    return recentSongs.map((song) => (
      <div
        key={`${song.id}-${song.playedAt.getTime()}`}
        className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-surface-hover"
      >
        <img
          src={song.albumCover}
          alt={song.name}
          className="h-12 w-12 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-primary">
            {song.name}
          </p>
          <p className="truncate text-xs text-text-secondary">{song.artist}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex h-full flex-col rounded-2xl bg-background-elevated p-4"
        style={{ width: `${width}px`, minWidth: `${MIN_WIDTH}px`, maxWidth: `${MAX_WIDTH}px` }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`absolute left-0 top-0 h-full w-1 cursor-ew-resize rounded-l-2xl transition-colors hover:bg-primary/50 ${isResizing ? 'bg-primary' : 'bg-transparent'
            }`}
        />

        {/* Header with tabs and history icon */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1 rounded-lg bg-background-elevated-2 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${activeTab === tab.key
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsHistoryOpen(true)}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-surface-hover hover:text-primary"
            title="View session history"
          >
            <HistoryIcon />
          </button>
        </div>

        {/* Content */}
        <div className="hide-scrollbar flex-1 space-y-2 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      <SessionHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        sessions={sessions}
      />
    </>
  );
};

export default SongQueueTabs;

