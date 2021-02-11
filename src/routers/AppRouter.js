import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import JournalScreen from '../components/journal/JournalScreen';

import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {

            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));

                setIsLogged(true);

                dispatch(startLoadingNotes(user.uid));

            } else {

                setIsLogged(false);

            }

            setChecking(false);
        })

    }, [dispatch, setChecking, setIsLogged]);

    if (checking) return <h1>Wait...</h1>;

    return (
        <Router>
            <>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLogged}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLogged}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </>
        </Router>
    )
}
