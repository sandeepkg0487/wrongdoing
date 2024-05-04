import React from 'react'
import { useCookies } from 'react-cookie'

import { Navigate, Outlet } from 'react-router'

const ProtectAfterLogin = () => {

  const [cookies] = useCookies();
 


  return (
    cookies?.isAuth ? <Navigate to="/" /> : <Outlet  />  
  )
    
}

export default ProtectAfterLogin