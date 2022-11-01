import React, { useEffect } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/productScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AddProduct from './screens/AddProduct';
import Login from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import NotFound from './screens/NotFound';
import PrivateRouter from './PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './Redux/Actions/ProductActions';
import { listOrders } from './Redux/Actions/OrderActions';
import { listUser } from './Redux/Actions/userActions';
import SliderScreen from './screens/SliderScreen';
import AddNewsScreen from './screens/AddNewsScreen';
import EditNewsScreen from './screens/EditNewsScreen';
import NewsScreen from './screens/NewsScreen';
import CommentScreen from './screens/CommentScreen';

function App() {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
            dispatch(listOrders());
            dispatch(listUser());
        }
    }, [dispatch, userInfo]);

    return (
        <>
            <Router>
                <Switch>
                    <PrivateRouter path="/" component={HomeScreen} exact />
                    <PrivateRouter path="/products" component={ProductScreen} exact />
                    <PrivateRouter path="/products/page/:pageNumber" component={ProductScreen} exact />
                    <PrivateRouter path="/products/search/:keyword" component={ProductScreen} exact />
                    <PrivateRouter path="/products/category/:category" component={ProductScreen} exact />
                    <PrivateRouter path="/products/search/:keyword/page/:pageNumber" component={ProductScreen} exact />
                    <PrivateRouter
                        path="/products/category/:category/page/:pageNumber"
                        component={ProductScreen}
                        exact
                    />
                    <PrivateRouter path="/category" component={CategoriesScreen} />
                    <PrivateRouter path="/orders" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/search/:keyword" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/search/:keyword/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber/search/:keyword" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber" component={OrderScreen} exact />
                    <PrivateRouter
                        path="/orders/search/:keyword/page/:pageNumber/status/:status"
                        component={OrderScreen}
                        exact
                    />

                    <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
                    <PrivateRouter path="/addproduct" component={AddProduct} />
                    <PrivateRouter path="/users" component={UsersScreen} />
                    <PrivateRouter path="/comment" component={CommentScreen} />
                    <PrivateRouter path="/slider" component={SliderScreen} />
                    <PrivateRouter path="/news" component={NewsScreen} />
                    <PrivateRouter path="/addnews" component={AddNewsScreen} />
                    <PrivateRouter path="/editnews/:id/edit" component={EditNewsScreen} />
                    <PrivateRouter path="/product/:id/edit" component={ProductEditScreen} />
                    <Route path="/login" component={Login} />
                    <PrivateRouter path="*" component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
