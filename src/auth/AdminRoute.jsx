import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useCookies } from 'react-cookie'

const AdminRoute = () => {
  const [cookies] = useCookies();
  const location =  useLocation()

  console.log('loginpage');
console.log('protected routeaq',cookies )
  return (
    cookies?.isAdmin  ? <Outlet/> :<Navigate to = '/admin/login'  state={{from:location}}/>
  )
}

export default AdminRoute