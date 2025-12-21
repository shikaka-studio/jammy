interface RoomHeaderProps {
  roomName: string | undefined;
  memberCount: number;
  isHost: boolean;
  onLeaveRoom: () => void;
  onCloseRoom: () => void;
}

const RoomHeader = ({ roomName, memberCount, isHost, onLeaveRoom, onCloseRoom }: RoomHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-text-primary text-2xl font-bold'>{roomName}</h1>
        <p className='text-text-secondary text-sm'>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
          {isHost && <span className='text-primary ml-2'>(Host)</span>}
        </p>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={onLeaveRoom}
          className='border-border text-text-primary hover:bg-surface-hover rounded-xl border bg-transparent px-4 py-2 text-sm font-medium transition'
        >
          Leave
        </button>
        {isHost && (
          <button
            onClick={onCloseRoom}
            className='rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600'
          >
            Close room
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomHeader;
