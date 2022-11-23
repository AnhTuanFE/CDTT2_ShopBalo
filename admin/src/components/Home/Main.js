import { React, useEffect } from 'react';
import TopTotal from './TopTotal';
import LatestOrder from './LatestOrder';
import SaleStatistics from './SalesStatistics';
import BuyOrdersPrice from './BuyOrdersPrice';
import OrderBuyingStatistics from './OrderBuyingStatistics';
import NewsStatistics from './NewsStatistics';
import ProductStatistics from './ProductStatistics';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';
import { getOrderCompleteAll } from '../../Redux/Actions/OrderActions';

const Main = () => {
    const dispatch = useDispatch();

    // const orderList = useSelector((state) => state.orderList);
    // const { loading, error, orders } = orderList;
    const orderListComplete = useSelector((state) => state.orderListComplete);
    const { orders: AllOrders } = orderListComplete;
    const productList = useSelector((state) => state.productList);
    const { countProducts } = productList;
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listProducts());
        dispatch(getOrderCompleteAll());
    }, [dispatch]);
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Trang chủ </h2>
                </div>
                {/* Top Total */}
                <TopTotal orders={AllOrders} countProducts={countProducts} countUsers={users ? users.length : 0} />

                <div className="row">
                    {/* STATICS */}
                    {/* <OrderBuyingStatistics />
                    <BuyOrdersPrice /> */}
                    <SaleStatistics />
                    <ProductStatistics />
                    <NewsStatistics />
                </div>

                {/* LATEST ORDER */}
                {/* <div className="card mb-4 shadow-sm">
                    <LatestOrder orders={orders} loading={loading} error={error} />
                </div> */}
            </section>
        </>
    );
};

export default Main;
