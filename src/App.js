import React from 'react';
import './App.css';
import './config'
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import ArticleListContainer from './components/ArticleListContainer/ArticleListContainer';

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
