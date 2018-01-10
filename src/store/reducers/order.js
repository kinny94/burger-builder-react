import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
 
export const purchaseBurgerSuccess = ( id ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type:  PURCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = ( orderData ) => {
    return dispatch => {
        axios.post( '/orders.json', orderData ).then((response) => {
           dispatch( purchaseBurgerSuccess( response.data, orderData ));
        }).catch((err) => {
            dispatch( purchaseBurgerFail( err ) );
        });
    };
};
