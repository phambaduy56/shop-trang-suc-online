import { combineReducers } from "redux";
import product from './product'
import detailProduct from './detailProduct'
import login from './login'
import category from './category'
import cart from './cart'

const appReducers = combineReducers({
   product,
   detailProduct,
   login,
   category,
   cart
});

export default appReducers;