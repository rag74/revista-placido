import React, { useEffect, useState } from 'react';
import "./ArticleListContainer.css";
import { collection, query, getDocs, where } from 'firebase/firestore';
import db from '../../firebase';

import { useParams } from "react-router-dom";

function ArticleListContainer() {

    const {categoria} = useParams();

    const [articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(true);
   
  
    useEffect(() => {

      async function getArticulos() {
          const arr = []
  
          if(categoria!=null) {
      
              const q = query(collection(db, "articles"), where("categories", "array-contains", (categoria)))
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
                  
                  setArticulos(arr);
                  setLoading(false);
          }}
  
        getArticulos()  
      
  }, [categoria]);
  
  console.log(articulos);

    return (

        <div className="container"></div>

    )

}

export default ArticleListContainer;

