import React, { useState, useEffect } from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import Silder from '../components/Silder';
import Sliders from '../components/Sliders';
import Corousel from '../components/SlideCorousel/Corousel';
import CorouselOder from '../components/SlideCorousel/CourouselOder';
import NewsMain from '../components/news/NewsMain';

const HomeScreen = ({ match, location }) => {
    // window.scrollTo(0, 0);
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const category = match.params.category;
    const rating = match.params.rating;
    const sortProducts = match.params.sortProducts;

    return (
        <div>
            <Header keysearch={keyword} />
            {/* <Silder /> */}
            {!keyword && !category ? <Sliders /> : ''}
            {!keyword && !category ? <Corousel /> : ''}
            {!keyword && !category ? <CorouselOder /> : ''}

            <ShopSection
                category={category}
                keyword={keyword}
                pageNumber={pageNumber}
                sortProducts={sortProducts}
                rating={rating}
            />

            {/* <CalltoActionSection /> */}
            {!keyword && !category ? <NewsMain /> : ''}
            {/* {!keyword && !category ? <ContactInfo /> : ''} */}
            <Footer />
        </div>
    );
};

export default HomeScreen;
