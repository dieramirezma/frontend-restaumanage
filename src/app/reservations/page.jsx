'use client'

import { Button } from '@nextui-org/react'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'
import { fetchReservationsList } from '../lib/api'
import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'

const transformData = (items) => {
  return items.map(item => ({
    id: item._id,
    customer_name: item.customer_name,
    customer_contact: item.customer_contact,
    table_number: item.table_id.table_number,
    number_of_people: item.number_of_people,
    reservation_date: item.reservation_date.split('T')[0],
    status: item.status
  }))
}

const Reservation = () => {
  const { data: session } = useSession()

  const token = session?.user?.token

  const [loading, setLoading] = useState(true)
  const [tableDataReservations, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataReservations = await fetchReservationsList(token, 10)

        setTableData(transformData(dataReservations.reservations))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching reservations list:', error)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      { label: 'Cliente', key: 'customer_name' },
      { label: 'Contacto', key: 'customer_contact' },
      { label: 'Mesa', key: 'table_number' },
      { label: 'N° Personas', key: 'number_of_people' },
      { label: 'Fecha', key: 'reservation_date' },
      { label: 'Estado', key: 'status' }
    ],
    []
  )

  const bottomContent = () => {
    return (
      <div className='flex justify-between'>
        <Button radius='sm' variant='ghost' className="text-grey-600 font-medium border-grey-100 h-9">
          Anterior
        </Button>
        <p className='text-grey-700 font-medium text-sm'>Página 1 de 10</p>
        <Button radius='sm' variant='ghost' className="text-grey-600 font-medium border-grey-100 h-9">
          Siguiente
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 pt-3 px-6">
        <div className="bg-white rounded-lg">
          <div className="flex flex-col gap-5 py-4 px-4">
            <h3 className="text-grey-800 font-medium text-xl">Total de Reservas</h3>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-primary-500">Reservas Totales</h4>
                <p className="font-semibold text-base text-grey-600">14</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-[#E19133]">Mesa mas Reservada</h4>
                <div className="flex gap-14">
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">32</p>
                    <p className="text-sm text-grey-400">Mesa</p>
                  </div>
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">20</p>
                    <p className="text-sm text-grey-400">N° Reservas</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-[#845EBC]">Reservas Activas</h4>
                <p className="font-semibold text-base text-grey-600">5</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-error-400">Mejor Cliente</h4>
                <div className="flex gap-14">
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">Diego</p>
                    <p className="text-sm text-grey-400">Cliente</p>
                  </div>
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">15</p>
                    <p className="text-sm text-grey-400">Reservas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className='flex justify-between items-end pt-4 px-4'>
            <h3 className="text-grey-800 font-medium text-xl">Reservas</h3>
            <div className='flex gap-3'>
              <Button radius='sm' variant='ghost' startContent={<FilterIcon />} className="text-grey-600 font-medium border-grey-100">
                Filtros
              </Button>
              <Button radius='sm' variant='ghost' className="text-grey-600 font-medium border-grey-100">
                Descargar
              </Button>
            </div>
          </div>
          <div>
            {!loading && (
              <TableContent
              bottomContent={bottomContent()}
              bottomContentPlacement="outside"
              columns={columns}
              data={tableDataReservations}
              classNames={{
                th: ['bg-transparent', 'border-b'],
                td: ['text-grey-700 font-medium text-sm']
              }}
              className='p-4'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reservation
