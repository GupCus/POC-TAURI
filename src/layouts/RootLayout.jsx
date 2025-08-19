import { Outlet, useLocation, useNavigate, useParams} from "react-router-dom"
import Lapiz from "../assets/lapiz.png"
import Nuevo from "../assets/nuevo.png"
import BotonAbajo from "../components/BotonAbajo.jsx"

export default function RootLayout(){
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams();
  const esNota = location.pathname.startsWith("/notes");

    if(!esNota){
      return(<>
        <main>
          <Outlet/>
        </main>
        <footer>
            <BotonAbajo style={{ width: "60px", height: "60px" }}img={Nuevo} alt= "Nueva nota" handler={()=>navigate('notes/nueva')}/>
        </footer>
      </>)
    }else if(!location.pathname.includes("nueva")){    
      return(<>
        <main>
          <Outlet/>
        </main>
        <footer>
            <BotonAbajo img={Lapiz} alt= "Editar" handler={()=>navigate('notes/nueva/'+id)}/>
        </footer>
      </>)
    }else{
        return(<>
        <main>
          <Outlet/>
        </main>
      </>)
    }
}