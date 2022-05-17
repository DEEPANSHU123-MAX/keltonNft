import React from "react";
import '../CSS/create.css';
import { Button,  } from "react-bootstrap";
// import { create } from 'ipfs-http-client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Api from "../Api/api";
import { checkWalletIsConnected, connectWalletHandler} from "../components/LoadBlockchain";


const Create = () => {
    
    const [show, setShow] = useState<boolean>(false);
    let [currentAccount, setCurrentAccount] = useState<any>(null);
    let [collectionData, setCollectionData] = useState<null | string[] >();
    
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
            // Api.get(`/user/${id}`).then((response) => {
            //     console.log(response, "response userdata")
            //     setUserData(response.data);
            // })
            return(
                <div>
                  {collectionData}
                </div>
                
            )
        }
    }

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
           <GetCollectionData/>
           </div>
       )

     }

   
    
    return (
        <div>
        <ConnectWalletButton/>
        
        {currentAccount ?  <Link to="/createCollection">
      <Button  className='connect-button' >
             Create New collection
        
         </Button> 
    </Link>
    : ""}


    {GetCollectionData() ?ShowCollectionData():"No collection , create collection first"}
    </div>
    )
   


    
useEffect(():any=> {
    const loader = async () => {
        const account = await checkWalletIsConnected();
        setCurrentAccount(account);
        
    }
     loader();

     accountChanged();
     GetCollectionData()
}, [currentAccount  ])


}

export default Create ;