import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {


    const naviget = useNavigate()
    const [error, setError] = useState(false)
    const [cookies, setCookies] = useCookies(['accessToken', 'isAuth','isAdmin'])
    const [formData, setFormData] = useState({

        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(false)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:5000/document/login', formData);
            console.log('Data posted:', response.data);
            // Optionally, you can reset the form after successful submission
            setCookies('accessToken', response.data.accessToken);
            setCookies('isAuth', true);
            setCookies('isAdmin',true)
          
            naviget('/admin')


        } catch (error) {
            console.error(error.message);
            setError(true)
        }
    };

    return (
        <div className='container h100 d-flex align-items-center justify-content-center'>
            <div className='width350  '>


                <form onSubmit={handleSubmit}>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input onChange={handleChange} name='email' type="text" id="form2Example1" className="form-control" required />
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>


                    <div data-mdb-input-init className="form-outline mb-4">
                        <input onChange={handleChange} name='password' type="password" id="form2Example2" className="form-control" required />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    {error && <p className='text-danger'>username or password doesnot match</p>}
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 w-100">Sign in</button>


                    <div className="text-center">
                        <p>Not a member? <Link to={'/register'}>Register</Link></p>


                    </div>
                </form>
            </div>
        </div>
    )
}
