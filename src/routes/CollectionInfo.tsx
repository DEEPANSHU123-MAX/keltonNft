import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,  MDBBtn, MDBRipple ,   MDBCardOverlay, MDBCardImage } from 'mdb-react-ui-kit';
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
          console.log(response.data[0], "response userdata..........")
      setCollectionData(response.data[0]);
      
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

// const ShowCollectionData  = () => {
//   return (
// <div >

// {collectionData && <div>
    
// <MDBCard background='dark' className='text-white'>
//       <MDBCardImage overlay src='https://mdbootstrap.com/img/new/slides/041.webp' alt='...' />
      
//       <MDBCardOverlay >
     
     
//       <div className='card-body'>
//         <MDBCardImage src={collectionData.Url} />
//         </div>

//         <p className='white'>Collection Name :- {collectionData.collectionName}</p>
       
//        <p className='white'>
//         Description :- {collectionData.collectionDescription}
//         </p>
       
//         <p className='white'> Category :- {collectionData.category} </p>
        
      
        
        
//         <div className='btn'>
//         <MDBBtn href={`/EditCollection/${collectionData.uuid}/${currentAccount}`}>Edit Collection Info</MDBBtn>
//         <MDBBtn href='#'>Delete Collection Info</MDBBtn>
//         </div>
      
//      }
//       </MDBCardOverlay>
     
//     </MDBCard>
    

    
//     </div>}
// </div>
//   )
  
// }

//   return (
//     <div>
//     {ConnectWalletButton()}
//     <br/>
//     <br/>
//     <br/>
// {currentAccount ? ShowCollectionData():"First connect your wallet to see your collection"}
// </div>
// ) 

}


export default CollectionInfo;