import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingridients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        let price = 0;   

        for(let param of query.entries()){

            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingridients[param[0]] = +param[1]; // converting into a number by adding +
            }
        }

        this.setState({
            ingridients: ingridients,
            totalPrice: price
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
                <Route 
                    path={this.props.match.path + '/contact-data' } 
                    render={ (props) => (
                        <ContactData 
                            { ...props }
                            ingridients={ this.state.ingridients }
                            price={ this.state.totalPrice }  
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;