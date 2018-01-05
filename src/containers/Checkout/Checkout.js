import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 

class Checkout extends Component{

    state = {
        ingridients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
     
    render(){
        return (
            <CheckoutSummary 
                ingridients={ this.state.ingridients }
                checkoutCancelled={ this.checkoutCancelledHandler }
                checkoutContinued={ this.checkoutContinuedHandler }
            />
        );
    }
}

export default Checkout;