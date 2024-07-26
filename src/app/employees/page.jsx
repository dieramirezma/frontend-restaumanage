'use client'

import { Button } from '@nextui-org/react'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'

export default function Employees () {
  const columns = [
    { label: 'Nombres', key: 'name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'Contacto', key: 'contact' },
    { label: 'Correo', key: 'email' },
    { label: 'Direccion', key: 'address' },
    { label: 'Rol', key: 'role' }
  ]

  const data = [
    {
      id: 1,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 2,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 3,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 4,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 5,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 6,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 7,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 8,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    },
    {
      id: 9,
      name: 'Papa',
      last_name: 'Papa',
      contact: 'Papa',
      email: 'Papa',
      address: 'Papa',
      role: 'Papa'
    }
  ]

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
          <TableContent
            bottomContent={bottomContent()}
            bottomContentPlacement="outside"
            columns={columns}
            data={data}
            classNames={{
              th: ['bg-transparent', 'border-b'],
              td: ['text-grey-700 font-medium text-sm']
            }}
            className='p-4'
          />
        </div>
      </div>
    </div>
  )
}
