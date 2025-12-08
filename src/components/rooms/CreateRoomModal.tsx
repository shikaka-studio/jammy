import { useState, RefObject } from 'react';
import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import FileUpload from '@/ui/FileUpload';
import TagsInput from '@/ui/TagsInput';
import type { CreateRoomFormData } from '@/types/room';
import { CREATE_ROOM_MODAL } from '@/constants/room';
import CreateRoomField from './CreateRoomField';

interface CreateRoomModalProps {
  modalRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoomFormData) => void;
  availableTags: string[];
}

const INITIAL_FORM_DATA: CreateRoomFormData = {
  name: '',
  tags: [],
  description: '',
  coverImage: null,
};

const CreateRoomModal = ({
  modalRef,
  isOpen,
  onClose,
  onSubmit,
  availableTags,
}: CreateRoomModalProps) => {
  const [formData, setFormData] = useState<CreateRoomFormData>(INITIAL_FORM_DATA);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClose = () => {
    setFormData(INITIAL_FORM_DATA);
    setImagePreview(null);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFormData((prev) => ({ ...prev, coverImage: file }));
    setImagePreview(preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Only send name, backend only needs name and host_spotify_id
    // Other fields (tags, description, coverImage) can be used in the future
    onSubmit(formData);
    handleClose();
  };

  return (
    <Modal
      modalRef={modalRef}
      isOpen={isOpen}
      onClose={handleClose}
      title={CREATE_ROOM_MODAL.TITLE}
    >
      <form onSubmit={handleSubmit} className='flex min-h-0 flex-1 flex-col'>
        <Modal.Body>
          <div className='space-y-5'>
            {/* Name field */}
            <CreateRoomField name='name' label={CREATE_ROOM_MODAL.NAME_LABEL}>
              <Input
                id='name'
                name='name'
                value={formData.name}
                placeholder={CREATE_ROOM_MODAL.NAME_PLACEHOLDER}
                required
                onChange={handleInputChange}
              />
            </CreateRoomField>

            {/* Description field */}
            <CreateRoomField name='description' label={CREATE_ROOM_MODAL.DESCRIPTION_LABEL}>
              <Textarea
                id='description'
                name='description'
                value={formData.description}
                placeholder={CREATE_ROOM_MODAL.DESCRIPTION_PLACEHOLDER}
                rows={3}
                resize='none'
                onChange={handleInputChange}
              />
            </CreateRoomField>

            {/* Tags field */}
            <CreateRoomField name='tags' label={CREATE_ROOM_MODAL.TAGS_LABEL}>
              <TagsInput
                id='tags'
                value={formData.tags}
                onChange={handleTagsChange}
                availableTags={availableTags}
                placeholder={CREATE_ROOM_MODAL.TAGS_PLACEHOLDER}
              />
            </CreateRoomField>

            {/* Cover image upload */}
            <CreateRoomField name='cover' label={CREATE_ROOM_MODAL.COVER_LABEL}>
              <FileUpload
                id='cover'
                value={formData.coverImage}
                preview={imagePreview}
                onChange={handleFileChange}
                accept='image/*'
                aspectRatio='video'
                placeholder={CREATE_ROOM_MODAL.COVER_HINT}
                changeText={CREATE_ROOM_MODAL.COVER_CHANGE}
              />
            </CreateRoomField>
          </div>
        </Modal.Body>

        <Modal.Footer className='flex gap-3'>
          <Button variant='secondary' full onClick={handleClose}>
            {CREATE_ROOM_MODAL.CANCEL_BUTTON}
          </Button>
          <Button type='submit' full>
            {CREATE_ROOM_MODAL.SUBMIT_BUTTON}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
