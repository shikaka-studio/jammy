import { ROOMS_PAGE_TEXTS } from '@/constants/room';

interface RoomsHeaderProps {
    onCreateRoom: () => void;
}

const RoomsHeader = ({ onCreateRoom }: RoomsHeaderProps) => (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
            <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                {ROOMS_PAGE_TEXTS.TITLE}
            </h1>
            <p className="mt-2 text-text-secondary">
                {ROOMS_PAGE_TEXTS.SUBTITLE}
            </p>
        </div>
        <button
            onClick={onCreateRoom}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-primary/90"
        >
            {ROOMS_PAGE_TEXTS.CREATE_BUTTON}
        </button>
    </div>
);

export default RoomsHeader;
