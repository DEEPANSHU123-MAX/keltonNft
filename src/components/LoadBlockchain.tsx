
import contract from "../abis/NFT.json";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import fs from "fs";
import { address, abi, Byte_code } from "../config";
import { ContractFactory } from "ethers";
import Api from "../Api/api";
import Cookies from "js-cookie";

// const { BN, constants, expectEvent, expectRevert, balance, send, ether } = require("@openzeppelin/test-helpers");




 





export const deployContract = async (
  contractName: string,
  contractSymbol: string
) => {
  let _commission = 10;
  let _commission_reciever = "0x81Dc3e4083F0Ee232F8B8dEff1a47985FB100b70";
  let Base_uri = "test uri";

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const factory = new ContractFactory(abi, Byte_code, signer);

  // If your contract requires constructor args, you can specify them here
  const contract = await factory.deploy(
    Base_uri,
    contractName,
    contractSymbol,
    _commission,
    _commission_reciever
  );
  localStorage.setItem("contractAddress" , contract.address)
  console.log(contract.address, " contract Address");
  console.log(contract.deployTransaction, "deploy transaction");
  return contract;
};



export const checkWalletIsConnected = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log("Make sure you have Metamask installed!");
    return;
  } else {
    console.log("Wallet exists! We're ready to go!");
  }

  const accounts = await ethereum.request({ method: "eth_accounts" });
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an authorized account: ", account);
    return account;
  } else {
    console.log("No authorized account found");
    return null;
  }
};

export const connectWalletHandler = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Please install Metamask!");
  }
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Found an account! Address: ", accounts[0]);


    let expiryTime = new Date(new Date().getTime() + 20 *60 * 1000);
     
    Api.get(`/user/login/${accounts[0]}`).then((response) => {
     console.log("inside login")

      const { accessToken, refreshToken } = response.data;


      Cookies.set("access", accessToken , {expires:expiryTime});
      Cookies.set("refresh", refreshToken ,{expires:7});
    
  })

    return accounts[0];
  } catch (err) {
    console.log(err);
  }
};

export const buyNftHandler = async (tokenId: any, tokenPrice: any) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const accounts = await ethereum.request({ method: "eth_accounts" });
      let account = accounts[0];
      const balanceBigNumber = await provider.getBalance(account);
      let balance = ethers.utils.formatEther(balanceBigNumber);
      if (balance > tokenPrice) {
        const nftContract = new ethers.Contract(address, abi, signer);

        let id = "0x" + tokenId.toString(16);
        let cost = "0x" + (tokenPrice * 10 ** 18).toString(16);
        console.log(cost);
        console.log("Initialize payment");

        let nftTxn = await nftContract.buyNFT(id, { value: cost });

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log("From load block", nftTxn);
        return nftTxn;
      } else {
        alert("Not enough balance");
      }
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (e) {}
};

export const transferTokenHandler = async (to: string, tokenId: any) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);
      let id = "0x" + tokenId.toString(16);
      let txn = await nftContract.giftToken(to, id);
      await txn.wait();
      return txn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export const priceChangeHandler = async (tokenId: any, price: any) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);
      let id = "0x" + tokenId.toString(16);
      let value = "0x" + price.toString(16);
      let txn = await nftContract.changeTokenPrice(id, value);
      await txn.wait();
      return txn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFromSaleHandler = async (tokenId: any) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);
      let id = "0x" + tokenId.toString(16);
      let txn = await nftContract.removeTokenFromSale(id);
      await txn.wait();
      return txn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};
export const tokenUriHandler = async (tokenId: any) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);
      let id = "0x" + tokenId.toString(16);
      let uri = await nftContract.tokenURI(id);
      let owner = await nftContract.ownerOf(id);
      let saleStatus = await nftContract.isTokenForSale(id);
      let tokenPrice = await nftContract.getTokenPrice(id);
      let value = parseInt(tokenPrice._hex.slice(2));
      return { address, uri, owner, saleStatus, value };
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export const sellTokenHandler = async (tokenId: any, price: any) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address, abi, signer);
      let id = "0x" + tokenId.toString(16);
      let value = "0x" + price.toString(16);
      let nftTxn = await nftContract.setTokenForSale(id, value);
      await nftTxn.wait();
      console.log(`token set for sale`);
      return nftTxn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

export const mintNftHandler = async (
  tokenURI: string,
  baseURI: string,
  royalityFee: any,
  tokenCreator: any
) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer, "signer");
      let contractAdd = localStorage.getItem("contractAddress");

       let accessAddress = contractAdd ? contractAdd : address;
       console.log(typeof(accessAddress) ,"accesssss")
      const nftContract = new ethers.Contract(accessAddress , abi, signer);
      console.log(nftContract);
      console.log(royalityFee , "roayaltyyyyyy")

      console.log("Initialize payment");
      let nftTxn = await nftContract.mint(
        tokenURI,
        baseURI,
        royalityFee,
        
        tokenCreator
      );
      console.log(nftTxn, "nftttttttt");

      console.log("Mining... please wait");
      await nftTxn.wait();

      console.log(`Mined`);
      return nftTxn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};
