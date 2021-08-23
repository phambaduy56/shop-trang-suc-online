import * as Types from './../constants/ActionTypes'

var initialState = [];

const category = (state = initialState, action) => { 
    switch(action.type) {
        case Types.GET_CATEGORY:           
            return action.category;
        default: return state;    
    }
}

export default category;