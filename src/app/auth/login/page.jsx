'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

export default function LoginPage () {
  const [errorReq, setErrorReq] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const { data: session, status } = useSession()

  const onSubmit = handleSubmit(async data => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res.error) {
      setErrorReq('Correo o contraseña inválidos')
    } else {
      if (status === 'authenticated') {
        if (session.user.role.role_name === 'customer') {
          router.push('/customers')
        } else {
          router.push('/')
        }
      }
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
          <div>
            <div className='flex items-center flex-col text-center gap-2'>
              <Image
                src="/images/RestauManage-logo.png"
                width={48}
                height={48}
                alt="Logo RestauManage"
                priority={true}
                className="rounded-full"
              />
              <h2 className='text-grey-900 font-bold text-2xl'>Inicia Sesión</h2>
              <p className='text-grey-500 w-3/4'>¡Bienvenido! Por favor, ingresa tus credenciales.</p>
            </div>
            <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit} noValidate>
              <div>
                {errorReq && <p className="text-error-500 text-base font-medium my-4">{errorReq}</p>}
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="email1" value="Correo" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' type="email" placeholder="Ingresa tu correo" {...register('email', {
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
                  <Label className='text-grey-700' htmlFor="password1" value="Contraseña" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="password1" type="password" placeholder='Ingresa tu contraseña' {...register('password', {
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
              <div className="text-center">
                <Label>
                  <Link href="/auth/register" className="text-primary-600 hover:underline dark:text-cyan-500">Olvidé mi contraseña</Link>
                </Label>
              </div>
              <Button className='bg-primary-500' type="submit">Iniciar sesión</Button>
              <Label className='text-center text-grey-500'>¿No tienes cuenta aún? <Link href="/auth/register" className="text-primary-600 hover:underline dark:text-cyan-500">Registrate</Link>
              </Label>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
