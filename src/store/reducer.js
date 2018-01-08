import * as actionTypes from './actions';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

const initialState = {
    ingridients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
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

        default: 
            return state; 
    }
};  

export default reducer;