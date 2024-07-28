'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Header () {
  const fullPathname = usePathname()
  const noHeaderPaths = ['login', 'register', 'forgot-password', 'reset-password']
  const noHeader = noHeaderPaths.some(path => fullPathname.includes(path))

  const { data: session } = useSession()

  console.log({ session })
  if (noHeader) {
    return
  }
  return (
    <header className='border-solid border-b-2 border-grey-50 font-medium bg-white'>
      <div className='flex items-center justify-between w-full py-4'>
        <h2 className='text-center flex-grow text-xl text-gray-800'>{session.user.username} - { session.user.role.role_name}</h2>
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
