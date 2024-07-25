import React from 'react'; // import react
import ReactDOM from 'react-dom'; // import react-dom
import Routes from './Routes'; // import routes
import './index.css'; // import css file
import { AuthProvider } from './Auth/AuthContext'; // import auth provider

ReactDOM.render(
  <AuthProvider> {/* wrap routes with auth provider */}
    <Routes />
  </AuthProvider>,
  document.getElementById('root') // render app to root element
);
