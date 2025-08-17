import {useNavigate, useParams} from "react-router-dom"
import Atras from "../assets/atras.png"
import Guardar from "../assets/guardar.png"
import notasprueba from "../repository/repository.js";
import { useState,useEffect } from "react";

export default function NewNote(){
  const navigate = useNavigate();
  const {id} = useParams();
  const [ntitulo, setTitulo] = useState("");
  const [ntexto, setTexto] = useState("");

  //[TEMPORAL] handler de publicacion de nta
  function handlerSubmit(e) {
    e.preventDefault();  
    if(id == null){
      const nuevanota = {
        id: notasprueba.length,
        titulo: ntitulo,
        texto: ntexto,
      }
      notasprueba.push(nuevanota)
    }else{
      const ind = notasprueba.findIndex((n) => n.id === Number(id));
      notasprueba[ind].titulo = ntitulo;
      notasprueba[ind].texto = ntexto;
    }
    navigate(-1);
  }

  //En caso de estar editando, carga lo existente
  useEffect(()=>{
    if(id != null){
      const nota = notasprueba.find((n) => n.id === Number(id));
      if (nota) {
        setTitulo(nota.titulo);
        setTexto(nota.texto);
      }
    }
  },[])

  return(
    <div className="page">   
      <header>
        <h1>
          <input
            type="text"
            className="input-titulo"
            placeholder="Título de la nota"
            value={ntitulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <button className="boton boton-arriba" style={{ right: "120px"  }} onClick={handlerSubmit}>
            <img src={Guardar} alt= "Guardar" />
          </button>
          <button className="boton boton-arriba" onClick={()=>navigate(-1)}>
            <img src={Atras} alt= "Volver" />
          </button>
        </h1>
      </header>
      <main>
        <form className="nota">
          <textarea
            className="input-texto"
            placeholder="Escribe tu nueva nota..."
            value={ntexto}
            onChange={e => setTexto(e.target.value)}
          />
        </form>
      </main>
    </div> 
  )
}