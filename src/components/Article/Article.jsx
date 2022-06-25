import React from "react";
import "./Article.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function Article({title,volanta,autor,arte,imagenprincipal,maincategory,id,article}) {

    return (
        <div className="cardArticulo animate__animated animate__fadeIn">
            <Link to={`/article/${id}`}>
            <div className="cardImage" style={{ backgroundImage: 'url(' + imagenprincipal + ')'}}>
                <h2><Link to={`/category/${maincategory}`}>{maincategory}</Link></h2>
            </div>
            </Link>

            <div className="cardText">
                <p>{volanta.toUpperCase()}</p>
                <h1><Link to={`/article/${id}`}>{title}</Link></h1>
            </div>
            <hr />
        </div>
    )
};

export default Article;

