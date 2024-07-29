'use client'

import CardTable from '../components/card-table'
import { useDisclosure } from '@nextui-org/react'
import ModalItem from './addItem'
import { useState, useEffect } from 'react'
import { fetchTablesList } from '../lib/api'
import { useSession } from 'next-auth/react'

const TablesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectTable, setSelectedTable] = useState(null)

  const { data: session } = useSession()

  const token = session?.user?.token

  const [loading, setLoading] = useState(true)
  const [dataTables, setdataTables] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTablesList(token, 10)

        setdataTables(data.tables)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tables list:', error)
      }
    }

    fetchData()
  }, [])

  const handleCardClick = (idTable, status) => {
    if (status !== 'Reservada') {
      setSelectedTable(idTable)
      onOpen()
    }
  }

  return (
    <div className="flex flex-col gap-3 pt-3 px-6">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-5 py-4 px-4">
          <h3 className="text-grey-800 font-medium text-xl">Mesas</h3>
            {!loading && (
              <div className='grid grid-cols-2 grid-rows-3 gap-10 place-items-center'>
              {dataTables.map(table => (
                  <CardTable key={table._id} onClick={() => handleCardClick(table._id, table.status)} number={table.table_number} capacity={table.table_number.capacity} location={table.location === 'IN' ? 'Indoor' : 'Outdoor'} status={table.status}/>
              ))}
              </div>
            )}
          <ModalItem isOpen={isOpen} onOpenChange={onOpenChange} idTable={selectTable}/>
        </div>
      </div>
    </div>

  )
}
export default TablesPage
