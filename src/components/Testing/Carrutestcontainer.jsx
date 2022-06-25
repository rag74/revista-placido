import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel, { CarouselItem } from "./Carouseltest";
import "./Carrutest.css"
import Carrutest from "./Carrutest.jsx"
import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';


export default function Carrutestcontainer() {

  const [articulos, setArticulos] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    async function getArticulos() {
          const arr = []
   
          const querySnapshot = await getDocs(collection(db, "articles"));
          querySnapshot.forEach((item) => {
              arr.push(item.data())
              });
              arr.sort((a,b) => b.fecha - a.fecha);
              setArticulos(arr);
              setLoading(false);
            }
    
            getArticulos()  
          
      }, []);

  console.log(articulos)
  return (
  <>    
    <div >
    <Carrutest articulos={articulos} loading={loading}/>
    </div>

</>
  );
}