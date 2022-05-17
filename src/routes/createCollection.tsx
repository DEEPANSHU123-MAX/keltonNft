import React from 'react'
import '../CSS/create.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Api from "../Api/api";
import { Link , useNavigate } from "react-router-dom";



interface NftData {
    CollectionName: string,
    CollectionDescription:string,
    url:null | undefined|string,
    
}

const pinataApiKey = "4d37623cdbbfb91c7f0d";
const pinataSecretApiKey = "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'

function CreateCollection() {
    const navigate = useNavigate();

    const [fileUrl, setFileUrl] = useState<null | undefined|string>();
    const[dropValue, setdropValue] = useState<any>()



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
            CollectionName:e.target.item.value.trim(),
            CollectionDescription:e.target.description.value,
            url:fileUrl,
           
            
    };
    Api.post('/createCollection', data).then((response) => {
        console.log(response, "resssssssssssssss");
    })
    console.log(data);
    navigate('/');
       
       
    }
  return (
    
<div>
    <h1>Create New Collection</h1>
    <Form className="create-page-form" onSubmit={uploadHandler}>
        <Form.Group className="mb-3" >
            <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
            <Form.Control type="file" placeholder="Collection Image" onChange={fileHandler} />
        </Form.Group>
        <Form.Text className="text-muted">
            <span style={{ color: 'red' }} >*</span>Required fields
        </Form.Text>
        <Form.Group className="mb-3" >
            <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
            <Form.Control type="text" name="item" placeholder="Collection name" required />
        </Form.Group>
        <br/>
        <label>
          Choose category for collection:
          <select value={dropValue} onChange={(e)=>setdropValue(e.target.value)}>            <option value="grapefruit">Art</option>
            <option value="lime">sports</option>
            <option value="coconut">Gaming</option>
            <option value="mango">photography</option>
            <option value="mango">Entertainment</option>
          </select>
        </label>

        <br/>
        <br/>

        <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" name="description" placeholder="Provide a detailed description of your collection" />
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

export default CreateCollection;