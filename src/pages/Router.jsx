import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";


import Navbar from "../components/Navbar/Navbar.jsx";
import ArticleListContainer from "../components/ArticleListContainer/ArticleListContainer.jsx";

//import Contacto from '../components/Contacto/Contacto.jsx'
//import Footer from '../components/Footer/Footer.jsx';
//import NotFound from './errors/NotFound.jsx'
  
  function Router() {

    return(


      <BrowserRouter>


        <Navbar/>

       
        <Switch>
            <Route path='/' exact>
              <ArticleListContainer />
            </Route>

            <Route path='/category/:categoria' exact> 
              <ArticleListContainer />
            </Route>

          {/*
            <Route path='/item/:id' exact>
              <ArticleDetailContainer />
            </Route>

            <Route path='/contacto' exact>
              <Contacto />
            </Route>

            <Route component={NotFound} />
            */}

            </Switch>
           
         {/*<Footer />*/}

     
      </BrowserRouter>

    )

  } 

  export default Router