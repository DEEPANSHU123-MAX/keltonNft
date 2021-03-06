import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
// import './profile.css';
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler } from "./LoadBlockchain"
import 'bootstrap/dist/css/bootstrap.min.css';


const sendData = async (e : any)  => {
    e.preventDefault();
    console.log(e.target.name.value)
    let data  : any = {}
    data['name'] = e.target.name.value ? e.target.name.value :null ;
    data['bio'] = e.target.bio.value ?  e.target.bio.value : null ;
    data['email'] = e.target.email.value?   e.target.email.value :null;
    data['password'] = e.target.pass.value?   e.target.pass.value : null;
    data['instagram'] = e.target.ins.value?   e.target.ins.value : null;
    data['twitter'] = e.target.twi.value?   e.target.twi.value : null ;
    data['website'] = e.target.web.value?   e.target.web.value :  null;
    data['walletAddress'] = e.target.walletAddress.value.slice(2)?  e.target.walletAddress.value.slice(2) : null;
    Api.post('/user', data).then((response) => {
        alert("Profile saved")

        window.location = '/profile';
        console.log(response)
    })

}


const Profilesettings = () => {
    let [currentAccount, setCurrentAccount] = useState<null | string >();
    let [userNft, setUserNft] = useState<null | string[] >();
    let [userData, setUserData] = useState<null | string[] >();
    const connectWalletButton = () => {
        const connectWallet = async () => {
            let account = await connectWalletHandler();
            setCurrentAccount(account)
            Api.get(`/login/${account}`).then((response) => {
                localStorage.setItem("token" , response.data.token)
              
            })
        }
        return (
            <div>
                <button onClick={connectWallet} className='connect-wallet-button'>
                    {currentAccount ? currentAccount : 'Connect Wallet'}
                </button>
                <p>Connect your wallet first</p>
            </div>
        )
    }

    const updateData = async (e : any) => {
        e.preventDefault();
        console.log(e.target.name.value)
       
        
        let account = e.target.walletAddress.value
        let data  : any = {}
        data['name'] = (e.target.name.value == ''?userData.name : e.target.name.value);
        data['bio'] = (e.target.bio.value == ''?userData.bio : e.target.bio.value);
        data['email'] =(e.target.email.value == ''?userData.email : e.target.email.value);
        data['instagram'] = (e.target.ins.value == ''?userData.instagram : e.target.ins.value);
        data['twitter'] = (e.target.twi.value == ''?userData.twitter : e.target.twi.value);
        data['password'] = (e.target.pass.value == ''?userData.password : e.target.pass.value);
        data['website'] = (e.target.web.value == ''?userData.website : e.target.web.value);
        data['walletAddress'] = (account == '' ?userData.walletAddress:account );
        Api.patch(`/user/edit`,data).then((response) => {
            alert("Profile updated Successfully")
            window.location = '/profile';
                })
        console.log(data)
    }


    const getUserData = () => {
        if (currentAccount ) {
            let id : string = currentAccount;
            console.log(id , "wallet address user data ")
            Api.get(`/user/${id}`).then((response) => {
                console.log(response, "response userdata")
                setUserData(response.data);
                
            })
        }
    }

    const showProfilesettings = () => (

        <div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/RqGUtoW.png" width="150" /><span className="font-weight-bold"><h2>{userData ? userData.name : "Un-named"}</h2></span><span className="text-black-50"><h2>{currentAccount}</h2></span><span></span>
            <span className="text-black-50"><h2>{userData ? userData.email : ""}</h2></span><span></span></div>


            <h3 className="text-center">{userData?"Edit Profile": "Save Profile Data"}</h3>

            <div className='aligncenter'>
                <Form className="create-page-form" color='white'  onSubmit={ userData ? updateData : sendData}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="User name"  required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email " required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="pass" placeholder="password " required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Bio<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="bio" placeholder="Bio"  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Instagram Link<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="ins" placeholder="Instagram handle" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Twitter Link<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="twi" placeholder="Twitter handle" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Your Website<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="web" placeholder="yourweb.io" />
                    </Form.Group>
                    <input name="walletAddress" type="hidden" value={currentAccount} />
                    <br />

                    <Button variant="primary" type="submit" >
                        Save Profile
                    </Button>

                </Form>
            </div>
        </div>
    )
    useEffect(() => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);

            getUserData();

        }
        loader()
    }, [currentAccount])
    return (
        <div>
            {currentAccount ? showProfilesettings() : connectWalletButton()}

        </div>
    );
}


export default Profilesettings;