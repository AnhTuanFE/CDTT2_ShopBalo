import React from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './screens/SingleProduct';
import Login from './screens/Login';
import Register from './screens/Register';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import NewsScreen from './screens/NewsScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import NotFound from './screens/NotFound';
import PrivateRouter from './PrivateRouter';
import Reset from './components/profileComponents/Reset';

// path - router - user

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/search/:keyword" component={HomeScreen} exact />
                <Route path="/category/:category" component={HomeScreen} exact />
                <Route path="/page/:pageNumber" component={HomeScreen} exact />
                <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
                <Route path="/category/:category/page/:pageNumber" component={HomeScreen} exact />
                <Route path="/products/:id" component={SingleProduct} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/news/:id" component={NewsScreen} />
                <Route path="/reset" component={Reset} />
                <PrivateRouter path="/profile" component={ProfileScreen} />
                <PrivateRouter path="/cart/:id?" component={CartScreen} />
                <PrivateRouter path="/shipping" component={ShippingScreen} />
                <PrivateRouter path="/payment" component={PaymentScreen} />
                <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRouter path="/order/:id" component={OrderScreen} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
