import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import LoginStatus from './Auth/LoginStatus';
import ImageSearch from './components/StyleImageSearchPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import MyAccount from './Pages/MyAccount';
import ForYouFeed from './Pages/ForYouFeed';
import PromptTester from './components/PromptTester';

const Routes = () => {
  return (
    <Router>
      <ResponsiveAppBar />
    <div className="main-content">
      <LoginStatus />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={ImageSearch} />
        <Route path="/about" component={About} />
        <Route path="/myAccount" component={MyAccount} />
        <Route path="/feed" component={ForYouFeed} />
        <Route path="/prompt-tester" component={PromptTester} />
        </Switch>
              </div>
    </Router>
  );
};

export default Routes;
