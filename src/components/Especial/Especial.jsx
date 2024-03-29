import React, { useState }  from 'react';
import './Especial.css';
import EspecialArticle from '../EspecialArticle/EspecialArticle';
import Carrusel from '../CarruselEspecial/Carrusel'
import { useEffect } from 'react';

function Especial ({articulos, loading, special}){

    const width = window.innerWidth;
    console.log(width)

    articulos = articulos.filter(articulos => articulos.carrousel === false );
    articulos = articulos.filter(articulos => articulos.categories.includes(special.hashtag));
    console.log(articulos.length)

    const [loopNum, setloopNum] = useState(articulos.length)

    useEffect(() => {
      if (width < 800){
        setloopNum(2)
      } else {setloopNum(articulos.length)}
    }, [articulos.length])
    
    

    const loadMore = ()=> {
    if (loopNum < articulos.length) {setloopNum(loopNum+2)}
    };



  return (
    
    <div className='contenedor'>
        {!loading &&
        <section className='seccionEspecial' style={{backgroundColor: special.color}}>
            <h1>{special.titulo}</h1>
            <h3>{special.bajada}</h3>

           {/* <Carrusel articulos={articulos} />*/}

            <div className="esp-grilla-art-esp">  
                {
                	articulos.slice(0, loopNum).map(article => {return <EspecialArticle
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
                                                    special={special}
                                                />
                                        })
                    }
            </div>
            <div className={(loopNum<articulos.length) ? "more-esp" : "hidden" } onClick={()=>loadMore()}><p>Más especial...</p></div>

        </section>
        }
    </div>
   
  )
}

export default Especial