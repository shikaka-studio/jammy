import { ReactNode } from 'react';

interface CreateRoomFieldProps {
  name: string;
  label: string;
  children: ReactNode;
}

const CreateRoomField = ({ name, label, children }: CreateRoomFieldProps) => (
  <div className='space-y-2'>
    <label htmlFor={name} className='text-text-primary block text-sm font-medium'>
      {label}
    </label>
    {children}
  </div>
);

export default CreateRoomField;
