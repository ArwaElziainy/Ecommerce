import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Search() {

  const [search, setSearch] = useState()
  const [ searchlist, setSearchList] = useState()
  console.log(search);

  async function Search() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setSearchList(data.data)
    console.log(data.data);
  }
  useEffect(() => {
    Search()
  },[])

  return (
    <>
        <div className="layout pt-5">
          <div className="container mt-5 pt-5">
          <input type="text" onChange={(e)=>{setSearch(e.target.value)}}  className=' form-control' />
          {searchlist?.filter((item) => {
            return search?.toLowerCase() === '' ? item : item.title.includes(search)
          }).map((search) => {
            return <div>
              <h1>{ search.title}</h1>
            </div>
          })}
          </div>
        </div>
    </>
  )
}
