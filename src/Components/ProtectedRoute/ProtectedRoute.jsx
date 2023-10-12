import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Login from '../Login/Login'

const ProtectedRoute = ({children}) => {

    let { isUserLoggedIn } = useContext(AuthContext)
    
    if (isUserLoggedIn) {
        return children
    } else {
        return <Login/>
    }

}

export default ProtectedRoute