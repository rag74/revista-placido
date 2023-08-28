import React from 'react'
import ".//Somos.css";


function Somos() {


  return (
    <div>
      <section className='quienessomos'>  
        <div className='somosCabecera'>
            <img src="/img/altobondi-logo.png" alt="" id="bondi" />
            <h2>Hola, somos AltoBondi</h2>
        </div>

        <div className='somosTexto'>
            <p>Impulsamos este espacio de expresión y encuentro colectivo para que todos y todas lean, escuchen y conozcan las miradas, las creaciones y la pluralidad de reflexiones que atraviesan a los y las adolescentes en nuestro tiempo.</p>

            <p>A diario escuchamos hasta el hartazgo que "la juventud está perdida", “no sirve para nada” y está “metida en sus pantallas". Ahora bien, ¿qué pasa si usamos esas pantallas para visibilizar la potencia de la imaginación y el pensamiento, pero no a través de un filtro, sino mostrando nuestras producciones, sueños y compromiso para con el mundo en el que vivimos?</p>

            <p>Quizás piensen que nos falta experiencia, y quizás (también) tengan algo de razón, pero no por eso vamos a parar este viaje y eso es lo que nos hace construir, entre todos y todas, esta revista digital.</p>

            <p>Desde la escuela, un grupo de profes y estudiantes creemos que vale la pena pensar,  observar, imaginar y reflexionar acerca de lo que nos rodea. En este espacio, queremos invitarlos e invitarlas a compartir nuestro mundo, nuestras ideas y nuestras inquietudes; a leer y ser leídos, a escuchar y ser escuchados.</p>

            <p>Subite a este colectivo de voces. La palabra ya está en marcha.</p>
        </div>

        <div className='somosCierre'>
            <img src="/img/altobondi-VByN.png" alt="logo altobondi" id="logovbyn" />
            <p>Revista cultural del Instituto Plácido Marín</p>
        </div>
    </section>
    <hr className='divisor'/>
    <section className='creditos'>
        <h3>Equipo de trabajo ALTOBONDI 2023:</h3>
        
        <span>Coordinadoras generales:</span>
        <p>Wayra Valdez y Sara Plenovich</p>

        <span>Responsables de edición:</span>
        <p>Malena Cabrera y Yolanda Próspero </p>

        <span>Equipo de trabajo de diseño y redes sociales:</span>
        <p>Sara Plenovich</p>
        <p>Abril Angeleri</p>
        <p>Agustina Alegre</p>
        <p>Candela Caponeto</p>
        <p>Uma Avila</p>

        <span>Equipo de redacción:</span>
        <p>Matias Valiero</p>
        <p>Tiziana Esquivel</p>
        <p>Lucio Ambrossio</p>
        <p>Mateo Imberlina</p>
        <p>Giuliano Giufridda</p>
        <p>Victoria Jara</p>
        <p>Nahiara Rojo</p>
        <p>Morena Avedikián</p>

        
        <span>Coordinadores docentes:</span>
        <p>Nora Sarda y Sebastián Gabriel Di Giorgio</p>
         
        <span>Colaboradores docentes:</span>
        <p>Juan Aladro</p>

        <span>Diseño de revista y programación web:</span>
        <img className='logorag' src="/img/poligonorag.png" alt="logo RAG" />



    </section>
    </div>
    
  )
}

export default Somos