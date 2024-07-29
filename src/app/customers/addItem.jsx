'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { fetchCreateReservation, fetchUpdateTable } from '../lib/api'

export default function ModalItem ({ isOpen, onOpenChange, idTable }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { data: session } = useSession()

  const router = useRouter()

  const token = session?.user?.token

  const onSubmit = handleSubmit(async data => {
    data.table_id = idTable
    await fetchCreateReservation(token, data)

    await fetchUpdateTable(token, idTable, { status: 'Reservada' })

    onOpenChange(false)
    reset()
    router.refresh()
  }
  )

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
              <form className="flex flex-col gap-4 px-6" onSubmit={onSubmit} noValidate>
              <ModalHeader className="flex flex-col gap-1">Nueva Reserva</ModalHeader>
              <ModalBody>
                  <Input
                    type="text"
                    label="Nombre"
                    labelPlacement='outside-left'
                    placeholder="Ingresa tu nombre"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('customer_name', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                    />
                    {errors.customer_name && <span className="text-error-500 text-sm font-medium">{errors.customer_name.message}</span>}
                  <Input
                    type="number"
                    label="Contacto"
                    labelPlacement='outside-left'
                    placeholder="Ingresa tu numero de contacto"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('customer_contact', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'El número de contacto solo puede contener dígitos'
                      }
                    })}
                    />
                    {errors.customer_contact && <span className="text-error-500 text-sm font-medium">{errors.customer_contact.message}</span>}
                  <Input
                    type="number"
                    label="Personas"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el numero de personas"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('number_of_people', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      min: {
                        value: 0,
                        message: 'El numero de personas debe ser mayor a 0'
                      }
                    })}
                    />
                    {errors.number_of_people && <span className="text-error-500 text-sm font-medium">{errors.number_of_people.message}</span>}

                  <Input
                    label="Fecha"
                    type='datetime-local'
                    labelPlacement="outside-left"
                    dateInputClassNames={{ mainWrapper: 'w-64' }}
                    className='flex justify-between'
                    {...register('reservation_date', {
                      valueAsDate: true,
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                    />
                    {errors.reservation_date && <span className="text-error-500 text-sm font-medium">{errors.reservation_date.message}</span>}
              </ModalBody>
              <ModalFooter>
                <Button radius='sm' variant='flat' onPress={onClose} className="text-grey-600 font-medium border-grey-100">
                  Cancelar
                </Button>
                <Button type="submit" radius='sm' className='bg-primary-600 text-white font-medium' >
                  Crear Reserva
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
