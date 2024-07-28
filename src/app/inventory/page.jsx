'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import { FilterIcon } from '../components/icons'
import TableContent from '../components/table'
import ModalItem from './addItem'
import { useEffect, useMemo, useState } from 'react'
import { fetchSuppliersList, fetchInventoryList } from '../lib/api'
import { useSession } from 'next-auth/react'

const transformData = (items) => {
  return items.map(item => ({
    id: item._id,
    item_name: item.item_name,
    category: item.category,
    quantity: `${item.quantity} ${item.unit}`,
    reorder_level: item.reorder_level,
    supplier: item.supplier_id.supplier_name,
    status: item.quantity > item.reorder_level ? 'Stock' : item.quantity === 0 ? 'No stock' : 'Low Stock'
  }))
}

const Inventory = () => {
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  const token = session?.user?.token

  const [tableDataInventory, setTableData] = useState([])

  const [numInventory, setnumInventory] = useState(0)
  const [lowLevelProducts, setlowLevelProducts] = useState([])
  const [suppliersData, setsuppliersData] = useState([])
  const [numCategories, setnumCategories] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInventory = await fetchInventoryList(token, 10)
        const dataSupppliers = await fetchSuppliersList(token)

        const uniqueSuppliers = dataSupppliers.suppliers.map(supplier => ({
          id: supplier._id,
          supplier_name: supplier.supplier_name
        }))

        const totalQuantity = dataInventory.inventory_item.reduce((sum, item) => sum + item.quantity, 0)

        const uniqueCategories = [...new Set(dataInventory.inventory_item.map(item => item.category))]

        const inventoryData = transformData(dataInventory.inventory_item)

        console.log(inventoryData)

        const itemsLowStock = inventoryData.filter(item => item.status === 'Low Stock').length
        const itemsNoStock = inventoryData.filter(item => item.status === 'No stock').length

        setsuppliersData(uniqueSuppliers)
        setlowLevelProducts([itemsLowStock, itemsNoStock])
        setnumCategories(uniqueCategories.length)
        setnumInventory(totalQuantity)
        setTableData(inventoryData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suppliers list:', error)
      }
    }

    fetchData()
  }, [])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const columns = useMemo(
    () => [
      { label: 'Producto', key: 'item_name' },
      { label: 'Categoria', key: 'category' },
      { label: 'Cantidad', key: 'quantity' },
      { label: 'Nivel de Reorden', key: 'reorder_level' },
      { label: 'Proveedor', key: 'supplier' },
      { label: 'Disponibilidad', key: 'status' }
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
            <h3 className="text-grey-800 font-medium text-xl">Inventario General</h3>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-primary-500">Categorías</h4>
                <p className="font-semibold text-base text-grey-600">{ !loading ? numCategories : 0 }</p>
                <p className="text-sm text-grey-400">Últimos 7 días</p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-[#E19133]">Productos Totales</h4>
                <p className="font-semibold text-base text-grey-600">{ !loading ? numInventory : 0 }</p>
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
                    <p className="font-semibold text-base text-grey-600 pb-3">{!loading ? lowLevelProducts[0] : 0}</p>
                    <p className="text-sm text-grey-400">Bajo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-base text-grey-600 pb-3">{!loading ? lowLevelProducts[1] : 0}</p>
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
              <ModalItem isOpen={isOpen} onOpenChange={onOpenChange} suppliers={suppliersData} />
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
                data={tableDataInventory}
                suppliers={suppliersData}
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
export default Inventory
