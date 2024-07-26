'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

export default function ModalItem ({ isOpen, onOpenChange }) {
  const [nameForm, setNameForm] = useState({
    name: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNameForm((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    console.log('Datos del formulario:', nameForm)
    onOpenChange(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nuevo Producto</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 px-6" onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    type="text"
                    label="Nombre"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nombre del producto"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    onChange={handleChange}
                  />
                  <Select
                    label="Proveedor"
                    labelPlacement='outside-left'
                    placeholder="Selecciona el proveedor"
                    classNames={{ mainWrapper: 'w-60', base: 'justify-between' }}
                    className='items-center'
                  >
                    <SelectItem key={'1'}>
                        Carnes
                    </SelectItem>
                    <SelectItem key={'2'}>
                        Vegetales
                    </SelectItem>
                    <SelectItem key={'3'}>
                        Condimentos
                    </SelectItem>
                    <SelectItem key={'4'}>
                        Frutas
                    </SelectItem>
                  </Select>
                  <Select
                    label="Categoria"
                    labelPlacement='outside-left'
                    placeholder="Selecciona la categoria"
                    classNames={{ mainWrapper: 'w-60', base: 'justify-between' }}
                    className="items-center"
                  >
                    <SelectItem key={'1'}>
                        Carnes
                    </SelectItem>
                    <SelectItem key={'2'}>
                        Vegetales
                    </SelectItem>
                    <SelectItem key={'3'}>
                        Condimentos
                    </SelectItem>
                    <SelectItem key={'4'}>
                        Frutas
                    </SelectItem>
                  </Select>
                  <Input
                    type="text"
                    label="Cantidad"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la cantidad"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                  />
                  <Input
                    type="text"
                    label="Unidad"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la unidad de medida"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                  />
                  <Input
                    type="text"
                    label="Reorden"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nivel de reorden"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button radius='sm' variant='flat' onPress={onClose} className="text-grey-600 font-medium border-grey-100">
                  Cancelar
                </Button>
                <Button type="submit" radius='sm' className='bg-primary-600 text-white font-medium' onClick={handleSubmit}>
                  Añadir Producto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
