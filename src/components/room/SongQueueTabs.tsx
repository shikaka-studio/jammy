import { useState } from 'react';
import type { QueueSong, HistorySong, RoomSession, QueueTabType } from '@/types/room';
import { QUEUE_TABS } from '@/constants/room';
import QueueItem from './QueueItem';
import SessionHistoryModal from './SessionHistoryModal';

interface SongQueueTabsProps {
  queue: QueueSong[];
  recentSongs: HistorySong[];
  sessions: RoomSession[];
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

const SongQueueTabs = ({ queue, recentSongs, sessions }: SongQueueTabsProps) => {
  const [activeTab, setActiveTab] = useState<QueueTabType>('queue');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const tabs: { key: QueueTabType; label: string }[] = [
    { key: 'queue', label: QUEUE_TABS.QUEUE },
    { key: 'recent', label: QUEUE_TABS.RECENT },
  ];

  const renderContent = () => {
    if (activeTab === 'queue') {
      if (queue.length === 0) {
        return (
          <p className="text-center text-sm text-text-secondary">
            No hay canciones en cola
          </p>
        );
      }
      return queue.map((song) => <QueueItem key={song.id} song={song} />);
    }

    if (recentSongs.length === 0) {
      return (
        <p className="text-center text-sm text-text-secondary">
          No hay canciones recientes
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
      <div className="flex h-full min-w-80 flex-col rounded-2xl bg-background-elevated p-4">
        {/* Header con tabs e icono de historial */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1 rounded-lg bg-background-elevated-2 p-1">
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
            onClick={() => setIsHistoryOpen(true)}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-surface-hover hover:text-primary"
            title="Ver historial de sesiones"
          >
            <HistoryIcon />
          </button>
        </div>

        {/* Contenido */}
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

