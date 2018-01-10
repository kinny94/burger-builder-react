import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route, Redirect } from 'react-router-dom';
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

        let summary = <Redirect to="/" /> 

        if( this.props.ings ){
            summary = (
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

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingridients
    }
}

export default connect( mapStateToProps )( Checkout );