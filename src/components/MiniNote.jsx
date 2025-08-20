//Preview de las notas

export default function MiniNote({ titulo, texto , handler, fechcreado , fechUpdate }) {
  function diferenciaFechas(unaFecha){
    if(unaFecha === null) return null;

    const ahora = new Date()
    const fecha = new Date(unaFecha).getTime()
    const diferencia = ahora - fecha

    if(diferencia >= 24*60*60*1000){
      return(<>Modificado hace: {Math.floor(diferencia / (24*60*60*1000))} d. </>)
    }else if(diferencia >= 60*60*1000){
      return(<>Modificado hace: {Math.floor(diferencia / (60*60*1000))} h. </>)
    } else{
      return(<>Modificado hace: {Math.floor(diferencia / (60*1000))} min. </>)
    }
  }
  return (
    <article className="mininote" onClick={handler}>
      
      <div style={{minHeight: "90%", maxHeight: "90%", overflow: "hidden"}}>
        <h3>{(titulo.length < 15) ? titulo : (titulo.slice(0,15) + "...") }</h3>
        <p>{(texto.length < 120) ? texto : (texto.slice(0,120) + "...") }</p>
      </div>
      <div style={{minHeight: "10%"}}>
        <p className="fechas" style={{ fontSize: "0.55em" }}>
          {diferenciaFechas(fechUpdate)} 
          Creado en: {new Date(fechcreado).toLocaleDateString()}
        </p>
      </div>
    </article>
  )
}