import React from "react";
import "./Article.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function Article({title,volanta,autor,arte,foto,maincategory,article}) {

    return (
        <div className="cardArticulo">
            <Link to={`/article/${title}`}>
            <div className="cardImage" style={{ backgroundImage: 'url(' + foto + ')'}}>
                <h2><Link to={`/category/${maincategory}`}>{maincategory}</Link></h2>
            </div>
            </Link>

            <div className="cardText">
                <p>{volanta.toUpperCase()}</p>
                <h1><Link to={`/article/${title}`}>{title}</Link></h1>
            </div>
            <hr />
        </div>
    )
};

export default Article;

