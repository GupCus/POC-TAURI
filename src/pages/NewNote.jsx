import {useNavigate, useParams} from "react-router-dom"
import Atras from "../assets/atras.png"
import Guardar from "../assets/guardar.png"
import { useState,useEffect } from "react";
import { addNota, putNota, getOneNota } from "../nota/nota.controller.js";

export default function NewNote(){
  const navigate = useNavigate();
  const {id} = useParams();
  const [ntitulo, setTitulo] = useState("");
  const [ntexto, setTexto] = useState("");

  //handler de publicacion de nota
  async function handlerSubmit(e) {
    e.preventDefault();  
    if(id == null){
      try {
        await addNota(ntitulo, ntexto);
        console.log(`Cargado exitosamente`)
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    }else{
      try {
        await putNota(id, ntitulo, ntexto);
        console.log(`Modificar nota`)
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
    navigate(-1)
  }

  //En caso de estar editando, carga lo existente
  useEffect(() => {
    if (id != null) {
      async function getNota() {
        try {
          const nota = await getOneNota(id);
          if (nota) {
            setTitulo(nota.nombre);
            setTexto(nota.contenido);
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
      getNota();
    }
  }, []);

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