import Image from 'next/image'

const CardTable = ({ onClick, number, capacity, location, status }) => {
  const statusColor = status === 'Disponible' ? 'text-primary-500' : 'text-warning-500'

  return (
    <div onClick={() => onClick(number)} className='flex h-36 w-96 items-center border-solid border-2 border-grey-50 rounded-md cursor-pointer hover:bg-primary-50'>
      <div className='bg-grey-50 h-full flex items-center'>
        <div className='px-16'>
          <Image
            src="/images/table.png"
            width={110}
            height={100}
            alt="Logo RestauManage"
          />
        </div>
      </div>
      <div className='py-4 pl-5'>
        <h4 className='text-grey-600 text-base font-medium'>Mesa {number}</h4>
        <div className='flex flex-col gap-2 pt-2 text-sm text-grey-400'>
          <p>{capacity} personas</p>
          <p>{location}</p>
          <p className={statusColor}>{status}</p>
        </div>
      </div>
    </div>
  )
}
export default CardTable
