import React, { useEffect, useState, useRef } from 'react';
import './CreateArticle.css';
import { useParams , Link} from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { useUserAuth } from '../../Context/UserAuthContext';
import { useHistory } from "react-router-dom";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import db from '../../firebase';
import Switch from "react-switch";
import Updating from '../Updating/Updating';





function CreateArticle() {
    
    const {id} = useParams()
    //const id = "art-fd8fe9cb";
    //art-fd8fe9cb
    var admin = false
    const localuser = JSON.parse(localStorage.getItem('localuser'));

    const history = useHistory();
    
        
    const {generateID, guardarBorrador, permisos} = useUserAuth();
    if (permisos.includes(localuser.uid)) admin = true;

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
    const [imagenprincipal640, setImagenPrincipal640] = useState('');
    const [categories, setCategories] = useState([]);
    const [innerHtml, setinner] = useState('');
    const [creado, setCreado] = useState('');
    const [estado, setEstado] = useState('');
    const [editor, setEditor] = useState('');
    const [editormail, setEditormail] = useState('');
    const [fecha, setFecha] = useState('');
    const [carrousel, setCarrousel] = useState(false);
    const [htmlcont, setHtmlcont] = useState(" ");

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

                    //imagenPrincipal640 se setea en ussefect luego de handlever

                    setFecha(docSnap.data().fecha);
                    //document.getElementById("categories").value = docSnap.data().categories;
                    setCategories(docSnap.data().categories);
                    let textCategories = docSnap.data().categories.toString();
                    
                    document.getElementById("categorias").value = textCategories;

                    setTimeout(() => setHtmlcont(docSnap.data().innerHtml), 10);

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

    const [updating , setUpdating] = useState(false)
      
    const handleGuardar = async () => {   
                                    setUpdating(true)
                                    setModaltitle("Cambios guardados!");
                                    setModalmessage("Puede seguir editando este artículo cerrando esta ventana, o volver al panel general presionando el botón de abajo");
                                    setButtonmessage("Volver al panel");
                                    setLinkmodal("/panel");
                                    setClosemodal("#");
                                    await guardarBorrador(articleData);                                  
                                    setUpdating(false)
                                }

    const handleRevisar = () => {   setUpdating(true)
                                    setEstado("pendiente");
                                    setModaltitle("Artículo en revisión!");
                                    setModalmessage("El articulo fue enviado al administrador. Luego de ser revisado quedará pubicado en la revista");
                                    setButtonmessage("OK");
                                    setLinkmodal("/panel");
                                    setClosemodal("/panel");
                                    setGuardar("pendiente");
                                    //guardarBorrador(articleData);
                                }

                         

    const handlePublicar = () => {  setUpdating(true)
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

    const handlePreview = async () => {   
                                    setUpdating(true);
                                    try {
                                        await setDoc(doc(db, "articles", articleData.articleID), articleData);
                                    } catch (err) {
                                        console.log(err);
                                        alert(err);
                                    }
                                    setUpdating(false);
                                    window.open(`/preview/${articleID}`, "_blank");
                                }

    const handleVer = () => {   let element = document.getElementById("miModal");
                                element.classList.remove("ver");
                            }


    useEffect (()=>{
                var n = imagenprincipal.lastIndexOf(".");
                if (n < 0) return ".";
                setImagenPrincipal640 (imagenprincipal.substring(0,n) + "l" + imagenprincipal.substring(n))    
            },[imagenprincipal]);



    function categoriesToArray(params) {
        params.replace(/\s/g, '');
        let array = params.split(",");
        let string = maincategory
        console.log("array aramado del input categorias");
        console.log(array);

        if (array.includes(string)) {} else {
            array.unshift(string);}

        const arraylower = array.map(element => {
                return element.toLowerCase();
              });

        const dataArr = new Set(arraylower)
        const result = [...dataArr];
        document.getElementById("categorias").value = result.toString();
        setCategories(result);
        console.log("array final: "+result);
    }

    function mainCategoryToArray(params) {
        
        setMainCategory(params);
        let array = categories;
        let string = params;
        if (!array.includes(string)) {
            array.push(string);
            let arraylower = array.map(element => {
                return element.toLowerCase();
              })
            const dataArr = new Set(arraylower)
            const result = [...dataArr];
            document.getElementById("categorias").value = result.toString();
            setCategories(result);
            console.log("array final mainCategoryToArray: "+result);}
        
        document.getElementById("categorias").focus() 
        console.log(params)
        console.log(maincategory)
    }

   
    const articleData = {
        maincategory,
        title,
        volanta,
        bajada,
        autor,
        arte,
        imagenprincipal,
        imagenprincipal640,
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

    useEffect(async () => {
       
        if (guardar === "pendiente" || guardar === "publicado") {
            console.log('El estado articleData cambio', articleData.estado);
            console.log(articleData)
            console.log("Guardar igual: "+guardar);
            await guardarBorrador(articleData);
            setUpdating(false)
        }
        setGuardar("");
     }, [guardar])

 console.log("Data del art: ");
 console.log(articleData);

function example_image_upload_handler (blobInfo, success, progress, failure) {
    console.log(blobInfo)
    console.log(blobInfo.blob())
    console.log(blobInfo.base64())
    var albumID = "gyoC5ct"
    
    /* Lets build a FormData object*/
    var fd = new FormData(); 
    fd.append("image", blobInfo.base64()); // Append the file
    fd.append("album", albumID)
    var ajax = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    ajax.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!

    
    
        
    ajax.onload = function() {

        if (ajax.status == 200) {
  
          if ( (!JSON.parse(ajax.responseText))
          || (typeof JSON.parse(ajax.responseText).data.link != 'string') ) {
            failure('Invalid: <code>'+ajax.responseText+'</code>');
            window.tinymce.activeEditor.undoManager.undo();
            return;
          }
          	
          success(JSON.parse(ajax.responseText).data.link);
  
          } else {
            failure('Upload error: <code>'+ajax.status+'</code>');
            window.tinymce.activeEditor.undoManager.undo();
            return;
          }
  
        };

        //Authorization: 'Bearer b467093eb176a48b3f7c002dff1bdec3001f74c0'
        //'Client-ID 6b646df75dc0f74'
        ajax.setRequestHeader('Authorization', 'Bearer b467093eb176a48b3f7c002dff1bdec3001f74c0');
        ajax.send(fd);
  
      }
  
    
function manageClick() {let butfile = document.getElementById('fileselect');
                        butfile.click();
                        }

function uploadMain(e) {
                        
                    console.log(e.target.files[0])
                    
                    if (e.target.files[0] != null) {
                        setUpdating(true)
                        const formdata = new FormData()
                        formdata.append("image", e.target.files[0])

                        fetch("https://api.imgur.com/3/image/", {
                            method: "post",
                            headers: {
                                Authorization: "Bearer b467093eb176a48b3f7c002dff1bdec3001f74c0"
                            },
                            body: formdata
                        }).then(data => data.json()).then(data => {
                            console.log(data.data.link)
                            setImagenPrincipal(data.data.link)
                            document.getElementById("imagenprincipal").value = data.data.link
                            setUpdating(false)
                        })
                    } else {console.log("no hay archivo")}
        }


    
  
    
    return (
        <main>
            {loading ?
            <div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>

             : 
            <>
            { !admin && estado=="publicado" ? <p>El usuario no tienes permisos para editar artículos publicados</p> : 
            <>
            <div className="botones">
            <Link to="/panel"><div className='buttonNew2'><i class="fa-solid fa-arrow-left"></i> Volver al panel</div></Link>
            {innerHtml!='' && <div className='buttonNew2' onClick={handlePreview}>Vista previa <i class="fa-solid fa-arrow-up-right-from-square"></i></div>}   
            </div>
            <div className='articleEditionContainer'>
            
                <div className='articleEdition'>
                    <h3>Editor de artículos</h3>
                    <div className="article-form">

                        <label htmlFor="maincategory">Categoría principal:</label>
                        <select name="maincategory" id="maincategory" onChange={(e)=> {mainCategoryToArray(e.target.value)}}> 
                                                                       {/* onBlur={(e)=>mainCategoryToArray()}>*/}
                            <option value="">Selecciona una categoría</option>
                            <option value="ficciones">ficciones</option>
                            <option value="poesía">poesía</option>
                            <option value="miradas">miradas</option>
                            <option value="periodismo">periodismo</option>
                            <option value="podcast">podcast</option>
                            <option value="altoviaje">altoviaje</option>
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
                        <label htmlFor="imagenprincipal">Imagen principal (puede copiar la URL de la imagen o <button onClick={manageClick}> cargar <i class="fa-solid fa-arrow-up-from-bracket"></i></button> una desde su pc)</label>
                        <div className='imgsel'>
                            <input type="text" name="imagenprincipal" id="imagenprincipal" onChange={(e)=> setImagenPrincipal(e.target.value)}/><button onClick={manageClick}><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
                        </div>
                        <label htmlFor="categorias">Más categorias / etiquetas {maincategory && <>(revise las categorias, no necesita volver a incluir '{maincategory}')</>}</label>
                        <input type="text" name="categorias" id="categorias" onBlur={(e)=> categoriesToArray(e.target.value)}/>
                        
                        <label htmlFor="editor">Contenido del artículo</label>
                        <div className="editor">
                            <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={htmlcont}
                            init={{
                                images_upload_handler: example_image_upload_handler,
                                height: 500,
                                width: "100%",
                                menubar: true,
                                language: 'es_MX',
                                plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                /*
                                style_formats: [
                                    {title: 'Class name', selector: 'p', classes: 'miclase'} 
                                  ],*/
                                toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | image | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',

                                 //ABAJO - UPLOADER DE IMAGENES///  
                                    /* enable title field in the Image dialog*/
                                    image_title: true,
                                    /* enable automatic uploads of images represented by blob or data URIs*/
                                    automatic_uploads: true,
                                    /*
                                        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                                        images_upload_url: 'postAcceptor.php',
                                        here we add custom filepicker only to Image dialog
                                    */
                                    file_picker_types: 'image',
                                    /* and here's our custom image picker*/
                                    file_picker_callback: (cb, value, meta) => {
                                        const input = document.createElement('input');
                                        input.setAttribute('type', 'file');
                                        input.setAttribute('accept', 'image/*');

                                        input.addEventListener('change', (e) => {
                                        const file = e.target.files[0];

                                        const reader = new FileReader();
                                        reader.addEventListener('load', () => {
                                            /*
                                            Note: Now we need to register the blob in TinyMCEs image blob
                                            registry. In the next release this part hopefully won't be
                                            necessary, as we are looking to handle it internally.
                                            */
                                            const id = 'blobid' + (new Date()).getTime();
                                            const blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                                            const base64 = reader.result.split(',')[1];
                                            const blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);

                                            /* call the callback and populate the Title field with the file name */
                                            cb(blobInfo.blobUri(), { title: file.name });
                                        });
                                        reader.readAsDataURL(file);
                                        });

                                        input.click();
                                    },
                                 //ARRIBA - UPLOADER DE IMAGENES/// 
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height:1;} img { max-width: 100%; height: auto; display: block ;margin-left: auto; margin-right: auto; } p {margin-bottom:1px; margin-top:1px;}',
                                default_link_target: '_blank'
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
                            
                            <div className='buttonNew2' onClick={handleGuardar}>Guardar cambios</div>
                            
                            {estado === "borrador" &&
                            <div className='buttonNew2' onClick={handleRevisar}>Solicitar publicacion</div>
                            }

                            {admin && estado != "publicado" &&
                            <div className='buttonNew2' onClick={handlePublicar}>Publicar</div>
                            }

                            {innerHtml!='' && <div className='buttonNew2' onClick={handlePreview}>Vista previa <i class="fa-solid fa-arrow-up-right-from-square"></i></div>}

                    </div>
                    }
                    
                    <input type="file" id="fileselect" accept="image/*" onChange={(e)=>uploadMain(e)} />


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
                        <img className='imagenArticulo' src={imagenprincipal640} width="100%" alt="" />
                        <div className='artText' id="artText">
                            {htmlcont && <div dangerouslySetInnerHTML={{__html: innerHtml}}></div>}
                        </div>
                        {title &&
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

            {updating && <Updating />}
        </main>
    )

}

export default CreateArticle;