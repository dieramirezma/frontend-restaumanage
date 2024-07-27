'use client'

import CardTable from '../components/card-table'
import { useDisclosure } from '@nextui-org/react'
import ModalItem from './addItem'
import { useState } from 'react'

const TablesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectTable, setSelectedTable] = useState(null)

  const handleCardClick = (number) => {
    setSelectedTable(number)
    onOpen()
  }

  return (
    <div className="flex flex-col gap-3 pt-3 px-6">
      <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-5 py-4 px-4">
          <h3 className="text-grey-800 font-medium text-xl">Mesas</h3>
          {/* Grid 2 columns 3 rows */}
          <div className='grid grid-cols-2 grid-rows-3 gap-10 place-items-center'>
            <CardTable onClick={handleCardClick} number={1} capacity={4} location={'Indoor'} status={'Disponible'}/>
            <CardTable onClick={handleCardClick} number={2} capacity={4} location={'Indoor'} status={'Disponible'}/>
            <CardTable onClick={handleCardClick} number={3} capacity={4} location={'Indoor'} status={'Disponible'}/>
            <CardTable onClick={handleCardClick} number={4} capacity={4} location={'Indoor'} status={'Disponible'}/>
            <CardTable onClick={handleCardClick} number={5} capacity={4} location={'Indoor'} status={'Disponible'}/>
            <CardTable onClick={handleCardClick} number={6} capacity={4} location={'Indoor'} status={'Disponible'}/>
          </div>
          <ModalItem isOpen={isOpen} onOpenChange={onOpenChange} number={selectTable}/>
        </div>
      </div>
    </div>

  )
}
export default TablesPage
