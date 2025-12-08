import { useState, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import Input from '@/ui/Input';
import Button from '@/ui/Button';

interface TagsInputProps {
  id?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  availableTags?: string[];
  placeholder?: string;
  className?: string;
}

const TagsInput = ({
  id,
  value,
  availableTags = [],
  placeholder = 'Add tags...',
  className = '',
  onChange,
}: TagsInputProps) => {
  const [tagInput, setTagInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags = useMemo(() => {
    const searchTerm = tagInput.trim().toLowerCase();
    return availableTags
      .filter((tag) => !value.includes(tag))
      .filter((tag) => tag.toLowerCase().includes(searchTerm));
  }, [tagInput, availableTags, value]);

  const showCreateOption =
    tagInput.trim().length > 0 &&
    !availableTags.includes(tagInput.trim().toLowerCase()) &&
    !value.includes(tagInput.trim().toLowerCase());

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag.length > 0 && !value.includes(normalizedTag)) {
      onChange([...value, normalizedTag]);
    }
    setTagInput('');
    setIsDropdownOpen(false);
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setHighlightedIndex(0);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalOptions = filteredTags.length + (showCreateOption ? 1 : 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % totalOptions);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + totalOptions) % totalOptions);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      if (totalOptions > 0 && isDropdownOpen) {
        if (highlightedIndex < filteredTags.length) {
          handleAddTag(filteredTags[highlightedIndex]);
          return;
        }
        if (showCreateOption) {
          handleAddTag(tagInput);
          return;
        }
      }

      if (tagInput.trim().length > 0) {
        handleAddTag(tagInput);
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      return;
    }

    if (e.key === 'Backspace' && tagInput === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  return (
    <div className={className || 'flex flex-col gap-y-2'}>
      {/* Tag input with dropdown */}
      <div className='relative'>
        <Input
          ref={inputRef}
          id={id}
          name={id}
          placeholder={placeholder}
          value={tagInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Dropdown */}
        {isDropdownOpen && (filteredTags.length > 0 || showCreateOption) && (
          <div className='border-border bg-background-elevated absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border shadow-lg'>
            {filteredTags.map((tag, index) => (
              <Button
                key={tag}
                className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm capitalize transition ${
                  highlightedIndex === index
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-primary hover:bg-surface-hover'
                }`}
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </Button>
            ))}
            {showCreateOption && (
              <Button
                className={`block w-full cursor-pointer px-4 py-3 text-left text-sm transition ${
                  highlightedIndex === filteredTags.length
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-primary hover:bg-surface-hover'
                }`}
                onClick={() => handleAddTag(tagInput)}
              >
                Create "<span className='font-medium'>{tagInput.trim().toLowerCase()}</span>"
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Selected tags as pills */}
      {value.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {value.map((tag) => (
            <span
              key={tag}
              className='bg-primary inline-flex items-center gap-1.5 rounded-full py-1 pr-1.5 pl-2.5 text-sm font-medium text-gray-900'
            >
              {tag}
              <Button
                className='cursor-pointer rounded-full p-0.5 transition hover:bg-gray-900/20'
                onClick={() => handleRemoveTag(tag)}
              >
                <X className='h-4 w-4' />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
