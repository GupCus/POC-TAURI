import { Outlet, useLocation } from "react-router-dom"
import Lapiz from "../assets/lapiz.png"
import Nuevo from "../assets/nuevo.png"
import BotonAbajo from "../components/BotonAbajo.jsx"

export default function RootLayout(){
  const location = useLocation();
  const esNota = location.pathname.startsWith("/notes");
  return(
    esNota ? 
    (<>
      <main>
        <Outlet/>
      </main>
      <footer>
          <BotonAbajo img={Lapiz} alt= "Editar"/>
      </footer>
    </>) :
    (<>
      <main>
        <Outlet/>
      </main>
      <footer>
          <BotonAbajo style={{ width: "60px", height: "60px" }}img={Nuevo} alt= "Nueva nota"/>
      </footer>
    </>)
  )
}