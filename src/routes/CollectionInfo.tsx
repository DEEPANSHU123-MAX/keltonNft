import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import "../CSS/collectionInfo.css"
import { useEffect, useState } from "react";
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler} from "../components/LoadBlockchain";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import {useParams} from "react-router-dom";


const CollectionInfo = () => { 
const [currentAccount, setCurrentAccount] = useState<any>(null);
const [collectionData, setCollectionData] = useState<null | string[] | string >();



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
      let { uuid }  = useParams();
      console.log(uuid , "params destrucutre")
      Api.get(`/user/${id}/${uuid}`).then((response) => {
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
  return (
<div className='card-body'>

{collectionData && <div>
    
    
    <MDBCard style={{ maxWidth: '60rem' }}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={collectionData.url} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{collectionData.category}</MDBCardTitle>
        <MDBCardText>
          {collectionData.collectionName}
        </MDBCardText>
        <MDBCardTitle>{collectionData.description}</MDBCardTitle>
        <MDBBtn href='#'>Edit Collection Info</MDBBtn>
        <br/>
        <MDBBtn href='#'>Delete Collection Info</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    
    </div>}

    
    </div>

  )
  }


  return (
    <div>
    {ConnectWalletButton()}
    
  
{currentAccount ? ShowCollectionData():"First connect your wallet to see your collection"}
</div>
)
  }


export default CollectionInfo;





