import React from 'react'
import notfoundImg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>NotFound</title>
      </Helmet>
    <div className='layout mt-5 text-center'>
      <img className='w-50 mt-5' src={notfoundImg} alt="" />
    </div>
    </>
  )
}

export default NotFound