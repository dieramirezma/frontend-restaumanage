'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage () {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    console.log(data)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/register`, {
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
          <div className='w-80'>
            <div className='flex items-center flex-col text-center gap-2'>
              <Image
                src="/images/RestauManage-logo.png"
                width={48}
                height={48}
                alt="Logo RestauManage"
                priority={true}
                className="rounded-full"
              />
              <h2 className='text-grey-900 font-bold text-2xl'>Crea tu cuenta</h2>
            </div>
            <form className="flex max-w-md flex-col gap-3" onSubmit={onSubmit}>
              {errorReq && <p className="text-error-500 text-base font-medium my-4 text-center">El correo ya existe, usa otro</p>}
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="username1" value="Usuario*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="username" type="text" placeholder="Ingresa tu usuario" {...register('username', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  }
                })} />
                {errors.username && <span className="text-error-500 text-sm font-medium">{errors.username.message}</span>}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="email1" value="Correo*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="email" type="email" placeholder="Ingresa tu correo" {...register('email', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Ingresa un correo valido'
                  }
                })} />
                {errors.email && <span className="text-error-500 text-sm font-medium">{errors.email.message}</span>}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="password1" value="Contraseña*" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="password1" type="password" placeholder='Crea una contraseña' {...register('password', {
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })} />
                {errors.password && <span className="text-error-500 text-sm font-medium">{errors.password.message}</span>}
              </div>
              <div>
                <Label className='text-gray-500'>
                  Debe tener al menos 6 caracteres
                </Label>
              </div>
              <Button className='bg-primary-500' type="submit">Registrar</Button>
              <Label className='text-center text-grey-500'>¿Ya tienes una cuenta? <Link href="/auth/login" className="text-primary-600 hover:underline dark:text-cyan-500">Inicia sesión</Link>
              </Label>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
