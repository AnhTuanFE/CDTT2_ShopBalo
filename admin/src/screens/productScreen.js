import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import MainProducts from './../components/products/MainProducts';

const ProductScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const category = match.params.category;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainProducts keyword={keyword} category={category} pageNumber={pageNumber} />
            </main>
        </>
    );
};

export default ProductScreen;
