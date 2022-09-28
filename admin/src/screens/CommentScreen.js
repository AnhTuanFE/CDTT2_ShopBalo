import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';

import CommentMain from '../components/comment/CommentMain';

const CommentScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <CommentMain></CommentMain>
            </main>
        </>
    );
};

export default CommentScreen;
