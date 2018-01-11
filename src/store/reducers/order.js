import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [], 
    loading: false,
    purchased: false
};

const purchaseStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
} 

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false });
}

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId });

    return updateObject( state, {
        loading: false,
        orders: state.orders.concat( newOrder ),
        purchased: true
    });
}

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
}

const purchaseOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: true } );
}

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, { orders: action.orders, loading: false } );
}

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ){

        case actionTypes.PURCHASE_BURGER_START: return purchaseStart( state, action );
        
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
            
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action );
            
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
        
        case actionTypes.FETCH_ORDERS_FAIL: return purchaseOrdersFail( state, action );

        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );             

        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
            
        default: return state;
    }
};

export default reducer;