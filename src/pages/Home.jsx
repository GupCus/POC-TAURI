import { useNavigate } from "react-router-dom"
import MiniNote from "../components/MiniNote.jsx";
import notasprueba from "../repository/repository.js";

export default function Home(){

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate('/notes/'+ id);
  };

  //acá van a ser notas que le pidamos al back, por ahora creo ejemplos
  const listanotas = notasprueba.map((n) =>
      <MiniNote key={n.id} titulo={n.titulo} texto={n.texto} handler={() => handleClick(n.id)}/>
      )

  return(
    <div className="page">
    <header>
        <h1>
          Mis notas
        </h1>
    </header>
    <div className="home-grid">
      {listanotas}
    </div>
    </div>
  )
}