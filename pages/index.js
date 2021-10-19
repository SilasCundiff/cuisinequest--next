import Logo from '@/components/ReusableComponents/Logos/Logo';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-sora bg-gray-50'>
      <div className='container-full mb-52 h-screen max-h-screen w-screen max-w-screen bg-hero-image bg-no-repeat bg-cover bg-fixed bg-center'>
        <div className='h-screen max-h-screen w-screen relative max-w-screen flex justify-center items-center z-10'>
          <div className='w-2/7 '>
            <div className='flex flex-col'>
              <div className=' '>
                <Logo />
              </div>
              <span className='font-thin pt-1 ml-auto -mr-3  text-right pb-6  text-gray-50 text-2xl tracking-widest'>
                explore your taste buds
              </span>
            </div>
            <div className='flex mt-4'>
              <button className='rounded font-medium ml-auto mr-4 transition-colors px-4 py-2 text-xl bg-green-500 hover:bg-green-600 text-gray-50'>
                <Link passHref href='/login'>
                  Begin Your Quest
                </Link>
              </button>
              <button className='rounded font-medium mr-auto ml-4 text-gray-50 border-gray-50 hover:border-green-500 hover:text-green-500 border-4 transition-colors px-4 py-2 text-xl '>
                <a href='#info'>Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <span id='info'></span>
      <div className='container-full h-screen bg-gray-50 flex mt-14 mb-52 relative'>
        <div className='bg-green-500 max-w-3/4 min-w-3/4 h-3/4 max-h-810 ml-auto my-auto rounded-l-md text-gray-50 flex'>
          <div className='my-auto min-w-3/4 max-w-3/4  flex flex-col ml-12'>
            <h2
              className='text-9xl relative z-10 font-black  mb-6'
              style={{ textShadow: '3px 3px 10px rgba(0,0,0,.3)' }}
            >
              Every meal <br /> is a journey.
            </h2>
            <div className='text-2xl relative z-10 flex flex-col justify-evenly max-w-1/2 '>
              <p className='mb-8'>
                Whether it’s discovering new dishes, <br /> or feeling comfort with your long-lost favorites,
              </p>
              <p className='mb-8'>we’ve got you covered!</p>
              <p className='mb-8'>
                Let us help you hunt down those recipes <br /> that are off the map!
              </p>
              <p className='mb-8'>
                Begin your quest by searching for a recipe <br /> in the search bar above!
              </p>
            </div>
          </div>
        </div>
        <div className='min-w-1/2 absolute top-0 right-0'>
          <Image
            src='/bowl1.png'
            layout='responsive'
            height='1008'
            width='960'
            objectFit='contain'
            objectPosition='right top'
            alt='bowl of chicken wings and greens'
          />
        </div>
      </div>
      <div className='container-full h-screen bg-gray-50 flex mt-14 mb-52 relative'>
        <div className='bg-green-500 max-w-3/4 min-w-3/4 h-3/4 max-h-810 mr-auto my-auto rounded-l-md text-gray-50 flex '>
          <div className='my-auto min-w-3/4 max-w-3/4  flex flex-col  ml-auto'>
            <div className='mx-auto'>
              <h2
                className='text-8xl relative z-10 font-black  mb-12 '
                style={{ textShadow: '3px 3px 10px rgba(0,0,0,.3)' }}
              >
                Need help on <br />
                Your Adventure?
              </h2>
            </div>
            <div className='text-2xl relative z-10 flex flex-col justify-evenly mx-auto min-w-3/4 '>
              <div className='mx-auto '>
                <h3 className='text-4xl font-bold mb-6'>Logging in lets you:</h3>
                <ul className='list-disc font-light pl-6 text-xl'>
                  <li className='mb-4'>Save your favorite recipes</li>
                  <li className='mb-4'>Search by Diet Type</li>
                  <li className='mb-4'>Filter by Intolerance</li>
                  <li className='mb-4'>Exclude disliked ingredients</li>
                </ul>
              </div>
              <div className='flex flex-col mx-auto mt-12'>
                <span className='text-base mr-auto'>It&apos;s 100% free! What are you waiting for?</span>
                <button className='rounded font-medium mr-auto mt-6 px-4 py-2 text-2xl text-green-500 bg-gray-50 hover:bg-green-100 transition-colors'>
                  <Link passHref href='/login'>
                    Begin Your Quest
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='min-w-1/2 absolute top-0 left-0 '>
          <Image
            src='/bowl2.png'
            layout='responsive'
            height='931'
            width='950'
            objectFit='contain'
            objectPosition='left top'
            alt='bowl of chic peas, peas, corn, sunflower seeds, salsa, avocado, and lettuce'
          />
        </div>
      </div>
    </div>
  );
}
