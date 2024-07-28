'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { fetchSuppliersList } from './lib/api'

export default function Dashboard () {
  // const tableData = {
  //   headers: ['Nombre', 'Cantidad Recibida', 'Última Cantidad', 'Fecha'],
  //   rows: [
  //     ['Surf Excel', '30', '12', '12/12/2021'],
  //     ['Dove', '20', '  10', '12/12/2021'],
  //     ['Pepsi', '10', '5', '12/12/2021']
  //   ]
  // }
  const [loading, setLoading] = useState(true)

  const [tableData, setTableData] = useState({
    headers: ['Nombre', 'Cantidad Recibida', 'Última Cantidad', 'Fecha'],
    rows: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSuppliersList()
        console.log(data.suppliers)
        setTableData({
          headers: ['Nombre', 'Cantidad Recibida', 'Última Cantidad', 'Fecha'],
          rows: data.suppliers.map(supplier => [supplier.supplier_name, 0, 0, supplier.created_at.split('T')[0]])
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suppliers list:', error)
      }
    }

    fetchData()
  }, [])

  // console.log(tableDataT)
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
                <p className="font-medium text-grey-600">868</p>
                <p className="text-xs">Cantidad disponible</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/inventory-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <p className="font-medium text-grey-600">200</p>
                <p className="text-xs">Últimos recibidos</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/inventory-resume1.svg"
                  width={24}
                  height={24}
                  alt="Cantidad Disponible icon"
                />
                <p className="font-medium text-grey-600">200</p>
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
                <p className="font-medium text-grey-600">31</p>
                <p className="text-xs">Número de proveedores</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/icons/supplier-resume2.svg"
                  width={24}
                  height={24}
                  alt="Numero de categorias icon"
                />
                <p className="font-medium text-grey-600">21</p>
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
                  <p className="font-medium text-grey-600">82</p>
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
                  <p className="font-medium text-grey-600">3</p>
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
                <TableColumn>{ tableData.headers[0] }</TableColumn>
                <TableColumn>{ tableData.headers[1] }</TableColumn>
                <TableColumn>{ tableData.headers[2] }</TableColumn>
                <TableColumn>{ tableData.headers[3] }</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>{ tableData.rows[0][0]}</TableCell>
                  <TableCell>{ tableData.rows[0][1]}</TableCell>
                  <TableCell>{ tableData.rows[0][2]}</TableCell>
                  <TableCell>{ tableData.rows[0][3]}</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>{ tableData.rows[1][0]}</TableCell>
                  <TableCell>{ tableData.rows[1][1]}</TableCell>
                  <TableCell>{ tableData.rows[1][2]}</TableCell>
                  <TableCell>{ tableData.rows[1][3]}</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>{ tableData.rows[2][0]}</TableCell>
                  <TableCell>{ tableData.rows[2][1]}</TableCell>
                  <TableCell>{ tableData.rows[2][2]}</TableCell>
                  <TableCell>{ tableData.rows[2][3]}</TableCell>
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
                <h4 className='text-sm font-bold text-grey-800'>Tata Salt</h4>
                <p className='text-xs text-grey-500'>Remaining Quantity : 10 Packet</p>
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
            <div className='flex gap-7'>
              <div className='flex flex-col'>
                <h4 className='text-sm font-bold text-grey-800'>Lays</h4>
                <p className='text-xs text-grey-500'>Remaining Quantity : 15 Packet</p>
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
            <div className='flex gap-7'>
              <div className='flex flex-col'>
                <h4 className='text-sm font-bold text-grey-800'>Tata Salt</h4>
                <p className='text-xs text-grey-500'>Remaining Quantity : 10 Packet</p>
              </div>
              <h5 className='inline-block text-xs text-error-700 font-medium bg-error-50 rounded-lg px-2 self-center'>Low</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
