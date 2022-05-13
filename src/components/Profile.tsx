import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
//import axios from "axios";
//import '../components/profile.css';
//import 'bootstrap/dist/css/bootstrap.min.css';



const sendData = async (e: any) => {
    // e.preventDefault();
    // console.log(e.target.name.value)
    // let data = {}
    // data['name'] = e.target.name.value;
    // data['bio'] = e.target.bio.value;
    // data['email'] = e.target.email.value;
    // data['insta'] = e.target.ins.value;
    // data['twitter'] = e.target.twi.value;
    // data['website'] = e.target.web.value;
    // data['walletAddress'] = e.target.walletAddress.value.slice(2)
    // axios.post('http://localhost:5000/createUser', data).then((response) => {
    //     alert("Profile saved")
    // })

}
const ShowProfile = () => (

    <div>


        <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/RqGUtoW.png" width="150" /><span className="font-weight-bold"><h2> "Un-named"</h2></span><span className="text-black-50"><h2>currentAccount</h2></span><span></span></div>


        <h3 className="text-center">Edit Profile</h3>

        <div className='aligncenter'>
            <Form className="create-page-form" onSubmit={sendData}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="name" placeholder="User name" required />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="email" placeholder="Email " required />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Bio<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="bio" placeholder="Bio" required />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Instagram Link<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="ins" placeholder="Instagram handle" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Twitter Link<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="twi" placeholder="Twitter handle" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Your Website<span style={{ color: 'red' }} >*</span></Form.Label>
                    <Form.Control type="text" name="web" placeholder="yourweb.io" required />
                </Form.Group>
                <input name="walletAddress" type="hidden" />
                <br />

                <Button variant="primary" justify-content='center' type="submit" >
                    Save Profile
                </Button>

            </Form>
        </div>
    </div>
)
// const ShowProfile = () => (
//     <div>
//         <div className="aligncenter">
//             <h1>Profile</h1>
//         </div>
//         <br />
//         <br /><br />
//         <div className="d-flex justify-content-center">
//             <div className="card-body little-profile text-center">
//                 <div className="pro-img"><img src="https://i.imgur.com/RqGUtoW.png" alt="user" /></div>
//                 <h3> Un-named</h3>
//                 <h3 className="m-b-0 font-light">currentAccount</h3>
//                 <h3 className="m-b-0 font-light">Email</h3>
//             </div>
//         </div>
//         <div className="box">
//             <div className="smallbox">
//                 <div className="align">
//                     <p>My Collection    </p>
//                     <p>Created    </p>
//                     <p>Histroy  </p>
//                     <Link to="/profileSettings"><img className="imgicon" src="https://img.icons8.com/ios-filled/50/000000/settings.png" />{' '}</Link>
//                 </div>
//             </div>
            
//             <br /><br /><br />
//             <br />
//         </div>
//         <br /><br /><br /><br />
//     </div>
// )


export default ShowProfile;