'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'
import ModalItem from './addItem'

const Inventory = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const columns = [
    { label: 'Producto', key: 'product' },
    { label: 'Categoria', key: 'category' },
    { label: 'Cantidad', key: 'quantity' },
    { label: 'Nivel de Reorden', key: 'reorder_level' },
    { label: 'Proveedor', key: 'provider' },
    { label: 'Disponibilidad', key: 'status' }
  ]

  const data = [
    {
      id: 1,
      product: 'Papa',
      category: 'Papa',
      quantity: 'Papa',
      reorder_level: 'Papa',
      provider: 'Papa',
      status: 'Papa'
    },
    {
      id: 2,
      product: 'Papa',
      category: 'Papa',
      quantity: 'Papa',
      reorder_level: 'Papa',
      provider: 'Papa',
      status: 'Papa'
    },
    {
      id: 3,
      product: 'Papa',
      category: 'Papa',
      quantity: 'Papa',
      reorder_level: 'Papa',
      provider: 'Papa',
      status: 'Papa'
    },
    {
      id: 4,
      product: 'Papa',
      category: 'Papa',
      quantity: 'Papa',
      reorder_level: 'Papa',
      provider: 'Papa',
      status: 'Papa'
    },
    {
      id: 5,
      product: 'Papa',
      category: 'Papa',
      quantity: 'Papa',
      reorder_level: 'Papa',
      provider: 'Papa',
      status: 'Papa'
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
    <div>
      <div className="flex flex-col gap-3 pt-3 px-6">
        <div className="bg-white rounded-lg">
          <div className="flex flex-col gap-5 py-4 px-4">
            <h3 className="text-grey-800 font-medium text-xl">Inventario General</h3>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-primary-500">Categorías</h4>
                <p className="font-semibold text-base text-grey-600">14</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-[#E19133]">Productos Totales</h4>
                <p className="font-semibold text-base text-grey-600">868</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-[#845EBC]">Top Recibidos</h4>
                <p className="font-semibold text-base text-grey-600">5</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-error-400">Stock</h4>
                <div className="flex gap-14">
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">12</p>
                    <p className="text-sm text-grey-400">Bajo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">2</p>
                    <p className="text-sm text-grey-400">Sin stock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className='flex justify-between items-end pt-4 px-4'>
            <h3 className="text-grey-800 font-medium text-xl">Productos</h3>
            <div className='flex gap-3'>
              <Button onPress={ onOpen } radius='sm' className="bg-primary-600 text-white font-medium">
                Nuevo Producto
              </Button>
              <ModalItem isOpen={ isOpen } onOpenChange={ onOpenChange } />
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
    </div>
  )
}
export default Inventory
