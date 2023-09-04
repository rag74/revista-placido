import React, { useEffect } from 'react';
import Switch from "react-switch";
import './Switchcarrousel.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";


function Switchcarrousel({carrousel , articleID, permisos}) {

    
    /*console.log("dentro del switch");
    console.log(carrousel);
    console.log(articleID);*/

    const [checked, setChecked] = useState("false");

    const {setearCarrousel} = useUserAuth();

    const localuser = JSON.parse(localStorage.getItem('localuser'))
    

    useEffect(() => {
        setChecked(carrousel)
    }, []);

    const handleChange = nextChecked => {
      setChecked(nextChecked); 
      console.log('Nextcheked? '+nextChecked);
      setearCarrousel(articleID, nextChecked);
      
    };

  
    return (

          <Switch
            onChange={handleChange}
            checked={checked}
            height={18}
            width={40}
            className="react-switch"
            disabled={permisos.includes(localuser.uid) ? false : true }
          />

    );
  };
  
  
  /* styles.css */
  
 

export default Switchcarrousel
