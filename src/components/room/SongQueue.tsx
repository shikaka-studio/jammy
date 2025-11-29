import type { QueueSong } from '@/types/room';
import { ROOM_TEXTS } from '@/constants/room';
import QueueItem from './QueueItem';

interface SongQueueProps {
  queue: QueueSong[];
}

const SongQueue = ({ queue }: SongQueueProps) => (
  <div className="flex h-full flex-col rounded-2xl bg-background-elevated p-4 min-w-80">
    <h2 className="mb-3 text-lg font-semibold text-text-primary">
      {ROOM_TEXTS.QUEUE_TITLE}
    </h2>
    <div className="hide-scrollbar flex-1 space-y-2 overflow-y-auto">
      {queue.length === 0 && (
        <p className="text-center text-sm text-text-secondary">
          No songs in queue
        </p>
      )}
      {queue.map((song) => (
        <QueueItem key={song.id} song={song} />
      ))}
    </div>
  </div>
);

export default SongQueue;

