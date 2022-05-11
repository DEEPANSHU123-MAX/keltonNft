import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header'; 
import Home from './routes/Home';
import Create from './routes/create'

import Footer from './components/Footer';



const AppRouter : React.FC = ()=>(
    <BrowserRouter>
        <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/create" element={<Create />}/>
                
                
            </Routes>
            {/* <Footer /> */}
        </div>
    </BrowserRouter>
)

export default AppRouter;
