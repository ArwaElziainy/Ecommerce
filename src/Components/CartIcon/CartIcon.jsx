import React, { useContext } from 'react'
import { cartCounterContext } from '../../Contexts/CartContext'
import { Link } from 'react-router-dom';

function CartIcon() {


    let { cartItems, setCartItems } = useContext(cartCounterContext)
    setCartItems(cartItems)

    
   

    return (
        <>
            <Link to={"cart"} className='text-empty transition'>
            
            <i className='cart position-relative fa-solid fa-cart-shopping fa-xl p-4 cursor-pointer'>
                <div className='badge position-absolute text-white bg-main top-0'>{cartItems}</div></i>
            </Link>

        </>
    )
}

export default CartIcon