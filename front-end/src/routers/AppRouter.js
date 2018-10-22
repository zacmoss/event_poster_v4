import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import CreateEventPage from '../components/CreateEventPage';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import Footer from '../components/Footer';


const AppRouter = () => ( // Client-Side Routing
    <BrowserRouter>
        <div>
            <Header />
            <hr />
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/login" component={LoginPage} />
                <Route path="/createEvent" component={CreateEventPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
);

export default AppRouter;