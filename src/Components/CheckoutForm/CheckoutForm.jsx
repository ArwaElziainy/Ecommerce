import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet';
import * as Yup from 'yup'
import { useParams } from 'react-router-dom';

function CheckoutForm() {



  let {id} = useParams()


  async function order(shippingAddress) {
      fetchCheckout(shippingAddress)
  }

  async function fetchCheckout(shippingAddress) {

      let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
          shippingAddress
      }, {
          headers: {
              token: localStorage.getItem("token")
          }
      })

      console.log(res);
     window.location.href = res.data.session.url
  }

  let validationSchema = Yup.object({
    details: Yup.string().min(3).required('Details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Enter Valid Phone Number').required('Phone is required'),
    city: Yup.string().min(3).required('City is required')

  })

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: order
  })


  return (
    <>
      <Helmet>
        <title>Chech Out</title>
      </Helmet>

      <div className="layout py-5">
        <div className="container mt-5 pt-5 w-50">
          <form onSubmit={formik.handleSubmit}>

            <label htmlFor="details">Details :</label>
            <input onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} className='form-control mb-3' type="text" name='details' id='details' />
            {formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>
              <p>{formik.errors.details}</p>
            </div> : null}


            <label htmlFor="phone">Phone :</label>
            <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-3' type="tel" name='phone' id='phone' />
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>
              <p>{formik.errors.phone}</p>
            </div> : null}

            <label htmlFor="city">City :</label>
            <input onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} className='form-control mb-3' type="text" name='city' id='city' />
            {formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>
              <p>{formik.errors.city}</p>
            </div> : null}


            <button className='btn bg-main text-white d-block ms-auto'>Order</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm