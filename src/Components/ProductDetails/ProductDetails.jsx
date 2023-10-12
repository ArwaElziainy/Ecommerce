import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddCart from '../AddCart/AddCart'
import Heart from '../Heart/Heart'
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';



function SampleNextArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div
                    className={className}
                    style={{ ...style, top: "100%", left: "52%", backgroundColor: "#d6d6d6", borderRadius: "10px", transform: "translateX(-50%)", marginTop: "5px" }}
                    onClick={onClick}
                />
            );
        }
    
        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div
                    className={className}
                    style={{ ...style, top: "100%", left: "46%", backgroundColor: "#d6d6d6", borderRadius: "10px", transform: "translateX(-50%)", marginTop: "5px" }}
                    onClick={onClick}
                />
            );
        }

function ProductDetails() {





    let { id } = useParams();

    let [productDetails, setProductDetailes] = useState();
    let [isLoading, setIsLoading] = useState();

    useEffect(() => {
        getProductsDetails(id)
    },[])

    async function getProductsDetails(productId) {
        setIsLoading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId)
        setIsLoading(false)
        setProductDetailes(data.data)
    }

    var settings = {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: <SamplePrevArrow />,
                nextArrow: <SampleNextArrow />
            };


    return (
        <>
            <Helmet>
                <title>{ productDetails?.title}</title>
      </Helmet>
            <div className='layout'>
            {!isLoading ?<div className='container py-5'>
                <div className="row pt-5 mt-5 align-items-center">
                
                    <div className="col-md-4">
                    <Slider {...settings} >

                                 {productDetails?.images.map((img) => {
                                     return <img key={img} className='w-100' src={img} alt="" />
                                 })}

                            </Slider>
                    </div>
                    <div className="col-md-8">
                        <h1>{productDetails?.title}</h1>
                        <h5 className=' text-main'>{productDetails?.category.name}</h5>
                        <h5 className=' text-main'>{productDetails?.brand.name}</h5>
                        <p>{productDetails?.description}</p>
                        <p className=' d-flex align-items-center justify-content-between'>
                            <span className='fs-5'>{productDetails?.price} EGP</span> <br /> <br />
                            <span className='float-end'><i className='fas fa-star rating-color'></i>{productDetails?.ratingsAverage}</span>
                        </p>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <AddCart productId={productDetails?._id}/>
                            </div>
                            <div className="col-6">
                                <Heart productId={productDetails?._id}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <div className='py-5 my-5 d-flex justify-content-center align-items-center bg-black bg-opacity-75 position-fixed vh-100 vw-100'>
                <i className="fa-solid fa-spinner fa-spin fa-3x text-white "></i>
            </div>}
           </div>
            

        </>
    )
}

export default ProductDetails


