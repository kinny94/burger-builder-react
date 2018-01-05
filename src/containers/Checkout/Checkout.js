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

    render(){
        return (
            <CheckoutSummary ingridients={ this.state.ingridients }/>
        );
    }
}

export default Checkout;