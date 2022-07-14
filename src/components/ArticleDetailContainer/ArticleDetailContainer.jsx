import React, { useEffect, useState } from "react";
import ".//ArticleDetailContainer.css";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../firebase'



function ArticleDetailContainer() {

  
  const {id} = useParams()

  const [articulo, setArticulo] = useState();
  const [loading, setLoading] = useState(true)
  console.log(id);

  useEffect(()=>{
      async function getArticulo() {
        const arr = []
        const q = query(collection(db, "articles"), where("articleID", "==", id))
        const querySnapshot = await getDocs(q);
      querySnapshot.forEach(item => {arr.push(item.data())})
      setArticulo(arr);
      setLoading(false);
      }

      getArticulo()

  },[]);

  console.log(articulo);

  return (
     <main>
         {loading ? 
            <div>
                    <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
                    <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div> 
            :  
            articulo.length < 1 ? 
            <div className="notFound"> Creo que no tengo ese artículo...😰             
                          <Link className="backHome" to="/"> 
                              <i id="homeicon" className="fas fa-home"></i>
                          </Link>
            </div>  
           :
            
            <ArticleDetail articulo={articulo[0]}/>     
            
          
        }
    </main>
  );
}

export default ArticleDetailContainer
