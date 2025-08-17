export default function MiniNote({id,titulo="Lorem impsum" ,texto="dolor onet" , handler}){
    return(
      <article className="mininote"onClick={handler} key={id}>
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </article>
    )
}