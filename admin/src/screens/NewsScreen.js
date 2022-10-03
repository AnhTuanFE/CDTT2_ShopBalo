import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';

import News from '../components/news/News';

const NewsScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <News />
            </main>
        </>
    );
};

export default NewsScreen;
