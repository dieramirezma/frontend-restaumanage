'use client'

import { Button } from '@nextui-org/react'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'
import { fetchEmployeesList } from '../lib/api'
import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'

const transformData = (items) => {
  return items.map(item => ({
    id: item._id,
    first_name: item.first_name,
    last_name: item.last_name,
    contact_number: item.contact_number,
    email: item.user_id.email,
    address: item.address,
    hire_date: item.hire_date.split('T')[0]
  }))
}

export default function Employees () {
  const { data: session } = useSession()

  const token = session?.user?.token

  const [loading, setLoading] = useState(true)
  const [tableDataEmployees, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataEmployees = await fetchEmployeesList(token, 10)

        setTableData(transformData(dataEmployees.employees))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching employees list:', error)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      { label: 'Nombres', key: 'first_name' },
      { label: 'Apellido', key: 'last_name' },
      { label: 'Contacto', key: 'contact_number' },
      { label: 'Correo', key: 'email' },
      { label: 'Direccion', key: 'address' },
      { label: 'Inicio de Contrato', key: 'hire_date' }
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
    <div className="pt-3 px-6">
      <div className="bg-white rounded-lg">
        <div className='flex justify-between items-end pt-4 px-4'>
          <h3 className="text-grey-800 font-medium text-xl">Empleados</h3>
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
            data={tableDataEmployees}
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
  )
}
