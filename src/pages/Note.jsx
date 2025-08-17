import { useNavigate, useParams } from "react-router-dom"
import Atras from "../assets/atras.png"
import Basura from "../assets/basura.png"
import BotonAbajo from "../components/BotonAbajo.jsx";
import notasprueba from "../repository/repository.js";

export default function Note(){
  const {id} = useParams();
  const navigate = useNavigate();

  //[TEMP HASTA QUE SE CREE EL BACK] acá encuentrá la nota por el id de la ruta
  const nota = notasprueba.find((n)=> n.id === Number(id))

  //[TEMP HASTA QUE SE CREE EL BACK] elimina la nota
  function handlerDeletion(){
    const ind= notasprueba.findIndex((n)=> n.id === Number(id))
    notasprueba.splice(ind,1);
    navigate(-1);
  }

  return(
    <div className="page">   
      <header>
        <h1 style={{ display: "flex", gap: "0" }}>
          {nota.titulo}
          <button className="boton boton-arriba" style={{ right: "120px"  }} onClick={handlerDeletion}>
            <img src={Basura} alt= "Volver" />
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