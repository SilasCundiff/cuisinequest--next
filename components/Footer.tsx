import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='h-96 w-screen bg-green-600 text-gray-50 text-center flex justify-center items-center text-lg mt-auto'>
      <div className='flex min-w-1/2 flex-wrap'>
        <div className='text-green-50 my-auto mx-auto text-3xl flex justify-center w-full'>
          <div className='mr-6 ml-auto cursor-pointer flex hover:text-green-100 transition-colors'>
            <Link href='https://Silascundiff.com'>
              <a className='h-0 leading-none'>SilasCundiff.com</a>
            </Link>
          </div>
          <div style={{ width: '1px' }} className='h-8 rounded-full block bg-gray-50 opacity-30 my-auto'></div>
          <div className='ml-6 mr-auto flex text-3xl w-full'>
            <span className='mr-4 cursor-pointer hover:text-green-100 transition-colors'>
              <Link passHref href='https://github.com/SilasCundiff/cuisinequest--next'>
                <FontAwesomeIcon icon={faGithubSquare} />
              </Link>
            </span>
            <span className=' cursor-pointer hover:text-green-100 transition-colors'>
              <Link passHref href='https://www.linkedin.com/in/silascundiff/'>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </span>
          </div>
        </div>
        <div
          style={{ width: '2px', minWidth: '2px' }}
          className='h-48 rounded-full block bg-green-500 opacity-50 my-auto'
        ></div>
        <div className='max-w-1/2 m-auto ml-8 w-full'>
          <p className='mb-6'>Website Designed and Developed by Silas Cundiff</p>
          <p className='mb-0'>This website is purely proof of concept.</p>
          <p className='mb-0'> No fee will ever be charged.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
