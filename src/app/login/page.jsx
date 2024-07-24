import { Button, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage () {
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
          <div>
            <div className='flex items-center flex-col text-center gap-2'>
              <Image
                src="/images/RestauManage-logo.png"
                width={48}
                height={48}
                alt="Logo RestauManage"
                className="rounded-full"
              />
              <h2 className='text-grey-900 font-medium text-2xl'>Inicia Sesión</h2>
              <p className='text-grey-500 w-3/4'>¡Bienvenido! Por favor, ingresa tus credenciales.</p>
            </div>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="email1" value="Usuario o Correo" />
                </div>
                <TextInput className='text-grey-500 rounded-lg border-primary-500' id="email" type="email" placeholder="Ingresa tu usuario o correo" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className='text-grey-700' htmlFor="password1" value="Contraseña" />
                </div>
                <TextInput className='text-grey-500 border-grey-300' id="password1" type="password" placeholder='Ingresa tu contraseña' required />
              </div>
              <div className="text-center">
                <Label>
                  <Link href="/register" className="text-primary-600 hover:underline dark:text-cyan-500">Olvidé mi contraseña</Link>
                </Label>
              </div>
              <Button className='bg-primary-500' type="submit">Iniciar sesión</Button>
              <Label className='text-center text-grey-500'>¿No tienes cuenta aún? <Link href="/register" className="text-primary-600 hover:underline dark:text-cyan-500">Registrate</Link>
              </Label>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
