import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingridients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};

        for(let param of query.entries()){
            ingridients[param[0]] = +param[1]; // converting into a number by adding +
        }

        this.setState({
            ingridients: ingridients
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
     
    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingridients={ this.state.ingridients }
                    checkoutCancelled={ this.checkoutCancelledHandler }
                    checkoutContinued={ this.checkoutContinuedHandler }
                />
                <Route path={this.props.match.path + '/contact-data' } component={ ContactData }/>
            </div>
        );
    }
}

export default Checkout;