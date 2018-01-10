import * as actionTypes from './actionTypes';

export const addIngridient = ( name ) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name
    };
}

export const removeIngridient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name
    };
}   