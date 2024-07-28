export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/customers', '/inventory', '/suppliers', '/reservations', '/employees']
}
