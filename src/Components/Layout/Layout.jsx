import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import AuthContextProvider from '../../Contexts/AuthContext'
import { Offline } from "react-detect-offline";
import { Toaster } from 'react-hot-toast';
import CartCounterContextProvider from '../../Contexts/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const Layout = () => {

  let queryClient = new QueryClient()


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          
          <CartCounterContextProvider>
        <Navbar />
        <Outlet />
        </CartCounterContextProvider>
          
      

        
        <div>
          <Offline>
            <div className='offline-toast'>
             You Are Offline
            </div>
          </Offline>
        </div>
        <Footer />
        <Toaster position="top-left"/>
      </AuthContextProvider>
      </QueryClientProvider>


    </>
  )
}

export default Layout