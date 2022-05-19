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
let { uuid }  = useParams();


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
      
      console.log(uuid , "params destrucutre")
      Api.get(`/collectionInfo/${uuid}`).then((response) => {
          console.log(response, "response userdata..........")
      setCollectionData(response.data);
      
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
    
{/*     
    {<MDBCard style={{ maxWidth: '200rem' }}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={collectionData.Url} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{collectionData.category}</MDBCardTitle>
        <MDBCardText>
          {collectionData.collectionName}
        </MDBCardText>
        <MDBCardTitle>{collectionData.collectionDescription}</MDBCardTitle>
        <MDBBtn href='#'>Edit Collection Info</MDBBtn>
        <br/>
        <MDBBtn href='#'>Delete Collection Info</MDBBtn>
      </MDBCardBody>
    </MDBCard>
     }
<> */}

<MDBCard background='dark' className='text-white'>
      <MDBCardImage overlay src='https://mdbootstrap.com/img/new/slides/017.webp' alt='...' />
      <MDBCardOverlay>
      
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={collectionData.Url} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{collectionData.category}</MDBCardTitle>
        <MDBCardText>
          {collectionData.collectionName}
        </MDBCardText>
        <MDBCardTitle>{collectionData.collectionDescription}</MDBCardTitle>
        <MDBBtn href='#'>Edit Collection Info</MDBBtn>
        <br/>
        <MDBBtn href='#'>Delete Collection Info</MDBBtn>
      </MDBCardBody>
       
      
      </MDBCardOverlay>
    
    </>

     
    </div>}

    
    </div>

  )
  }


  return (
    <div>
    {ConnectWalletButton()}
    
  
{currentAccount ? ShowCollectionData():"First connect your wallet to see your collection"}
</div>
) }

export default CollectionInfo;