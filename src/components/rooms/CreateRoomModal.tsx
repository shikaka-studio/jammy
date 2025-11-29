import { useState, useRef, useMemo } from 'react';
import Modal from '@/ui/Modal';
import type { CreateRoomFormData } from '@/types/room';
import { CREATE_ROOM_MODAL } from '@/constants/room';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoomFormData) => void;
  availableTags: string[];
}

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const INITIAL_FORM_DATA: CreateRoomFormData = {
  name: '',
  tags: [],
  description: '',
  coverImage: null,
};

const CreateRoomModal = ({ isOpen, onClose, onSubmit, availableTags }: CreateRoomModalProps) => {
  const [formData, setFormData] = useState<CreateRoomFormData>(INITIAL_FORM_DATA);
  const [tagInput, setTagInput] = useState('');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const filteredTags = useMemo(() => {
    const searchTerm = tagInput.trim().toLowerCase();
    return availableTags
      .filter((tag) => !formData.tags.includes(tag))
      .filter((tag) => tag.toLowerCase().includes(searchTerm));
  }, [tagInput, availableTags, formData.tags]);

  const showCreateOption = tagInput.trim().length > 0 &&
    !availableTags.includes(tagInput.trim().toLowerCase()) &&
    !formData.tags.includes(tagInput.trim().toLowerCase());

  const handleClose = () => {
    setFormData(INITIAL_FORM_DATA);
    setTagInput('');
    setIsTagDropdownOpen(false);
    setImagePreview(null);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setHighlightedIndex(0);
    setIsTagDropdownOpen(true);
  };

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag.length > 0 && !formData.tags.includes(normalizedTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, normalizedTag] }));
    }
    setTagInput('');
    setIsTagDropdownOpen(false);
    setHighlightedIndex(0);
    tagInputRef.current?.focus();
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

      if (totalOptions > 0 && isTagDropdownOpen) {
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
      setIsTagDropdownOpen(false);
      return;
    }

    if (e.key === 'Backspace' && tagInput === '' && formData.tags.length > 0) {
      setFormData((prev) => ({ ...prev, tags: prev.tags.slice(0, -1) }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputFocus = () => {
    setIsTagDropdownOpen(true);
  };

  const handleTagInputBlur = () => {
    setTimeout(() => setIsTagDropdownOpen(false), 150);
  };

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    setFormData((prev) => ({ ...prev, coverImage: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Solo enviamos el nombre, el backend solo necesita name y host_spotify_id
    // Los demás campos (tags, description, coverImage) se pueden usar en el futuro
    onSubmit(formData);
    handleClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={CREATE_ROOM_MODAL.TITLE}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            {CREATE_ROOM_MODAL.NAME_LABEL}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={CREATE_ROOM_MODAL.NAME_PLACEHOLDER}
            className="w-full rounded-xl border border-border bg-background-elevated-2 px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        {/* Tags field */}
        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-text-primary"
          >
            {CREATE_ROOM_MODAL.TAGS_LABEL}
          </label>

          {/* Tag input with dropdown */}
          <div className="relative">
            <input
              ref={tagInputRef}
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              onFocus={handleTagInputFocus}
              onBlur={handleTagInputBlur}
              placeholder={CREATE_ROOM_MODAL.TAGS_PLACEHOLDER}
              className="w-full rounded-xl border border-border bg-background-elevated-2 px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {/* Dropdown */}
            {isTagDropdownOpen && (filteredTags.length > 0 || showCreateOption) && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border border-border bg-background-elevated shadow-lg">
                {filteredTags.map((tag, index) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className={`block w-full px-4 py-2.5 text-left text-sm capitalize transition ${highlightedIndex === index
                        ? 'bg-primary/20 text-primary'
                        : 'text-text-primary hover:bg-surface-hover'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
                {showCreateOption && (
                  <button
                    type="button"
                    onClick={() => handleAddTag(tagInput)}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition ${highlightedIndex === filteredTags.length
                        ? 'bg-primary/20 text-primary'
                        : 'text-text-primary hover:bg-surface-hover'
                      }`}
                  >
                    Crear "<span className="font-medium">{tagInput.trim().toLowerCase()}</span>"
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Selected tags as pills */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-gray-900"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="rounded-full p-0.5 transition hover:bg-gray-900/20"
                  >
                    <CloseIcon />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description field */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-primary"
          >
            {CREATE_ROOM_MODAL.DESCRIPTION_LABEL}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={CREATE_ROOM_MODAL.DESCRIPTION_PLACEHOLDER}
            rows={3}
            className="w-full resize-none rounded-xl border border-border bg-background-elevated-2 px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Cover image upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            {CREATE_ROOM_MODAL.COVER_LABEL}
          </label>
          <div
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition ${isDragging
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative aspect-video">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    {CREATE_ROOM_MODAL.COVER_CHANGE}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-2 text-text-secondary">
                <UploadIcon />
                <span className="text-sm">{CREATE_ROOM_MODAL.COVER_HINT}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-xl border border-border bg-transparent px-4 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-hover"
          >
            {CREATE_ROOM_MODAL.CANCEL_BUTTON}
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-primary/90"
          >
            {CREATE_ROOM_MODAL.SUBMIT_BUTTON}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
