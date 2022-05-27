import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = ()=>(
    <div>
          <h1>Create new Item</h1>
                <Form className="create-page-form" onSubmit={uploadHandler}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="file" placeholder="File" onChange={fileHandler} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }} >*</span>Required fields
                    </Form.Text>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="item" placeholder="Item name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" name="description" placeholder="Provide a detailed description of your item" />
                        <Form.Text className="text-muted">
                            The description will be included on the item's detail page underneath its image.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Royalty Fee %<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="Royalty" placeholder="Royalty Fee %" required />
                    </Form.Group>
                    <br/>
                    <label>
                        Choose currency to create nft:
                        <select value={currencyValue} onChange={(e)=>setcurrencyValue(e.target.value)}>         
                            <option value="lime">Ether</option>
                            <option value="coconut">other</option>
                           
                        </select>
                        </label>
                        <br/>
                    <hr />
                    <Button variant="primary" type="submit" onClick={handleShow}>
                        Create
                    </Button>
                </Form>
    </div>



// {
//     "name": "Rinkeby",
//     "title": "Ethereum Testnet Rinkeby",
//     "chain": "ETH",
//     "network": "testnet",
//     "rpc": [
//       "https://rinkeby.infura.io/v3/${INFURA_API_KEY}",
//       "wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}"
//     ],
//     "faucets": [
//       "http://fauceth.komputing.org?chain=4&address=${ADDRESS}",
//       "https://faucet.rinkeby.io"
//     ],
//     "nativeCurrency": {
//       "name": "Rinkeby Ether",
//       "symbol": "RIN",
//       "decimals": 18
//     },
//     "infoURL": "https://www.rinkeby.io",
//     "shortName": "rin",
//     "chainId": 4,
//     "networkId": 4,
//     "ens": {
//       "registry": "0xe7410170f87102df0055eb195163a03b7f2bff4a"
//     },
//     "explorers": [
//       {
//         "name": "etherscan-rinkeby",
//         "url": "https://rinkeby.etherscan.io",
//         "standard": "EIP3091"
//       }
//     ]
//   },





//   {
//     "name": "Mumbai",
//     "title": "Polygon Testnet Mumbai",
//     "chain": "Polygon",
//     "rpc": [
//       "https://matic-mumbai.chainstacklabs.com",
//       "https://rpc-mumbai.maticvigil.com",
//       "https://matic-testnet-archive-rpc.bwarelabs.com"
//     ],
//     "faucets": [
//       "https://faucet.polygon.technology/"
//     ],
//     "nativeCurrency": {
//       "name": "MATIC",
//       "symbol": "MATIC",
//       "decimals": 18
//     },
//     "infoURL": "https://polygon.technology/",
//     "shortName": "maticmum",
//     "chainId": 80001,
//     "networkId": 80001,
//     "explorers": [
//       {
//         "name": "polygonscan",
//         "url": "https://mumbai.polygonscan.com",
//         "standard": "EIP3091"
//       }
//     ]
//   },
);

export default NotFoundPage;