import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';

import AddNews from '../components/news/AddNews';

const AddNewsScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddNews />
            </main>
        </>
    );
};

export default AddNewsScreen;
