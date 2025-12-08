import Button from '@/ui/Button';
import { ROOMS_PAGE_TEXTS } from '@/constants/room';

interface RoomsHeaderProps {
  onCreateRoom: () => void;
}

const RoomsHeader = ({ onCreateRoom }: RoomsHeaderProps) => (
  <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
    <div>
      <h1 className='font-display text-text-primary text-3xl font-bold md:text-4xl'>
        {ROOMS_PAGE_TEXTS.TITLE}
      </h1>
      <p className='text-text-secondary mt-2'>{ROOMS_PAGE_TEXTS.SUBTITLE}</p>
    </div>
    <Button size='sm' rounded onClick={onCreateRoom}>
      {ROOMS_PAGE_TEXTS.CREATE_BUTTON}
    </Button>
  </div>
);

export default RoomsHeader;
