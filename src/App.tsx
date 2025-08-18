import React, { useState } from "react";
import "./App.css";
import { allNotas, crearNota } from "./lib/crearnota.ts";

function App() {
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [notas, setNotas] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tituloCorregido = titulo.endsWith('.json') ? titulo : `${titulo}.json`
      // Guarda la nota con nombre indicado, con '.json' al final
      await crearNota(tituloCorregido, contenido);
      setMensaje("¡Nota guardada correctamente!");
      setContenido("");
    } catch (error) {
      setMensaje("Error al guardar la nota.");
    }
  };
  const obtenerNotas = async () => {
    const nombres = await allNotas()
    setNotas(nombres ?? [])
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
        {notas.map((nombre) => (
          <li key={nombre}>{nombre}</li>
        ))}
      </ul>
      <div></div>
    </main>
  );
}

export default App;
