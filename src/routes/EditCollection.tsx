import React from 'react'

import '../CSS/create.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal, Spinner } from "react-bootstrap";

import axios from "axios";
import FormData from "form-data";
import Api from "../Api/api";
import { Link , useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkWalletIsConnected, connectWalletHandler} from "../components/LoadBlockchain";

const pinataApiKey = "4d37623cdbbfb91c7f0d";
const pinataSecretApiKey = "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'


interface NftData {
    collectionName: string,
    collectionDescription:string,
    Url:null | undefined|string,
    category:string|null,
    collectionOwner:any,
    
}

function EditCollection() {
    const navigate = useNavigate();
    const{uuid ,collectionOwner} =useParams();
    

    const [fileUrl, setFileUrl] = useState<File>();
    const[name , setName] =useState<any>()
    const[categoryValue , setCategoryValue] =useState<any>("Art")
    const[discription , setdiscription] =useState<any>()
    const [currentAccount, setCurrentAccount] = useState<any>(null);
    // const[collectionData , setCollectionData] = useState<any>();


    useEffect(():any=> {
        const loader = async () => {
            const account = await checkWalletIsConnected();
            setCurrentAccount(account);
            
        }
         loader();
    
         accountChanged();
         

         Api.get(`/collection/${uuid}`).then((response)=>{
            setFileUrl(response.data[0].Url);
            setName(response.data[0].collectionName);
            setCategoryValue(response.data[0].category);
            setdiscription(response.data[0].collectionDescription)
           
           });

           


        
    },[currentAccount ])

    



    


    // useEffect(() => {
    //     console.log("i am working")
    //     console.log(collectionData,"collledecedencsdcnsdncksdncsdkncsdi")
       
    //   },[collectionData]);


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



    const fileHandler = async (e : any) => {

        
        const file = e.target.files[0];

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
                console.log(imageUrl)
                
                setFileUrl(imageUrl)
            })
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
   
   

    const uploadHandler = async (e :any) => {
        e.preventDefault();
        let data: NftData = {
            collectionName:e.target.item.value.trim(),
            collectionDescription:e.target.description.value,
            Url:fileUrl,
            category:categoryValue,
            collectionOwner:currentAccount,
            
           
            
    };
    Api.patch(`/collection/${uuid}/${currentAccount}`, data).then((response) => {
        console.log(response, "resssssssssssssss");
        
        navigate(-1);
    })
    console.log(data);
    // navigate(-1);
       

    //file url is coming in string from data base first we have to convert it into file 
       
    }
  return (
      <div>
           <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      ></link>


      
     
    <h1>Edit your Collection</h1>
    <Form className="create-page-form" onSubmit={uploadHandler}>
        <Form.Group className="mb-3" >
            <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
            <Form.Control type="file"   placeholder="Collection Image" onChange={fileHandler} />
        </Form.Group>
        <Form.Text className="text-muted">
            <span style={{ color: 'red' }} >*</span>Required fields
        </Form.Text>
        <Form.Group className="mb-3" >
            <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
            <Form.Control type="text" name="item"  value={name || ''} onChange={(e)=>setName(e.target.value)} placeholder="Collection name" required />
        </Form.Group>
        <br/>
        <label>
          Choose category for collection:
          <select  value={categoryValue || ''} onChange={(e)=>setCategoryValue(e.target.value)}> 
            <option value="Art">Art</option>          
            <option value="Sports">Sports</option>
            <option value="Gaming">Gaming</option>
            <option value="Photography">Photography</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </label>

        <br/>
        <br/>

        <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" value={discription || ""} onChange={(e)=>setdiscription(e.target.value)} name="description" placeholder="Provide a detailed description of your collection" />
            <Form.Text className="text-muted">
                Discription for your Nft collection
            </Form.Text>
        </Form.Group>
        <hr />
        <Button variant="primary" type="submit" >
            Create Collection
        </Button>
    </Form>

    
    <br/>
    <br/>
    <br/>
    <br/>
   

</div>
  )
}

export default EditCollection