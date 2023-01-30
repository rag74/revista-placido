import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './App.css';
import './config';
import Router from './pages/Router.jsx'
import { UserAuthContextProvider } from './Context/UserAuthContext';



function App() {


  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <App></App>
        </Router>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
