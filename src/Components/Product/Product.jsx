import React from 'react'
import { Link } from 'react-router-dom'
import AddCart from '../AddCart/AddCart'
import Heart from '../Heart/Heart'

function Product({ product }) {
  return (
    <>
      <div className="product overflow-hidden p-4 rounded">
        <Link to={'/product-details/' + product._id} className=' text-decoration-none text-dark'>
          <img className='w-100' src={product?.imageCover} alt="" />
          <h5 className='font-sm text-main mt-3'>{product?.category.name}</h5>
          <h5 className='fw-bolder'>{product?.title.split(" ").slice(0, 2).join(" ")}</h5>
          <p>{product?.price} EGP</p>
          <div className="rating float-end mb-3">
            <i className=' fa-solid fa-star rating-color'></i>
            <span >{product?.ratingsAverage}</span>
          </div>
        </Link>
          <Heart productId={product._id}  />
        <AddCart productId={product._id} />
      </div>
    </>
  )
}

export default Product