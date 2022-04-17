import React from 'react';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import ArticleListContainer from './components/ArticleListContainer/ArticleListContainer';

import Router from './pages/Router.jsx'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ArticleListContainer />
      </Router>
    </>
  );
}

export default App;
