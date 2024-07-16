// App.jsx
// Routes to render components

import React from 'react'; // import React from 'react to use JSX
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import react router

import Nav from './Nav';
import Search from './Search'; // import Search component
import ShowImages from './ShowImages'; // import ShowImages component
import Login from './Login'; // import Login component
import InputForm from './InputForm';

console.log('App.jsx is running');

function App( { setTheme } ) { // App component with setTheme prop to set the theme of the app to light or dark theme based on the user's preference or the default theme set in the themes.js file in the themes folder of the client/src directory
  return (
    <Router>
      {/* <h1>App.jsx is running</h1> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Search setTheme={setTheme} />} /> // Route to the Search component with the setTheme prop to set the theme of the app to light or dark theme based on the user's preference or the default theme set in the themes.js file in the themes folder of the client/src directory when the user is on the home page
        {/* <Route path="/images" element={<ShowImages />} /> */}
        {/* <Route path="/store" element={<StoreListings />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );// we passed the setTheme prop to the Search component so that the theme of the app can be set based on user input, Dalle3 api response, bing api response, another
}

export default App; // export App component to be used in index.js
