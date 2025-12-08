import { forwardRef, useState, useRef, useImperativeHandle, InputHTMLAttributes } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'onError'> {
  value?: File | null;
  preview?: string | null;
  onChange?: (file: File | null, preview: string | null) => void;
  onError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  aspectRatio?: 'square' | 'video' | 'auto';
  placeholder?: string;
  changeText?: string;
  error?: string;
  className?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      value,
      preview: externalPreview,
      onChange,
      onError,
      accept = 'image/*',
      maxSize,
      aspectRatio = 'video',
      placeholder = 'Drag an image or click to select',
      changeText = 'Change image',
      error,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [internalPreview, setInternalPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose the internal ref through the forwarded ref
    useImperativeHandle(ref, () => inputRef.current!);

    const preview = externalPreview ?? internalPreview;
    const hasError = !!error;

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      auto: 'aspect-auto',
    };

    const handleFileSelect = (file: File) => {
      // Validate file type
      if (accept && !file.type.match(accept.replace('*', '.*'))) {
        const errorMsg = `Invalid file type. Expected ${accept}`;
        onError?.(errorMsg);
        return;
      }

      // Validate file size
      if (maxSize && file.size > maxSize) {
        const errorMsg = `File size exceeds ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
        onError?.(errorMsg);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setInternalPreview(previewUrl);
        onChange?.(file, previewUrl);
      };
      reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
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
        handleFileSelect(file);
      }
    };

    const handleUploadClick = () => {
      inputRef.current?.click();
    };

    const borderClasses = hasError
      ? 'border-red-500 hover:border-red-600'
      : isDragging
        ? 'border-primary bg-primary/10'
        : 'border-border hover:border-primary/50';

    return (
      <div className='flex w-full flex-col gap-y-1'>
        <div
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition ${borderClasses} ${className}`}
        >
          <input
            ref={inputRef}
            type='file'
            accept={accept}
            onChange={handleFileInputChange}
            className='hidden'
            {...props}
          />

          {preview ? (
            <div className={`relative ${aspectRatioClasses[aspectRatio]}`}>
              <img src={preview} alt='Preview' className='h-full w-full object-cover' />
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100'>
                <span className='text-sm font-medium text-white'>{changeText}</span>
              </div>
            </div>
          ) : (
            <div
              className={`text-text-secondary flex flex-col items-center justify-center gap-2 ${aspectRatioClasses[aspectRatio]}`}
            >
              <Upload className='h-8 w-8' />
              <span className='text-sm'>{placeholder}</span>
            </div>
          )}
        </div>

        {hasError && <span className='text-xs text-red-500'>{error}</span>}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
