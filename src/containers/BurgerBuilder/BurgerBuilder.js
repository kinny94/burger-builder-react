import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component{

    constructor( props ){
        super( props );
        this.state = {
            purchasing: false
        };
    }

    componentDidMount(){
        this.props.onInitIngridients();
    }

    updatePurchaseState(ingridients){

        const sum = Object.keys(ingridients).map(igKey => {
            return ingridients[igKey];
        }).reduce((sum, el) => {
            return sum + el;    
        }, 0);
        
        return sum > 0
        
    }
      
    purchaseHandler = () => {
        if( this.props.isAuthenticated ){
            this.setState({
                purchasing: true
            });
        }else{
            this.props.AuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:  false
        });
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');        
    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingridients can't be loaded!</p> : <Spinner />;

        if( this.props.ings ){
            burger = (
                <Aux>
                    <Burger ingridients={ this.props.ings }/>
                    <BuildControls 
                        ingridientsAdded={ this.props.onIngridientAdded }
                        ingridientsRemoved={ this.props.onIngridientRemoved }
                        disabled={ disabledInfo }
                        price={ this.props.price }
                        purchasable={ this.updatePurchaseState( this.props.ings ) }
                        ordered={ this.purchaseHandler }
                        isAuth={ this.props.isAuthenticated }
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingridients={ this.props.ings }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinued={ this.purchaseContinueHandler }
                price={ this.props.price }
            />;
        }

        // { salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal 
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }
                    > 
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {

    return {
        
        onIngridientAdded: ( ingName ) => dispatch( burgerBuilderActions.addIngridient( ingName ) ), 
        onIngridientRemoved: ( ingName ) => dispatch( burgerBuilderActions.removeIngridient( ingName ) ),
        onInitIngridients: () => dispatch( burgerBuilderActions.initIngridients() ),
        onInitPurchase: () => dispatch( burgerBuilderActions.purchaseInit() ),
        AuthRedirectPath: ( path  ) => dispatch( burgerBuilderActions.setAuthRedirectPath( path ))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(BurgerBuilder, axios ));