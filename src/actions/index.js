import * as Types from '../constants/ActionTypes';
import axios from 'axios';
export const listProduct = (product) => {
    return {
        type: Types.LIST_PRODUCT,
        product
    }
}

export const getDetailProduct = (product) => {
    return {
        type: Types.GET_DETAIL_PRODUCT,
        product
    }
}

export const login = (token) => {
    return {
        type: Types.LOGIN,
        token,
    }
}

export const listCategory = (category) => {
    return {
        type: Types.GET_CATEGORY,
        category
    }
}

export const actAddToCart = (product, qty) => {
    console.log(product)
    return {
        type: Types.ADD_TO_CART,
        product,
        qty,
    }
}

export const actDeleteProductInCart = (product) => {
    return {
        type : Types.DELETE_PRODUCT_IN_CART,
        product
    }
}

export const actUpdateProductInCart = (product, qty) => {
    return {
        type : Types.UPDATE_PRODUCT_IN_CART,
        product,
        qty
    }
}


