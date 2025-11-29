import { useState } from 'react';
import Modal from '@/ui/Modal';
import type { RoomSession, HistorySong } from '@/types/room';
import { HISTORY_MODAL } from '@/constants/room';
import SpotifyIcon from '@/icons/SpotifyIcon';

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: RoomSession[];
}

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const formatSessionDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatPlayedTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface SessionItemProps {
  session: RoomSession;
  isExpanded: boolean;
  onToggle: () => void;
  onExport: (session: RoomSession) => void;
}

const SessionItem = ({
  session,
  isExpanded,
  onToggle,
  onExport,
}: SessionItemProps) => {
  const songCount = session.songs.length;
  const songLabel = songCount === 1 ? HISTORY_MODAL.SONG_LABEL : HISTORY_MODAL.SONGS_LABEL;

  return (
    <div className="rounded-xl border border-border bg-surface transition-colors hover:border-border">
      {/* Session header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div>
          <h3 className="text-sm font-medium capitalize text-text-primary">
            {formatSessionDate(session.date)}
          </h3>
          <p className="text-xs text-text-secondary">
            {songCount} {songLabel}
          </p>
        </div>
        <ChevronIcon isExpanded={isExpanded} />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border px-4 pb-4">
          {/* Songs list */}
          <div className="hide-scrollbar mt-3 max-h-64 space-y-2 overflow-y-auto">
            {session.songs.map((song, index) => (
              <SessionSongItem key={`${song.id}-${index}`} song={song} />
            ))}
          </div>

          {/* Export button */}
          <button
            onClick={() => onExport(session)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-background transition hover:bg-primary/90"
          >
            <SpotifyIcon className="h-5 w-5" />
            {HISTORY_MODAL.EXPORT_BUTTON}
          </button>
        </div>
      )}
    </div>
  );
};

interface SessionSongItemProps {
  song: HistorySong;
}

const SessionSongItem = ({ song }: SessionSongItemProps) => (
  <div className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-surface-hover">
    <img
      src={song.albumCover}
      alt={song.name}
      className="h-10 w-10 rounded object-cover"
    />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-text-primary">
        {song.name}
      </p>
      <p className="truncate text-xs text-text-secondary">{song.artist}</p>
    </div>
    <span className="shrink-0 text-xs text-text-tertiary">
      {formatPlayedTime(song.playedAt)}
    </span>
  </div>
);

const SessionHistoryModal = ({
  isOpen,
  onClose,
  sessions,
}: SessionHistoryModalProps) => {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const handleToggleSession = (sessionId: string) => {
    if (expandedSessionId === sessionId) {
      setExpandedSessionId(null);
      return;
    }
    setExpandedSessionId(sessionId);
  };

  const handleExportToSpotify = (session: RoomSession) => {
    // TODO: Implement Spotify export
    console.log('Exporting session to Spotify:', session);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={HISTORY_MODAL.TITLE}>
      <div className="hide-scrollbar max-h-96 space-y-3 overflow-y-auto">
        {sessions.length === 0 && (
          <p className="py-8 text-center text-sm text-text-secondary">
            {HISTORY_MODAL.EMPTY_MESSAGE}
          </p>
        )}
        {sessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            isExpanded={expandedSessionId === session.id}
            onToggle={() => handleToggleSession(session.id)}
            onExport={handleExportToSpotify}
          />
        ))}
      </div>
    </Modal>
  );
};

export default SessionHistoryModal;

