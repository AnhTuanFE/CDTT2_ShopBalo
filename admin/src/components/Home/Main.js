import {React, useEffect} from 'react';
import TopTotal from './TopTotal';
import LatestOrder from './LatestOrder';
import SaleStatistics from './SalesStatistics';
import ProductsStatistics from './ProductsStatistics';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';

const Main = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const productList = useSelector((state) => state.productList);
    const { countProducts } = productList;
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Dashboard </h2>
                </div>
                {/* Top Total */}
                <TopTotal orders={orders} countProducts={countProducts} countUsers={users?users.length:0} />

                <div className="row">
                    {/* STATICS */}
                    <SaleStatistics />
                    <ProductsStatistics />
                </div>

                {/* LATEST ORDER */}
                <div className="card mb-4 shadow-sm">
                    <LatestOrder orders={orders} loading={loading} error={error} />
                </div>
            </section>
        </>
    );
};

export default Main;
