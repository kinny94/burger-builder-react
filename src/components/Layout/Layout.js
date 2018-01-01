import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
    <Aux>
        <Toolbar />
        <main className={ classes.Content }>
            { props.children }
        </main>
    </Aux>
);

export default layout;