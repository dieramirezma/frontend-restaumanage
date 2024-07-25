import Image from 'next/image'

export default function Header () {
  return (
    <header className='border-solid border-b-2 border-grey-50 font-medium bg-white'>
      <div className='flex items-center justify-between w-full py-4'>
        <h2 className='text-center flex-grow text-xl text-gray-800'>Diego Ramirez - Administrador</h2>
        <div className='pr-8'>
          <Image
            src="/images/user.png"
            width={30}
            height={30}
            alt="User image"
            className='rounded-full bg-primary-200'
          />
        </div>
      </div>
    </header>
  )
}
