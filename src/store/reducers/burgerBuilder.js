import * as actionTypes from '../actions/actionTypes';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false
};

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [ action.ingridientName ]: state.ingridients[ action.ingridientName ] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[ action.ingridientName ]  
            }
        
        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [ action.ingridientName ]: state.ingridients[ action.ingridientName ] - 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[ action.ingridientName ]
            }
        
        case actionTypes.SET_INGRIDIENTS:
            return {
                ...state,
                ingridients: action.ingridients,
                error: false 
            };

        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default: 
            return state; 
    }
};  

export default reducer;