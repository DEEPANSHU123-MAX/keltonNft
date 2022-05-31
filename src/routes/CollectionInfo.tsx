import React from 'react'

import "../CSS/collectionInfo.css"
import { useEffect, useState } from "react";
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler } from "../components/LoadBlockchain";
import { Card, Button, Container, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";


const CollectionInfo = () => {
    const [currentAccount, setCurrentAccount] = useState<any>(null);
    const [collectionData, setCollectionData] =useState<null | string[]>([]);
     const [nftData, setNftData] = useState<null | string[]>([]);
    let { uuid } = useParams();


    useEffect((): any => {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);

        }
        loader();

        accountChanged();
        GetCollectionData()
       
    }, [currentAccount])

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
      
      console.log(uuid , "params destrucutre")
      Api.get(`/collectionInfo/${uuid}`).then((response) => {
          console.log(response.data[0], "response userdata..........")
      setCollectionData(response.data[0]);
      setNftData(response.data[0].Nfts)
      
      })
      
  }
}
console.log(collectionData , "colllectttttttt")


    const accountChanged: any = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }
        ethereum.on("accountsChanged", (accounts: any) => {
            setCurrentAccount(accounts[0]);
        })

    }

    const ShowCollectionData = () => {
        return (
            <div >

                {collectionData && <div>

                   
                        <img  src='https://mdbootstrap.com/img/new/slides/041.webp' alt='...' />

                       


                            <div className='card-body'>
                                <img src={collectionData.Url} />
                            </div>

                            <p className='white'>Collection Name :- {collectionData.collectionName}</p>

                            <p className='white'>
                                Description :- {collectionData.collectionDescription}
                            </p>

                            <p className='white'> Category :- {collectionData.category} </p>




                            <div className='btn'>
                                <button href={`/EditCollection/${collectionData.uuid}/${currentAccount}`}>Edit Collection Info</button>
                                <button href='#'>Delete Collection Info</button>
                            </div>

                </div>}

                <div>
                <h1> NFTS</h1>
                {nftData && <div>
                    <Container >
                        <Row>
                            {nftData.map((nft: any) => {
                                console.log(nft,"deeeer")

                                let link = `/CreateItem/${nft.uuid}/${nft.collectionOwner}`
                                return (
                                    <Card className="nft-card" key={nft.id} style={{ width: '35rem' }}>
                                          <div className='card-body'>
                                <img src={nft.url} />
                            </div>

                                        <Card.Link style={{ textDecoration: 'none' }} href={link}> <Card.Img variant="top" src={nft.Url} /></Card.Link>
                                        <Card.Body className="card-body">
                                            <Card.Title><p>{nft.itemName}</p></Card.Title>
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
            </div>
        )

    }

    //  const GetNftData = (): any | string => {
    //     if (currentAccount) {


    //         Api.get(`/nft/${uuid}`).then((response) => {
    //             console.log(response.data, "response userdata")
    //             setNftData(response.data);

    //         })

    //     }
    // }


   const ShowNftData = () => {
    return (
        <div>
            <h1> NFTS</h1>
            {nftData && <div>
                <Container >
                    <Row>
                        {nftData.map((nft: any) => {
                            console.log(nft,"deeeer")

                            // let link = `/CreateItem/${nft.uuid}/${nft.collectionOwner}`
                            return (
                                <Card className="nft-card" key={nft.id} style={{ width: '35rem' }}>
                                      <div className='card-body'>
                            <img src={nft.url} />
                        </div>

                                    <Card.Link style={{ textDecoration: 'none' }} href={link}> <Card.Img variant="top" src={nft.Url} /></Card.Link>
                                    <Card.Body className="card-body">
                                        <Card.Title><p>{nft.itemName}</p></Card.Title>
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
        <br />
        <br />
        <br />
        {currentAccount ? ShowCollectionData() : "First connect your wallet to see your collection"}
        {currentAccount ? ShowNftData() : "First create collection"}
        
    </div>

)

}





export default CollectionInfo;