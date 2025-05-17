import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { FirebaseError } from "firebase/app";
import { useHistory } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";
import { collection, doc, setDoc, updateDoc, getDoc, deleteDoc, getDocs } from '@firebase/firestore';
import db from '../firebase'
import { permisos } from "../data/permisos";

const userAuthContext = React.createContext();


export function UserAuthContextProvider(props) {

    const [user, setUser] = useState("");
    const history = useHistory();
    const [admin, setAdmin] = useState(false);
    const [specialExist, setSpecialExist] = useState(false)
    //const [special, setSpecial] = useState();
    var estadoUser = "";
    console.log(permisos)


    useEffect(() => {
        const localuser = JSON.parse(localStorage.getItem('localuser'));
        if (localuser) {
            setUser(localuser);
            estadoUser = "seted"
        }
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            localStorage.setItem('localuser', JSON.stringify(currentUser)); //linea agregada
            estadoUser = "changed"
        })
    }, []);


useEffect(() => {
    async function getSpecial(){
        let specialExist
        const docRef = doc(db, "especial", "especialprincipal");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
           setSpecialExist(true)
        } else {
           setSpecialExist(false)
        }
        
    }
    getSpecial()
}, []);

    useEffect(() => {
        checkAdmin();
    }, [estadoUser]);



    const checkAdmin = () => {
        const localuser = JSON.parse(localStorage.getItem('localuser'));
        //if (localuser.uid === "l7bGGeQjnJNqoaxhQ5cd9cJRAfW2") 
        if (localuser != null) {
            permisos.includes(localuser.uid) ? setAdmin(true) : setAdmin(false)
        } else { setAdmin(false) }
        console.log("CheckAdmin: " + admin)
    }

    ///FUNCIONES DE LOGUEO Y REGISTRO DE USUARIOS FIREBASE

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
        localStorage.removeItem('localuser');
        estadoUser = "deleted"
    }


    function generateID() {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return 'art-' + s4() + s4();
    }

    const guardarBorrador = async (articleData) => {
        console.log("ArticleData dentro de guardarBorrador", articleData);

        try {
            await setDoc(doc(db, "articles", articleData.articleID), articleData);
            console.log('subido!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");
        } catch (err) {

            console.log(err);
            alert(err);
        }
    }

    const guardarEspecial = async (especialData) => {
        console.log(especialData) 

        try {
            await setDoc(doc(db, "especial", "especialprincipal"), especialData);
            console.log('subido!');
            setSpecialExist(true)
            //let element = document.getElementById("miModal");
            //element.classList.add("ver");
        } catch (err) {

            console.log(err);
            alert(err);
        }
        //setSpecial(especialData)
    }

    const borrarEspecial = async ()=> {
        try { 
            await deleteDoc(doc(db, "especial", "especialprincipal"));
            console.log('borrado!');
            setSpecialExist(false)
        } catch (err) {

            console.log(err);
            alert(err);
        }
        //setSpecial()
    }

    const eliminarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "eliminado"
            });

            console.log('eliminado!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");
            /*let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { window.location.reload() }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { window.location.reload() }*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const revisarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "pendiente"
            });

            console.log('en revisión!');
            /*let element = document.getElementById("miModal");
            element.classList.add("ver");
            let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { history.push("/panel") }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { history.push("/panel") };*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }


    const publicarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "publicado",
                "fecha": new Date()
            });

            console.log('publicado!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");

            /*let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { history.push(0) }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { history.push(0) };*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const setearCarrousel = async (articleID, nextChecked) => {
        //console.log("nextChecked?", nextChecked);
        //console.log("articleID?", articleID);
        const docRef = doc(db, "articles", articleID);

        try {
            await updateDoc(docRef, {

                "carrousel": nextChecked
            });

        } catch (err) {

            console.log(err);
            alert(err);
        }
    }

    const colorCategoria = (categoria)=> {

        switch (categoria) {
            case "poesía":
                return('#4C2882');
                console.log("poesía")
              break;
            case "ficciones":
                return('#1B5E20');
                console.log("ficción")
              break;
            case "periodismo":
                return('#fdcb5c');
                console.log("periodismo")
              break;
            case "altoviaje":
                return('#FF8000');
                console.log("altoviaje")
              break;
            case "miradas":
                return('#e21687');
                console.log("miradas")
              break;
            case "radio":
                return('#0F52BA');
                console.log("radio")
              break;
            
            default:
                return('#29d579');
                console.log("default")
              break;
            }
    }


    function esHoraVivo() {
        // Obtenemos la fecha y hora actual del navegador
        const fechaActual = new Date();
      
        // Convertir la fecha y hora a UTC-3 (horario de Argentina)
        const offset = -3; // Ajusta este valor si el huso horario cambia
        fechaActual.setHours(fechaActual.getHours());
        
      
        // Extraemos los componentes de la fecha y hora
        const dia = fechaActual.getDate();
        console.log(dia)
        const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
        console.log(mes)
        const hora = fechaActual.getHours();
        console.log(hora)
        const minutos = fechaActual.getMinutes();
        console.log(minutos)
      
        // Comparamos si la fecha y hora están dentro del rango especificado
        return (
            (dia === 24 && mes === 10) ||
            (dia === 31 && mes === 10) ||
            (dia === 7 && mes === 11)
          ) && (
            (hora >= 13 && hora < 14 && minutos >= 30) ||
            (hora >= 14 && hora < 15) 
            )
      }

    const value = useMemo(() => {
        return ({
            // poner const y func a pasar
            user,
            logIn,
            logOut,
            signUp,
            generateID,
            guardarBorrador,
            guardarEspecial,
            borrarEspecial,
            setearCarrousel,
            eliminarArticulo,
            revisarArticulo,
            publicarArticulo,
            checkAdmin,
            colorCategoria,
            esHoraVivo,
            specialExist,
            permisos,
            admin,
        })

    }, [user,specialExist])


    return <userAuthContext.Provider value={value} {...props} />
}



export function useUserAuth() {
    const context = React.useContext(userAuthContext);
    return context;
}

