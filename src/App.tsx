import React, { useState, useEffect } from "react";
import "./App.css";
import { findAllNotas, addNota, getOneNota } from "./nota/nota.controller.ts";
import { Nota } from "./nota/nota.entity.ts";
import { BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";


function App() {
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [notas, setNotas] = useState<Nota[]>([])
  const [notaId, setNotaId] = useState("");
  const [notaEncontrada, setNotaEncontrada] = useState<Nota | null>(null);

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
  const handleBuscarNota = async () => {
    try {
      const nota = await getOneNota(notaId);
      setNotaEncontrada(nota ?? null);
    } catch (error) {
      setNotaEncontrada(null);
      setMensaje("Error al buscar la nota.");
      console.error(`Error: ${error}`);
    }
  };

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
      <h2>Buscar nota por ID</h2>
      <input
        type="text"
        value={notaId}
        onChange={(e) => setNotaId(e.target.value)}
        placeholder="Ingrese el ID de la nota"
        style={{ width: "100%" }}
      />
      <button type="button" onClick={handleBuscarNota}>Buscar nota</button>
      {notaEncontrada && (
        <div style={{border: "1px solid #ccc", padding: "10px", marginTop: "10px"}}>
          <strong>{notaEncontrada.nombre}</strong>: {notaEncontrada.contenido}
        </div>
      )}
    </main>
  );
}

export default App;
