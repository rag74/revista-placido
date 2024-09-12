import React, { useEffect , useRef , useState} from "react";
import ".//ArticleDetail.css";
import Compartir from "../Compartir/Compartir";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useUserAuth} from '../../Context/UserAuthContext';


function ArticleDetail({articulo}) {

    console.log(articulo);

    /*const {colorCategoria} = useUserAuth();*/

    const componentRef = useRef();

    const [colorCAT, setColorCat] = useState('#29d579')

    const linksCat = articulo.categories.map((cat)=>(
        <div key={cat} className="catLink">
        <Link to={`/category/${cat}`}>#{cat}</Link>
        </div>
            ))

    const fechahumana = new Date();
    const miliseconds = new Date(articulo.fecha.seconds * 1000);
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
    var renderImage ="";

    if (window.innerWidth < 650) {
      renderImage = articulo.imagenprincipal640
      console.log(renderImage)
    } else {
      renderImage = articulo.imagenprincipal
      console.log(renderImage)
    }


    console.log((fechahumana).toString())

    
    useEffect(() => {
       let divarticulo = document.getElementById("textoArticulo")
       let parrafos = divarticulo.getElementsByTagName("p");
       let iframecontent = divarticulo.getElementsByTagName("iframe");

       console.log(parrafos)
       for (let i = 0; i < divarticulo.getElementsByTagName("span").length; i++){
       var span = divarticulo.getElementsByTagName("span")[0];
       var pa = span.parentNode;
       while (span.firstChild) pa.insertBefore(span.firstChild, span);
       pa.removeChild(span);
       i--;
        }
        
      for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].removeAttribute('style');
      }

      for (let i = 0; i < iframecontent.length; i++){
        iframecontent[i].classList.add("frames");
      }
      }, []);

/*
//COLOR ETIQUETA CATEGORIA//
useEffect(() => {

  setColorCat(colorCategoria(articulo.categories))

}, [articulo.maincategory])*/


    return(
      <>
       <section ref={componentRef}> 
            <div className="cabeceraArticulo">
                <p className="mainCategory" style={{ backgroundColor: colorCAT }}><Link to={`/category/${articulo.maincategory}`}>{articulo.maincategory}</Link></p>
                <p className="volanta">{articulo.volanta}</p>
                <hr className="divisor" />
                <h1 className="title">{articulo.title}</h1>
                <p className="bajada">{articulo.bajada}</p>

                <div className="autores">
                    <h4 className="por">Por: <span className="autor">{articulo.autor}</span></h4>
                    {articulo.arte.length > 0 ? <h4 className="por">| Arte: <span className="autor">{articulo.arte}</span></h4> : null}
                </div>
            </div>

            <div className="imagenArticulo">
                <img src={renderImage} alt=""/>
            </div>
            <Compartir articulo={articulo} componentRef={componentRef}/>
            <div className="textoArticulo" id="textoArticulo" dangerouslySetInnerHTML={{ __html: articulo.innerHtml }}/>
            
            <div className="finalArt">
            <p className="fechaArt">{!articulo.fecha ? fechahumana.toLocaleString('es-AR', dateOptions) 
                                : miliseconds.toLocaleString('es-AR', dateOptions)}</p>
            <hr className="cierre" />
            <div className="catcontainer">{linksCat}</div>
            </div>
        </section>
        </>
    );
}

export default ArticleDetail