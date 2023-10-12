import axios from 'axios'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { cartCounterContext } from '../../Contexts/CartContext';

function AddCart({productId}) {

  let  {setCartItems}  = useContext(cartCounterContext)


  async function addProductToCart(productId) {
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart/', { productId }, {
      headers:{
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
    })

    if (res?.data.status === 'success') {
      setCartItems(res?.data.numOfCartItems)
      toast.success(res?.data.message, {
        duration: 1500,
        style: {
          border: '1px solid #0aad0a',
          padding: '16px',
          color: '#000000',
        },
        iconTheme: {
          primary: '#0aad0a',
          secondary: '#FFFAEE',
        },
      });
      
    }
  }

  return (
    <>
      
                <button onClick={()=>{addProductToCart(productId)}} className='btn bg-main text-white w-100'>Add To Cart</button>
          
   </>
  )
}

export default AddCart