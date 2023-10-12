import axios from 'axios'
import Product from '../Product/Product'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'




const Products = () => {
  
  useEffect(() => {
   getAllProducts()
 },[])
  let [search, setSearch] = useState()

  let {isLoading,data} = useQuery('products', getAllProducts)
  
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

console.log(search);
  

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className='layout'>
        {!isLoading ? <div className="container pt-5">
          <h1 className='text-center pt-5 mt-3 text-main'>Products</h1>
      <div className='w-75 m-auto pt-1'>
      <input type="search"className='form-control my-5' placeholder='Search...' onInput={(e)=>{setSearch(e.target.value)}}  />

          </div>
          <div className="row mt-5">
         
            {data?.data.data
              .filter((product) => {
              return search?.toLowerCase() === undefined ? product : product.title.toLowerCase().includes(search)
            })
              .map((product, i) => {
            return <div key={i} className="col-md-3 my-5">
              <Product product={product}/>
            </div>
              })}
            
             
           
        </div>
        </div> : 
        <div className='py-5 my-5 d-flex justify-content-center align-items-center bg-black bg-opacity-75 position-fixed vh-100 vw-100'>
        <i className="fa-solid fa-spinner fa-spin fa-3x text-white "></i>
        </div>
      }
    
      </div>


    </>

  )
}

export default Products