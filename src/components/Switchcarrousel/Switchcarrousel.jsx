import React, { useEffect } from 'react';
import Switch from "react-switch";
import './Switchcarrousel.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";


function Switchcarrousel({carrousel , articleID}) {

    
    /*console.log("dentro del switch");
    console.log(carrousel);
    console.log(articleID);*/

    const [checked, setChecked] = useState("false");

    const {setearCarrousel} = useUserAuth();

    useEffect(() => {
        setChecked(carrousel)
    }, []);

    const handleChange = nextChecked => {
      setChecked(nextChecked); 
      console.log('Nextcheked? '+nextChecked);
      setearCarrousel(articleID, nextChecked);
      
    };

  /*  useEffect(() => {
        console.log("cambio checked" + checked);
        setearCarrousel(articleID, checked);
    }, [checked]);*/
  
    return (

          <Switch
            onChange={handleChange}
            checked={checked}
            height={18}
            width={40}
            className="react-switch"
          />

    );
  };
  
  
  /* styles.css */
  
 

export default Switchcarrousel
