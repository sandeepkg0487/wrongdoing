import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import api from "../Services/api";

const AuthContext = createContext()

export const AuthContextprovider = ({ children }) => {

    const navigate = useNavigate()
    // const [ isAuth,setIsAuth ] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies(['accessToken','isAuth'])
   

  


    // login fn
    const login = async (email, password) => {

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            })

            setCookies('accessToken', response.data.accessToken);
            setCookies('refreshToken', response.data.refreshToken);
            setCookies('isAuth', true);
            setCookies('role', "user");
            sessionStorage.setItem('username', response.data.email);
            

            return true

        } catch (error) {
            console.log(error);
        }
        return false
    }



    // signup function
    const signup = async (firstname, lastname, email, password,phone) => {
    
        try {
            const response = await api.post('/signup', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone:phone,
            })
            console.log("response", response.data);
            setCookies('accessToken', response.data.accessToken);
            setCookies('refreshToken', response.data.refreshToken);
            setCookies('isAuth', true);
            setCookies('role', "user");
            sessionStorage.setItem('username', response.data.email);

            return true

        } catch (error) {
            console.log(error);
        }
        return false
    }

    // logutfunction

    const logout = () => {
        removeCookie('accessToken')
        removeCookie('refreshToken')
        removeCookie('isAuth')
        removeCookie('role');
        // removeCookie('')
        // navigate('/login')
    }

    const value = useMemo(
        () => ({
            cookies,
            login,
            logout,
            signup,
            

        }), [cookies]
    )

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)


}

export const useAuth = () => {
    return useContext(AuthContext)
}