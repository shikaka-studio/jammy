import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/types/room';
import { CHAT_TEXTS } from '@/constants/room';

interface RoomChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const SendIcon = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/**
 * Formatea la hora de un mensaje para mostrar en el chat
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const RoomChat = ({ messages, onSendMessage }: RoomChatProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (e.shiftKey) return;
    
    e.preventDefault();
    handleSubmit(e);
  };

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-sm text-text-secondary">
            {CHAT_TEXTS.EMPTY_MESSAGE}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={CHAT_TEXTS.PLACEHOLDER}
            className="flex-1 rounded-lg bg-background-elevated-2 px-3 py-2 text-sm text-text-primary placeholder-text-secondary outline-none transition focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="rounded-lg bg-primary px-3 py-2 text-background transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-primary">
                {msg.userName}
              </span>
              <span className="text-xs text-text-secondary opacity-0 transition group-hover:opacity-100">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-text-primary">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHAT_TEXTS.PLACEHOLDER}
          className="flex-1 rounded-lg bg-background-elevated-2 px-3 py-2 text-sm text-text-primary placeholder-text-secondary outline-none transition focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="rounded-lg bg-primary px-3 py-2 text-background transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default RoomChat;

