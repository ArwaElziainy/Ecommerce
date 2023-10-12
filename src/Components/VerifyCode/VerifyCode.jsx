/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext'
import { Helmet } from 'react-helmet'

const VerifyCode = () => {

    let [isLoading, setIsLoading] = useState(false)
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)

    async function Code(values) {

        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
            console.log(data);
        localStorage.setItem("token", data.token)
            setIsLoading(false)
            setIsUserLoggedIn(true)
             navigate('/reset-password')
            
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
    }
        }


    


    let validationSchema = Yup.object({
        resetCode: Yup.string().min(6).max(6).required('Code is required')
    })

    let formik = useFormik({
        initialValues: {
            resetCode: ''
        },
        validationSchema,
        onSubmit: Code
    })

    return (
        <>
            <Helmet>
                <title>Verify Code</title>
            </Helmet>
            <div className="layout pt-5">
                <div className="container pt-5">
                <div className="my-5">
                <div className='w-75 m-auto'>
                    <h2 className='my-5 fw-bolder'>Enter The Verfication Code :</h2>
                    <form onSubmit={formik.handleSubmit}>

                        <div class="form-floating mb-3">
                            <input onBlur={formik.handleBlur} value={formik.values.resetCode} onChange={formik.handleChange} type="text" name='resetCode' class="form-control" id="resetCode" placeholder="Reset Code" />
                            <label htmlFor="resetCode">Verfication Code</label>
                        </div>
                        {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger'>
                            <p>{formik.errors.resetCode}</p>
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
                </div>
            </div>
         

        </>
    )
}

export default VerifyCode