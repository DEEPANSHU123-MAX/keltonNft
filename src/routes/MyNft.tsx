import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain"
import axios from "axios";
import Api from "../Api/api";
// import AllNFT from './AllNFT';
import "../CSS/myNft.css";

const MyNFT = () => {
    let [currentAccount, setCurrentAccount] = useState<null | string>(null);
    let [userNft, setUserNft] = useState<any>();
   


    useEffect(():any => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            
            setCurrentAccount(account);
            getUserNFT();
        }
        loader()
        
        accountChanged();
    }, [currentAccount]);

    

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
            let account:any = currentAccount.slice(2,)

            const params = new URLSearchParams(window.location.search);
            const searchData = params.get('search')
            if (searchData) {
                Api.get(`/searchMynft/${account}?search=${searchData}`).then((response) => {
                    setUserNft(response.data)
                })
            }

            else {
                Api.get(`/user/${account}`).then((response) => {
                    console.log(response.data.Nfts , "ressssssssssss")
                    setUserNft(response.data.Nfts);
                    
                })
            }
        }
    }


    
    
    

    
    const showUserNFT = () => (
        <div>
            <h1>My collection</h1>
            {userNft && <div>
                <Container >
                    <Row>
                        {userNft.map((nft : any) => {
                            
                            let link = `/Sellnft/${nft.id}`
                            return (
                                <Card className="nft-card" key={nft.id} style={{ width: '30rem' }}>
                                    <Card.Img variant="top" src={nft.url} />
                                    <Card.Body className="card-body">
                                        <Card.Title><p>{nft.itemName}</p></Card.Title>
                                        <Card.Link style={{ textDecoration: 'none' }} href={link}><Button variant="primary">Description</Button></Card.Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Row>
                </Container>

            </div>}

        </div>
    )
    const accountChanged = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }
        ethereum.on("accountsChanged", (accounts : string[]) => {
            setCurrentAccount(accounts[0]);
        })

    }
    
  

    return (
        <div>
           
            {currentAccount ? showUserNFT() : connectWalletButton()}
        </div>
    );

    
}

export default MyNFT;