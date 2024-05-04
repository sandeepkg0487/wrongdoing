import { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

export default function AxiosBuilder() {
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
    let retryAttempts = 0;
    const maxRetryAttempts = 3;

    useEffect(() => {
        // Set base URL for Axios
        axios.defaults.baseURL = 'http://localhost:3001';
    }, []);

    const handleRefreshToken = async () => {

        await axios.post('/login/refresh-token', { refreshToken: cookies.refreshToken })
            .then(response => {
                const newAccessToken = response.data.accessToken;
                setCookie('accessToken', newAccessToken);

            })
            .catch(error => {
                console.error('Token refresh failed:', error);
                throw error;

            })

    };

    const useProtectedFetch = async (url, method = 'POST', data = '') => {
       console.log(url,data.Rid);
        const accessToken = cookies.accessToken;
        console.log(accessToken);
        const config = {
            headers: { Authorization: `Bearer ${cookies.accessToken}` },
        };

        try {
            console.log(url, method);
            const response = await axios.request({ url, method,params:data ,data, ...config });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401 && cookies.refreshToken && retryAttempts < maxRetryAttempts) {
                handleRefreshToken(); // Wait for token refresh
                
                    retryAttempts++;
                    return useProtectedFetch(url, method, data); // Retry the request
               
            }
            console.error('Error fetching data:', error.message);
            // throw error;
        }
    };
useEffect(()=>{
    
},[cookies])

    return useProtectedFetch;
}


// Example usage*******************************************
// function MyComponent() {
//     const fetchProtectedData = useProtectedFetch()

//     const handleClick = async () => {
//         try {
//             const data = await fetchProtectedData('/protected', 'GET')
//             console.log('Data:', data)
//         } catch (error) {
//             console.error('Error:', error)
//         }
//     }

//     return (
//         <div>
//             <button onClick={handleClick}>Fetch Protected Data</button>
//         </div>
//     )
// }

// export default MyComponent
