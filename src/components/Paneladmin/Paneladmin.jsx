import React, { useEffect, useState } from 'react';
import './Paneladmin.css';
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from 'react-router-dom'; 
import Switchcarrousel from '../Switchcarrousel/Switchcarrousel';
import { useUserAuth } from '../../Context/UserAuthContext';
import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';
import Updating from '../Updating/Updating';
import CreateUser from '../CreateUser/CreateUser';
import CreateEspecial from '../CreateEspecial/CreateEspecial';

function Paneladmin({articulos, loading, special, permisos}) {


  const {admin , revisarArticulo, guardarEspecial, eliminarArticulo, publicarArticulo, borrarEspecial, specialExist} = useUserAuth();
  console.log("PANEL ADMIN");
 


  console.log("Panel Admin: admin + special")
  console.log(admin);
  console.log(special)
  console.log("Document panelcontainer existe?");
  console.log(specialExist);
    ///VARIABLES MODAL//
    const [modaltitle, setModaltitle] = useState('');
    const [modalmessage, setModalmessage] = useState('');
    const [buttonmessage, setbuttonmessage] = useState('');
    const [linkmodal, setLinkmodal] = useState('');
    const [closemodal, setClosemodal] = useState('');
    const [updating , setUpdating] = useState(false)

  console.log(articulos);
  console.log("a ver");
  console.log();
  const localuser = JSON.parse(localStorage.getItem('localuser'))
  const localeID = localuser.uid;
  console.log(localeID);

  const pendientes = articulos.filter(articulos => articulos.estado === "pendiente");
  console.log("Pendientes: ");
  console.log(pendientes);

  const publicados = articulos.filter(articulos => articulos.estado === "publicado");
  console.log("Publicados: ");
  console.log(publicados);

  var filter = {
    estado: 'borrador',
    editor: [localeID],
  };

  const borradores = articulos.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
    }
    return true;
  });
  console.log("Borradores: ");
  console.log (borradores);
                           

  const eliminados = articulos.filter(articulos => articulos.estado === "eliminado");
  console.log("Eliminados: ");
  console.log(eliminados);

  const handlePublicar = (articleID) => {  
    setModaltitle("Artículo publicado!");
    setModalmessage("El articulo acaba de ser publicado correctamente. Ya esta disponible para su visualización publica en la revista");
    setbuttonmessage("Cerrar");
    setLinkmodal('');
    setClosemodal('');
    publicarArticulo(articleID);
   }

  const handleEliminar = async (articleID) => {
    setUpdating(true)
    console.log("Eliminar: "+articleID);
    setModaltitle("Articulo eliminado");
    setModalmessage("El articulo ha sido eliminado de forma correcta. Si se trató de un error, puede recuperar una copia de seguridad resguardada en la base de datos.");
    setbuttonmessage("Cerrar");
    setLinkmodal('');
    setClosemodal('');
    await eliminarArticulo(articleID);
    setUpdating(false)
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
        {permisos.includes(localuser.uid) ? 
        <Link to={`/editar/${item.articleID}`}><button className='buttonRow'>revisar</button></Link>
          : localuser.uid == item.editor  &&
        <Link to={`/editar/${item.articleID}`}><button className='buttonRow'>editar</button></Link>
        }

        {!permisos.includes(localuser.uid) &&
        <Link to={`/preview/${item.articleID}`}><button className='buttonRow'>ver</button></Link>
        }

        {permisos.includes(localuser.uid) &&
        <button className='buttonRow' onClick={()=>handleEliminar(item.articleID)} >eliminar</button>
        }
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
        <span className='carrusel'><Switchcarrousel carrousel={item.carrousel} articleID={item.articleID} permisos={permisos} /></span>
        <span className='revisar'>
        {permisos.includes(localuser.uid) &&
        <Link to={`/editar/${item.articleID}`}><button className='buttonRow'>editar</button></Link>
        }
        <Link to={`/article/${item.articleID}`}><button className='buttonRow'>ver</button></Link>
        {permisos.includes(localuser.uid) &&
        <button className='buttonRow' onClick={()=>handleEliminar(item.articleID)} >eliminar</button>
        }
        </span>
      </div>
      <hr />
    </div>
  ));

  const tablaBorradores = borradores.map(item => (
    <div key={item.articleID}>
    <div className='artRow'>
      <span className='titulo'>{item.title}</span>
      <span className='auto'>{item.autor}</span>
      <span className='editor1'>{item.editormail}</span>
      <span className='fecha'>{(item.creado).toDate().toLocaleDateString()}</span>
      <span className='estado'>{item.estado}</span>
      <span className='revisar'>
      <Link to={`/editar/${item.articleID}`}><button className='buttonRow'>editar</button></Link>
      {permisos.includes(localuser.uid) &&
      <button className='buttonRow' onClick={()=>handlePublicar(item.articleID)} >publicar</button>
      }
      <button className='buttonRow' onClick={()=>handleEliminar(item.articleID)} >eliminar</button>
        </span>
    </div>
    <hr />
  </div>
));

const handleVer = () => {   let element = document.getElementById("miModal");
                            element.classList.remove("ver");
                          }

const verCreateUser = ()=> { var elemento = document.getElementById("create-user");
                            elemento.classList.remove("none");
                        }

const verCreateEspecial = ()=> { var elemento = document.getElementById("create-especial");
                        elemento.classList.remove("none");
                    }

const hideCreateEspecial = ()=> { let elemento = document.getElementById("create-especial");
                    elemento.classList.add("none");
                    document.getElementById("tituloespecial").value="";
                    document.getElementById("hashtagespecial").value="";
                    document.getElementById("bajadadespecial").value="";

                    document.getElementById("tituloespecial").disabled = false;
                    document.getElementById("bajadadespecial").disabled = false;
                    document.getElementById("hashtagespecial").disabled = false;
                    document.getElementById("colorespecial").disabled = false;
                    };

const borrarSpecialCollection = async ()=> { 
                      setUpdating(true)
                      await borrarEspecial()
                      setUpdating(false)
                      hideCreateEspecial()
                     }


  return (
    <>
     
      <div className='panelContainer'>
      {permisos.includes(localuser.uid) ? 
        <h1>Panel administrador</h1> : <h1>Panel usuario</h1> }
        

        <div className="panel">
          <div className="panel-header">
            <Link to="/crear"><div className='buttonNew'>Crear entrada</div></Link>

            {!permisos.includes(localuser.uid) ? <div></div> :
            specialExist ?
                  <div className='buttonNew' onClick={borrarSpecialCollection}>Eliminar especial</div>
                  :
                  <div className='buttonNew' onClick={verCreateEspecial}>Crear especial</div>
              
            }
            
            {permisos.includes(localuser.uid) &&
            <div className='buttonNew' onClick={verCreateUser }>Crear usuario</div>
            }

            <div id="create-user" className='none'>
             <CreateUser/>
            </div>    
         </div>

         {loading ? <></> :
              <div id="create-especial" className={specialExist ? "" : "none"}>
                <CreateEspecial special={special}/>
              </div>
          }

         {pendientes && 
              <div className="panel-tabla">
                <h3>Articulos para revisión (sin publicar)</h3>
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

        {borradores && 
              <div className="panel-tabla">
                  <h3>Mis borradores</h3>
                    <div className="headRow">
                      <span className='titulo'>Título</span>
                      <span className='auto'>Autor</span>
                      <span className='editor1'>Editor</span>
                      <span className='fecha'>Fecha</span>
                      <span className='estado'>Estado</span>
                      <span className='accion'></span>
                    </div>
                    {loading ? <div className='loader'> <PulseLoader size={10} /></div> : tablaBorradores }
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
                      <span className='carrusel'>Destaque</span>
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

      {updating && <Updating />}
    </>
  )
}

export default Paneladmin