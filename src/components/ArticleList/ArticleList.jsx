import React, { useState } from "react";
import './ArticleList.css';
import { Link } from 'react-router-dom';
import Article from '../Article/Article'

import { useParams } from "react-router-dom";
import { useUserAuth } from '../../Context/UserAuthContext';
 

function ArticleList ({articulos, loading,special}) {

const {categoria} = useParams();
const {specialExist} = useUserAuth();
console.log("existe especial en listado?")
console.log(specialExist)

if(categoria == null) {
    articulos = articulos.filter(articulos => articulos.carrousel === false );
    //COMENTAR CONDICION ESPECIAL
    if (specialExist){
    articulos = articulos.filter(articulos => !articulos.categories.includes(special.hashtag));
    }
}



const [loopNum, setloopNum] = useState(6)

const loadMore = ()=> {
    if (loopNum < articulos.length) {setloopNum(loopNum+6)}
};


    return(
        
        <div className="contenedor">
        {loading ?
            <div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
             : 
            articulos.length < 1 ? 
                    <div className="catNotFound">
                        <div>Mmmm... no tenemos ese tipo de articulos...🤔</div>
                        <Link className="backHome" to="/"> 
                            <i id="homeicon" className="fas fa-home"></i>
                        </Link>
                        </div> :
            <div>
                <div className="grilla-art">  
                {
               
               articulos.slice(0, loopNum).map(article => {return <Article
                                                    key={article.title} 
                                                    title={article.title} 
                                                    volanta={article.volanta}
                                                    autor={article.autor}
                                                    arte={article.arte}
                                                    imagenprincipal={article.imagenprincipal}
                                                    imagenprincipal640={article.imagenprincipal640}
                                                    article={article}
                                                    maincategory={article.maincategory}
                                                    id={article.articleID}
                                                />
                                        })
                    }
                </div>
                <div className={(loopNum<articulos.length) ? "more" : "hidden" } onClick={()=>loadMore()}><p>cargar más...</p></div>
            </div>
        }
        </div>
    )
    }

export default ArticleList