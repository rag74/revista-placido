import React, { useEffect, useState, useRef } from 'react';
import './CreateArticle.css';
import { useParams , Link} from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { useUserAuth } from '../../Context/UserAuthContext';
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase';
import Switch from "react-switch";




function CreateArticle() {
    
    const {id} = useParams()
    //const id = "art-fd8fe9cb";
    //art-fd8fe9cb

    const localuser = JSON.parse(localStorage.getItem('localuser'));
    


        

    const {generateID, guardarBorrador, admin} = useUserAuth();
    console.log(admin);

    const [loading, setLoading] = useState(true);
    
    const [guardar, setGuardar] = useState('');

    const [articleID, setArticleID] = useState('');
    const [maincategory, setMainCategory] = useState('');
    const [title, setTitle] = useState('');
    const [volanta, setVolanta] = useState('');
    const [bajada, setBajada] = useState('');
    const [autor, setAutor] = useState('');
    const [arte, setArte] = useState('');
    const [imagenprincipal, setImagenPrincipal] = useState('');
    const [categories, setCategories] = useState("");
    const [innerHtml, setinner] = useState('');
    const [creado, setCreado] = useState('');
    const [estado, setEstado] = useState('');
    const [editor, setEditor] = useState('');
    const [editormail, setEditormail] = useState('');
    const [fecha, setFecha] = useState('');
    const [carrousel, setCarrousel] = useState(false);
    const [htmlcont, setHtmlcont] = useState('');

    ///VARIABLES SWITCH//
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
      setChecked(nextChecked);
      setCarrousel(nextChecked);
    };

    ///VARIABLES MODAL//
    const [modaltitle, setModaltitle] = useState('');
    const [modalmessage, setModalmessage] = useState('');
    const [buttonmessage, setButtonmessage] = useState('');
    const [linkmodal, setLinkmodal] = useState('');
    const [closemodal, setClosemodal] = useState('');


    

    const fechahumana = new Date();
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const miliseconds = new Date(fecha.seconds * 1000);
    

    console.log("artcile ID seteado: "+articleID);




    //////BUSCAR ARTICULO////
    useEffect (()=>{
        async function getDocumento(){

            if(id!=null){
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setLoading(false);
                    console.log("Document data:", docSnap.data());
                    console.log("Document id:", docSnap.id);

                    setArticleID(docSnap.id);

                    document.getElementById("maincategory").value = docSnap.data().maincategory;
                    setMainCategory(docSnap.data().maincategory);

                    document.getElementById("titulo").value = docSnap.data().title;
                    setTitle(docSnap.data().title);
                    
                    document.getElementById("volanta").value = docSnap.data().volanta;
                    setVolanta(docSnap.data().volanta);

                    document.getElementById("bajada").value = docSnap.data().bajada;
                    setBajada(docSnap.data().bajada);

                    document.getElementById("autor").value = docSnap.data().autor;
                    setAutor(docSnap.data().autor);

                    document.getElementById("arte").value = docSnap.data().arte;
                    setArte(docSnap.data().arte);

                    document.getElementById("imagenprincipal").value = docSnap.data().imagenprincipal;
                    setImagenPrincipal(docSnap.data().imagenprincipal);

                    setFecha(docSnap.data().fecha);
                    //document.getElementById("categories").value = docSnap.data().categories;
                    setCategories(docSnap.data().categories);
                    let textCategories = docSnap.data().categories.toString();
                    
                    document.getElementById("categorias").value = textCategories;

                    setTimeout(() => setHtmlcont(docSnap.data().innerHtml), 500);

                    setinner(docSnap.data().innerHtml)

                    setEstado(docSnap.data().estado);

                    setCreado(docSnap.data().creado);

                    setFecha(docSnap.data().fecha);

                    setCarrousel(docSnap.data().carrousel);
                    setChecked(docSnap.data().carrousel);

                    setEditor(docSnap.data().editor);

                    setEditormail(docSnap.data().editormail);
                    

                    }} else {
                        !creado && setCreado(fechahumana);
                        !articleID && setArticleID(generateID); 
                        !estado && setEstado('borrador');
                        !editor && setEditor(localuser.uid);
                        !editormail && setEditormail(localuser.email);
                        !carrousel && setCarrousel(false);
                        setLoading(false);}
            
            }    

            
            getDocumento()

        },[id]);
    
    
    
    //FUNCIONES EDITOR TINYMCE (leer https://www.tiny.cloud/docs/integrations/react/#configuringeditorsource para más información)
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        setinner(editorRef.current.getContent());
      }
    };

    
      
    const handleGuardar = () => {   alert(articleData.articleID);
                                    setModaltitle("Borrador guardado!");
                                    setModalmessage("Puede seguir editando este artículo cerrando esta ventana, o volver al panel general presionando el botón de abajo");
                                    setButtonmessage("Volver al panel");
                                    setLinkmodal("/panel");
                                    setClosemodal("#");
                                    guardarBorrador(articleData);                                        
                                    
                                }

    const handleRevisar = () => {   
                                    alert(articleData.estado);
                                    setEstado("pendiente");
                                    setModaltitle("Artículo en revisión!");
                                    setModalmessage("El articulo fue enviado al administrador. Luego de ser revisado quedará pubicado en la revista");
                                    setButtonmessage("OK");
                                    setLinkmodal("/panel");
                                    setClosemodal("/panel");
                                    setGuardar("pendiente");
                                    //guardarBorrador(articleData);
                                }

                         

    const handlePublicar = () => {  alert(articleData.estado);
                                    setEstado("publicado");
                                    if (fecha === "" || fecha === null) setFecha(fechahumana);
                                    setModaltitle("Artículo publicado!");
                                    setModalmessage("El articulo acaba de ser publicado correctamente. Ya esta disponible para su visualización publica en la revista");
                                    setButtonmessage("Volver al panel");
                                    setLinkmodal("/panel");
                                    setClosemodal("/panel");
                                    setGuardar("publicado");
                                    //guardarBorrador(articleData);
                                }

    const handleVer = () => {   let element = document.getElementById("miModal");
                                element.classList.remove("ver");
                            }

    function categoriesToArray(params) {
        params.replace(/\s/g, '');
        let array = params.split(",");
        let string = maincategory
        console.log("array aramado del input categorias");
        console.log(array);

        if (array.includes(string)) {} else {
            array.unshift(string);}

        setCategories(array);
        console.log("array final: "+array);
    }

    function mainCategoryToArray(params) {
        
        setMainCategory(params);
        let array = categories;
        let string = params;
        if (array.includes(string)) {} else {
            array.push(string);
            document.getElementById("categorias").value = array.toString();}
        setCategories(array);
        console.log("array final mainCategoryToArray: "+array);
        console.log(array)
        document.getElementById("categorias").focus() 
    }

   
    const articleData = {
        maincategory,
        title,
        volanta,
        bajada,
        autor,
        arte,
        imagenprincipal,
        categories,
        innerHtml,
        articleID,
        creado,
        fecha,
        estado,
        editor,
        editormail,
        carrousel,
    }

    useEffect(() => {
       
        if (guardar === "pendiente" || guardar === "publicado") {
            console.log('El estado articleData cambio', articleData.estado);
            console.log(articleData)
            console.log("Guardar igual: "+guardar);
            guardarBorrador(articleData);
        }
        setGuardar("");
     }, [guardar])

 console.log("Data del art: ");
 console.log(articleData);

 
    
    return (
        <main>
            {loading ?
            <div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>

             : 
            <>
            <div className="botones">
            <Link to="/panel"><div className='buttonNew'><i class="fa-solid fa-arrow-left"></i> Volver al panel</div></Link>
                
            </div>
            <div className='articleEditionContainer'>
            
                <div className='articleEdition'>
                    <h3>Editor de artículos</h3>
                    <div className="article-form">

                        <label htmlFor="maincategory">Categoría principal:</label>
                        <select name="maincategory" id="maincategory" onChange={(e)=> {mainCategoryToArray(e.target.value)}}> 
                                                                       {/* onBlur={(e)=>mainCategoryToArray()}>*/}
                            <option value="">Selecciona una categoría</option>
                            <option value="Ficciones">Ficciones</option>
                            <option value="Poesia">Poesia</option>
                            <option value="Miradas">Miradas</option>
                            <option value="Periodismo">Periodismo</option>
                            <option value="Podcast">Podcast</option>
                            <option value="Audiolibro">Audiolibro</option>
                        </select>
                        <label htmlFor="titulo">Titulo:</label>
                        <input type="text" name="titulo" id="titulo" onChange={(e)=> setTitle(e.target.value)}/>
                        <label htmlFor="volanta">Volanta</label>
                        <input type="text" name="volanta" id="volanta" onChange={(e)=> setVolanta(e.target.value)}/>
                        <label htmlFor="bajada">Bajada</label>
                        <textarea type="text" name="bajada" id="bajada" onChange={(e)=> setBajada(e.target.value)}/>
                        <label htmlFor="autor">Autor/es</label>
                        <input type="text" name="autor" id="autor" onChange={(e)=> setAutor(e.target.value)}/>
                        <label htmlFor="arte">Arte</label>
                        <input type="text" name="arte" id="arte" onChange={(e)=> setArte(e.target.value)}/>
                        <label htmlFor="imagenprincipal">Imagen principal</label>
                        <input type="text" name="imagenprincipal" id="imagenprincipal" onChange={(e)=> setImagenPrincipal(e.target.value)}/>
                        <label htmlFor="categorias">Más categorias / etiquetas {maincategory && <>(revise las categorias, no necesita volver a incluir '{maincategory}')</>}</label>
                        <input type="text" name="categorias" id="categorias" onBlur={(e)=> categoriesToArray(e.target.value)}/>
                        
                        <label htmlFor="editor">Contenido del artículo</label>
                        <div className="editor">
                            <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={htmlcont}
                            init={{
                                height: 500,
                                width: "100%",
                                menubar: true,
                                language: 'es',
                                plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | image | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img { max-width: 100%; height: auto; display: block ;margin-left: auto; margin-right: auto; }'
                            }}
                            onEditorChange={log}
                            />
                        </div>
                        
                       
                    {admin &&
                        <div className='defineCarrousel'>
                            <label htmlFor="react-switch">Colocar en carrousel?</label>
                            <Switch
                                onChange={handleChange}
                                checked={checked}
                                height={18}
                                width={40}
                                className="react-switch"
                            />
                        </div>
                      }  

                    {title &&
                    <div className='accionesEdicion'>
                        
                            <button className='btn-edicion' onClick={handleGuardar}>Guardar cambios</button>
                            
                            {!admin && estado === "borrador" &&
                            <button className='btn-edicion' onClick={handleRevisar}>Solicitar publicacion</button>
                            }

                            {admin &&
                            <button className='btn-edicion' onClick={handlePublicar}>Publicar</button>
                            }
                    </div>
                    }



            </div>
                </div>
                
                <div className='articlePreview'>
                    <div className='fixed-preview'>
                        {maincategory && <p className='mainCategory'>{maincategory}</p>}
                        {volanta && <p className='volanta'>{volanta}</p>}
                        {title && <><hr className='divisor'/><h1 className='title'>{title}</h1></>}
                        <p className='bajada'>{bajada}</p>
                        <div className='autores'>
                            { autor &&
                            <h4 className='por'>Por: <span className='autor'>{autor}</span>{arte && <>| Arte: <span className='autor'>{arte}</span></>}</h4>
                            }
                        </div>
                        <img className='imagenArticulo' src={imagenprincipal} width="100%" alt="" />
                        <div className='inner'>
                            {htmlcont && <div dangerouslySetInnerHTML={{__html: innerHtml}}></div>}
                        </div>
                        {categories &&
                         <>                            
                                <div className='finalArt'>
                                <p className="fechaArt">{!fecha ? fechahumana.toLocaleString('es-AR', dateOptions) 
                                : miliseconds.toLocaleString('es-AR', dateOptions)}</p>
                                <hr className="cierre" />
                                <div className="catcontainer">
                                    <p className='catLink'>{categories && categories.toString()}</p>
                                </div>
                            </div>
                        </>
                        }
                    </div>

                </div>

            </div>
            </> 
            }

            <div id="miModal" class="modal">
                <div class="modal-contenido">
                    <div className="cabeceraModal">
                        <h2>{modaltitle}</h2>
                        <Link to={`${closemodal}`}><i className="fas fa-times close" onClick={handleVer}></i></Link>
                    </div>
                    <hr className="divisorModal" />
                    <div className="mensajeModal">
                        <p>{modalmessage}</p>
                    </div>
                    <Link to={`${linkmodal}`}><div className='buttonModal'>{buttonmessage}</div></Link>
                </div>  
            </div>

            
        </main>
    )

}

export default CreateArticle;