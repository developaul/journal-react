import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { startLoading, finishLoading } from './ui';

import { types } from '../types/types';
import { noteslogout } from './notes';

export const startLoginEmailPassword = (email, password) => async dispatch => {

    try {

        dispatch(startLoading());

        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);

        dispatch(login(user.uid, user.displayName));

    } catch (err) {

        Swal.fire('Error', err.message, 'error');

    } finally {

        dispatch(finishLoading());

    }

}

export const startRegisterWithEmailPasswordName = (email, password, name) => async dispatch => {

    try {

        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));

    } catch (err) {

        Swal.fire('Error', err.message, 'error');

    }

}

export const startGoogleLogin = () => async dispatch => {

    try {

        const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);

        dispatch(login(user.uid, user.displayName));

    } catch (err) {

        Swal.fire('Error', err.message, 'error');

    }

}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: { uid, displayName }
});


export const startLogout = () => async dispatch => {

    try {

        await firebase.auth().signOut();

        dispatch(logout());

        dispatch(noteslogout());

    } catch (err) {

        console.error(err);

    }

}

export const logout = () => ({
    type: types.logout
});