import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import "../CSS/collectionInfo.css"
import { useEffect, useState } from "react";
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler} from "../components/LoadBlockchain";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
const [currentAccount, setCurrentAccount] = useState<any>(null);
const [collectionData, setCollectionData] = useState<null | string[] >();



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

useEffect(():any=> {
  const loader = async () => {
      const account = await checkWalletIsConnected();
      setCurrentAccount(account);
      
  }
   loader();

   accountChanged();
   GetCollectionData()
}, [currentAccount ])


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
console.log(collectionData , "colllectttttttt")

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
                  
                  let link = `/CreateItem/${nft.collectionOwner}`
                  return (
                      <Card className="nft-card" key={nft.id} style={{ width: '30rem' }}>
                        <Card.Link style={{ textDecoration: 'none' }} href={`/`}> <Card.Img variant="top" src={nft.Url} /></Card.Link>
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
















const CollectionInfo = () => { 
  return (

    {collectionData && <div  className="card-body">
    
      
    <MDBCard style={{ maxWidth: '60rem' }}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Collection Name 
        </MDBCardText>
        <MDBBtn href='#'>Edit Collection Info</MDBBtn>
        <br/>
        <MDBBtn href='#'>Delete Collection Info</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </div>}
  );
}


export default CollectionInfo;





