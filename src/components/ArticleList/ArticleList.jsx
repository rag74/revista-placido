import React, { useState } from "react";
import './ArticleList.css';
import { Link } from 'react-router-dom';
import Article from '../Article/Article'



function ArticleList ({articulos, loading}) {



const [loopNum, setloopNum] = useState(3)

const loadMore = ()=> {
    if (loopNum < articulos.length) {setloopNum(loopNum+3)}
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
                                                    foto={article.foto}
                                                    article={article}
                                                    maincategory={article.maincategory}
                                                />
                                        })
                    }
                </div>
                <div className={(loopNum<articulos.length) ? "more" : "hidden" } onClick={()=>loadMore()}><p>cargar mas...</p></div>
            </div>
        }
        </div>
    )
    }

export default ArticleList