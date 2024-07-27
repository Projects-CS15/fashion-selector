import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import LoginStatus from './Auth/LoginStatus';
import ImageSearch from './components/StyleImageSearchPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
<<<<<<< HEAD
import AboutPage from './components/About';
=======
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import MyAccount from './Pages/MyAccount';
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca

const Routes = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <LoginStatus />
      <Switch>
<<<<<<< HEAD
        <Route exact path="/about" component={AboutPage} />
=======
        <Route exact path="/" component={HomePage} />
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={ImageSearch} />
        <Route path="/about" component={About} />
        <Route path="/myAccount" component={MyAccount} />
      </Switch>
    </Router>
  );
};

export default Routes;
