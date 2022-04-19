import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    const [click, setClick] = useState(false);
    const [clickSub, setClickSub] = useState(false);
    
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
        <header>
            <div className='marca'>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="981.000000pt" height="980.000000pt" viewBox="0 0 981.000000 980.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <metadata>
                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                    </metadata>
                    <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"
                    fill="currentColor" stroke="none">
                    <path d="M1745 9779 c-158 -8 -230 -28 -364 -100 -164 -88 -298 -213 -408
                    -380 -72 -110 -97 -174 -113 -287 -14 -97 -29 -732 -30 -1222 0 -206 -3 -485
                    -7 -620 l-6 -246 -81 -28 c-344 -120 -569 -345 -680 -679 -41 -125 -49 -229
                    -43 -542 7 -308 15 -359 69 -453 67 -117 212 -244 326 -284 65 -23 184 -38
                    304 -38 47 0 93 -3 102 -6 14 -6 16 -134 16 -1348 1 -1365 9 -1829 34 -1969
                    24 -131 117 -302 231 -425 119 -129 321 -257 472 -298 l61 -17 7 -96 c11 -166
                    24 -274 40 -327 20 -68 78 -154 157 -232 75 -74 132 -114 208 -145 54 -22 61
                    -22 629 -25 l573 -3 97 53 c135 74 213 153 274 278 50 101 67 175 67 291 0 36
                    3 94 6 128 l7 61 1217 0 1217 0 7 -61 c3 -34 6 -94 6 -133 1 -104 23 -213 59
                    -283 63 -125 180 -236 317 -300 l59 -28 580 0 580 0 79 38 c65 31 97 55 171
                    130 50 51 103 113 118 139 44 77 64 180 82 429 l6 85 46 13 c334 89 663 422
                    719 728 25 139 33 609 34 1974 0 1210 2 1337 16 1343 9 3 55 6 102 6 207 0
                    310 27 442 115 83 55 132 113 202 241 l49 88 6 301 c9 421 -8 526 -112 735
                    -113 225 -305 398 -541 490 -57 22 -114 42 -127 45 l-24 6 -6 232 c-4 128 -7
                    399 -7 602 -1 539 -17 1163 -34 1272 -23 152 -108 303 -260 461 -101 105 -215
                    181 -373 249 l-123 53 -3157 -2 c-1737 0 -3221 -5 -3298 -9z m5611 -831 c145
                    -50 303 -205 370 -365 27 -63 29 -77 29 -198 -1 -205 -45 -317 -174 -446 -62
                    -62 -95 -86 -179 -127 l-104 -52 -2383 0 -2384 0 -75 34 c-156 71 -262 166
                    -329 293 -46 89 -67 175 -67 285 0 179 43 279 188 430 111 115 145 132 309
                    148 171 17 137 16 2498 16 2104 -1 2253 -2 2301 -18z m452 -1653 c158 -79 289
                    -222 332 -363 36 -115 42 -325 38 -1382 l-3 -995 -52 -100 c-89 -170 -158
                    -237 -330 -324 l-103 -51 -2780 0 -2780 0 -105 52 c-127 63 -185 106 -246 181
                    -62 77 -98 154 -118 251 -14 72 -16 200 -16 1151 1 1174 0 1169 60 1292 37 75
                    179 221 252 261 78 41 126 52 273 61 69 5 1332 9 2806 10 l2682 1 90 -45z
                    m-4991 -4056 c123 -38 193 -79 273 -159 87 -86 131 -162 160 -276 53 -207 -5
                    -431 -149 -575 -123 -122 -237 -168 -436 -176 -123 -5 -135 -4 -193 20 -163
                    65 -286 174 -351 310 -50 104 -65 181 -59 305 15 294 208 507 519 572 60 12
                    155 4 236 -21z m4466 6 c225 -47 405 -225 463 -455 22 -88 14 -250 -16 -339
                    -68 -194 -258 -359 -453 -391 -98 -17 -256 -8 -332 19 -175 63 -330 237 -379
                    427 -20 78 -21 212 -1 289 57 224 238 402 456 449 84 19 178 19 262 1z"/>
                    </g>
                    </svg>
            <h1><Link to="/">altoBONDI</Link></h1>
            </div>

            <div className="burger" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            
            <nav className={click ? "menu fold" : "menu"} /*onClick={handleClick}*/>
                <ul className="menunav" onClick={handleClick}>
                    <li><Link to="/category/Ficciones">Ficciones</Link></li>
                    <li><Link to="/category/Poesía">Poesía</Link></li>
                    <li><Link to="/category/Miradas">Miradas</Link></li>
                    <li><Link to="/category/Periodismo">Periodismo</Link></li>
                    <li><Link to="/category/Podcast">Podcast</Link></li>
                    <li><Link to="/category/Audiolibro">Audiolibro</Link></li>
                    <li>Que es AltoBondi</li>
                </ul>
            </nav>


        </header>

    );

}

export default Navbar

/*
<Link to="/">   
<i className="fas fa-book-open libro"></i>
<h1>BOOKSTORE</h1>
</Link>

<div className="burger" onClick={handleClick}>
<i className={click ? "fas fa-times" : "fas fa-bars"}></i>
</div>

<nav className={click ? "menu fold" : "menu"} onClick={handleClick}>
<ul className="menunav">
    <li><Link to="/category/novedades">Novedades</Link></li>
    <li><Link to="/category/mas vendidos">Los más vendidos</Link></li>
    <li><Link to="/" >Catálogo <i class="fas fa-caret-down"></i></Link>
        <ul className={clickSub ? "submenu none" : "submenu"} onClick={handleClickSub}>
            <li><Link to="/category/literatura argentina" >Literatura Argentina</Link></li>
            <li><Link to="/category/internacional" >Internacional</Link></li>
            <li><Link to="/category/novela">Novela</Link></li>
            <li><Link to="/category/clásicos">Clásicos</Link></li>
        </ul>
    </li>
    <li><Link to="/contacto">Contacto</Link></li>
</ul>
</nav>
*/