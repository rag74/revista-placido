import React, { useState } from 'react'
import './CrateSpecial.css'
import {useUserAuth} from '../../Context/UserAuthContext';
import Updating from '../Updating/Updating';
import { useEffect } from 'react';

function CreateEspecial({special}) {

  const [buttonEstado, setButtonEstado] = useState(true)
  const [dataOld, setDataOld] = useState()
  const {guardarEspecial, borrarEspecial, specialExist} = useUserAuth();
  const [updating , setUpdating] = useState(false)

    console.log("PANEL ESPECIAL")
    console.log(special)
    console.log(specialExist)



    const [newTitleespecial, setnewTitleespecial] = useState("");
    const [newHashtagespecial, setnewHashtagespecial] = useState("");
    const [newBajadadespecial, setnewBajadadespecial] = useState("");
    const [newColorespecial, setnewColorespecial] = useState("#000000");
   
    useEffect(() => {

      if (special!==undefined) {
        console.log(special.titulo)
        document.getElementById("tituloespecial").value = special.titulo;
        setnewTitleespecial(special.titulo);

        console.log(special.bajada)
        document.getElementById("bajadadespecial").value = special.bajada;
        setnewBajadadespecial(special.bajada);

        console.log(special.hashtag)
        document.getElementById("hashtagespecial").value = special.hashtag;
        setnewHashtagespecial(special.hashtag);

        console.log(special.color)
        document.getElementById("colorespecial").value = special.color;
        setnewColorespecial(special.color);

        document.getElementById("tituloespecial").disabled = true;
        document.getElementById("bajadadespecial").disabled = true;
        document.getElementById("hashtagespecial").disabled = true;
        document.getElementById("colorespecial").disabled = true;
      } 
    }, [])
    

    let especialData = {
        titulo:newTitleespecial,
        hashtag:newHashtagespecial,
        bajada:newBajadadespecial,
        color:newColorespecial,
        activo:true,
    }

    console.log("NUEVO special data")
    console.log(especialData)

    const hideCreateEspecial = ()=> { let elemento = document.getElementById("create-especial");
                                elemento.classList.add("none");
                                document.getElementById("tituloespecial").value="";
                                document.getElementById("hashtagespecial").value="";
                                document.getElementById("bajadadespecial").value="";  
                                document.getElementById("colorespecial").value="#0000";

                                };

    const checkEspecial = ()=> {
      let elem = document.getElementById("tituloespecial")
        if (elem.value==="") { 
             elem.classList.add("error2");
            console.log("errrrrroooorrrr")
            return;
            }

      elem = document.getElementById("hashtagespecial");
        if (elem.value==="") {
                elem.classList.add("error2");
               console.log("errrrrroooorrrr")
               return;
               } 

        createSpecialCollection()
    }

   const modificarEspecial = ()=> {
        document.getElementById("tituloespecial").disabled = false;
        document.getElementById("bajadadespecial").disabled = false;
        document.getElementById("hashtagespecial").disabled = false;
        document.getElementById("colorespecial").disabled = false;

        let old = {
          titulo:document.getElementById("tituloespecial").value,
          hashtag:document.getElementById("hashtagespecial").value,
          bajada:document.getElementById("bajadadespecial").value,
          color:document.getElementById("colorespecial").value,
          activo:true,
      }
  
      setDataOld(old)
      setButtonEstado(false)
   }

   const createSpecialCollection = async ()=> { 
      setUpdating(true)
      console.log(especialData) 
      await guardarEspecial(especialData)
      setButtonEstado(true)
      document.getElementById("tituloespecial").disabled = true;
      document.getElementById("bajadadespecial").disabled = true;
      document.getElementById("hashtagespecial").disabled = true;
      document.getElementById("colorespecial").disabled = true;
      setUpdating(false)
   }

   const borrarSpecialCollection = async ()=> { 
      setUpdating(true)
      await borrarEspecial()
      setUpdating(false)
      hideCreateEspecial()
   }

   const cancelSpecialCollection = ()=> {
        console.log(dataOld)

        document.getElementById("tituloespecial").value=dataOld.titulo;
        document.getElementById("hashtagespecial").value=dataOld.hashtag;
        document.getElementById("bajadadespecial").value=dataOld.bajada;  
        document.getElementById("colorespecial").value=dataOld.color;

        document.getElementById("tituloespecial").disabled = true;
        document.getElementById("bajadadespecial").disabled = true;
        document.getElementById("hashtagespecial").disabled = true;
        document.getElementById("colorespecial").disabled = true;

        
        setButtonEstado(true)
   }
   

   const removeError = ()=> {
        document.getElementById("tituloespecial").classList.remove("error2")
        document.getElementById("hashtagespecial").classList.remove("error2")
   }


  return (
  <>
  <div className='createEspecial'>
            <div className="panel-tabla">
                <h3>Especial publicaciones temáticas</h3>
                    <div className="headRow">
                      <span className='tituloEsp'>Título</span>
                      <span className='bajadaEsp'>Bajada</span>
                      <span className='hashtagEsp'>#Hashtag</span>
                      <span className='coloresp'>Color</span>
                      <span className='publicaresp'>Acciones</span>
                      <span className='accion'></span>
                    </div>
              </div>     
                <div className='datosespecial'>
                    <input type="text" placeholder='título del especial' name="tituloespecial" id="tituloespecial" onChange={(e)=> setnewTitleespecial(e.target.value)} onFocus={removeError} />
                    <textarea placeholder='bajadad especial' name="bajadadespecial" id="bajadadespecial" maxlength="300"  onChange={(e)=> setnewBajadadespecial(e.target.value)} />
                    <input type="text" placeholder='hashtag del especial' name="hashtagespecial" id="hashtagespecial" onChange={(e)=> setnewHashtagespecial(e.target.value)} onFocus={removeError} />
                    <input type="color" id="colorespecial" name="colorespecial"  onChange={(e)=>setnewColorespecial(e.target.value)} />
                   { buttonEstado && specialExist ?  
                    <button className='buttonRowEsp' onClick={modificarEspecial}>modificar</button>
                    :
                    <>
                    <button className='buttonRowEsp' onClick={cancelSpecialCollection}>cancelar</button>
                    <button className='buttonRowEsp' onClick={checkEspecial}>confirmar</button>  
                    </>
                    }
                </div>
    </div>
    {updating && <Updating />}
    </>
  )
}

export default CreateEspecial


  