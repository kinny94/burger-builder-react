import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'; 
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest ',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();     

        const formData = {};
        for( let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        } 

        const order = {
            ingridients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId 
        }

        this.props.onOrderBurger( order, this.props.token );
        
    }

    checkValidation( value, rules ){
        
        let isValid = true;
        if( !rules ){
            return true;
        }
 
        if( rules.required ){
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if( rules.isNumeric ){
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid;
        }

        if( rules.isEmail ){
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test( value ) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) =>{
        //e.preventDefault();
        const updatedOrderForm = {
            ...this.state.orderForm,
        } 
 
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidation( updatedFormElement.value, updatedFormElement.validation );
        updatedFormElement.touched = true;    
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for( let inputIdentifier in updatedOrderForm ){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
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
            <form onSubmit={ this.orderHandler }>    
                { formElementArray.map(formElement => (
                    <Input 
                        key={ formElement.id }
                        elementType={ formElement.config.elementType }
                        elementConfig={ formElement.config.elementConfig }
                        value={ formElement.config.value }
                        invalid={ !formElement.config.valid }
                        shouldValidate={ formElement.config.validation }
                        touched={ formElement.config.touched }
                        changed={ ( event ) =>  this.inputChangedHandler( event, formElement.id ) }
                    />
                ))}
                <Button btnType="Success" disabled={ !this.state.formIsValid }>ORDER</Button>
            </form>
        );
        if(this.props.loading){
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {

    return {
        onOrderBurger: ( orderData, token ) => dispatch(actions.purchaseBurger(  orderData, token ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) );