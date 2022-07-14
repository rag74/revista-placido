import React, { useEffect, useState } from 'react';
import './Paneluser.css';
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';
import Switchcarrousel from '../Switchcarrousel/Switchcarrousel';
import { useUserAuth } from '../../Context/UserAuthContext';
import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';
import { getDefaultNormalizer } from '@testing-library/react';

function Paneluser({articulos, loading}) {

  console.log("PANEL ADMIN");
  const history = useHistory();

  const {admin , eliminarArticulo, revisarArticulo} = useUserAuth();
  console.log("admin?: "+admin);

    ///VARIABLES MODAL//
    const [modaltitle, setModaltitle] = useState('');
    const [modalmessage, setModalmessage] = useState('');
    const [buttonmessage, setbuttonmessage] = useState('');
    const [linkmodal, setLinkmodal] = useState('');
    const [closemodal, setClosemodal] = useState('');

  console.log(articulos);
  const localuser = JSON.parse(localStorage.getItem('localuser'))
  const localeID = localuser.uid;
  console.log(localeID);

  const pendientes = articulos.filter(articulos => articulos.estado == "borrador" || articulos.estado == "pendiente");
  console.log("Pendientes: ");
  console.log(pendientes);

  const publicados = articulos.filter(articulos => articulos.estado === "publicado");
  console.log("Publicados: ");
  console.log(publicados);

                

  const eliminados = articulos.filter(articulos => articulos.estado === "eliminado");
  console.log("Eliminados: ");
  console.log(eliminados);

  const handleRevisar = (articleID) => {  
    setModaltitle("Artículo en revisión!");
    setModalmessage("El articulo fue enviado al administrador. Luego de ser revisado quedará pubicado en la revista");
    setbuttonmessage("OK");
    setLinkmodal('');
    setClosemodal('');
    revisarArticulo(articleID);
   }

  const handleEliminar = (articleID) => {
    console.log("Eliminar: "+articleID);
    setModaltitle("Articulo eliminado");
    setModalmessage("El articulo ha sido eliminado de forma correcta. Si se trató de un error, ponete en contacto con el administrador.");
    setbuttonmessage("Cerrar");
    setLinkmodal('');
    setClosemodal(';');
    eliminarArticulo(articleID);
}

  const handleVer = () => {   let element = document.getElementById("miModal");
              element.classList.remove("ver");
            }

  const tablaPendientes = pendientes.map(item => (
    <div key={item.articleID}>
      <div className='artRow'>
        <span className='titulo'>{item.title}</span>
        <span className='auto'>{item.autor}</span>
        <span className='editor1'>{item.editormail}</span>
        <span className='fecha'>{(item.creado).toDate().toLocaleDateString()}</span>
        <span className='estado'>{item.estado}</span>
        <span className='revisar'>
        <Link to={`/editar/${item.articleID}`}><button className='buttonRow'>editar</button></Link>
      {item.estado === "borrador" && 
          <button className='buttonRow' onClick={()=>handleRevisar(item.articleID)} >pedir publicación</button>
        }
          <button className='buttonRow' onClick={()=>handleEliminar(item.articleID)} >eliminar</button>
        </span>
      </div>
      <hr />
    </div>
  ));

  const tablaPublicados = publicados.map(item => (
    <div key={item.articleID}>
      <div className='artRow'>
        <span className='titulo'>{item.title}</span>
        <span className='auto'>{item.autor}</span>
        <span className='editor1'>{item.editormail}</span>
        <span className='fecha'>{(item.fecha).toDate().toLocaleDateString()}</span>
        <span className='estado'>{item.estado}</span>
        <span className='revisar'>
        <Link to={`/article/${item.articleID}`}><button className='buttonRow'>ver pubicación</button></Link>

        
        </span>
      </div>
      <hr />
    </div>
  ));




  return (
    <>
     
      <div className='panelContainer'>

        <h1>Panel usuario</h1>

        <div className="panel">
          <div className="panel-header">
            <Link to="/crear"><div className='buttonNew'>Crear entrada</div></Link>

         </div>

         {pendientes && 
              <div className="panel-tabla">
                  <h3>Mis borradores y pendientes de revisión</h3>
                    <div className="headRow">
                      <span className='titulo'>Título</span>
                      <span className='auto'>Autor</span>
                      <span className='editor1'>Editor</span>
                      <span className='fecha'>Fecha</span>
                      <span className='estado'>Estado</span>
                      <span className='accion'></span>
                    </div>
                    {loading ? <div className='loader'> <PulseLoader size={10} /></div> : tablaPendientes }
                  </div>
          }



        {publicados && 
              <div className="panel-tabla">
                  <h3>Articulos publicados</h3>
                    <div className="headRow">
                      <span className='titulo'>Título</span>
                      <span className='auto'>Autor</span>
                      <span className='editor1'>Editor</span>
                      <span className='fecha'>Fecha</span>
                      <span className='estado'>Estado</span>
                      <span className='accion'></span>
                    </div>
                    {loading ? <div className='loader'> <PulseLoader size={10} /></div> : tablaPublicados }
                  </div>
          }

        </div>

        <div id="miModal" class="modal" onClick={handleVer}>
        <div class="modal-contenido">
                    <div className="cabeceraModal">
                        <h2>{modaltitle}</h2>
                        <a href={closemodal}><i className="fas fa-times close" id="closeModal" onClick={handleVer}></i></a>
                        {/*<Link to={`${closemodal}`}><i className="fas fa-times close" id="closeModal" onClick={handleVer}></i></Link>*/}
                    </div>
                    <hr className="divisorModal" />
                    <div className="mensajeModal">
                        <p>{modalmessage}</p>
                    </div>
                    <a href={linkmodal}><div className='buttonModal' id='buttonModal'>{buttonmessage}</div></a>
                    {/*<Link to={`${linkmodal}`}><div className='buttonModal' id='buttonModal'>{buttonmessage}</div></Link>*/}
                </div>  
            </div>
      </div>
    
    </>
  )
}

export default Paneluser