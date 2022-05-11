
import { Button, Container, Card ,Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState,useEffect } from "react";
// import axios from "axios";
// import {Card,Button,Container,Row} from "react-bootstrap";


const Home = () => {
  let [allNft,setAllNft] = useState([]);


   // useEffect(()=>{
    //   getAllNft();
    // },[]);
 
    // const getAllNft = () => {
    //   const params = new URLSearchParams(window.location.search);
    //   const searchData = params.get('search')
    //   if(searchData ){
    //     console.log("hello")
      
    //     axios.get(`http://localhost:5000/tokenSearch?search=${searchData}`).then((response) => {
    //     setAllNft(response.data)
    //   })
    //   }
    // }

    const ShowNft = ()=>{
      return(
        <div>
          <Container >
            <Row>
              {allNft.map((nft:any) => (
                <Card className="nft-card" key={nft.tokenId} style={{ width: '30rem' }}>
                  <Card.Img variant="top" src={nft.url} />
                  <Card.Body className="card-body">
                    <Card.Title><p>{nft.itemName}</p></Card.Title>
                    <Button variant="primary">Description</Button>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        </div>
      );
    }


    const ShowHomePage = ()=>{
      return(
      
        <div className="home-page">
      
     
      
      <Container>
        <Row>
          <Col>
            <h1>Discover, collect, and sell extraordinary NFTs </h1>
            <p>OpenMarket is the our first and largest NFT marketplace</p>
            <Link to="/AllNFT"><Button className="button" variant="primary">Explore</Button></Link>
            <Link to="/create"><Button className="button" variant="outline-primary">Create</Button></Link>
            
          </Col>
          <Col>
          <button>
            <img  className="home-token" src='/img/home-token.jpg' height={200} width={200} />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
      );
    }

   
   
    
  return (
<div> { ShowHomePage()}</div>
   
  
  );
}

export default Home;

