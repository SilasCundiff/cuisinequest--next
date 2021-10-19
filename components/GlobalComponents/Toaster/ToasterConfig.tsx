import toast from 'react-hot-toast';

export const successfulSave = (title: string, message: string) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-green-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-green-50'>{title}</p>
            <p className='mt-1 text-sm text-gray-100'>{message}</p>
          </div>
        </div>
      </div>
      <div className='flex'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
        >
          Close
        </button>
      </div>
    </div>
  ));
