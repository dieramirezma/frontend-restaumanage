'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import ModalItem from './addItem'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'
import { useEffect, useMemo, useState } from 'react'
import { fetchSuppliersList } from '../lib/api'
import { useSession } from 'next-auth/react'

const transformData = (items) => {
  return items.map(item => ({
    id: item._id,
    supplier_name: item.supplier_name,
    contact: item.contact_number,
    email: item.email,
    address: item.address,
    delivered: Math.floor(Math.random() * (40 - 10 + 1)) + 10
  }))
}

export default function Employees () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: session } = useSession()

  const token = session?.user?.token

  const [loading, setLoading] = useState(true)
  const [tableDataSuppliers, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSupppliers = await fetchSuppliersList(token, 10)

        setTableData(transformData(dataSupppliers.suppliers))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suppliers list:', error)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      { label: 'Nombres', key: 'supplier_name' },
      { label: 'Contacto', key: 'contact' },
      { label: 'Correo', key: 'email' },
      { label: 'Direccion', key: 'address' },
      { label: 'Total Entregado', key: 'delivered' }
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
          <h3 className="text-grey-800 font-medium text-xl">Proveedores</h3>
          <div className='flex gap-3'>
            <Button onPress={onOpen} radius='sm' className="bg-primary-600 text-white font-medium">
              Nuevo Proveedor
            </Button>
            <ModalItem isOpen={isOpen} onOpenChange={onOpenChange} />
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
            data={tableDataSuppliers}
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
