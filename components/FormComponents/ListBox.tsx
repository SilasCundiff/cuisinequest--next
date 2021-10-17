import { DislikedIngredientsTypes } from '../../types';
import { listBuilder } from '@/lib/helpers/listBuilder';
import { memo } from 'react';
interface ListBoxProps {
  heading: string;
  placeholder: string;
  list: Array<DislikedIngredientsTypes>;
  moveFunction?: (index: number) => void;
}

const WrappedListBox = ({ heading, list, placeholder, moveFunction }: ListBoxProps) => {
  const BuiltList = listBuilder(list, moveFunction);

  return (
    <div
      className={` bg-gray-100 overflow-y-auto flex-auto p-4`}
      style={{ minWidth: '49%', maxWidth: '100%', maxHeight: '360px', minHeight: '360px' }}
    >
      <h3 className='text-md text-green-900 tracking-wide mb-4'>{heading}</h3>

      <div className='flex flex-wrap h-5/6 '>
        {BuiltList ? (
          BuiltList
        ) : (
          <span className='flex w-full items-center justify-center text-gray-600 text-2xl font-light'>
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};

const ListBox = memo(WrappedListBox, (prevProps, nextProps) => {
  if (prevProps.list !== nextProps.list) return false;
  return true;
});
export default ListBox;
