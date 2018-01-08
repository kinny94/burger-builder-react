import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

class BurgerBuilder extends Component{

    constructor( props ){
        super( props );
        this.state = {
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount(){
        
        // axios.get('https://burger-builder-application.firebaseio.com/ingridients.json')
        // .then((response) => {
        //     this.setState({
        //         ingridients: response.data
        //     });
        // })
        // .catch((error) => {
        //     this.setState({
        //         error: true
        //     });
        // });
    }

    updatePurchaseState(ingridients){

        const sum = Object.keys(ingridients).map(igKey => {
            return ingridients[igKey];
        }).reduce((sum, el) => {
            return sum + el;    
        }, 0);
        
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngridientHandler = ( type ) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const upgratedIngridients = {
            ...this.state.ingridients
        }

        upgratedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingridients: upgratedIngridients    
        });

        this.updatePurchaseState(upgratedIngridients);
    }

    removeIngridientHandler = ( type ) => {
        const oldCount = this.state.ingridients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const upgratedIngridients = {
            ...this.state.ingridients
        } 

        upgratedIngridients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingridients: upgratedIngridients    
        });

        this.updatePurchaseState(upgratedIngridients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:  false
        });
    }

    purchaseContinueHandler = () => {
        //alert('You continue');

        const queryParams = [];

        for(let i in this.state.ingridients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        
    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingridients can't be loaded!</p> : <Spinner />;

        if( this.props.ings ){
            burger = (
                <Aux>
                    <Burger ingridients={ this.props.ings }/>
                    <BuildControls 
                        ingridientsAdded={ this.props.onIngridientAdded }
                        ingridientsRemoved={ this.props.onIngridientRemoved }
                        disabled={ disabledInfo }
                        price={ this.state.totalPrice }
                        purchasable={ this.state.purchasable }
                        ordered={ this.purchaseHandler }
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingridients={ this.props.ings }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinued={ this.purchaseContinueHandler }
                price={ this.state.totalPrice }
            />;
        }

        if( this.state.loading ){
            orderSummary = <Spinner />;
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
        ings: state.ingridients
    };
}

const mapDispatchToProps = dispatch => {

    return {
        
        onIngridientAdded: ( ingName ) => dispatch({
            type: actionTypes.ADD_INGRIDIENT,
            ingridientName: ingName
        }), 

        onIngridientRemoved: ( ingName ) => dispatch({
            type: actionTypes.REMOVE_INGRIDIENT,
            ingridientName: ingName
        })
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(BurgerBuilder, axios ));