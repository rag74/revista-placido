import React from "react";
import "./EspecialArticle.css";
import { Link } from "react-router-dom";


function EspecialArticle({title,volanta,autor,arte,imagenprincipal640,maincategory,id,article,special}) {
    

    return (
        <div className="esp-cardArticulo animate__animated animate__fadeIn">
            <Link to={`/article/${id}`}>
            <div className="esp-cardImage" style={{ backgroundImage: 'url(' + imagenprincipal640 + ')'}}>
                <div className="esp-cardText" style={{color: special.color}}>
                    <p>{volanta.toUpperCase()}</p>
                    <h1><Link to={`/article/${id}`}>{title}</Link></h1>
                    <p>Por {autor}</p>
                </div>
            </div>
            </Link>
        </div>
    )
};

export default EspecialArticle;

