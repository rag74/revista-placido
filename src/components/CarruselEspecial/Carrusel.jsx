import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carousel";
import "./Carrusel.css"

import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';


export default function Carrusel({articulos , loading}) {

console.log(articulos)

  const slides = articulos.filter(articulos => articulos.categories.includes('especialmalvinas'));
  console.log("Slides: ");
  console.log(slides);



function Slide({title,volanta,autor,arte,imagenprincipal,maincategory,articleID,article}) {
  return(
        <CarouselItem>
          <div className="esp-cardArticulo animate__animated animate__fadeIn">
            <Link to={`/article/${articleID}`}>
            <div className="esp-cardImage" style={{ backgroundImage: 'url(' + imagenprincipal + ')'}}>
                <div className="esp-cardText">
                    <p>{volanta.toUpperCase()}</p>
                    <h1><Link to={`/article/${articleID}`}>{title}</Link></h1>
                    <p>Por {autor}</p>
                </div>
            </div>
            </Link>
        </div>
        </CarouselItem>
  )};


  return (
    
    <>
    {!loading &&
              <Carousel>
              {
                slides.map(article => {return <Slide
                  key={article.title} 
                  title={article.title} 
                  volanta={article.volanta}
                  autor={article.autor}
                  arte={article.arte}
                  imagenprincipal={article.imagenprincipal}
                  article={article}
                  maincategory={article.maincategory}
                  articleID={article.articleID}
                  />
              })
            }
            </Carousel>  
    }
    </>
  
  );
}