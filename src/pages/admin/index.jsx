
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:5000');

export default function Inde() {


    const [getmessage, setGetmessage] = useState([])
    const [, , removeCookie] = useCookies();




    function logouthandlecick() {
        removeCookie('isAuth')
        removeCookie('accessToken')

    }


    useEffect(() => {
        console.log('on index');
        socket.on('receive_message', (data) => {
            console.log(data);
            setGetmessage(data)

        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`http://localhost:5000/document/${id}`);
            console.log(response.data.deletedDocument._id);
            if (response.status == 200) {
                const filtered = getmessage.filter(value => value._id != response.data.deletedDocument._id);
                setGetmessage(filtered);
            }
        } catch (error) {
            console.error('Error deleting field:', error);

        }


    };
    const handleResolve = async (id) => {
        console.log(id);
        try {
            const response = await axios.put(`http://localhost:5000/document/resolved/${id}`, {
                resolveStatus: true
            });
            if(response.status ==200  ){
                const filtered = getmessage.map(obj => {
                    if (obj._id === id) {
                        return { ...obj, resolveStatus:true  };
                    } else {
                        return obj;
                    }
                });
                setGetmessage(filtered);
                console.log(getmessage);
            }     
        } catch (error) {
            console.error('Error:', error);




        }



    };


    return (
        <div className="container h100  " >

            <div className="container">
                <h2>Items</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getmessage.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.wrong}</td>
                                    <td>{item?.desc}</td>
                                    <td>{item?.loac}</td>
                                    <td>{item?.date}</td>

                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                       <button
                                            className='btn btn-success ms-2'  
                                            disabled={item?.resolveStatus}
                                            onClick={() => handleResolve(item._id)}
                                        >
                                            mark as resolved
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
<p className='text-secondary '>please refresh the page if nodata </p>
        </div >
    );
}