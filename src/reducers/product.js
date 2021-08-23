import * as Types from './../constants/ActionTypes'

var initialState = [];

const product = (state = initialState, action) => {
    switch (action.type) {
        case Types.LIST_PRODUCT:
            return action.product;
        default: return state;
    }
}

export default product;