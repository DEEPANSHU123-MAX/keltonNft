import React from "react";
import "../CSS/create.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Api from "../Api/api";
import { Link, useNavigate , useParams } from "react-router-dom";
import {
  checkWalletIsConnected,
  connectWalletHandler,
  deployContract,
} from "../components/LoadBlockchain";

import CollectionFormComponent from '../components/forms/createCollectionForm';

interface NftData {
  collectionName: string;
  collectionDescription: string;
  Url: null | undefined | string;
  category: string | null;
  collectionOwner: any;
  contractName: string;
  contractSymbol: string;
  contractAddress: string;

}

const pinataApiKey = "4d37623cdbbfb91c7f0d";
const pinataSecretApiKey =
  "5043ec80f9de04cb311185b7026c84769225d2896e3a45e097a1c020d2f07251";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

function CreateCollection() {
  const Navigate = useNavigate();
  const{chainId} = useParams();

  const [fileUrl, setFileUrl] = useState<null | undefined | string>();
  const [categoryValue, setCategoryValue] = useState<any>("Art");
  const [currentAccount, setCurrentAccount] = useState<any>(null);

  useEffect((): any => {
    const loader = async () => {
      const account = await checkWalletIsConnected();
      setCurrentAccount(account);
    };
    loader();

    accountChanged();
  }, [currentAccount]);

  const networkChanged = (chainId : any) => {
    console.log({ chainId });
    Navigate(`/CreateCollection/${chainId}`)
  };

  useEffect(() => {
      console.log("i am working")
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const accountChanged: any = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }
    ethereum.on("accountsChanged", (accounts: any) => {
      setCurrentAccount(accounts[0]);
    });
  };

  const fileHandler = async (file: any) => {
    console.log(file, "imageeeee");
        
       
    let data = new FormData();
    
    data.append("file", file);

    try {
      axios
        .post(url, data, {
          headers: {
            maxBodyLength: "Infinity",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        })
        .then((response) => {
          console.log("image uploaded");
          let imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
          console.log(imageUrl);

          setFileUrl(imageUrl);
        });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const uploadHandler = async (res:any) => {
    // e.preventDefault();
    console.log(res, "ressss")
    

    const contractTxn = await deployContract(
      res.ContractName,
      res.ContractSymbol
    );

    let data: NftData = {
      collectionName: res.CollectionName,
      collectionDescription: res.Discription,
      Url: fileUrl,
      category: res.select,
      collectionOwner: currentAccount,
      contractName: res.ContractName,
      contractSymbol: res.ContractSymbol,
      contractAddress: contractTxn.address,
      
    };

    console.log(contractTxn.address, "contractTxnnnnnnnnnnnnnn");

    Api.post(`/createCollection/${currentAccount}/${chainId}`, data).then((response) => {
      console.log(response, "resssssssssssssss");
      Navigate(`/Create/${chainId}`);
    });
    console.log(data);
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      ></link>

    <CollectionFormComponent uploadHandler={uploadHandler} fileHandler={fileHandler} />

      </div>
  );
}

export default CreateCollection;
