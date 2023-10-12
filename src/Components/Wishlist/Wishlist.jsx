import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import AddCart from '../AddCart/AddCart'
import emptyImg from '../../Assets/images/kettle-desaturated._CB659190457_.svg'


function Wishlist() {

    let [isLoading, setIsLoading] = useState()
    let [numOftItems, setNumOfItems] = useState(0)
    let [wishlistProducts, setWishlistProducts] = useState([])

    useEffect(() => {
        getUserwishlist()
      }, [])
    

    async function getUserwishlist() {
        setIsLoading(true)
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            token: localStorage.getItem("token")
          }
        }).catch((err) => {
          console.log(err);
        })
        setIsLoading(false)
        setNumOfItems(res?.data.count)
      setWishlistProducts(res?.data.data)
      console.log(res?.data);
    }
    
    async function removeWishItem(productId) {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
            headers: {
              token: localStorage.getItem("token")
          }
        })
        console.log(data.data);
        setWishlistProducts(data.data)
        getUserwishlist()
    }
  

  return (
      <>
          <Helmet>
              <title>Wishlist</title>
          </Helmet>
          <div className="layout">
              {!isLoading ? <div className="container mt-5 pt-5">
                  {numOftItems > 0 ?   <div>
            <h1 className='text-center py-3 text-main'> My Wishlist</h1>
            
                      {wishlistProducts?.map((wishProduct,index) => {
                          return  <div key={index} className="row align-items-center shadow rounded-3 my-4 p-3">
                          <div className="col-md-2">
                              <img className='w-100' src={wishProduct?.imageCover} alt="" />
                          </div>
                          <div className="col-md-10 d-flex justify-content-between">
                              <div className=''>
                                      <h4>{wishProduct?.title }</h4>
                                      <p>{wishProduct?.price } EGP</p>
                                  <button onClick={()=>{removeWishItem(wishProduct?._id)}}  className='btn text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
                              </div>
                              <div><AddCart productId={wishProduct._id}/></div>
                          </div>
                      </div>
                      })}
                 
              </div> : <div className="container my-5 py-5">
            <div className='text-center pt-5'>
              <img className='w-50' src={emptyImg} alt="" />
              <h3 className='mt-3 text-empty'>Your Wish list Is Empty</h3>
            </div>
        </div>}
        
                  </div>
                  :  <div className='py-5 my-5 d-flex justify-content-center align-items-center bg-black bg-opacity-75 position-fixed vh-100 vw-100'>
        <i className="fa-solid fa-spinner fa-spin fa-3x text-white "></i>
        </div>}
        
          </div>
      </>
  )
}

export default Wishlist