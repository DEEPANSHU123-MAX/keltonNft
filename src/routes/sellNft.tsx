import React from 'react'
import { useEffect, useState  } from "react";
import axios from "axios";
import { useParams , Link } from "react-router-dom";
import { tokenUriHandler, sellTokenHandler, priceChangeHandler, removeFromSaleHandler, checkWalletIsConnected,transferTokenHandler } from "../components/LoadBlockchain";



const SellNft = () => {
    const [currentAccount, setCurrentAccount] = useState<undefined | any>();
    const [nftOwner, setNftOwner] = useState();


    const {nftId} = useParams();

    useEffect((): any => {
        const loader = async () => {
          const account = await checkWalletIsConnected();
          setCurrentAccount(account);
          if (account) {
            // getTokenUri();
          }
        }
        accountChanged();
        return loader();
      }, [currentAccount, nftOwner])

      const accountChanged = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log("Make sure you have Metamask installed!");
          return;
        } else {
          console.log("Wallet exists! We're ready to go!")
        }
        ethereum.on("accountsChanged", (accounts: string[]) => {
          setCurrentAccount(accounts[0]);
        })
    
      }


  return (
    <div>Sell nft for id {nftId}</div>
  )
}
export default SellNft;
