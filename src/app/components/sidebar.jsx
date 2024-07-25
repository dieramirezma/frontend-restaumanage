'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar () {
  return (
    <aside className='flex flex-col min-h-full border-solid border-r-2 border-grey-50 justify-between bg-white'>
      <div className='flex flex-col gap-5 pt-6 px-6'>
        <div className='flex px-4 py-1 items-center gap-3'>
          <Image
            src="/images/RestauManage-logo.png"
            width={48}
            height={48}
            alt="Logo RestauManage"
            className="rounded-full"
          />
          <h2 className='text-primary-500 font-bold text-xl'>RestauManage</h2>
        </div>
        <nav className='px-6'>
          <ul className='flex flex-col gap-8 pr-4 py-2'>
            <li>
              <Link href='/' className='flex gap-4 text-gray-600'>
                <Image
                  src="/icons/home.svg"
                  width={24}
                  height={24}
                  alt="Home icon"
                />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href='/inventory' className='flex gap-4 text-gray-600'>
                <Image
                  src="/icons/inventory.svg"
                  width={24}
                  height={24}
                  alt="Inventory icon"
                />
                Inventario
              </Link>
            </li>
            <li>
              <Link href='/suppliers' className='flex gap-4 text-gray-600'>
                <Image
                  src="/icons/suppliers.svg"
                  width={24}
                  height={24}
                  alt="Supplier icon"
                />
                Proveedores
              </Link>
            </li>
            <li>
              <Link href='/employees' className='flex gap-4 text-gray-600'>
                <Image
                  src="/icons/employees.svg"
                  width={24}
                  height={24}
                  alt="Employee icon"
                />
                Empleados
              </Link>
            </li>
            <li>
              <Link href='/reservations' className='flex gap-4 text-gray-600'>
                <Image
                  src="/icons/reservations.svg"
                  width={24}
                  height={24}
                  alt="Reservation icon"
                />
                Reservas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex flex-col px-11 pb-7 gap-8'>
        <div>
          <Link href='/' className='flex gap-4 text-gray-600'>
            <Image
              src="/icons/settings.svg"
              width={24}
              height={24}
              alt="Settings icon"
            />
            Ajustes
          </Link>
        </div>
        <div>
          <Link href='/' className='flex gap-4 text-gray-600'>
            <Image
              src="/icons/logout.svg"
              width={24}
              height={24}
              alt="Logout icon"
            />
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </aside>
  )
}
