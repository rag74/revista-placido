import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carouseltest";
import "./Carrutest.css"

import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';


export default function Carrutest({articulos , loading}) {

console.log(articulos)

  const slides = articulos.filter(articulos => articulos.carrousel === true );
  console.log("Slides: ");
  console.log(slides);



function Slide({title,volanta,autor,arte,imagenprincipal,maincategory,articleID,article}) {
  return(
    <CarouselItem>
      <div className="carruSlidei" style={{ backgroundImage: 'url('+imagenprincipal+')'}}>
        <div s-text>
        <div className='slideTexti'>
            <h3>{volanta}</h3>
            <h1><a href={`/article/${articleID}`}>{title}</a></h1>
            <p>{autor}</p>
        </div>
        </div>
      </div>
    </CarouselItem>
  )};


  return (
  <>    
    <div className="App">
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
    </div>

  </>
  );
}