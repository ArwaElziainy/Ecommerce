import axios from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

function Brands() {


    let [brand, setBrand] = useState()
    let [loading, setLoading] = useState()


    let { isLoading, data } = useQuery('brands', getBrands)

    function getBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }


    async function getBrand(brandId) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/` + brandId)
        setLoading(false)
        setBrand(data.data)
    }



    return (
        <>
            <Helmet>
                <title>Brands</title>
            </Helmet>
            <div className='layout'>
                {!isLoading ? <div className="container pt-5 my-5">
                    <h1 className=' text-center pt-5 text-main fw-bolder'>Brands</h1>
                    <div className="row g-4">

                        {data?.data.data.map((brand) => {
                            return <div key={brand._id} className="col-md-3">
                                <Link onClick={() => { getBrand(brand?._id) }} className='text-decoration-none text-black' data-bs-toggle="modal" data-bs-target="#exampleModal">

                                    <div className="card product rounded overflow-hidden mt-5">
                                        <div className=" overflow-hidden">
                                            <img className='img-fluid w-100' src={brand?.image} alt="" />
                                        </div>
                                        <div className="card-body">
                                            <p className='text-black py-2 text-center'>{brand?.name}</p>

                                        </div>
                                    </div>
                                </Link>



                            </div>
                        })}


                    </div>
                </div>
                    : <div className='py-5 my-5 d-flex justify-content-center align-items-center bg-black bg-opacity-75 position-fixed vh-100 vw-100'>
                        <i className="fa-solid fa-spinner fa-spin fa-3x text-white "></i>
                    </div>

                }
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="container">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {!loading ? <div class="modal-body row align-items-center">
                                    <div className="col-md-6">
                                        <h3 className='text-main'>{brand?.name}</h3>
                                        <h6>{brand?.slug}</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <img className='w-100' src={brand?.image} alt="" />
                                    </div>
                                </div> : <div className='py-5 my-5 text-center'>
                                    <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
                                </div>}

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>


        </>
    )
}

export default Brands