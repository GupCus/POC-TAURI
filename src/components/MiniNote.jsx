export default function MiniNote({key,titulo="Lorem impsum" ,texto="dolor onet" , handler}){
    return(
      <article className="mininote" onClick={handler} key={key}>
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </article>
    )
}