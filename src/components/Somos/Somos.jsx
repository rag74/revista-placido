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
            <p>Somos un grupo de estudiantes y profesores que conformamos este espacio de expresión y encuentro colectivo, en el que buscamos conformar una voz común a través del descubrimiento y la experiencia individual. Nuestro objetivo es que todos y todas puedan leer, escuchar y conocer los intereses y las ideas que atraviesan a los y las adolescentes, y lograr, de este modo, construir nuestra propia identidad.</p>

            <p>Como estudiantes de un colegio secundario ubicado en el sur de la Ciudad de Buenos Aires, en el barrio de Mataderos, nos comprometemos a defender nuestras voces, muchas veces subestimadas, entendiendo la importancia de expresarnos libremente.</p>

            <p>En este camino, nos valemos de las pantallas (en las que tanto tiempo pasamos) para visibilizar la potencia y el pensamiento presentes en nuestras producciones. Queremos reflexionar, escribir y crecer como personas.</p>

            <p>Los y las invitamos a compartir nuestro mundo, nuestras ideas y nuestras inquietudes: a leer y a ser leídos, a escuchar y ser escuchados.</p>

        </div>

        <div className='somosCierre'>
            <img src="/img/altobondi-VByN.png" alt="logo altobondi" id="logovbyn" />
            <p>Subite a este colectivo de voces.</p>
            <h3>La palabra ya está en marcha.</h3>
        </div>
    </section>
    <hr className='divisor'/>
    <section className='creditos'>
        <h3>Equipo de trabajodel proyecto comunicacional ALTOBONDI 2025</h3>
        
        <span>Coordinadora general</span>
        <p>Abril Angeleri</p>

        <span>Responsables de la revista</span>
        <p>Victoria García y Morella Rivero</p>

        <span>Coordinadores por año</span>
        <p>Tercer año: Lucas Cabrera y Daniela Vasquez</p>
        <p>Cuarto año: Tobías Cabrera y Sofía Petenello</p>
        <p>Quinto año: Victoria García y Morella Rivero</p>

        <span>Responsables de la radio</span>
        <p>Agustina Alegre y April Esquivel</p>

        <span>Equipo técnico de la radio</span>
        <p>Walter Golato</p>
        <p>Valentina Guzmán</p>
        <p>Valentino Vivacqua</p>
        <p>Santino Larrea</p>
        <p>Nahuel Rodriguez</p>

        <span>Diseño y redes sociales</span>
        <p>Camila Caminiti</p>
        <p>Sebastián Ippólito</p>
        <p>Alexia Ferrari</p>

        <span>Coordinador docente de diseño y redes sociales</span>
        <p>Juan Aladro</p>
        
        <span>Coordinadores docentes de radio</span>
        <p>Paula Fernández</p>
         
        <span>Coordinadores docentes del proyecto</span>
        <p>Marianela Landini y Sebastián Gabriel Di Giorgio</p>

    </section>
    </div>
    
  )
}

export default Somos