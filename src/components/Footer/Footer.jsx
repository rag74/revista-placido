import React from "react";
import { Link } from "react-router-dom";
import ".//Footer.css";

function Footer() {


    return (
        <footer>
            <div className="footer">
                <div className="placido">
                    <div>
                        <a href="https://placidomarin.edu.ar/" target="_blank" rel="noopener noreferrer">
                        <img src="/img/logoplacidochico.png" alt="" id="logoplacido" />
                        </a>
                    </div>
                    <div>
                        <a href="https://placidomarin.edu.ar/" target="_blank" rel="noopener noreferrer">
                        <p>Revista cultural</p>
                        <p>del Instituto Plácido Marín</p>
                        <p><i class="fa-sharp fa-solid fa-location-dot"></i> República de Mataderos</p>
                        </a>
                    </div>
                </div>

                <div className="contacto-footer">
                   <div> 
                       <a href="https://twitter.com/_altobondi_" target="_blank" rel="noopener noreferrer"><p><i class="fa-brands fa-twitter"></i> _altobondi_</p></a>
                        <a href="https://www.instagram.com/altobondi.revista/" target="_blank" rel="noopener noreferrer"><p><i class="fa-brands fa-instagram"></i> revista.altobondi</p></a>
                        <a href="mailto:altobondi@placidomarin.edu.ar"><p><i class="fa-solid fa-envelope"></i> altobondi@placidomarin.edu.ar</p></a> 
                    </div>
                    <div>
                        <img src="/img/altobondi-logo.png" alt="" id="bondi" />
                    </div>
                </div>
            </div>
            <div className="rag">
                
            <a href="mailto:rguarch@gmail.com"><p>diseño y programación </p></a>
            <a href="mailto:rguarch@gmail.com"><img src="/img/poligonoraggris.png" alt="logo RAG" /></a>
                
            </div>   
        </footer>
    )

}

export default Footer;