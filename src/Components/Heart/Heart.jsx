import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Heart({ productId }) {
  
    let [wishlistProducts, setWishlistProducts] = useState([])
  
  const [isWishlist, setIsWishlist] = useState(
    () => localStorage.getItem(productId) === 'true'
  );
  useEffect(() => {
    localStorage.setItem(productId, isWishlist);
  }, [productId, isWishlist]);
  
  const toggleWishlist = () => {
    setIsWishlist(prevState => !prevState);
  };
  
  async function addProductToWishlist(productId) {

    
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist/', { productId }, {
      headers:{
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
    
    if (res?.data.status === 'success') {
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

  async function removeWishItem(productId) {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
        headers: {
          token: localStorage.getItem("token")
      }
    })
    console.log(data.data);
    setWishlistProducts(data.data)
}

  return (
    <>
      
      <div className='fs-3 color-red' onClick={() => { addProductToWishlist(productId); toggleWishlist()}}>
        {isWishlist ? <FaHeart /> : <FaRegHeart />}
      </div>
                

      </>
  )
}

export default Heart