export default function BotonAbajo({img,alt,handler,style}){
return(<button className="boton boton-debajo" onClick={handler} > <img src={img} alt={alt} style={style} /> </button>)
}