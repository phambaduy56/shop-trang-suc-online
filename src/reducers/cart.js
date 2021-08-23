import * as Types from './../constants/ActionTypes'
var data = JSON.parse(localStorage.getItem('CART'));
var initialState = data ? data : [];

const cart = (state = initialState, action) => {
    var { product, qty } = action;
    var index = -1;

    switch (action.type) {
        case Types.ADD_TO_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].qty += qty;
            } else {
                state.push({
                    product,
                    qty
                });
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state];

        case Types.UPDATE_PRODUCT_IN_CART:
            console.log('state11', state)
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].qty = qty;
            }
            console.log('state11', state)
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state];

        case Types.DELETE_PRODUCT_IN_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('CART', JSON.stringify(state));
            return [...state];

        default: return [...state];
    }
}

var findProductInCart = (cart, product) => {
    var index = -1;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export default cart;