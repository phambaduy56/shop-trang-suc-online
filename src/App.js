import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListProduct from '././pages/HomePage/ListProduct';
import ProductItem from '././pages/ItemPage/ProductItem';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Register from './pages/Register/Register'
import Product_cate from './pages/ProductCatePage/Product_cate'

function App() {

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <ListProduct></ListProduct>
                    </Route>

                    <Route path="/product-item/:id" exact render={() => { return <ProductItem></ProductItem> }}>

                    </Route>

                    <Route path="/cart" exact render={() => { return <Cart></Cart> }}>

                    </Route>

                    <Route path="/Login" exact render={() => { return <Login></Login> }}>

                    </Route>

                    <Route path="/register" exact render={() => { return <Register></Register> }}>

                    </Route>

                    <Route path="/product_cate/:id" exact render={() => { return <Product_cate></Product_cate> }}>

                    </Route>

                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
