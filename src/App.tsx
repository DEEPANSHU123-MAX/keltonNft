import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header'; 
import Home from './routes/Home';
import Create from './routes/create';
import MyProfile from './components/Profile';
import Footer from './components/Footer';
import Profilesettings from './components/Profilesetting';
import MyNFT from './routes/MyNft';
import SellNft from './routes/sellNft';
import CreateCollection from './routes/createCollection';


const AppRouter : React.FC = ()=>(
    <BrowserRouter>
        <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/Create" element={<CreateCollection/>}/>
                {/* <Route path="*" element={<NotFoundPage />} /> */}
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
