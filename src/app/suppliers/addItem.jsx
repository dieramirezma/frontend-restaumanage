'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
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
              <ModalHeader className="flex flex-col gap-1">Nuevo Proveedor</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 px-6" onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    type="text"
                    label="Nombre"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nombre del proveedor"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    label="Correo"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el correo del proveedor"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                  />
                  <Input
                    type="text"
                    label="Contacto"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el numero de contacto"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                  />
                  <Input
                    type="text"
                    label="Direccion"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la direccion"
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
                  Añadir Proveedor
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
