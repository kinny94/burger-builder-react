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

class BurgerBuilder extends Component{

    constructor( props ){
        super( props );
        this.state = {
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

        // var config = {
        //     headers: {'authorization': 'Bearer DEMO_TOKEN'}
        // };

        // axios.get('https://api.clever.com/v1.1/sections/', config)
        // .then(function(response){
        //     const allData = response.data.data;
        //     console.log(allData); // ex.: { user: 'Your User'}
            
        //     const allSections = allData.length;

        //     let totalNumberOfStudents = 0;
        
        //     for( let i=0; i<allData.length; i++ ){
        //         totalNumberOfStudents += allData[i]['data']['students'].length;
        //     }

        //     console.log(totalNumberOfStudents / allSections);
        // });  
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
        let burger = this.state.error ? <p>Ingridients can't be loaded!</p> : <Spinner />;

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
        ings: state.ingridients,
        price: state.totalPrice
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