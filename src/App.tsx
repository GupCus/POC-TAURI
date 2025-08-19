import { Routes,Route } from "react-router-dom";
import { useEffect } from "react";
import { BaseDirectory,mkdir,exists } from "@tauri-apps/plugin-fs";
import "./styles/App.css";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Note from "./pages/Note.jsx";
import NewNote from "./pages/NewNote.jsx";


function App() {
  
    useEffect(() => {
    const inicializarApp = async () => {
      try{
        const appDataPath = await BaseDirectory.AppData
        const folderExists = await exists('',{
          baseDir: appDataPath
        })
        console.log(`Checkeando existencia de la carpeta de la app...`)
        if(!folderExists) {
          await mkdir('', {baseDir: appDataPath})
          console.log(`Carpeta creada.`)
        } else {
          console.log(`Carpeta ya existe.`)
        }
      } catch(error) {
        console.error(`Error al ejecutar inicializarApp(): ${error}`)
      }
    }
    inicializarApp()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        <Route path="notes">
          <Route path=":id" element={<Note/>}/>
          <Route path="nueva" element={<NewNote/>}/>
          <Route path="nueva/:id" element={<NewNote/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/*  Componente principal App
    Acá se definen las vistas y el layout común con react router dom.
    La vista principal es el componente Home
    Estructura directorios:
      assets/ -> recursos varios
      components/ -> componentes React que no son vistas por si mismas
      pages/ -> Vistas
      styles/ -> estilos css de todos los componentes

*/
