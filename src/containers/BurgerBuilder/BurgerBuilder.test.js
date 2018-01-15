import { BurgerBuilder } from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';

configure( { adapter: new Adapter() } );
describe( '<BurgerBuilder />', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallow(<BurgerBuilder onInitIngridients={ () => {} } />);
    }); 

    it( 'should render <BuildControls /> when receiving ingridients', () => {
        wrapper.setProps( {
            ings: {
                salad: 0
            }
        });

        expect( wrapper.find(BuildControls)).toHaveLength( 1 );
    });
});