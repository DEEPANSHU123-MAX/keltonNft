import React from "react";
import '../CSS/create.css';

// import { create } from 'ipfs-http-client'
import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler} from "../components/LoadBlockchain";


const Create = () => {
    
    // const [show, setShow] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<any>(null);
    const [collectionData, setCollectionData] = useState<null | string[] >();
    



    useEffect(():any=> {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
            
            
        }
         loader();
    
         accountChanged();
         GetCollectionData()
    }, [currentAccount ])

   

    
    const ConnectWalletButton = () => {
        const connectWallet = async () => {
            let account = await connectWalletHandler();
            console.log(account);
            setCurrentAccount(account)
        }
        return (
            <div>
                <button onClick={connectWallet} className='connect-wallet-button'>
                    {currentAccount ? currentAccount : 'Connect Wallet'}
                </button>
            </div>
        )
    }

    const GetCollectionData =  () : any  => {
        if (currentAccount ) {
            let id : string = currentAccount.slice(2,)
            console.log(id , "wallet address user data ")
            Api.get(`/user/${id}`).then((response) => {
                console.log(response, "response userdata")
            setCollectionData(response.data.Collections);
            
            })
            
        }
    }
    // console.log(collectionData , "colllectttttttt")

    const accountChanged : any= async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }
        ethereum.on("accountsChanged", (accounts:any) => {
            setCurrentAccount(accounts[0]);
        })

    }


     const ShowCollectionData  = () => {
       return(
        <div>
        <h1> Your collection</h1>
        {collectionData && <div>
            <Container >
                <Row>
                    {collectionData.map((nft : any) => {
                        
                        let link = `/CreateItem/${nft.uuid}`
                        return (
                            <Card className="nft-card" key={nft.id} style={{ width: '30rem' }}>
                              <Card.Link style={{ textDecoration: 'none' }} href={`/CollectionInfo/${nft.uuid}`}> <Card.Img variant="top" src={nft.Url} /></Card.Link>
                                <Card.Body className="card-body">
                                    <Card.Title><p>{nft.collectionName}</p></Card.Title>
                                    <Card.Title><p>{nft.category}</p></Card.Title>
                                    <Card.Link style={{ textDecoration: 'none' }} href={link}><Button variant="primary">Add Item</Button></Card.Link>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>

        </div>}

    </div>
       )

     }

   
    
    return (
        <div>
        {ConnectWalletButton()}
        
        {currentAccount ?  <Link to="/createCollection">
      <Button  className='connect-button' >
             Create New collection
        
         </Button> 
    </Link>
    : ""}


    {currentAccount ? ShowCollectionData():"First connect your wallet to see your collection"}
    </div>
    )
   


    



}

export default Create ;