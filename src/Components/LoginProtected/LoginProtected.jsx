import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Register from '../Register/Register'

const LoginProtected = () => {

    let { isUserLoggedIn } = useContext(AuthContext)
    
    if (isUserLoggedIn) {
        return <Home/>
    } else {
        return<>
            <Login /> 
        </>
    }

  
}

export default LoginProtected