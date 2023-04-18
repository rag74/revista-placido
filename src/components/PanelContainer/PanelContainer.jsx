import React, { useEffect, useState } from 'react';
import './PanelContainer.css';
import Paneladmin from "../Paneladmin/Paneladmin.jsx";
import Paneluser from "../Paneluser/Paneluser.jsx";
import { collection, query, getDoc, getDocs, where, doc } from 'firebase/firestore';
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
  const [special, setSpecial] = useState();
   //const userID = localuser.uid;
   const [articulos, setArticulos] = useState([]);
   const [loading, setLoading] = useState(true);



  //console.log(permisos);
  console.log(admin);
  console.log("Document panelcontainer special:");
  console.log(special);

  

  const localuser = JSON.parse(localStorage.getItem('localuser'));
  if (localuser) {
    console.log("User email: "+localuser.email);
    console.log("User id: "+localuser.uid);
  }

  //const userID = user.id

 


  useEffect(() => {
  async function getArticulos() {
  let arr = []

    if(!permisos.includes(localuser.uid)) {

        const q = query(collection(db, "articles"), where("editor", "==", (localuser.uid)))
        let querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(item => {
        arr.push(item.data())
        })
        
        setArticulos(arr);
        setLoading(false);

    } else {
      
      const docRef = doc(db, "especial", "especialprincipal");
      const docSnap = await getDoc(docRef);
      console.log("console log DOCSNAP.DATA")
      console.log(docSnap.data())
      setSpecial(docSnap.data())
       /* if (docSnap.exists()) {
          console.log("exists!")
          let querySnapshot2 = await getDocs(collection(db, "especial"));
          querySnapshot2.forEach((item) => {
          arr.push(item.data())
          setSpecial(arr)
          });}*/  

        arr = []
        let querySnapshot = await getDocs(collection(db, "articles"));
        querySnapshot.forEach((item) => {
            arr.push(item.data())
            });
            arr.sort((a,b) => b.fecha - a.fecha);
            setArticulos(arr);


            setLoading(false); 
          }}
          getArticulos()  
        
    }, []);

  console.log("articulos recuperados panel container")
  console.log(articulos);
  console.log(special);
  console.log(permisos)

  return (
    <main>
    <section className="panel-container">
        <div className="panel"> 
          {permisos.includes(localuser.uid) ? 
          <Paneladmin articulos={articulos} loading={loading} special={special}/> : <Paneluser articulos={articulos} loading={loading}/>}
        </div>

    </section>
    </main>
  )
}

export default PanelContainer