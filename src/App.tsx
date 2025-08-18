import React, { useState, useEffect } from "react";
import "./App.css";
import { findAllNotas, addNota } from "./nota/nota.controller.ts";
import { Nota } from "./nota/nota.entity.ts";
import { BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";


function App() {
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [notas, setNotas] = useState<Nota[]>([])

  useEffect(() => {
    const inicializarApp = async () => {
      try{
        const appDataPath = await BaseDirectory.AppData
        const folderExists = await exists('',{
          baseDir: appDataPath
        })
        console.log(`Checkeando existencia de la carpeta de la app...`)
        console.log(`${folderExists}`)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tituloCorregido = titulo.endsWith('.json') ? titulo : `${titulo}.json`
      // Guarda la nota con nombre indicado, con '.json' al final
      await addNota(tituloCorregido, contenido);
      setMensaje("¡Nota guardada correctamente!");
      setContenido("");
    } catch (error) {
      setMensaje("Error al guardar la nota.");
      console.error(`Error: ${error}`)
    }
  };
  const obtenerNotas = async () => {
    const notasArray = await findAllNotas()
    setNotas(notasArray ?? [])
  }

  return (
    <main className="container">
      <h1>Welcome to MiniNotes</h1>

      <div className="row">
        <form onSubmit={handleSubmit}>
          <textarea 
            value={titulo} 
            placeholder="Nombre de su nota"
            onChange={(e) => setTitulo(e.target.value)}
            rows={1}
            style={{width: "100%"}}
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escribe tu nota aquí..."
            rows={5}
            style={{ width: "100%" }}
          />
          <button type="submit">Guardar nota</button>
          {mensaje && <div>{mensaje}</div>}
        </form>
      </div>
      <h2>notas existentes</h2>
      <button type="button" onClick={obtenerNotas}>obtener notas</button>
      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>
            <strong>{nota.nombre}</strong>: {nota.contenido}
          </li>
        ))}
      </ul>
      <div></div>
    </main>
  );
}

export default App;
