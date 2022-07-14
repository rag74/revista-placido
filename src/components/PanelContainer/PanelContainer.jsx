import React, { useEffect, useState } from 'react';
import './PanelContainer.css';
import Paneladmin from "../Paneladmin/Paneladmin.jsx";
import Paneluser from "../Paneluser/Paneluser.jsx";
import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';
import { useUserAuth } from "../../Context/UserAuthContext";
import { useHistory } from "react-router-dom";


function PanelContainer() {

  //const userID = localStorage.getItem("userID");  MIRAR ESTO LUEGO PARA VER COMO FUNCIONA
  // ---> Respuesta al uso: https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/

 /* const { user } = useUserAuth();
  console.log(user);*/
  const history = useHistory();
  const { user , permisos , admin} = useUserAuth();
  //console.log(permisos);
  console.log(admin);

  const localuser = JSON.parse(localStorage.getItem('localuser'));
  if (localuser) {
    console.log("User email: "+localuser.email);
    console.log("User id: "+localuser.uid);
  }

  //const userID = user.id

  //const userID = localuser.uid;
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  async function getArticulos() {
  const arr = []

    if(!permisos.includes(localuser.uid)) {

        const q = query(collection(db, "articles"), where("editor", "==", (localuser.uid)))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(item => {
        arr.push(item.data())
        })
        
        setArticulos(arr);
        setLoading(false);

    } else {  
        const querySnapshot = await getDocs(collection(db, "articles"));
        querySnapshot.forEach((item) => {
            arr.push(item.data())
            });
            arr.sort((a,b) => b.fecha - a.fecha);
            setArticulos(arr);
            setLoading(false);
          }}
  
          getArticulos()  
        
    }, []);

  console.log("aericulos recuperados panel")
  console.log(articulos);

  return (
    <main>
    <section className="panel-container">
        <div className="panel"> 
          {permisos.includes(localuser.uid) ? 
          <Paneladmin articulos={articulos} loading={loading}/> : <Paneluser articulos={articulos} loading={loading} />}
        </div>

    </section>
    </main>
  )
}

export default PanelContainer