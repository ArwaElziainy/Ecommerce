import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Register = () => {

  let [isLoading, setIsLoading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()
  async function register(values) {
    
    setIsLoading(true)
    setErrorMessage("")
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err) => {
       setErrorMessage(err.response.data.message)
      setIsLoading(false) 
    })
    setIsLoading(false)
    navigate('/login')
    console.log(data);
  }


  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min length must be greater than 3 charachters').max(20,'Max length must be less than 20 charachters').required('Name is required'),
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Must be a valid email').required('Email is required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must have one letter, special character, number and min length is 8').required('pasword is required'),
    rePassword: Yup.string().required('Re Pasword is required').oneOf([Yup.ref('password')], 'Password and Re Password do not match'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required('Phone is required')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit: register
  })

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container layout pt-5">
      <div className="my-5">
        <div className='w-75 m-auto'>
          <h1 className='my-3'>Register Now :</h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} className='form-control mb-3' type="text" name='name' id='name' />
            {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>
              <p>{ formik.errors.name}</p>
            </div> : null }
            
            
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

            <label htmlFor="rePassword">Re Password :</label>
            <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} className='form-control mb-3' type="password" name='rePassword' id='rePassword' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>
              <p>{ formik.errors.rePassword}</p>
            </div> : null }

            <label htmlFor="phone">Phone :</label>
            <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control mb-3' type="tel" name='phone' id='phone' />
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>
              <p>{ formik.errors.phone}</p>
            </div> : null }

            { errorMessage ? <div  className="alert alert-danger">
              {errorMessage}
            </div> : null}

           
            {isLoading ?  <button disabled type='btn' className='btn bg-main text-white d-block ms-auto'>
              <i className='fas fa-spinner fa-spin'></i>
            </button> : <button disabled={isLoading} className='btn bg-main text-white d-block ms-auto'>Register</button>}
      
          </form>
        </div>
      </div>
      </div>
     

    </>
  )
}

export default Register