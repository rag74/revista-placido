import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";


import Navbar from "../components/Navbar/Navbar.jsx";
import ArticleListContainer from "../components/ArticleListContainer/ArticleListContainer.jsx";
import ArticleDetailContainer from "../components/ArticleDetailContainer/ArticleDetailContainer.jsx";
import Footer from '../components/Footer/Footer.jsx';
import ScrollToTop from "../components/ScrollToTop.jsx";

//import Contacto from '../components/Contacto/Contacto.jsx'

//import NotFound from './errors/NotFound.jsx'
  
  function Router() {

    return(

      
        <BrowserRouter>
        <ScrollToTop>
            <Navbar/>

          
            <Switch>
                <Route path='/' exact>
                  <ArticleListContainer />
                </Route>

                <Route path='/category/:categoria' exact> 
                  <ArticleListContainer />
                </Route>

              
                <Route path='/article/:title' exact>
                  <ArticleDetailContainer />
                </Route>

              {/*
                <Route path='/contacto' exact>
                  <Contacto />
                </Route>

                <Route component={NotFound} />
                */}

                </Switch>
              
            <Footer />

        </ScrollToTop>
        </BrowserRouter>
      
    )

  } 

  export default Router