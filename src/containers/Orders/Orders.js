import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders();
    }

    render(){

        let orders = <Spinner />;
        if( !this.props.loading ){
            orders =    this.props.orders.map(order => (
                            <Order 
                                key={order.id}
                                ingridients={order.ingridients}
                                price={order.price}
                            /> 
                        ));
        }

        return(
            <div>
                { orders }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
}

const mapsDispatchToProps = ( dispatch ) => {
    return{
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    }
}
export default connect( mapStateToProps, mapsDispatchToProps )( Orders );