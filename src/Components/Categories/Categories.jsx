import axios from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

function Categories() {




    let [subcategory, setSubCategory] = useState()
    let [loading, setLoading] = useState()

    let { isLoading, data } = useQuery('categories', getCategories)

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }


    async function getCategory(categoryId) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
        setLoading(false)
        console.log(data.data);
        setSubCategory(data.data)
    }







    return (
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>
            <div className='layout pt-3'>
                {!isLoading ? <div className="container my-5">
                    <h1 className='text-center pt-5 mt-4 text-main'>Categories</h1>

                    <div className="row g-4">
                        {data?.data.data.map((category) => {
                            return <div key={category._id} className="col-md-4 mt-3">
                                <Link onClick={() => { getCategory(category?._id) }} data-bs-toggle="modal" data-bs-target="#exampleModal" className='text-decoration-none'>
                                    <div className="card product rounded overflow-hidden mt-5">
                                        <div className="card-img overflow-hidden">
                                            <img className='w-100' src={category?.image} alt="" />
                                        </div>
                                        <div className="card-body">
                                            <h3 className='text-main py-2 text-center'>{category.name}</h3>

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

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="container text-center">
                        <div class="modal-dialog">
                            <div class="modal-content p-3">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {!loading ? <div class="modal-body row align-items-center px-3 text-center">
                                    {subcategory?.map((cat, indx) => {
                                        return <Link key={indx} className="col-md-4 shadow rounded-3 m-3  text-decoration-none p-2">
                                            <h3 className='text-main'>{cat?.name}</h3>

                                        </Link>

                                    })}
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

export default Categories