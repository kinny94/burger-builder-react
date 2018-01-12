import * as actionTypes from './actionTypes';
import axios from 'axios'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailure = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout(() => {
            dispatch( logout() ); 
        }, expirationTime * 1000 );
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = ( email, password, isSignup ) => {
    return dispatch => {
        
        dispatch( authStart() );

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBdXr67ZNj8pTcwuxcgEhGixEtjk3MZTkc';

        if( !isSignup ){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBdXr67ZNj8pTcwuxcgEhGixEtjk3MZTkc';
        }
        
        axios.post( url, authData)
        .then( response => {
            console.log( response );
            dispatch( authSuccess( response.data.idToken, response.data.localId ) );
            dispatch( checkAuthTimeout( response.data.expiresIn ) );
        })
        .catch(err => {
            dispatch( authFailure( err.response.data.error ) );
        });
    };
};

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path    
    }
}