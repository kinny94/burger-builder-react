import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component{

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
                    ingridients={ this.props.ings }
                    checkoutCancelled={ this.checkoutCancelledHandler }
                    checkoutContinued={ this.checkoutContinuedHandler }
                />
                <Route 
                    path={this.props.match.path + '/contact-data' } 
                    component={ ContactData }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingridients
    }
}

export default connect( mapStateToProps )( Checkout );