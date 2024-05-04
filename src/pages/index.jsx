
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


    const [formdata, setFormdata] = useState({})
    const handleFormData = (event) => {
        const { name, value } = event.target

        setFormdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const __createdtime__ = Date.now();
        socket.emit('send_message', { ...formdata})


    }



    return (
        <div className="container  h100 " >


            <div className="row h100p py-5 ">
                <div className="h100p col-sm-4 align-items-center justify-content-center flex-column  ">
                    <div>


                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label> Title of the wrongdoing</Form.Label>
                                <Form.Control onChange={handleFormData} name='wrong' type="text" placeholder="wrongdoing" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description of the incident</Form.Label>
                                <Form.Control onChange={handleFormData} name='desc' as="textarea" rows={3} className='w-100' required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>  Location</Form.Label>
                                <Form.Control onChange={handleFormData} name='loac' type="text" placeholder="Location" required/>
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex flex-column  " controlId="exampleForm.ControlInput1" >
                                <Form.Label>  date</Form.Label>
                                <input type='date' onChange={handleFormData} name='date' required />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label> Upload images or documents as evidence</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>

                            <Button type="submit" variant="primary" size="lg" className='w-100'>send</Button>

                        </Form>
                    </div>
                </div>
                <div className=" h100p col-sm-8 col-sm-4 d-flex align-items-end justify-content-end flex-column   ">

                    <Button type="button" variant="primary" size="lg" onClick={logouthandlecick}>logut</Button>



                    <div className='overflow-y-scroll w-100 h100p scroll-hide d-flex align-items-end  flex-column  mt-5'>
                        {getmessage.map((item, index) => (
                            <div className={` mt-1 p-2 rounded-3 w-50 ${item?.resolveStatus ? 'bg-success':'bg-warning'}`}>

                                <h4 className=' p-1 px-3 rounded-3 w-50 ' key={index}>{item?.wrong}</h4>
                                <p> {item?.desc}</p>
                                <p> location: {item?.loac}</p>
                                <p> {item?.date}</p>
                            </div>

                        ))}
                      
                    </div>
                    <div>
                    <p className='py-2 d-flex align-items-center '><span className='square bg-warning'></span>Not solved <span className='square bg-success ps-3 '></span>Solved</p>
                    </div>

 <p className='text-secondary '>if data is not screen please refresh one time</p>
                </div>

            </div>



        </div>
    );
}