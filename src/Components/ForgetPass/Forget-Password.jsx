/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'
import { Helmet } from 'react-helmet'

const ForgetPassword = () => {

    let navigate = useNavigate()
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)


    async function sendCode(values) {
        

        
        try {
        setIsLoading(true)
            setErrorMessage("")
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            
        console.log(data);
        localStorage.setItem("token", data.token)
            setIsLoading(false)
            setIsUserLoggedIn(true)
             navigate('/verify-code')

        
    } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
    }

}
    let [isLoading, setIsLoading] = useState(false)
    let [errorMessage, setErrorMessage] = useState("")
 


    let validationSchema = Yup.object({
        email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Must be a valid email').required('Email is required')
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            redirectUrl: 'http://localhost:3000/verify-code'
        },
        validationSchema,
        onSubmit: sendCode
    })

    return (
        <>
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <div className="layout pt-5">
                {!isLoading ?  <div className="container pt-5">
                    <div className="my-5">
                        <div className='w-75 m-auto'>
                            <h2 className='my-5 fw-bolder'>Please Enter Your Email Address To Reset Password :</h2>
                            <form onSubmit={formik.handleSubmit}>

                                <div class="form-floating mb-3">
                                    <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name='email' class="form-control" id="email" placeholder="Email" />
                                    <label htmlFor="email">Email address</label>
                                </div>
                                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                                    <p>{formik.errors.email}</p>
                                </div> : null}

                                {errorMessage ? <div className="alert alert-danger">
                                    {errorMessage}
                                </div> : null}
                                {isLoading ? <button disabled type='btn' className='btn bg-main text-white d-block ms-auto'>
                                    <i className='fas fa-spinner fa-spin'></i>
                                </button> : <button disabled={isLoading} className='btn bg-main text-white d-block ms-auto'>Verify</button>}

                            </form>
                        </div>
                    </div>
                </div>:<div className=' position-fixed vh-100 vw-100 bg-black bg-opacity-50 text-center d-flex justify-content-center align-items-center'>
                <i className="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
            </div>}
               

            </div>

        </>
    )
}

export default ForgetPassword