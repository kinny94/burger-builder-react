import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const addIngridient = ( state, action ) => {
    const updatedIngridient = { [ action.ingridientName ]: state.ingridients[ action.ingridientName ] + 1 }
    const updatedIngridients = updateObject( state.ingridients, updatedIngridient );
    const updatedState = {
        ingridients: updatedIngridients,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[ action.ingridientName ],
        building: true
    }
    return updateObject( state, updatedState );
}

const removeIngridient = ( state, action ) => {
    const updatedIng = { [ action.ingridientName ]: state.ingridients[ action.ingridientName ] - 1 }
    const updatedIngs = updateObject( state.ingridients, updatedIng );
    const updatedSt = {
        ingridients: updatedIngs,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[ action.ingridientName ],
        building: true 
    }
    return updateObject( state, updatedSt );
}

const setIngridients = ( state, action ) => {
    return updateObject( state, {
        ...state,
        ingridients: {
            salad: action.ingridients.salad,
            bacon: action.ingridients.bacon,
            cheese: action.ingridients.cheese,
            meat: action.ingridients.meat
        },
        error: false,
        totalPrice: 4,
        building: false
    });
}

const fetchIngridients = ( state, action ) => {
    return updateObject( state, {
        error: true
    } );
}

const reducer = ( state = initialState, action) => {
    switch( action.type ){
        
        case actionTypes.ADD_INGRIDIENT: return addIngridient( state, action );
        case actionTypes.REMOVE_INGRIDIENT: return removeIngridient ( state, action );
        case actionTypes.SET_INGRIDIENTS: return setIngridients( state, action );   
        case actionTypes.FETCH_INGRIDIENTS_FAILED:  return fetchIngridients( state, action );     

        default: return state; 
    }
};  

export default reducer;