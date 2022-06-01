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
    const [collectionData, setCollectionData] = useState<null | string[] >([]);
    




    const networkChanged = (chainId : any) => {
        console.log({ chainId });
        // Navigate(`/CreateCollection/${chainId}`)
      };
    
      useEffect(() => {
        window.ethereum.on("chainChanged", networkChanged);
    
        return () => {
          window.ethereum.removeListener("chainChanged", networkChanged);
        };
      }, []);


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

    const GetCollectionData =  () : any|string  => {
        if (currentAccount ) {
            
           
            Api.get(`/collections/user/${currentAccount}`).then((response) => {
                console.log(response.data, "response userdata")
            setCollectionData(response.data);
            
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
        {collectionData ? 
        <div>
            <Container >
                <Row>
                    {collectionData.map((nft : any) => {
                        
                        let link = `/CreateItem/${nft.uuid}/${nft.collectionOwner}`
                        return (
                            <Card className="nft-card" key={nft.id} style={{ width: '35rem' }}>
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
            </div> : <h1>Please create your collection first</h1>}
        

    </div>
       )

     }

   
    
    return (
        <div>
        {ConnectWalletButton()}
        
        {currentAccount ?  <Link to="/chainSelect">
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