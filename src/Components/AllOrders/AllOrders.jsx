import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

function AllOrders() {

  const [userOrders, setUserOrders] = useState(null)
  const [isLoading, setIsLoading] = useState()


  useEffect(() => {
    const res = jwtDecode(localStorage.getItem("token"))
    getUserOrders(res.id)
  }, [])

  async function getUserOrders(id) {

    try {
      setIsLoading(true)
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      setIsLoading(false)
      console.log(data);
      setUserOrders(data)
    } catch (error) {
      console.log('error', error);
    }
  }


  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="layout my-5 py-5">
        {!isLoading ? <div className="container">
          <h1 className='text-main text-center py-4'>Orders</h1>
          {userOrders?.map((order, index) => {
            return <div key={index} className="row">
              <div className="col-md-12 shadow rounded-3 my-4 p-4">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h2> Order Id : {order.id}</h2>
                    <h5 className='text-main'>Order Items : </h5>

                    {order.cartItems?.map((item, i) => {
                      return <div key={i} className='ps-3'>
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <img className='w-100' src={item.product.imageCover} alt="" />
                          </div>
                          <div className="col-md-10">
                            <h4>{item?.product.title.split(" ").slice(0,2).join(" ")}</h4>
                            <p className='text-main'>{item?.product.category.name}</p>
                            <p>{item?.price} EGP x {item?.count}</p>


                          </div>
                        </div>
                      </div>
                    })}
                  </div>
                  <div className="col-md-6">

                    <div className='ps-3'>


                      <h5 className=' text-main'>Shipping Details :</h5>
                      <div className='ps-2'>
                        <p> phone : {order.shippingAddress.phone}</p>
                        <p>city : {order.shippingAddress.city}</p>
                        <p>Order details : {order.shippingAddress.details}</p>
                      </div>

                      <h5 className=' text-main'>Payment Method :<span className='text-black'> {order.paymentMethodType}</span> </h5>
                      <h5 className=' text-main'>Shipping Price :<span className='text-black'> {order.shippingPrice} EGP</span> </h5>
                      <hr />
                      <h5 className=' text-main'>Total Order Price :<span className='text-black'> {order.totalOrderPrice} EGP</span> </h5>

                    </div>
                  </div>
                </div>
                <div className="order">



                </div>
              </div>
            </div>
          })}

        </div> : <div className='vh-100 vw-100 bg-black bg-opacity-50 text-center d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
        </div>}

      </div>
    </>
  )
}

export default AllOrders