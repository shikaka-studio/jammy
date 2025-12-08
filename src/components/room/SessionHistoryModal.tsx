import { useState, RefObject } from 'react';
import Modal from '@/ui/Modal';
import type { RoomSession, HistorySong } from '@/types/room';
import { HISTORY_MODAL } from '@/constants/room';
import SpotifyIcon from '@/icons/SpotifyIcon';

interface SessionHistoryModalProps {
  modalRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
  sessions: RoomSession[];
}

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
  >
    <polyline points='6 9 12 15 18 9' />
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

const SessionItem = ({ session, isExpanded, onToggle, onExport }: SessionItemProps) => {
  const songCount = session.songs.length;
  const songLabel = songCount === 1 ? HISTORY_MODAL.SONG_LABEL : HISTORY_MODAL.SONGS_LABEL;

  return (
    <div className='border-border bg-surface hover:border-border rounded-xl border transition-colors'>
      {/* Session header */}
      <button onClick={onToggle} className='flex w-full items-center justify-between p-4 text-left'>
        <div>
          <h3 className='text-text-primary text-sm font-medium capitalize'>
            {formatSessionDate(session.date)}
          </h3>
          <p className='text-text-secondary text-xs'>
            {songCount} {songLabel}
          </p>
        </div>
        <ChevronIcon isExpanded={isExpanded} />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className='border-border border-t px-4 pb-4'>
          {/* Songs list */}
          <div className='hide-scrollbar mt-3 max-h-64 space-y-2 overflow-y-auto'>
            {session.songs.map((song, index) => (
              <SessionSongItem key={`${song.id}-${index}`} song={song} />
            ))}
          </div>

          {/* Export button */}
          <button
            onClick={() => onExport(session)}
            className='bg-primary text-background hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition'
          >
            <SpotifyIcon className='h-5 w-5' />
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
  <div className='hover:bg-surface-hover flex items-center gap-3 rounded-lg p-2 transition'>
    <img src={song.albumCover} alt={song.name} className='h-10 w-10 rounded object-cover' />
    <div className='min-w-0 flex-1'>
      <p className='text-text-primary truncate text-sm font-medium'>{song.name}</p>
      <p className='text-text-secondary truncate text-xs'>{song.artist}</p>
    </div>
    <span className='text-text-tertiary shrink-0 text-xs'>{formatPlayedTime(song.playedAt)}</span>
  </div>
);

const SessionHistoryModal = ({ modalRef, isOpen, onClose, sessions }: SessionHistoryModalProps) => {
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
    <Modal modalRef={modalRef} isOpen={isOpen} onClose={onClose} title={HISTORY_MODAL.TITLE}>
      <Modal.Body>
        {sessions.length === 0 && (
          <p className='text-text-secondary py-8 text-center text-sm'>
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
      </Modal.Body>
    </Modal>
  );
};

export default SessionHistoryModal;
