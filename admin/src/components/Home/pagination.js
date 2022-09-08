import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const { page, pages, category = '', keyword = '' } = props;
    return (
        pages > 1 && (
            <nav
                className="col-lg-12 col-md-12 mt-4"
                aria-label="Page navigation"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="icon-left">
                    <Link
                        to={
                            keyword
                                ? `/products/search/${keyword}/page/${page > 1 ? page - 1 : page}`
                                : category
                                ? `/products/category/${category}/page/${page > 1 ? page - 1 : page}`
                                : `/products/page/${page > 1 ? page - 1 : page}`
                        }
                    >
                        <i class="fas fa-angle-double-left"></i>
                    </Link>
                </div>
                <ul className="pagination justify-content-center" style={{ marginTop: '0', marginBottom: '0' }}>
                    {[...Array(pages).keys()].map((x) => (
                        <li className={`page-item ${x + 1 === page ? 'active' : ''}`} key={x + 1}>
                            <Link
                                className="page-link"
                                to={
                                    keyword
                                        ? `/products/search/${keyword}/page/${x + 1}`
                                        : category
                                        ? `/products/category/${category}/page/${x + 1}`
                                        : `/products/page/${x + 1}`
                                }
                            >
                                {x + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="icon-right">
                    <Link
                        to={
                            keyword
                                ? `/products/search/${keyword}/page/${page < pages ? page + 1 : pages}`
                                : category
                                ? `/products/category/${category}/page/${page < pages ? page + 1 : pages}`
                                : `/products/page/${page < pages ? page + 1 : pages}`
                        }
                    >
                        <i class="fas fa-angle-double-right"></i>
                    </Link>
                </div>
            </nav>
        )
    );
};

export default Pagination;
