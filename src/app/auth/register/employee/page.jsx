'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function RegisterEmployeePage () {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    console.log(data)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}employees/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: data.username, email: data.email, password: data.password })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Register successful', data)

        router.push('/auth/login')
      } else {
        const errorData = await response.json()
        setErrorReq(errorData.message || 'Error en el registro de usuario')
      }
    } catch (error) {
      setErrorReq('Error en la conexión con el servidor')
    }
  })
  return (
    <div className='flex justify-evenly items-center h-screen'>
      <div>
        <Image
          src="/images/RestauManage-logo.png"
          width={280}
          height={280}
          alt="Log RestauManage"
          priority={true}
          className="rounded-full"
        />
        <h1 className="text-logo text-4xl font-bold">RestauManage</h1>
      </div>
      <div>
        <div>
          <div className='w-96'>
            <div className='flex items-center flex-col text-center gap-2'>
              <Image
                src="/images/RestauManage-logo.png"
                width={48}
                height={48}
                alt="Logo RestauManage"
                priority={true}
                className="rounded-full"
              />
              <h2 className='text-grey-900 font-bold text-2xl'>Registro de empleado</h2>
              <p className='text-grey-500 text-sm'>¡Felicidades! Ahora haces parte del equipo de trabajo de RestauManage. Por favor, registra la siguiente información.</p>
            </div>
            <form className="flex max-w-md flex-col gap-3">
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="name1" value="Nombre*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="name" type="text" placeholder="Ingresa tu nombre" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="last_name1" value="Apellidos*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="last_name" type="text" placeholder="Ingresa tus apellidos" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="contact1" value="Contacto*" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="contact" type="text" placeholder='Ingresa tu número de contacto' required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="address1" value="Dirección*" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="address" type="text" placeholder='Ingresa tu dirección' required />
              </div>
              <Button className='bg-primary-500' type="submit">Registrar  </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}