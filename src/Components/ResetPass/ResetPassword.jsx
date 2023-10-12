/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'
import { Helmet } from 'react-helmet'

const ResetPassword = () => {

  let [isLoading, setIsLoading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()
  let {isUserLoggedIn, setIsUserLoggedIn} = useContext(AuthContext)

  async function Reset(values) {
    

    try {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      console.log(data);
    localStorage.setItem("token", data.token)
      setIsLoading(false)
      setIsUserLoggedIn(true)
       navigate('/home')
      
  } catch (error) {
      setErrorMessage(error.response.data.message)
      setIsLoading(false)
}
  }
    
  


  let validationSchema = Yup.object({
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Must be a valid email').required('Email is required'),
    newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must have one letter, special character, number and min length is 8').required('pasword is required')
  })

  let formik = useFormik({
    initialValues: {
      email:'',
      newPassword:''
    },
    validationSchema,
    onSubmit: Reset
  })

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="layout pt-5">
        <div className="container pt-5">
        <div className="my-5">
        <div className='w-75 m-auto'>
          <h1 className='my-3'>Reset Your Password :</h1>
          <form onSubmit={formik.handleSubmit}>
            
            <label htmlFor="email">Email :</label>
            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3' type="email" name='email' id='email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
              <p>{ formik.errors.email}</p>
            </div> : null }
            
            <label htmlFor="newPassword">New Password :</label>
            <input onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange} className='form-control mb-3' type="password" name='newPassword' id='newPassword' />
            {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>
              <p>{ formik.errors.newPassword}</p>
            </div> : null }

            { errorMessage ? <div  className="alert alert-danger">
              {errorMessage}
            </div> : null}

          
            {isLoading ?  <button disabled type='btn' className='btn bg-main text-white d-block ms-auto'>
              <i className='fas fa-spinner fa-spin'></i>
            </button> : <button disabled={isLoading} className='btn bg-main text-white d-block ms-auto'>Reset</button>}
      
          </form>
        </div>
      </div>
        </div>
      </div>
    

    </>
  )
}

export default ResetPassword