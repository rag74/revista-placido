import React, { useState } from 'react'
import './CreateUser.css'
import {useUserAuth} from '../../Context/UserAuthContext';
import Updating from '../Updating/Updating';
import { auth } from '../../firebase';


function CreateUser() {

    const [newuserEmail, setnewUserEmail] = useState("");
    const [newuserPassword, setnewUserPassword] = useState("");
    const [error , setError] = useState("")
    const {signUp , checkAdmin} = useUserAuth();

    const [modaltitle, setModaltitle] = useState('');
    const [modalmessage, setModalmessage] = useState('');
    const [buttonmessage, setbuttonmessage] = useState('');
    const [linkmodal, setLinkmodal] = useState('');
    const [closemodal, setClosemodal] = useState('');

    const [updating , setUpdating] = useState(false)


    const hideCreateUser = ()=> { let elemento = document.getElementById("create-user");
                                elemento.classList.add("none");
                                document.getElementById("email").value="";
                                document.getElementById("password").value="";
                            }
    
                            
    const handleVer = () => {   let element = document.getElementById("miModal2");
                                element.classList.remove("ver");
                                hideCreateUser()
                        }

    const submitSignUp= async (e) => {
        setError("");
        console.log(auth.currentUser)
        let originalUser = auth.currentUser
        setUpdating(true)
        try {
            await signUp(newuserEmail, newuserPassword);
            setModaltitle("Usuario creado!")
            setModalmessage("El usuario "+newuserEmail+" (contraseña: "+newuserPassword+") fue creado correctamente. Ya esta habilitado para usarse")
            setbuttonmessage("cerrar")
            setLinkmodal("#")
            setClosemodal("#")
            console.log("usuario creado")
            auth.updateCurrentUser(originalUser)
            localStorage.setItem('localuser', JSON.stringify(originalUser))
            setUpdating(false)
            checkAdmin()
            let element = document.getElementById("miModal2");
            element.classList.add("ver");
 
        } catch (err) {
            setUpdating(false)
            setError(err.message);
            console.log(error)
            alert(error)
        }
        };


  return (
   <> 
    <div className='createUser'>
    <input type="text" placeholder='correo electrónico' name="email" id="email" onChange={(e)=> setnewUserEmail(e.target.value)}/>
    <input type="text" placeholder='contraseña (min. 8 caractéres)' name="password" id="password" onChange={(e)=> setnewUserPassword(e.target.value)}/>
    <div className='buttonNew' onClick={submitSignUp}>OK</div>
    <i class="fas fa-times" onClick={hideCreateUser}></i>
    </div>

    <div id="miModal2" class="modal" onClick={handleVer}>
    <div class="modal-contenido">
                    <div className="cabeceraModal">
                        <h2>{modaltitle}</h2>
                        <a href={closemodal}><i className="fas fa-times close" id="closeModal" onClick={handleVer}></i></a>
                        {/*<Link to={`${closemodal}`}><i className="fas fa-times close" id="closeModal" onClick={handleVer}></i></Link>*/}
                    </div>
                    <hr className="divisorModal" />
                    <div className="mensajeModal">
                        <p>{modalmessage}</p>
                    </div>
                    <a href={linkmodal}><div className='buttonModal' id='buttonModal'>{buttonmessage}</div></a>
                    {/*<Link to={`${linkmodal}`}><div className='buttonModal' id='buttonModal'>{buttonmessage}</div></Link>*/}
    </div>  
    </div>  
    
    
    {updating && <Updating />}     
   </>
  )
}

export default CreateUser