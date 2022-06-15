import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, ListGroup, Accordion, Table, Form,Modal,Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import { SiEthereum } from 'react-icons/si';
import { BiDetail, BiTransfer } from 'react-icons/bi';
import { RiArrowUpDownFill, } from 'react-icons/ri';
import { MdChildFriendly } from 'react-icons/md';
import { AiOutlineWallet } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { CgDetailsMore } from 'react-icons/cg';
import "../styles/buynft.css";
import axios from "axios";
import {address} from '../config';
import { tokenUriHandler, sellTokenHandler, priceChangeHandler, removeFromSaleHandler, checkWalletIsConnected,transferTokenHandler } from "../components/LoadBlockchain";


import { useParams } from "react-router-dom";


const Sellnft = () => {
  const [nftData, setNftData] = useState();
  const [requestProcessed,setRequestProcessed] = useState();
  const [show, setShow] = useState(false);
  const [sellStatus, setSellStatus] = useState();
  const [nftPrice, setNftPrice] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let params = useParams();
  const getTokenUri = async () => {
    let tokenUri = await tokenUriHandler(params.nftId);
    axios.get(tokenUri.uri).then((response) => {
      const data = JSON.parse(Object.keys(response.data))
      data["contractAddress"] = tokenUri.address;
      data["nftOwner"] = tokenUri.owner;
      setNftOwner(data.nftOwner.toLowerCase())
      data["forSale"] = tokenUri.saleStatus;
      axios.get(`http://localhost:5000/getUser/${data.nftOwner.slice(2,)}`).then((response) => {
        if (response.data.length > 0) {
          data['tokenOwnerName'] = response.data[0].name;
        } else {
          data['tokenOwnerName'] = "Anonymous";
        }

        setNftData(data);
        setSellStatus(data.forSale);
        setNftPrice(tokenUri.value)
      })

    })
  }
  const sellNft = async (e) => {
    e.preventDefault()
    let price = e.target.price.value;
    setRequestProcessed(false)
    let txn = await sellTokenHandler(params.nftId, price);
    axios.patch(`http://localhost:5000/tokenForSale/${params.nftId}/${price}`).then((response) => {
      let data = nftData;
      data['forSale'] = true;
      data['tokenPrice'] = price;
      setNftData(data)
      setSellStatus(data.forSale);
      setNftPrice(price)
      setRequestProcessed(true)

    })
  }
  const changePrice = async (e) => {
    e.preventDefault();
    let price = e.target.price.value;
    let tokenId = params.nftId;
    setRequestProcessed(false);
    let txn = await priceChangeHandler(tokenId, price);
    axios.patch(`http://localhost:5000/priceChange/${price}/${tokenId}`).then((response) => {
      setNftPrice(price);
      setRequestProcessed(true);
    })

  }
  const removeFromSale = async () => {
    let id = params.nftId;
    handleShow();
    setRequestProcessed(false);
    let txn = await removeFromSaleHandler(id);
    axios.patch(`http://localhost:5000/removeFromSale/${id}`).then((response) => {
      setSellStatus(false);
      setRequestProcessed(true);
    })
  }
  const transferToken = async(e)=>{
    e.preventDefault();
    let receiverAddress = e.target.address.value;
    let id = params.nftId;
    setRequestProcessed(false);
    let txn = await transferTokenHandler(receiverAddress,id);
    let previousOwner = currentAccount.slice(2,)
    let currentOwner = receiverAddress.slice(2,)
    axios.patch(`http://localhost:5000/transfer/${id}/${previousOwner}/${currentOwner}`).then((response)=>{
      setRequestProcessed(true);
      setNftOwner(receiverAddress);
    })

  }
  const saleCard = () => (
    <Card className='cards' style={{ width: '45rem' }}>
      <Card.Header as="h4" ><BsClock style={{ color: 'black' }} />Sale ends June 26, 2022 at 7:30pm IST </Card.Header>
      <Card.Body >
        <Card.Title as="h4">Current price</Card.Title>
        <Card.Text as="h1" ><SiEthereum style={{ color: 'black' }} />{nftPrice}</Card.Text>

        <div className='btn1'>
          <Button variant="primary" size="lg" style={{ width: "117px", height: "30px", borderRadius: "12px" }}>
            <AiOutlineWallet />Change Price</Button>
        </div>
      </Card.Body>
    </Card>
  )
  const setSaleCard = () => (
    <Card className='cards' style={{ width: '45rem' }}>
      <Card.Header as="h3" >Sell token</Card.Header>
      <Card.Body >
        <Card.Title as="h4">Currently token is not for sale</Card.Title>
        <div className='btn1'>

        </div>
      </Card.Body>
    </Card>
  )
  const forSaleComponent = () => (
    <div>
      <form className='form2' onSubmit={changePrice}>
        <input type="number" name="price" placeholder='Set price' />
        <Button onClick={handleShow} className='btn3' variant="primary" type='submit' size="lg">Change price</Button>
      </form>
      <div className='btn1'>
        <Button onClick={removeFromSale} variant="primary" size="lg" style={{ width: "117px", height: "30px", borderRadius: "12px" }}>Remove from sale</Button>
      </div>
      <form className='form2' onSubmit={transferToken}>
        <input type="text" name="address" placeholder='address' />
        <Button onClick={handleShow} className='btn3' variant="primary" type='submit' size="lg">Gift token</Button>
      </form>
      <Container >
        <Row>
          <Col>
            <div className='title'>
              <h1>{nftData ? nftData.itemName : "token"} </h1>
              <p>owned by:  <Card.Link style={{ textDecoration: 'none' }} href="#">{nftData ? nftData.tokenOwnerName : "Unknown"}</Card.Link></p>
            </div>
          </Col>
          <Col>
            <div className='title'>
              {saleCard()}


            </div>
          </Col>
          <div className='col1'>
            <Col >
              <Link to="/Buynft">
                <button >
                  <img className="home-token" src={nftData ? nftData.url : "image"} height={200} width={200} />
                </button>
              </Link>

              <Card className='card2' style={{ width: '40rem' }} >

                <Card.Body >
                  <Card.Title as="h2"><CgDetailsMore style={{ color: 'black' }} />Description</Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush" >
                  <Card.Text className="cardtext" as="h5">
                    Created by: {nftData ? nftData.tokenCreator : ''}
                    <p>{nftData ? nftData.description : ''}</p>
                  </Card.Text>
                </ListGroup>

                <Accordion className='details' defaultActiveKey="0" flush  >
                  <Accordion.Item className='accitem' eventKey="0"  >
                    <Accordion.Header  ><h3><BiDetail style={{ color: 'black' }} />Details</h3></Accordion.Header>
                    <Accordion.Body  >
                      <h4>Contract Address: {nftData ? nftData.contractAddress : ''}</h4>
                      <h4>Token ID: {params.nftId ? params.nftId : ''}</h4>
                      <h4>Token Standard: {nftData ? nftData.TokenStandard : ''}</h4>
                      <h4>Blockchain: {nftData ? nftData.BlockChain : ''}</h4>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Card>
            </Col>
          </div>

          <div className='title2'>
            <Col>
              <Card>
                <Accordion className='details' defaultActiveKey="0" flush  >
                  <Accordion.Item className='accitem2' eventKey="0"  >
                    <Accordion.Header className='accheader'  ><h3><RiArrowUpDownFill style={{ color: 'black' }} />Item Activity</h3></Accordion.Header>
                    <Accordion.Body  >
                      <Table responsive size="lg" striped bordered hover>
                        <thead>

                          <tr style={{ fontSize: '18px', fontStyle: 'oblique' }}>
                            <th>Event</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ fontSize: '15px' }}>
                            <td><BiTransfer style={{ color: 'darkslategrey' }} /> Transfer</td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">3CCFDC</Card.Link></td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">B9E820</Card.Link></td>
                            <td >29 december 2021</td>
                          </tr>
                          <tr style={{ fontSize: '15px' }}>
                            <td><MdChildFriendly style={{ color: 'darkslategrey' }} /> minted</td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">3CCFDC</Card.Link></td>
                            <td ><Card.Link style={{ textDecoration: 'none' }} href="#">B9E820</Card.Link></td>
                            <td >29 december 2021</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  )
  const setForSaleComponent = () => (
    <div className="home-page" >
      <form className='form2' onSubmit={sellNft}>
        <input type="number" name="price" placeholder='Set price' />
        <Button className='btn3' variant="primary" type='submit' size="lg" onClick={handleShow}>SELL</Button>
      </form>
      <form className='form2' onSubmit={transferToken}>
        <input type="text" name="address" placeholder='address' />
        <Button onClick={handleShow} className='btn3' variant="primary" type='submit' size="lg">Gift token</Button>
      </form>
      <Container >
        <Row>
          <Col>
            <div className='title'>
              <h1>{nftData ? nftData.itemName : "token"} </h1>
              <p>owned by:  <Card.Link style={{ textDecoration: 'none' }} href="#">{nftData ? nftData.tokenOwnerName : "Unknown"}</Card.Link></p>
            </div>
          </Col>
          <Col>
            <div className='title'>
              {setSaleCard()}
            </div>
          </Col>
          <div className='col1'>
            <Col >
              <Link to="/Buynft">
                <button >
                  <img className="home-token" src={nftData ? nftData.url : "image"} height={200} width={200} />
                </button>
              </Link>

              <Card className='card2' style={{ width: '40rem' }} >

                <Card.Body >
                  <Card.Title as="h2"><CgDetailsMore style={{ color: 'black' }} />Description</Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush" >
                  <Card.Text className="cardtext" as="h5">
                    Created by: {nftData ? nftData.tokenCreator : ''}
                    <p>{nftData ? nftData.description : ''}</p>
                  </Card.Text>
                </ListGroup>

                <Accordion className='details' defaultActiveKey="0" flush  >
                  <Accordion.Item className='accitem' eventKey="0"  >
                    <Accordion.Header  ><h3><BiDetail style={{ color: 'black' }} />Details</h3></Accordion.Header>
                    <Accordion.Body  >
                      <h4>Contract Address: {nftData ? nftData.contractAddress : ''}</h4>
                      <h4>Token ID: {params.nftId ? params.nftId : ''}</h4>
                      <h4>Token Standard: {nftData ? nftData.TokenStandard : ''}</h4>
                      <h4>Blockchain: {nftData ? nftData.BlockChain : ''}</h4>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Card>
            </Col>
          </div>

          <div className='title2'>
          <Button  onClick={(e) => {
             e.preventDefault();
            window.location.href=`https://ropsten.etherscan.io/token/${address}?a=${params.nftId}`}} variant="outline-secondary">Item Activity</Button>{' '}
          </div>
        </Row>
      </Container>
    </div>
  )
  const renderComponent = () => (
    <div>
      {currentAccount !== nftOwner ? authentication() : <div className="home-page" >
        {nftData ? sellNftButton() : ''}
      </div>}
    </div>

  )
  const sellNftButton = () => (
    <div>
      <Modal show={show} >
        <Modal.Header>
          <Modal.Title>{requestProcessed == true ? "Request Processed" : "Processing request"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="spinner">
          {requestProcessed == true ? <div>
          <Button variant="success" onClick={handleClose}>Success</Button>
          </div> : <Spinner animation="grow" variant="primary" />}
        </Modal.Body>
      </Modal>
      {/* {sellStatus ? forSaleComponent() : setForSaleComponent()} */}
    </div>
  )
  const authentication = () => (
    <div>
      
      <h1>Not your token</h1>
      <Link to="/MyNFT"><Button variant='primary' className='connect-wallet-button' >Your nft</Button></Link>
    </div>

  )
  const accountChanged = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }
    ethereum.on("accountsChanged", (accounts : any) => {
      setCurrentAccount(accounts[0]);
    })

  }
  // useEffect(() => {
  //   accountChanged();
  // })
  useEffect(() => {
    const loader = async () => {
      const account = await checkWalletIsConnected();
      setCurrentAccount(account);
      if (account) {
        getTokenUri();
      }
    }
    accountChanged();
     loader();
  }, [currentAccount, nftOwner])
  return (
    <div>
      {currentAccount ? renderComponent() : authentication()}
    </div>

  )
};

export default Sellnft;