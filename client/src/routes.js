import React from 'react';
import {Switch,Route, BrowserRouter, Redirect } from 'react-router-dom';
import MainLayout from './hoc/mainLayout';
import Login from './pages/login'
import Signup from './pages/signup';
import Home from './pages/home'
import Dashboard from './pages/dashboard';
import Auth from './hoc/auth'
import StripeSuccess from './pages/stripe-success';
import StripeCancel from './pages/stripe-cancel'
import Account from './pages/account'

const Routes = (props) =>{

    return(
        <BrowserRouter>
            <MainLayout>
                <Switch>
                    <Route exact path="/stripe/success" component={Auth(StripeSuccess, true)} />
                    <Route exact path="/stripe/cancel" component={Auth(StripeCancel, true)} />
                    <Route path='/account' component={Auth(Account, true)}/>
                    <Route path='/dashboard' component={Auth(Dashboard, true)}/>
                    <Route path='/login' component={Auth(Login, false)}/>
                    <Route path='/signup' component={Auth(Signup, false)}/>
                    <Route path='/' component={Auth(Home, false)}/>     
                </Switch>
            </MainLayout>
        </BrowserRouter>
    )
}


export default Routes;