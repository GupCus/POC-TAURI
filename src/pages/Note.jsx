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
            setNota({id: id , titulo: n.nombre, texto:n.contenido, fechUpdate:n.updatedAt, fechcreado:n.createdAt})
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
      getNota();
    }
  }, []);

  //elimina la nota
  async function handlerDeletion(){
    try {
      await deleteNota(id);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    navigate(-1);
  }

  function diferenciaFechas(unaFecha){
    if(unaFecha === null) return null;

    const ahora = new Date()
    const fecha = new Date(unaFecha).getTime()
    const diferencia = ahora - fecha

    if(diferencia >= 24*60*60*1000){
      return(<>Modificado hace: {Math.floor(diferencia / (24*60*60*1000))} d. </>)
    }else if(diferencia >= 60*60*1000){
      return(<>Modificado hace: {Math.floor(diferencia / (60*60*1000))} h. </>)
    } else{
      return(<>Modificado hace: {Math.floor(diferencia / (60*1000))} min. </>)
    }
  }

  return(
    <div className="page">   
      <header>
        <h1>
          {nota.titulo}
        </h1>
        <div>
        <p className="fechas" style={{ fontSize: "0.8em" }}>
          {diferenciaFechas(nota.fechUpdate)} 
          Creado en: {new Date(nota.fechcreado).toLocaleDateString()}
        </p>
        </div>
        <button className="boton boton-arriba" style={{ right: "120px"  }} onClick={handlerDeletion}>
          <img src={Basura} alt= "Eliminar" />
        </button>
        <button className="boton boton-arriba" onClick={()=>navigate(-1)}>
          <img src={Atras} alt= "Volver" />
        </button>
      </header>
      <main>
        <div className="nota">
          {nota.texto}
        </div>
      </main>
    </div> 
  )
}