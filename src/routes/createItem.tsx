import React from "react";
import '../CSS/create.css';

import { Form, Button, Modal, Spinner } from "react-bootstrap";
// import { create } from 'ipfs-http-client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link  , useParams, useNavigate} from "react-router-dom";
import Api from "../Api/api";
import FormData from "form-data";
import { ethers } from "ethers";
import Web3 from "web3";
import { checkWalletIsConnected, connectWalletHandler , mintNftHandler , tokenUriHandler } from "../components/LoadBlockchain"
import Create from './createItem';
import FormComponent from "../components/forms/createItemForm";

const pinataApiKey = "4d37623cdbbfb91c7f0d";
const pinataSecretApiKey = "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'

// const client = create('https://ipfs.infura.io:5001/api/v0')




interface NftData {
    itemName: string,
    tokenDescription:string,
    url:string|undefined|null,
    tokenStandard:string,
    blockchain:string,
    tokencreator:string|null|undefined,
    forSale:boolean,
    tokenPrice:number,
    royaltyFee:number|string,
    Currency:number|string
    previousOwner:string,
    currentOwner:string
}



const CreateItem = () => {
    let{uuid , contractAddress} = useParams();

    let navigate = useNavigate();
    
    const [tokenMinted, setTokenMinted] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    let [currentAccount, setCurrentAccount] = useState<any>(null);
    let [fileUrl, setFileUrl] = useState<null | undefined|string>();
    let [jsonCid, setJsonCid] = useState<string>("");
    const[currencyValue, setcurrencyValue] = useState<any>("ETH")
    const handleClose  = () => setShow(false);
    const handleShow = () => setShow(true);
    const{ethereum} = window;


    

    useEffect(():any=> {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
        }
         loader();

         accountChanged();
         
    }, [currentAccount , jsonCid])


    const fileHandler = async ( file:any) => {
        console.log(file, "imageeeee");
        
       
        let data = new FormData();
        data.append('file', file)
        try {
            axios.post(url, data, {
                headers: {
                    maxBodyLength: 'Infinity',
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            }).then((response) => {
                console.log("image uploaded")
                let imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
                
                setFileUrl(imageUrl)
            })
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
        
    }



    const mintToken = async (hash : any , base : any , royalityFee :any , tokenCreator:any ,contractAddress:any) => {
        let txn = await mintNftHandler(hash, base ,  royalityFee ,tokenCreator  ,contractAddress);
       
        
        return txn;
    }


    const jsonHandler = (data : any) => {

       
        try {
            
            axios.post(jsonUrl, data, {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            }).then(async (response) => {
                setJsonCid(response.data.IpfsHash)
               
               
                data["tokencreator"] = currentAccount.slice(2,);
                data["currentOwner"] = currentAccount.slice(2,);
                data["previousOwner"] = "0000000000000000000000000000000000000000";

                console.log(data , "dataaaaaa");

                let txn = await mintToken(response.data.IpfsHash, "https://gateway.pinata.cloud/ipfs/" ,data.royaltyFee ,data.tokencreator , contractAddress );
                console.log(txn , "txnnnnnnn")
                // console.log(txn , "txnnn")

                // const provider = new ethers.providers.Web3Provider(ethereum)
                //  console.log(await provider.getTransactionReceipt(txn.hash) , "hashhhhhh")

                
                
                Api.post(`/nft/${uuid}`, data).then((response) => {
                    console.log(response, "resssssssssssssss");
                    navigate(-1)
                })
                console.log(txn,"txn")
                
                setTokenMinted(true);
                console.log(tokenMinted,"hghghg")
            })
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
   

    const uploadHandler = async (res:any, e:any) => {
        console.log(res ,"dataaaa");
        handleShow();
        
       
        let data: NftData = {
            itemName:res.Name,
            tokenDescription:res.Discription,
            tokenPrice:0,
            url:fileUrl,
            previousOwner:"0x0",
            currentOwner:currentAccount,
            tokenStandard:"ERC-721",
            blockchain:"Ethereum",
            tokencreator:currentAccount,
            forSale:false,
            royaltyFee:res.RoyalityFee,
            Currency:parseInt(res.select)
    };
    console.log(data,"ressssssssssssssssss")
       
        await jsonHandler(data);
    }

    const connectWalletButton = () => {
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
    const createNft = () => {
        return (
            <div >
                <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      ></link>
               
              <FormComponent uploadHandler={uploadHandler} fileHandler={fileHandler} handleShow ={handleShow}/>
               
            </div>
        )
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
   
   
    return (
        <div className="create-page">
            <div className="create-page-connect">
                {connectWalletButton()}
            </div>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>{tokenMinted == true ? "Processing request" : "Request processed"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="spinner">
                    {tokenMinted == true ? <div>
                        <Link to="/MyNFT"><Button variant="success" onClick={handleClose}>Success</Button></Link>
                      
                    </div> : <Spinner animation="grow" variant="primary"   />}
                </Modal.Body>
            </Modal>
            <div className="create-page-document">
                { currentAccount ? createNft() : <h3>Connect your wallet first</h3>}
            </div>
        </div>
    )
}



export default CreateItem ;