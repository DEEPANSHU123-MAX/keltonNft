import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header'; 
import Home from './routes/Home';
import CreateItem from './routes/createItem';
import MyProfile from './components/Profile';
import Footer from './components/Footer';
import Profilesettings from './components/Profilesetting';
import MyNFT from './routes/MyNft';
import SellNft from './routes/sellNft';
import CreateCollection from './routes/createCollection';
import Create from './components/create';
import CollectionInfo from './routes/CollectionInfo';

const AppRouter : React.FC = ()=>(
    <BrowserRouter>
        <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/Create" element={<Create/>}/>
                {/* <Route path="*" element={<NotFoundPage />} /> */}
                <Route path="/CreateItem/:collectionId" element={<CreateItem/>}/>
                <Route path="/CreateCollection" element={<CreateCollection/>}/>
                <Route path="/CollectionInfo" element={<CollectionInfo/>}/>
                <Route path="/Sellnft/:nftId" element={<SellNft />}/>
                <Route path="/MyNFT" element={<MyNFT/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
                <Route path="/editprofile" element={<Profilesettings/>}/>
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
)

export default AppRouter;
