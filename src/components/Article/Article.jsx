import React from "react";
import "./Article.css";
import { Link } from "react-router-dom";


function Article({title,volanta,autor,arte,imagenprincipal640,maincategory,id,article}) {
    

    return (
        <div className="cardArticulo animate__animated animate__fadeIn">
            <Link to={`/article/${id}`}>
            <div className="cardImage" style={{ backgroundImage: 'url(' + imagenprincipal640 + ')'}}>
                <h2><Link to={`/category/${maincategory}`}>{maincategory}</Link></h2>
            </div>
            </Link>

            <div className="cardText">
                <p>{volanta.toUpperCase()}</p>
                <h1><Link to={`/article/${id}`}>{title}</Link></h1>
                <p>Por {autor}</p>
            </div>
            <hr />
        </div>
    )
};

export default Article;

