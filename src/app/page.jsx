'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { fetchSuppliersList, fetchInventoryList } from './lib/api'
import { useSession } from 'next-auth/react'

export default function Dashboard () {
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  const token = session?.user?.token

  const [tableDataSuppliers, setTableData] = useState({
    headers: ['Nombre', 'Cantidad Recibida', 'Última Cantidad', 'Fecha'],
    rows: []
  })

  const [numInventory, setnumInventory] = useState(0)
  const [numSuppliers, setnumSuppliers] = useState(0)
  const [lowLevelProducts, setlowLevelProducts] = useState([])
  const [numCategories, setnumCategories] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInventory = await fetchInventoryList(token)
        const dataSupppliers = await fetchSuppliersList(token)

        const totalQuantity = dataInventory.inventory_item.reduce((sum, item) => sum + item.quantity, 0)

        const uniqueCategories = [...new Set(dataInventory.inventory_item.map(item => item.category))]

        setnumCategories(uniqueCategories.length)

        const lowLevel = dataInventory.inventory_item.filter(item => item.quantity < item.reorder_level)

        setlowLevelProducts(lowLevel)

        setnumInventory(totalQuantity)
        setTableData({
          headers: ['Nombre', 'Cantidad Recibida', 'Última Cantidad', 'Fecha'],
          rows: dataSupppliers.suppliers.map(supplier => [supplier.supplier_name, 0, 0, supplier.created_at.split('T')[0]])
        })
        setnumSuppliers(dataSupppliers.totalDocs)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suppliers list:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-3 pt-3 px-6">
      <div className="flex h-28 w-full gap-3">
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex flex-col h-full justify-between">
            <h3 className="pt-2 pl-2 text-grey-800 font-medium text-xl">Resumen de Inventario</h3>
            <div className="flex gap-9 justify-center pb-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/inventory-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                {loading
                  ? (
                      <p className="font-medium text-grey-600">...</p>
                    )
                  : (
                      <p className="font-medium text-grey-600">{numInventory}</p>
                    )}
                <p className="text-xs">Cantidad disponible</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/inventory-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <p className="font-medium text-grey-600">0</p>
                <p className="text-xs">Últimos recibidos</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/inventory-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <p className="font-medium text-grey-600">0</p>
                <p className="text-xs">Últimos sacados</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex flex-col h-full justify-between">
            <h3 className="pt-2 pl-2 text-grey-800 font-medium text-xl">Resumen de Productos</h3>
            <div className="flex px-3 gap-9 pb-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/supplier-resume1.svg"
                  width={24}
                  height={24}
                  alt="Numero de proveedores icon"
                />
                {loading
                  ? (
                      <p className="font-medium text-grey-600">...</p>
                    )
                  : (
                      <p className="font-medium text-grey-600">{numSuppliers}</p>
                    )}
                <p className="text-xs">Número de proveedores</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/supplier-resume2.svg"
                  width={24}
                  height={24}
                  alt="Numero de categorias icon"
                />
                <p className="font-medium text-grey-600">{ !loading ? numCategories : 0 }</p>
                <p className="text-xs">Número de categorías</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-28 w-full rounded-lg">
        <div className="flex flex-col h-full justify-between">
            <h3 className="pt-2 pl-2 text-grey-800 font-medium text-xl">Resumen de Reservas</h3>
            <div className="flex gap-24 pl-3 pb-2">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/icons/reservation-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <div className='flex items-center gap-4'>
                  <p className="font-medium text-grey-600">1</p>
                  <p className="text-xs">Reservas</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/icons/reservation-resume2.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <div className='flex items-center gap-4'>
                  <p className="font-medium text-grey-600">1</p>
                  <p className="text-xs">Activas</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/icons/reservation-resume3.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <div className='flex items-center gap-4'>
                  <p className="font-medium text-grey-600">5</p>
                  <p className="text-xs">Mesas disponibles</p>
                </div>
              </div>
              <div>
                <h4 className='text-sm font-bold text-grey-800'>Diego Ramirez</h4>
                <p className='text-xs text-grey-500'>Cliente n° 1 en reservas</p>
              </div>
          </div>
        </div>
      </div>
      <div className="flex h-52 w-full gap-3">
        <div className="bg-white rounded-lg w-3/5">
          <h3 className="pt-2 pl-2 text-grey-800 font-medium text-xl">Principales Proveedores</h3>
          <div className='relative overflow-x-auto'>
            {loading
              ? (
              <p>Cargando datos...</p>
                )
              : (
            <Table
              removeWrapper aria-label="Example static collection table"
              classNames={{ th: ['bg-transparent', 'border-b'] }}
              className='p-4'
            >
              <TableHeader>
                <TableColumn>{ tableDataSuppliers.headers[0] }</TableColumn>
                <TableColumn>{ tableDataSuppliers.headers[1] }</TableColumn>
                <TableColumn>{ tableDataSuppliers.headers[2] }</TableColumn>
                <TableColumn>{ tableDataSuppliers.headers[3] }</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>{ tableDataSuppliers.rows[0][0]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[0][1]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[0][2]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[0][3]}</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>{ tableDataSuppliers.rows[1][0]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[1][1]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[1][2]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[1][3]}</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>{ tableDataSuppliers.rows[2][0]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[2][1]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[2][2]}</TableCell>
                  <TableCell>{ tableDataSuppliers.rows[2][3]}</TableCell>
                </TableRow>
              </TableBody>
              </Table>
                )}
          </div>
        </div>
        <div className="bg-white rounded-lg w-2/5">
          <h3 className="pt-2 pl-2 text-grey-800 font-medium ">Productos con Bajo Stock</h3>
          <div className='flex flex-col gap-5 pt-3 pl-2'>
            <div className='flex gap-7'>
              <div className='flex flex-col'>
                {!loading &&
                  <>
                    <h4 className='text-sm font-bold text-grey-800'>{lowLevelProducts[0].item_name}</h4>
                    <p className='text-xs text-grey-500'>Remaining Quantity : {lowLevelProducts[0].quantity} {lowLevelProducts[0].unit}</p>
                  </>
                }
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
            <div className='flex gap-7'>
              <div className='flex flex-col'>
                {!loading &&
                  <>
                    <h4 className='text-sm font-bold text-grey-800'>{lowLevelProducts[1].item_name}</h4>
                    <p className='text-xs text-grey-500'>Remaining Quantity : {lowLevelProducts[1].quantity} {lowLevelProducts[1].unit}</p>
                  </>
                }
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
            <div className='flex gap-7'>
              <div className='flex flex-col'>
                {!loading && (
                  <>
                    <h4 className='text-sm font-bold text-grey-800'>{lowLevelProducts[2].item_name}</h4>
                    <p className='text-xs text-grey-500'>Remaining Quantity : {lowLevelProducts[2].quantity} {lowLevelProducts[2].unit}</p>
                  </>
                )}
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
