import React, { useState } from "react";
import "./App.css";
import { crearJSON } from "./lib/crearnota.ts";

function App() {
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Guarda la nota con un nombre único (puedes cambiar la lógica si lo deseas)
      const filename = `nota_${Date.now()}.json`;
      await crearJSON(filename, contenido);
      setMensaje("¡Nota guardada correctamente!");
      setContenido("");
    } catch (error) {
      setMensaje("Error al guardar la nota.");
    }
  };

  return (
    <main className="container">
      <h1>Welcome to MiniNotes</h1>

      <div className="row">
        <form onSubmit={handleSubmit}>
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
    </main>
  );
}

export default App;
