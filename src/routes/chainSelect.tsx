import React ,{useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage'


type Props = {
  networkName:any
  setError:any
  err:object
};

const INFURA_API_KEY = "69eae361f49e43c6a560fcdc9b606005";

const networks = {
  
  Mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon TestNet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  },


  // Rinkeby: {
    
  //   chainId: `0x${Number(4).toString(16)}`,
  //   chainName: "Rinkeby Test Network",
  //   nativeCurrency: {
  //     name: "Rinkeby Test Network",
  //     symbol: "ETH",
  //     decimals: 18
  //   },
  //   rpcUrls: [
  //     `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`
  //   ],
  //   blockExplorerUrls: ["https://rinkeby.etherscan.io"]
  // }
};




function ChainSelect() {


  const [error, setError] = useState<any>();
  const Navigate = useNavigate();




const changeNetwork = async ({ networkName, setError }:Props) => {
  
  try {
    console.log("chain network")
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
    const chainId=`0x${Number(80001).toString(16)}`;
    Navigate(`/CreateCollection/${chainId}`)
    
  } catch (err) {
    setError(err.message);
  }
};




const changeNetworkRinkeyby = async ({ networkName, setError  }:Props) => {
  
  try {
    console.log("chain network")
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      
      
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      
    });
    const chainId =`0x${Number(4).toString(16)}`;
    Navigate(`/CreateCollection/${chainId}`)
  } catch (err) {
    setError(err.message);
  }
};

  const handleNetworkSwitch = async (networkName:any) => {
    console.log(networkName,"network----")
   
    await changeNetwork({ networkName , setError });
  };


  const handleNetworkSwitchRinkeby = async (networkName:any) => {
    console.log(networkName,"network----")
   
    await changeNetworkRinkeyby({ networkName , setError });
  };

  const networkChanged = (chainId : any) => {
    console.log({ chainId });
    Navigate(`/CreateCollection/${chainId}`)
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);


  return (
    <div>
       <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <main className="mt-4 p-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Select chain
        </h1>
        <div className="mt-4">
          <button
            onClick={() => handleNetworkSwitch("Mumbai")}
            className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Polygon
          </button>
          <button
            onClick={() => handleNetworkSwitchRinkeby("Rinkeby")}
            className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Rinkeby
          </button>
          <ErrorMessage message={error} />
        </div>
      </main>
    </div>
    </div>
  )
}

export default ChainSelect