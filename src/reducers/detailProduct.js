import * as Types from './../constants/ActionTypes'

var initialState = [];

const detailProduct = (state = initialState, action) => { 
    
    switch(action.type) {
        case Types.GET_DETAIL_PRODUCT:       
            return action.product;
        default: return state;    
    }
}

export default detailProduct;