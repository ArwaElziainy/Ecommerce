/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'
import { Helmet } from 'react-helmet'

const Login = () => {

  let [isLoading, setIsLoading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()
  let {isUserLoggedIn, setIsUserLoggedIn} = useContext(AuthContext)

  async function Login(values) {
    
    setIsLoading(true)
    setErrorMessage("")
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
       setErrorMessage(err.response.data.message)
      setIsLoading(false) 
    })
    localStorage.setItem("token", data.token)
    setIsLoading(false)
    setIsUserLoggedIn(true)
    navigate('/home')
  }


  let validationSchema = Yup.object({
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Must be a valid email').required('Email is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must have one letter, special character, number and min length is 8').required('pasword is required')
  })

  let formik = useFormik({
    initialValues: {
      email:'',
      password:''
    },
    validationSchema,
    onSubmit: Login
  })

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container layout pt-5">
      <div className="my-5 pt-5">
        <div className='w-75 m-auto'>
          <h1 className='my-3'>Login Now :</h1>
          <form onSubmit={formik.handleSubmit}>
            
            <label htmlFor="email">Email :</label>
            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3' type="email" name='email' id='email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
              <p>{ formik.errors.email}</p>
            </div> : null }
            
            <label htmlFor="password">Password :</label>
            <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control mb-3' type="password" name='password' id='password' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>
              <p>{ formik.errors.password}</p>
            </div> : null }

            { errorMessage ? <div  className="alert alert-danger">
              {errorMessage}
            </div> : null}

           <Link className="forget text-decoration-none text-black fw-bolder" to={"/forget-password"}>Forget Your Password ?</Link>
            {isLoading ?  <button disabled type='btn' className='btn bg-main text-white d-block ms-auto'>
              <i className='fas fa-spinner fa-spin'></i>
            </button> : <button disabled={isLoading} className='btn bg-main text-white d-block ms-auto'>Login</button>}
      
          </form>
        </div>
      </div>
      </div>
    

    </>
  )
}

export default Login