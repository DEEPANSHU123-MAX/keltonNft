
import { Button, Container, Card ,Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState,useEffect } from "react";
// import Flip from 'react-reveal/Flip';



const Home = () => {
  let [allNft,setAllNft] = useState([]);



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
            <p className="new-data">OpenMarket is the our first and largest NFT marketplace</p>
            <Link to="/AllNFT"><Button className="button" variant="primary">Explore</Button></Link>
            <Link to="/create"><Button className="button" variant="outline-primary">Create</Button></Link>
            
          </Col>
          <Col>
          <button>
           
            <img  className="home-token" src='/img/home-token.jpg' height="200" width="500" />
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

