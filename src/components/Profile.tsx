import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Card,Button,Container,Row} from "react-bootstrap"
import Api from "../Api/api";
// import axios from "axios";
// import AllNFT from './AllNFT';
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
const MyProfile = () => {
    let [currentAccount, setCurrentAccount] = useState(null);
    let [userNft, setUserNft] = useState<null | string[] >(); 
    let [userData, setUserData] = useState<null | string[] | string>();
    const connectWalletButton = () => {
        const connectWallet = async () => {
            let account = await connectWalletHandler();
            setCurrentAccount(account)
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
    
    const getUserNFT = () => {
        if (currentAccount) {
            // let account = currentAccount.slice(2,)
            // axios.get(`http://localhost:5000/getToken/${account}`).then((response) => {
            //     setUserNft(response.data);
            // }).catch((e)=>{
            //     console.log(e)
            // })
        }

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
    const showProfile = () => (
        <div>          
<div className="aligncenter">
                <h1>Profile</h1>
            </div>
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/RqGUtoW.png" width="150" /><span className="font-weight-bold"><h2>{userData ? userData.name : "Un-named"}</h2></span><span className="text-black-50"><h2>{currentAccount}</h2></span><span></span>
            <span className="text-black-50"><h2>{userData ? userData.email : ""}</h2></span><span></span></div>

            <div className="box">
                <div className="smallbox">
                    <div className="align">
                        <p>My Collection    </p>
                        <p>Created    </p>
                        <p>Histroy  </p>
                        <Link to="/editprofile"><img className="imgicon" src="https://img.icons8.com/ios-filled/50/000000/settings.png" />{' '}</Link>
                    </div>
                </div>
                
                 <div>
                    {userNft && <div> ? 
                        <Container >
                            <Row>
                        
                                {userNft.map((nft : any) => (
                                    <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                                        <Card.Img variant="top" src={nft.url} />
                                        <Card.Body className="card-body">
                                            <Card.Title><p>{nft.itemName}</p></Card.Title>
                                            <Button variant="primary">Description</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                        </Container> : <div> No Nft to show</div>

                    </div>}

                </div>
                <br /><br /><br />
                <br />
            </div>
            <br /><br /><br /><br />
        </div>
    )
    useEffect(() : any => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
            getUserNFT();
            getUserData();
        }
         loader()
    }, [currentAccount])
    return (
        <div>
            {currentAccount ? showProfile() : connectWalletButton()}

        </div>
    );
}

export default MyProfile;