/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcartlogo.svg'
import { AuthContext } from '../../Contexts/AuthContext'
import CartIcon from '../CartIcon/CartIcon'

const Navbar = () => {

  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)

  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    setIsUserLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container ">
        <Link className="navbar-brand" to={"/home"}>
          <img src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isUserLoggedIn ? <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" href="#">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist" href="#">Wishlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" href="#">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories" href="#">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands" href="#">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allorders" href="#">Orders</Link>
            </li>
          </ul> : null}

          <ul className='d-flex list-unstyled mt-3'>
            {!isUserLoggedIn ? <><li className='mx-2'>
              <Link to={"register"} className='nav-link'>Register</Link>
            </li>
              <li className='mx-2'>
                <Link to={"login"} className='nav-link'>Login</Link>
              </li></> : null}

            {isUserLoggedIn ? <li className='mx-2 d-flex align-items-center justify-content-center'>
              <CartIcon/>
              <a onClick={logout} className='logout cursor-pointer nav-link d-inline-block'>Logout</a>
            </li> : null}


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar