import { useState, useRef, useCallback, useEffect, RefObject } from 'react';
import type { QueueSong, HistorySong, RoomSession, QueueTabType, ChatMessage } from '@/types/room';
import useModal from '@/hooks/useModal';
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
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='h-5 w-5'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </svg>
);

const SongQueueTabs = ({
  queue,
  recentSongs,
  sessions,
  messages,
  onSendMessage,
}: SongQueueTabsProps) => {
  const [activeTab, setActiveTab] = useState<QueueTabType>('queue');
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { modalRef, isOpen, openModal, closeModal } = useModal();

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
        return <p className='text-text-secondary text-center text-sm'>No songs in queue</p>;
      }
      return queue.map((song) => <QueueItem key={song.id} song={song} />);
    }

    if (activeTab === 'chat') {
      return <RoomChat messages={messages} onSendMessage={onSendMessage} />;
    }

    if (recentSongs.length === 0) {
      return <p className='text-text-secondary text-center text-sm'>No recent songs</p>;
    }

    return recentSongs.map((song) => (
      <QueueItem key={`${song.id}-${song.playedAt.getTime()}`} song={song} />
    ));
  };

  return (
    <>
      <div
        ref={containerRef}
        className='bg-background-elevated relative flex max-h-[500px] min-h-[500px] flex-col rounded-2xl p-4 max-sm:w-full! max-sm:max-w-full! max-sm:min-w-full! sm:h-full sm:max-h-full'
        style={{ width: `${width}px`, minWidth: `${MIN_WIDTH}px`, maxWidth: `${MAX_WIDTH}px` }}
      >
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`hover:bg-primary/50 absolute top-0 left-0 h-full w-1 cursor-ew-resize rounded-l-2xl transition-colors ${
            isResizing ? 'bg-primary' : 'bg-transparent'
          }`}
        />

        {/* Header with tabs and history icon */}
        <div className='mb-3 flex items-center justify-between'>
          <div className='bg-background-elevated-2 flex gap-1 rounded-lg p-1'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-primary text-background shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={openModal}
            className='text-text-secondary hover:bg-surface-hover hover:text-primary rounded-lg p-2 transition'
            title='View session history'
          >
            <HistoryIcon />
          </button>
        </div>

        {/* Content */}
        <div className='min-h-0 flex-1 space-y-2 overflow-y-auto'>{renderContent()}</div>
      </div>

      <SessionHistoryModal
        modalRef={modalRef as RefObject<HTMLDivElement>}
        isOpen={isOpen}
        onClose={closeModal}
        sessions={sessions}
      />
    </>
  );
};

export default SongQueueTabs;
