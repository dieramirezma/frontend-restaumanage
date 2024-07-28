'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchCreateInventory } from '../lib/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ModalItem ({ isOpen, onOpenChange, suppliers }) {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { data: session } = useSession()

  const router = useRouter()

  const token = session?.user?.token

  const onSubmit = handleSubmit(async data => {
    const res = await fetchCreateInventory(token, data)

    if (res.error) {
      console.log(res.error)
      setErrorReq(res.error)
    } else {
      onOpenChange(false)
      reset()
      router.refresh()
    }
  })

  if (!suppliers) {
    return (<p>Cargando datos...</p>)
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
              <form className="flex flex-col gap-4 px-6" onSubmit={onSubmit} noValidate>
              <ModalHeader className="flex flex-col gap-1">Nuevo Producto</ModalHeader>
                <ModalBody>
                  {errorReq && <p className="text-error-500 text-base font-medium my-4">{errorReq}</p>}
                  <Input
                    name="item_name"
                    type="text"
                    label="Nombre"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nombre del producto"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('item_name', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                    />
                    {errors.name && <span className="text-error-500 text-sm font-medium">{errors.name.message}</span>}
                  <Select
                    label="Proveedor"
                    labelPlacement='outside-left'
                    placeholder="Selecciona el proveedor"
                    classNames={{ mainWrapper: 'w-60', base: 'justify-between' }}
                    className='items-center'
                    {...register('supplier_id', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                  >
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id} textValue={supplier.supplier_name}>
                        {supplier.supplier_name}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.supplier && <span className="text-error-500 text-sm font-medium">{errors.supplier.message}</span>}
                  <Select
                    label="Categoria"
                    labelPlacement='outside-left'
                    placeholder="Selecciona la categoria"
                    classNames={{ mainWrapper: 'w-60', base: 'justify-between' }}
                    className="items-center"
                    {...register('category', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                  >
                    <SelectItem key={'1'} textValue='Carnes'>
                        Carnes
                    </SelectItem>
                    <SelectItem key={'2'} textValue='Vegetales'>
                        Vegetales
                    </SelectItem>
                    <SelectItem key={'3'} textValue='Condimentos'>
                        Condimentos
                    </SelectItem>
                    <SelectItem key={'4'} textValue='Frutas'>
                        Frutas
                    </SelectItem>
                  </Select>
                  {errors.category && <span className="text-error-500 text-sm font-medium">{errors.category.message}</span>}
                  <Input
                    type="number"
                    label="Cantidad"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la cantidad"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('quantity', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      min: {
                        value: 0,
                        message: 'La cantidad debe ser mayor a 0'
                      }
                    })}
                  />
                  {errors.quantity && <span className="text-error-500 text-sm font-medium">{errors.quantity.message}</span>}
                  <Input
                    type="text"
                    label="Unidad"
                    labelPlacement='outside-left'
                    placeholder="Ingresa la unidad de medida"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('unit', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      }
                    })}
                  />
                  {errors.unit && <span className="text-error-500 text-sm font-medium">{errors.unit.message}</span>}
                  <Input
                    type="number"
                    label="Reorden"
                    labelPlacement='outside-left'
                    placeholder="Ingresa el nivel de reorden"
                    classNames={{ mainWrapper: 'w-60' }}
                    className='flex justify-between'
                    {...register('reorder_level', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      min: {
                        value: 0,
                        message: 'El valor debe ser mayor a 0'
                      }
                    })}
                  />
                  {errors.reorder_level && <span className="text-error-500 text-sm font-medium">{errors.reorder_level.message}</span>}

              </ModalBody>
              <ModalFooter>
                <Button radius='sm' variant='flat' onPress={onClose} className="text-grey-600 font-medium border-grey-100">
                  Cancelar
                </Button>
                <Button type="submit" radius='sm' className='bg-primary-600 text-white font-medium'>
                  Añadir Producto
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
