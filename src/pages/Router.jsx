import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";


import {UserAuthContextProvider} from "../Context/UserAuthContext";
import Navbar from "../components/Navbar/Navbar.jsx";
import ArticleListContainer from "../components/ArticleListContainer/ArticleListContainer.jsx";
import ArticleDetailContainer from "../components/ArticleDetailContainer/ArticleDetailContainer.jsx";
import Footer from '../components/Footer/Footer.jsx';
import ScrollToTop from "../components/ScrollToTop.jsx";
import Editnavbar from "../components/Editnavbar/Editnavbar.jsx";
import CreateArticle from "../components/CreateArticle/CreateArticle.jsx";
import Login from "../components/Login/Login.jsx";
import PanelContainer from "../components/PanelContainer/PanelContainer.jsx";
import { ProtectedRoute } from "../components/ProtectedRoute.js";



/// COMPONENTES DE EDITORES ///
import EditorWYSIWYG from "../components/Testing/EditorWYSIWYG";

import Tinymcenew from "../components/Testing/Tinymcenew";


/////////////

//import Contacto from '../components/Contacto/Contacto.jsx'

//import NotFound from './errors/NotFound.jsx'
  
  function Router() {

    return(

      
        <BrowserRouter>
        <ScrollToTop>
            

                <Route path='/' exact> 
                 <Navbar/>
                  <ArticleListContainer />
                  <Footer />
                </Route>

                <Route path='/category/:categoria' exact> 
                  <Navbar/>
                  <ArticleListContainer />
                  <Footer />
                </Route>

              
                <Route path='/article/:id' exact>
                 <Navbar/>
                  <ArticleDetailContainer />
                  <Footer />
                </Route>

              {/*
                <Route path='/contacto' exact>
                  <Contacto />
                </Route>

                <Route component={NotFound} />
                */}

          
            
              <Route path='/login' exact>
                <Editnavbar />
                <Login />
                <Footer />
              </Route>
              
              <Route path='/panel' exact>
                <Editnavbar />
                <ProtectedRoute>
                <PanelContainer />
                <Footer />
                </ProtectedRoute>
              </Route>

              <Route path='/crear' exact>
                <Editnavbar />
                <ProtectedRoute>
                <CreateArticle />
                <Footer />
                </ProtectedRoute>
              </Route>

              <Route path='/editar/:id' exact>
                <Editnavbar />
                <ProtectedRoute>
                <CreateArticle />
                <Footer />
                </ProtectedRoute>
              </Route>
 
              <Route path='/testing' exact>
                
              </Route>

        </ScrollToTop>
        </BrowserRouter>
      
    )

  } 

  export default Router
