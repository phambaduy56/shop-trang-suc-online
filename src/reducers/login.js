import * as Types from './../constants/ActionTypes'

var initialState = '';

const login = (state = initialState, action) => { 
    switch(action.type) {
        case Types.LOGIN:           
            return action.token;
        default: return state;    
    }
}

export default login;