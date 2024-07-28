import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from './components/header'
import Sidebar from './components/sidebar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RestauManage',
  description: 'Generated by create next app'
}

export default async function RootLayout ({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="es" className='light'>
      <head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-grey-50`}>
        <Providers session={session}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1">
              {/* <Providers> */}
                {children}
              {/* </Providers> */}
            </div>
          </div>
        </div>
        </Providers>
      </body>
    </html>
  )
}
