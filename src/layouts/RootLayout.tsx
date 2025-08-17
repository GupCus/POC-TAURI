import { Outlet } from "react-router-dom"
import Lapiz from "../assets/lapiz.png"

export default function RootLayout(){
  return(
    <>
      <header>
        <h1>
          Mis notas
        </h1>
      </header>
      <main>
        <Outlet/>

      </main>
      <footer>
          <button className="boton-debajo"> <img src={Lapiz} alt="nuevo" /> </button>
      </footer>
    </>
  )
}