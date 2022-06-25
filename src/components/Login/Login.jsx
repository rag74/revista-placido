import React, { useEffect, useState } from 'react';
import './Login.css';
import {useUserAuth} from '../../Context/UserAuthContext';
import { useHistory } from "react-router-dom";





function Login() { //Login es un componente que se encarga de mostrar el formulario de login

    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const {logIn} = useUserAuth();
    const history = useHistory();

    //const submitLogin = () => {console.log(userEmail, userPassword)}
    const [error, setError] = useState("");

    const submitLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
          await logIn(userEmail, userPassword);
          history.push("/panel");
        } catch (err) {
          setError(err.message);
          console.log(error)
        }
      };
    
    
    return (
        <main>
            <div className="login-form">
                <label htmlFor="email">Correo electrónico</label>
                <input type="text" name="email" id="email" onChange={(e)=> setUserEmail(e.target.value)}/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" onChange={(e)=> setUserPassword(e.target.value)}/>
                <div className='button' onClick={submitLogin}>Entrar</div>
            </div>
                {error && <div className='error'><p>usuario y/o contrseña invalidos</p></div>}
        </main>
    )

}

export default Login;