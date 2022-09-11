import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';

import AvatarMain from '../components/avatar/AvatarMain';

const AvatarScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AvatarMain />
            </main>
        </>
    );
};

export default AvatarScreen;
