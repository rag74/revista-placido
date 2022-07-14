import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carousel";
import "./Carrusel.css"

import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';


export default function Carrusel({articulos , loading}) {

console.log(articulos)

  const slides = articulos.filter(articulos => articulos.carrousel === true );
  console.log("Slides: ");
  console.log(slides);



function Slide({title,volanta,autor,arte,imagenprincipal,maincategory,articleID,article}) {
  return(
        <CarouselItem>
          <div className="carruSlide" style={{ backgroundImage: 'url('+imagenprincipal+')'}}>
            <div s-text>
            <div className='slideText'>
                <h3>{volanta}</h3>
                <Link to={`/article/${articleID}`}>
                  <h1>{title}</h1>
                </Link>
                <p>{autor}</p>
            </div>
            </div>
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