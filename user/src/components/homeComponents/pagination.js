import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Pagination = (props) => {
    const history = useHistory();
    const { page, pages, category = '', keyword = '', rating = '', sortProducts = '' } = props;
    const [pageProduct, setPageProduct] = useState([]);

    const handlerPage = (page) => {
        if (keyword === '' && category === '' && rating === '' && sortProducts === '') {
            history.push(`/page/${page}`);
        }
        if (keyword === '' && category === '') {
            if (rating === '' && sortProducts !== '') {
                history.push(`/sortProducts/${sortProducts}/page/${page}`);
            }
            if (rating !== '' && sortProducts === '') {
                history.push(`/rating/${rating}/page/${page}`);
            }
            if (rating !== '' && sortProducts !== '') {
                history.push(`/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
        if (keyword !== '' && category === '') {
            if (rating === '' && sortProducts === '') {
                history.push(`/search/${keyword}/page/${page}`);
            }
            if (rating !== '' || sortProducts !== '') {
                history.push(`/search/${keyword}/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
        if (keyword === '' && category !== '') {
            if (rating === '' && sortProducts === '') {
                history.push(`/category/${category}/page/${page}`);
            }
            if (rating !== '' && sortProducts !== '') {
                history.push(`/category/${category}/sortProducts/${sortProducts}/rating/${rating}/page/${page}`);
            }
        }
    };
    useEffect(() => {
        if (page > 5) {
            const x = [...Array(page).keys()];
            x.splice(0, page - 5);
            setPageProduct(x);
        }
    }, [page, pages]);
    return (
        pages > 1 && (
            <nav
                className="col-lg-12 col-md-12 mt-5 mb-2"
                aria-label="Page navigation"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="icon-left">
                    <div onClick={() => handlerPage(page > 1 ? page - 1 : page)}>
                        <i class="fas fa-angle-double-left"></i>
                    </div>
                </div>
                <ul className="pagination justify-content-center" style={{ marginTop: '0', marginBottom: '0' }}>
                    {(page > 5 ? pageProduct : [...Array(pages > 5 ? 5 : pages).keys()]).map((x) => (
                        <li
                            className={`page-item ${x + 1 === page ? 'active' : ''}`}
                            key={x + 1}
                            onClick={() => handlerPage(x + 1)}
                        >
                            <div className="page-link" style={{ cursor: 'pointer' }}>
                                {x + 1}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="icon-right">
                    <div onClick={() => handlerPage(page < pages ? page + 1 : page)}>
                        <i class="fas fa-angle-double-right"></i>
                    </div>
                </div>
            </nav>
        )
    );
};

export default Pagination;
