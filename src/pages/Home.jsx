import { useNavigate } from "react-router-dom"
import MiniNote from "../components/MiniNote.jsx";

const navigate = useNavigate();

const handleClick = (id) => {
  navigate(`/notes/${id}`);
};

export default function Home(){

  //acá van a ser notas que le pidamos al back, por ahora creo ejemplos
  const notasprueba = [
    { id: 1,  titulo: "Ideas para la app", texto: "Búsqueda, etiquetas, modo oscuro." },
    { id: 2,  titulo: "Compras",           texto: "Leche, pan, huevos, café, frutas." },
    { id: 3,  titulo: "Tareas de hoy",     texto: "Responder mails, revisar PRs, planificar sprint." },
    { id: 4,  titulo: "Reunión cliente",   texto: "Mié 10:00. Alcance, tiempos, presupuesto." },
    { id: 5,  titulo: "Películas",         texto: "Dune 2, Oppenheimer, The Creator." },
    { id: 6,  titulo: "Lecturas",          texto: "Docs Tauri, React Router, accesibilidad." },
    { id: 7,  titulo: "Recordatorio",      texto: "Hacer backup del proyecto." },
    { id: 8,  titulo: "Receta rápida",     texto: "Pasta con pesto y tomates cherry." },
    { id: 9,  titulo: "Ideas UI",          texto: "Botón flotante y grid de 3 columnas." },
    { id: 10, titulo: "Cita",              texto: "La simplicidad es la máxima sofisticación." },
    { id: 11, titulo: "Viaje",             texto: "Pasajes y hospedaje para septiembre." },
    { id: 12, titulo: "Deportes",          texto: "Correr 5km martes y jueves." },
  ];
  const listanotas = notasprueba.map((n) =>
      <MiniNote id={n.id} titulo={n.titulo} texto={n.texto} handler={() => handleClick(n.id)}/>
      )

  return(
    <div className="home-grid">
      {listanotas}
    </div>
  )
}