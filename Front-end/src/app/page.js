'use client';

import Image from "next/image";
import styles from "./Home.css";
import {useEffect, useState} from "react";
import axios from 'axios';

export default function Home() {

  const [text,set_text] = useState();

  useEffect(()=>{
    axios.get("http://localhost:5000")
    .then(({data})=>{
      console.log(data.message);
      set_text(data.message);
    })
    .catch(err=>{
      console.log(err.message);
    });
  },[]);

  return (
    <div className="Home">
      <p className="res_from_api">{text}</p>
    </div>
  );
}
