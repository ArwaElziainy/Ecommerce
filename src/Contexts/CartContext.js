import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let cartCounterContext = createContext()

export default function CartCounterContextProvider({ children }) {
    

  let [cartItems, setCartItems] = useState(0)
  let [cartId, setCartId] = useState(null)
  

    useEffect(() => {
        getUserCart()
      }, [])

    async function getUserCart() {
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: {
            token: localStorage.getItem("token")
          }
        }).catch((err) => {
          // console.log(err);
        })
     
      setCartId(res?.data.data._id)
        setCartItems(res?.data.numOfCartItems)
      }
     


    return <cartCounterContext.Provider value={{cartItems, setCartItems, cartId, getUserCart}}>
        {children}
    </cartCounterContext.Provider>
}
