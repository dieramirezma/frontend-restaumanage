'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchCreateSupplier } from '../lib/api'

export default function ModalItem ({ isOpen, onOpenChange }) {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  const { data: session } = useSession()

  const router = useRouter()

  const token = session?.user?.token

  const emailValue = watch('email')

  useEffect(() => {
    if (errorReq) {
      setErrorReq('')
    }
  }, [emailValue])

  const onSubmit = handleSubmit(async data => {
    const res = await fetchCreateSupplier(token, data)

    if (res.error) {
      setErrorReq(res.error)
    } else {
      reset()
      router.refresh()
      onOpenChange(false)
    }
  })

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
              <form className="flex flex-col gap-4 px-6" onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">Nuevo Proveedor</ModalHeader>
              <ModalBody>
                {errorReq && <p className="text-error-500 text-base font-medium my-4">{errorReq}</p>}
                  <Input
                    name="name"
                    type="text"
                    label="Nombre"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nombre del proveedor"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('supplier_name', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                    />
                    {errors.supplier_name && <span className="text-error-500 text-sm font-medium">{errors.supplier_name.message}</span>}
                  <Input
                    type="email"
                    label="Correo"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el correo del proveedor"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Ingresa un correo valido'
                      }
                    })}
                    />
                    {errors.email && <span className="text-error-500 text-sm font-medium">{errors.email.message}</span>}
                  <Input
                    type="text"
                    label="Contacto"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el numero de contacto"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('contact_number', {
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
                    {errors.contact_number && <span className="text-error-500 text-sm font-medium">{errors.contact_number.message}</span>}
                  <Input
                    type="text"
                    label="Direccion"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la direccion"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('address', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                    />
                    {errors.address && <span className="text-error-500 text-sm font-medium">{errors.address.message}</span>}

              </ModalBody>
              <ModalFooter>
                <Button radius='sm' variant='flat' onPress={onClose} className="text-grey-600 font-medium border-grey-100">
                  Cancelar
                </Button>
                <Button type="submit" radius='sm' className='bg-primary-600 text-white font-medium'>
                  Añadir Proveedor
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
