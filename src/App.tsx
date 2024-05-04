import Index from './pages'
import Login from './pages/login'
import Signup from './pages/signup'
import ProtectAfterLogin from './auth/ProtectAfterLogin'
import AdminRoute from './auth/AdminRoute'
import ProtectRoutes from './auth/ProtectRoutes'
import Admin from './pages/admin'
import Adminlogin from './pages/admin/login'
AdminRoute

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>


      <BrowserRouter>



        <Routes>


          <Route element={<ProtectAfterLogin />}>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route path="/" element={<Index />}></Route>
          </Route>
          <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />}></Route>
          </Route>
          <Route path="/admin/login" element={<Adminlogin />}></Route>
         
        </Routes>



      </BrowserRouter >
    </>
  )
}

export default App
