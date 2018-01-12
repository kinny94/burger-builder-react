import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders( this.props.token );
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
        }else{
            <Modal />
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
        loading: state.order.loading,
        token: state.auth.token
    };
}

const mapsDispatchToProps = ( dispatch ) => {
    return{
        onFetchOrders: ( token) => dispatch( actions.fetchOrders( token ) )
    }
}
export default connect( mapStateToProps, mapsDispatchToProps )( withErrorHandler( Orders, axios ) ) ;