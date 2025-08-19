import Atras from "../assets/atras.png"
import Basura from "../assets/basura.png"
import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import { getOneNota,deleteNota } from "../nota/nota.controller.ts";


export default function Note(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [nota,setNota] = useState({});

  //acá encuentrá la nota por el id de la ruta
  useEffect(() => {
    if (id != null) {
      async function getNota() {
        try {
          const n = await getOneNota(id);
          if (n) {
            setNota({id: id , titulo: n.nombre, texto:n.contenido})
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
      getNota();
    }
  }, []);

  //[TEMP HASTA QUE SE CREE EL BACK] elimina la nota
  async function handlerDeletion(){
    try {
      await deleteNota(id);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    navigate(-1);
  }

  return(
    <div className="page">   
      <header>
        <h1 style={{ display: "flex", gap: "0" }}>
          {nota.titulo}
          <button className="boton boton-arriba" style={{ right: "120px"  }} onClick={handlerDeletion}>
            <img src={Basura} alt= "Eliminar" />
          </button>
          <button className="boton boton-arriba" onClick={()=>navigate(-1)}>
            <img src={Atras} alt= "Volver" />
          </button>
        </h1>
      </header>
      <main>
        <div className="nota">
          {nota.texto}
        </div>
      </main>
    </div> 
  )
}