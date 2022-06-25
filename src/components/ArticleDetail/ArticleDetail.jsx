import React from "react";
import ".//ArticleDetail.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function ArticleDetail({articulo}) {

    console.log(articulo);

    const linksCat = articulo.categories.map((cat)=>(
        <div key={cat} className="catLink">
        <Link to={`/category/${cat}`}>#{cat}</Link>
        </div>
            ))

    const fechahumana = (articulo.fecha).toDate();

    console.log((fechahumana).toString())


    return(
       <section> 
            <div className="cabeceraArticulo">
                <p className="mainCategory"><Link to={`/category/${articulo.maincategory}`}>{articulo.maincategory}</Link></p>
                <p className="volanta">{articulo.volanta}</p>
                <hr className="divisor" />
                <h1 className="title">{articulo.title}</h1>
                <p className="bajada">{articulo.bajada}</p>

                <div className="autores">
                    {/*<span className="por">Por: </span><span className="autor">{articulo.autor}</span>
                    {articulo.arte.length > 0 ? <><span className="por">| Arte: </span><span className="autor">{articulo.arte}</span></> : null}*/}
                
                <h4 className="por">Por: <span className="autor">{articulo.autor}</span></h4>
                    {articulo.arte.length > 0 ? <h4 className="por">| Arte: <span className="autor">{articulo.arte}</span></h4> : null}
                </div>
            </div>

            <div className="imagenArticulo">
                <img src={articulo.imagenprincipal} alt=""/>
            </div>

            <div className="textoArticulo" dangerouslySetInnerHTML={{ __html: articulo.innerHtml }}/>
            
            <div className="finalArt">
            <p className="fechaArt">{(fechahumana).toLocaleDateString()}</p>
            <hr className="cierre" />
            <div className="catcontainer">{linksCat}</div>
            </div>
            
        </section>
    );
}

export default ArticleDetail