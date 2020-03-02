import { Route, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import React from "react"

const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return(
        <Route
            path={path}
            exact={exact}
            render={props =>
                !loggedIn ? <Component {...props} /> : (history.back())
            }
        />
    );
}

const mapStateToProps = state => {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(
    connect(
        mapStateToProps,
        null
    )(Auth)
);