import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            component={props => (
                (isAuthenticated)
                    ? <Redirect to="/" />
                    : <Component {...props} />
            )}
        />
    );
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

export default PublicRoute;