import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheap'}
                    ]
                },
                value: ''
            }
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
            price: this.props.price
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

        const formElementArray = [];

        for( let key in this.state.orderForm ){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>  
                { formElementArray.map(formElement => (
                    <Input 
                        key={ formElement.id }
                        elementType={ formElement.config.elementType }
                        elementConfig={ formElement.config.elementConfig }
                        value={ formElement.config.value }
                    />
                ))}
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