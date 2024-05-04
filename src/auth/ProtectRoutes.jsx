import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useCookies } from 'react-cookie'

const ProtectRoutes = () => {
  const [cookies] = useCookies();
  const location =  useLocation()

  console.log('loginpage');
console.log('protected routeaq',cookies )
  return (
    cookies?.isAuth  ? <Outlet/> :<Navigate to = '/login'  state={{from:location}}/>
  )
}

export default ProtectRoutes