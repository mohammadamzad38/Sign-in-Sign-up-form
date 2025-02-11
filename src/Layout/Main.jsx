import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/HF/Header';
import Footer from '../Components/HF/Footer';

const Main = () => {
    return (
        <div className='max-w-5xl mx-auto'>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default Main;