import { Nota } from "./nota.entity.ts"
import { BaseDirectory, create, readDir, readTextFile } from "@tauri-apps/plugin-fs"


async function contarNotas() {
    const arrayNotas = await readDir('', {baseDir: BaseDirectory.AppData})
    return arrayNotas.length
}

export const addNota = async(nomb: string, contenido: string): Promise<void> => {
    //const id = Date.now()
    const idNota = await contarNotas()
    const nota = new Nota(
            idNota,
            nomb,
            contenido
        )

    try{
        const archivo = await create(`${idNota}.json`, {
            baseDir: BaseDirectory.AppData
        })
        await archivo.write(new TextEncoder().encode(JSON.stringify(nota, null, 2)))
        await archivo.close()
        console.log(`Nota guardada correctamente en 'AppData/${idNota}'`)
    } catch(error) {
        console.log(`Internal error: ${error}`)
    }
}

export const findAllNotas = async(): Promise<Nota[] | undefined> => {
    try{
        const archivos = await readDir('',{
            baseDir: BaseDirectory.AppData
        });
        const notas: Nota[] = [];
        for (const archivo of archivos) {
            const contenidoArchivo = await readTextFile(archivo.name, {
                baseDir: BaseDirectory.AppData
            });
            try {
                const notaObj = JSON.parse(contenidoArchivo);
                notas.push(notaObj)
                //notas.push(new Nota(notaObj.id, notaObj.nombre, notaObj.contenido));
            } catch(error) {
                console.log(`Archivo no json detectado`)
                console.error(`${error}`)
            }
        }
        return notas;
        } catch(error) {
        console.error(`Error leyendo la carpeta:  ${error}`)
        return []
    }
}

export const getOneNota = async(idB: number): Promise<Nota | undefined> => {
    
    
    
    return 
}