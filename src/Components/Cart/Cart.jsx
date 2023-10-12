import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import emptyImg from '../../Assets/images/kettle-desaturated._CB659190457_.svg'
import { cartCounterContext } from '../../Contexts/CartContext'
import { Link } from 'react-router-dom';

const Cart = () => {


  let  {setCartItems}  = useContext(cartCounterContext)

  let [isLoading, setIsLoading] = useState()
  let [numOfCartItems, setNumOfCartItems] = useState(0)
  let [totalCartPrice, setTotalCartPrice] = useState(0)
  let [cartProducts, setCartProducts] = useState([])
  let [requestTimeOut, setRequestTimeOut] = useState()
  let [cartId, setCartId] = useState("")
  

  useEffect(() => {
    getUserCart()
  }, [])

  async function getUserCart() {
    setIsLoading(true)
    let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      console.log(err);
    })
    setIsLoading(false)
 
    console.log(res?.data);

    setCartId(res?.data.data._id)

    setNumOfCartItems(res?.data.numOfCartItems)
    setTotalCartPrice(res?.data.data.totalCartPrice)
    setCartProducts(res?.data.data.products)
  }

  async function removeCartItem(cartId) {

    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + cartId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })  
    setNumOfCartItems(data.numOfCartItems)
    setTotalCartPrice(data.data.totalCartPrice)
    setCartProducts(data.data.products)
    setCartItems(data.numOfCartItems)


  }

  async function clearCart() {

    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    })  

    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setCartProducts([])
    setCartItems(0)

    console.log(data);
  }

   function updateProductCount(cartId, count, index) {

    let newCartProducts = [...cartProducts]
       
    newCartProducts[index]['count'] = count
     setCartProducts(newCartProducts)

     clearTimeout(requestTimeOut)
     setRequestTimeOut(setTimeout(async () => {
       
       
       
      let res = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + cartId, {
      count
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
      })
       
      setNumOfCartItems(res?.data.numOfCartItems)
      setTotalCartPrice(res?.data.data.totalCartPrice)
      setCartProducts(res?.data.data.products)
  
    }, 500))


    

  
  }

  return (

    <>
      
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="layout">
        {!isLoading ? <div>
        {numOfCartItems > 0 ?  <div className="container mt-5 py-5">
        <h1 className='mt-4 text-center text-main'>Cart Shop</h1>
        <div className='mt-4 d-flex justify-content-between'>
            <h4 className='text-main'>Total Price: <span className='text-dark'>{totalCartPrice} EGP</span></h4>
            <h4 className='text-main'>Total Items: <span className='text-dark'>{ numOfCartItems}</span></h4>
            </div>
            <div className='d-flex justify-content-between'>
              <Link to={'/checkout/' + cartId}>
              <button className='btn bg-main text-white mt-3 fs-5'>Check out</button>
              </Link>
            <button onClick={clearCart} className='btn btn-outline-danger mt-3'>Clear Cart</button>
            </div>
            
          {cartProducts?.map((product,index) => {
            return <div key={product?._id} className="row mt-5 align-items-center p-3 shadow my-4 rounded-4">
              <div className="col-md-2 py-2">
                <img className='w-100' src={product?.product.imageCover} alt="" />
              </div>
              <div className="col-md-10 py-2">
                <div className=' d-flex align-items-center justify-content-between'>
                  <div>
                    <h3>{product?.product.title}</h3>
                    <h5>{product?.product.category.name}</h5>
                    <p>{product?.price} EGP</p>
                    <div className="rating  mb-3">
                      <i className=' fa-solid fa-star rating-color'> </i>
                      <span > {" "+product?.product.ratingsAverage}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <button onClick={()=>{removeCartItem(product.product._id)}}  className='btn text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
                    </div>
                    <div className=' d-flex align-items-center mt-3 '>
                      <button onClick={()=>{updateProductCount(product.product._id, product.count - 1, index)}} className='btn bg-main text-white mx-2 px-2 py-0'>-</button>
                      <span className='fs-4'>{product?.count}</span>
                      <button onClick={()=>{updateProductCount(product.product._id, product.count + 1, index)}}  className='btn bg-main text-white mx-2 px-2 py-0'>+</button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          })}
          
          <h4 className='text-main'>Total Price: <span className='text-dark'>{totalCartPrice} EGP</span></h4>
          <div className=' d-flex flex-column align-items-end'>
          <Link to={'/checkout/' + cartId}>
          <button className='btn bg-main text-white mt-3 fs-5'>Check out</button>
              </Link>
            <button onClick={clearCart} className='btn btn-outline-danger mt-3'>Clear Cart</button>
          </div>
        </div> : <div className="container my-5 py-5">
            <div className='text-center pt-5'>
              <img className='w-50' src={emptyImg} alt="" />
              <h3 className='mt-3 text-empty'>Your Cart Is Empty</h3>
            </div>
        </div>}
        
        </div> :  <div className='py-5 my-5 d-flex justify-content-center align-items-center bg-black bg-opacity-75 position-fixed vh-100 vw-100'>
        <i className="fa-solid fa-spinner fa-spin fa-3x text-white "></i>
        </div>}
        
      </div>



    </>
  )
}

export default Cart



