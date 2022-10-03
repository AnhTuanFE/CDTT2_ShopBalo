import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { Link } from 'react-router-dom';
import Message from './../components/LoadingError/Error';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/LoadingError/Loading';
import moment from 'moment';
import { getNews } from '../Redux/Actions/newsAction';

export default function NewsScreen({ match }) {
    const newsId = match.params.id;
    const dispatch = useDispatch();

    const getDetailNews = useSelector((state) => state.getDetailNews);
    const { detailNews, loading } = getDetailNews;
    console.log(detailNews);
    useEffect(() => {
        dispatch(getNews(newsId));
    }, []);
    return (
        <>
            <Header />
            <div className="container single-product">
                <div className="col-lg-10 col-md-10 col-sm-12" style={{ margin: '0 auto' }}>
                    <div className="news-screen">
                        <h2 style={{ fontSize: '32px', color: '#4d4d4d', fontWeight: '600', lineHeight: '36px' }}>
                            {detailNews?.title}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0 30px 0' }}>
                            <p
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ccc',
                                    textAlign: 'center',
                                    lineHeight: '40px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#f56300',
                                }}
                            >
                                {detailNews?.nameUser?.slice(0, 1)}
                            </p>
                            <div style={{ marginLeft: '5px' }}>
                                <p className="news-screen__p" style={{ fontWeight: '600', color: 'red' }}>
                                    {detailNews?.nameUser}
                                </p>
                                <p className="news-screen__p" style={{ fontSize: '13px' }}>
                                    {moment(detailNews?.createdAt).format('DD/MM/YYYY')}{' '}
                                    {moment(detailNews?.createdAt).hours()}
                                    {':'}
                                    {moment(detailNews?.createdAt).minutes() < 10
                                        ? `0${moment(detailNews?.createdAt).minutes()}`
                                        : moment(detailNews?.createdAt).minutes()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: detailNews?.content }}></div>
                </div>
            </div>
            <Footer />
        </>
    );
}
