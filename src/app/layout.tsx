import Sidebar from './components/layout/sidebar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Officedesk',
  description: 'Criado por Danilo Carvalho',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' min-h-screen flex flex-col sm:flex-row gap-4'}>
        <Sidebar />
        <div className='flex w-full items-center justify-center'>
          {children}
        </div>
      </body>
    </html>
  )
}
