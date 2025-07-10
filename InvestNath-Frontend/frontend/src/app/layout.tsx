import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '@/components/Navbar'


export const metadata={
  title:'InvestNath',
  description:'Next.js + Django fullstack blog',
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          <main className='px-4 py-6'>
          {children}
          </main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  )

}