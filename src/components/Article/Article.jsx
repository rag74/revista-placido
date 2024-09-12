import React, { useEffect, useState } from "react";
import "./Article.css";
import { Link } from "react-router-dom";
import {useUserAuth} from '../../Context/UserAuthContext';


function Article({title,volanta,autor,arte,imagenprincipal640,maincategory,id,article,categoria}) {
    
    const [colorCAT, setColorCat] = useState('#29d579')
    const {colorCategoria} = useUserAuth();


  ////SETEAR COLOR CATEGORIA////
  useEffect(() => {
    if (categoria != null) {
    setColorCat(colorCategoria(categoria))
    } else {
      setColorCat(colorCategoria(maincategory))
      }

  } , [categoria,maincategory])

    

    return (
        <div className="cardArticulo animate__animated animate__fadeIn">
            <Link to={`/article/${id}`}>
            <div className="cardImage" style={{ backgroundImage: 'url(' + imagenprincipal640 + ')'}}>
                <h2 style={{ backgroundColor: colorCAT }}> 
                      {categoria !=null ?
                        <Link to={`/category/${categoria}`}>{categoria}</Link>
                        :
                        <Link to={`/category/${maincategory}`}>{maincategory}</Link>
                      } 
                </h2>
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

