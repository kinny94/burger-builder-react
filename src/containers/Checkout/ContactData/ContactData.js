import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault(); 

        this.setState({
            loading: true
        });

        const order = {
            ingridients: this.props.ingridients,
            price: this.props.price,
            customer: {
                name: 'Arjun Dass',
                address: {
                    street: '208 South Street',
                    zipCode: '07307',
                    country: 'United States'
                },
                email: 'ad.sam007@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order).then((response) => {
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        }).catch((err) => {
            this.setState({
                loading: false
            });
            console.log(err);
        });

    }

    render(){

        let form = (
            <form>  
                <input className={ classes.Input } type="text" name="name" placeholder="Your name" />
                <input className={ classes.Input } type="email" name="email" placeholder="Your Email" />
                <input className={ classes.Input } type="text" name="street" placeholder="Street" />
                <input className={ classes.Input } type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={ this.orderHandler } >ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return(
            <div className={ classes.ContactData }>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;