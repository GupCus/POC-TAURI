import { useNavigate } from "react-router-dom"
import MiniNote from "../components/MiniNote.jsx";
import notasprueba from "../repository/repository.js";
import { findAllNotas } from "../nota/nota.controller.js";
import { useState,useEffect } from "react";


export default function Home(){

  const [listnota, setListnota] = useState([]);
  const [listafinal, setListafinal] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate('/notes/'+ id);
  };

  useEffect(() => {
    async function fetchNotas() {
      const notas = await findAllNotas();
      setListnota(notas ?? []);
    }
    fetchNotas()
  }, []);

  return(
    <div className="page">
    <header>
        <h1>
          Mis notas
        </h1>
    </header>
    <div className="home-grid">
      {(listnota.map((n) => <MiniNote key={n.id} titulo={n.nombre} texto={n.contenido} handler={() => handleClick(n.id)}/>))}
    </div>
    </div>
  )
}