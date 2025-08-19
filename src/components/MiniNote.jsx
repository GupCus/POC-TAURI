//Preview de las notas

export default function MiniNote({ key, titulo, texto , handler }) {

  return (
    <article className="mininote" onClick={handler} key={key}>
      <h3>{(titulo.length < 15) ? titulo : (titulo.slice(0,15) + "...") }</h3>
      <p style={{whiteSpace: "pre-line"}}>{(texto.length < 120) ? texto : (texto.slice(0,120) + "...") }</p>
    </article>
  )
}