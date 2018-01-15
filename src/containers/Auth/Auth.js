import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';     

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '**********'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },

        isSignUp: true
    }

    componentDidMount(){
        if( !this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[ controlName ],
                value: event.target.value,
                valid: this.checkValidation( event.target.value, this.state.controls[ controlName ].validation ),
                touched: true
            }
        }

        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp );
    }

    switchAuthMethodHandler = () => {
        this.setState( prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    render(){

        const formElementArray = [];

        for( let key in this.state.controls ){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
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
        ));

        if( this.props.loading ){
            form = <Spinner />
        }

        let errorMessage = null;

        if( this.props.error ){
            errorMessage = (
                <p>{ this.props.error.message }</p>
            )
        }

        let authRedirect = null;
        if( this.props.isAuthenticated ){
            authRedirect = <Redirect to={ this.props.authRedirectPath } />
        }

        return(
            <div className={ classes.Auth } >
                { authRedirect }
                { errorMessage }
                <form onSubmit={ this.submitHandler }>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={ this.switchAuthMethodHandler }>
                    SWITCH TO { this.state.isSignUp ? 'SIGNIN' : 'SIGNUP' }
                </Button>
               
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignUp ) => dispatch( actions.auth( email, password, isSignUp )),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath('/'))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );