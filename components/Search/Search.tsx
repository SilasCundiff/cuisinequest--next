import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';

interface SearchProps {
  placeholder: string;
  name: string;
  value: string;
  onChange?: (any) => void;
  disableEnterKey?: boolean;
  disableSearchButton?: boolean;
  className?: string;
}

const Search = ({
  placeholder,
  name,
  value,
  onChange,
  disableEnterKey = false,
  disableSearchButton = false,
  className = '',
}: SearchProps) => {
  const preventEnter = (e) => {
    disableEnterKey && e.key === 'Enter' && e.preventDefault();
  };

  return (
    <div
      className={`${className} min-w-full mb-5 text-center border-gray-400 border rounded-2xl focus-within:border-green-500`}
      style={{ minWidth: '100%', width: '100%' }}
    >
      <div className='w-full focus-within:text-green-500 text-gray-700 text-2xl font-light tracking-widest px-2 py-1 rounded relative'>
        <button className='absolute hover:bg-gray-200 rounded p-4 focus:outline-none w-10 h-10 flex items-center justify-center'>
          <MemoFontAwesomeIcon icon={faSearch} />
        </button>
        <input
          className='text-center min-w-full w-full h-10 focus:outline-none'
          type='text'
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onKeyPress={preventEnter}
        />
      </div>
    </div>
  );
};

const MemoFontAwesomeIcon = memo(FontAwesomeIcon);

export { Search };
