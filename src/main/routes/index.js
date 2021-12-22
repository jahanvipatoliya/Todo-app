import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const ToDoListFunCompo = lazy(() => import('../../components/ToDoListFunCompo'));
const Login = lazy(() => import('../../components/auth/login'));
const NotFound = lazy(() => import('../../components/NotFound'));

const Routes = () => {
    function AuthenticatedRoute({ component: Component, ...rest }) {
        var checkForUserLogin = sessionStorage.getItem('isLogin')
        return (
            <Route
                {...rest}
                render={props => (Boolean(checkForUserLogin) ? <Component {...props} {...rest} /> : <Redirect to="/login" />)}
            />
        );
    }
    return (
        <>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <AuthenticatedRoute exact path="/todo-list" component={ToDoListFunCompo} />
                <Route component={NotFound} />
            </Switch>

        </>);
};

export default Routes;
