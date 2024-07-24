import { Button, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage () {
  return (
    <div className='flex justify-evenly items-center h-screen'>
      <div>
        <Image
          src="/images/RestauManage-logo.png"
          width={280}
          height={280}
          alt="Log RestauManage"
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
                className="rounded-full"
              />
              <h2 className='text-grey-900 font-bold text-2xl'>Crea tu cuenta</h2>
            </div>
            <form className="flex max-w-md flex-col gap-3">
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="username1" value="Usuario*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="username" type="text" placeholder="Ingresa tu usuario" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="email1" value="Correo*" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="email" type="email" placeholder="Ingresa tu correo" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="password1" value="Contraseña*" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="password1" type="password" placeholder='Crea una contraseña' required />
              </div>
              <div>
                <Label className='text-gray-500'>
                  Debe tener al menos 8 caracteres
                </Label>
              </div>
              <Button className='bg-primary-500' type="submit">Registrar</Button>
              <Label className='text-center text-grey-500'>¿Ya tienes una cuenta? <Link href="/login" className="text-primary-600 hover:underline dark:text-cyan-500">Inicia sesión</Link>
              </Label>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
