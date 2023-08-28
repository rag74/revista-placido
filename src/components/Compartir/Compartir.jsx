import React from 'react'
import ".//Compartir.css";
import {  useReactToPrint } from "react-to-print";

function Compartir({articulo, componentRef}) {

    console.log(articulo)
    console.log(articulo.title)

    const handlePrint = useReactToPrint({
        pageStyle: `@media print {
          @page {
            size: 21cm 29,7cm;
            margin: 25mm 30mm 25mm 30mm;
          }
        }`,
          content:()=> componentRef.current,
          
      })

  return (
   <> 
    {articulo.estado === "publicado" ?
    <div className='compartir'> 
        <i class="fa-solid fa-share-nodes"></i>

       <a href={`https://twitter.com/intent/tweet?text=Revista Altobondi📢 ${articulo.title} - ${window.location.href}/`} target="_blank"><i class="fa-brands fa-x-twitter share"></i></a> 
    
        <a href={`https://api.whatsapp.com/send?text=Revista Altobondi: ${articulo.title} - ${window.location.href}/`}><i class="fa-brands fa-whatsapp share"></i></a>

        <a href={`https://www.facebook.com/sharer.php?u=${window.location.href}/`} target="_blank"><i class="fa-brands fa-facebook-f share"></i></a> 

        <a href={`mailto:?subject=${articulo.title} - Revista Altobondi&body=Leí esto y creo que te puede interesar: ${window.location.href}/`} target="_blank"><i class="fa-solid fa-envelope share"></i></a> 

        <i class="fas fa-print share" onClick={handlePrint}></i>
     
        
    </div>  
        :
    <div className='compartir'> 
        <i class="fa-solid fa-share-nodes"></i>
        <i class="fa-brands fa-twitter share"></i>
        <i class="fa-brands fa-whatsapp share"></i>
        <i class="fa-brands fa-facebook-f share"></i>
        <i class="fa-solid fa-envelope share"></i>
    </div>
    }
    </>
  )
}

export default Compartir
