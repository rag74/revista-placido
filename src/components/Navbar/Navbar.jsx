import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from "react-router-dom";

//// GOOGLE ANALITYCS
import ReactGA from 'react-ga';
const TRACKING_ID = "UA-242695198-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
///////////////////



function Navbar() {

    const location = useLocation();

    useEffect(() => {
        console.log('Location changed navbar', location.pathname);
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, [location]);

    const [click, setClick] = useState(false);
    const [clickSub, setClickSub] = useState(false);

    const localuser = JSON.parse(localStorage.getItem('localuser'));
    
    const handleClick = () => {
        if (window.innerWidth < 1024) {
            setClick(!click)
        } else {setClick(false)}
    };
 
    const handleClickSub = () => {
            setClickSub(true);
            setTimeout(() => {setClickSub(false)}, 50)    
    };
 

    return(
        <>
        <header>
            <div className='marca'>
                <Link to="/"><img src="/img/altobondi-NVB.png" alt="altobondi" className='isotipo'/></Link>
            </div>

            <div className="burger" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            
            <nav className={click ? "menu fold" : "menu"} /*onClick={handleClick}*/>
                <ul className="menunav" onClick={handleClick}>
                    <li><Link to="/category/ficciones">Ficciones</Link></li>
                    <li><Link to="/category/poesía">Poesía</Link></li>
                    <li><Link to="/category/miradas">Miradas</Link></li>
                    <li><Link to="/category/periodismo">Periodismo</Link></li>
                    <li><Link to="/category/radio">Radio</Link></li>
                    <li><Link to="/category/altoviaje">Alto viaje</Link></li>
                    <li><Link to="/quienessomos">Qué es AltoBondi</Link></li>
                </ul>
            </nav>

        </header>

    </>

    );

}

export default Navbar
