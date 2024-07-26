import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import LoginStatus from './Auth/LoginStatus';
import ImageSearch from './components/ImageSearch';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HomePage from './Pages/HomePage'
const Routes = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <LoginStatus />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={HomePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={ImageSearch} />
      </Switch>
    </Router>
  );
};

export default Routes;
