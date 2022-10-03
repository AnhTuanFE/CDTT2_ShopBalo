import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import EditNews from './../components/news/EditNews';

const EditNewsScreen = ({ match }) => {
    const idNews = match.params.id;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditNews idNews={idNews} />
            </main>
        </>
    );
};
export default EditNewsScreen;
