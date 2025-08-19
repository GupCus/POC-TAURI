import { Nota } from "./nota.entity.ts"
import { BaseDirectory, create, readDir, readTextFile, remove } from "@tauri-apps/plugin-fs"


async function contarNotas() {
    const arrayNotas = await readDir('', {baseDir: BaseDirectory.AppData})
    return arrayNotas.length
} //arreglar vulnerabilidad

export const addNota = async(nomb: string, contenido: string): Promise<void> => {
    //const id = Date.now()
    const idNota = await contarNotas()
    const nota = new Nota(
            idNota.toString(),
            nomb,
            contenido
        )
    try{
        const archivo = await create(`${idNota}.json`, {baseDir: BaseDirectory.AppData})
        await archivo.write(new TextEncoder().encode(JSON.stringify(nota, null, 2)))
        await archivo.close()
        console.log(`Nota guardada correctamente en 'AppData/${idNota}.json'`)
    } catch(error: any) {
        console.error(`Error al crear la nota: ${error}`)
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
            } catch(error: any) {
                console.log(`Archivo no json detectado`)
                console.error(`${error}`)
            }
        }
        return notas;
        } catch(error: any) {
        console.error(`Error leyendo la carpeta:  ${error}`)
        return []
    }
}

export const getOneNota = async(idB: string): Promise<Nota | undefined> => {
    try{
        const notaPlana = await readTextFile(`${idB}.json`, {baseDir: BaseDirectory.AppData})
        const nota = JSON.parse(notaPlana)
        return nota
    }catch{}
}

export const putNota = async(idM: string, nuevoTitulo: string, nuevoContenido: string): Promise<Nota | undefined> => {
    try {
        await remove(`${idM}.json`, {baseDir: BaseDirectory.AppData})
        const notaModificada = new Nota(
            idM,
            nuevoTitulo,
            nuevoContenido
        )
        const archivoMod = await create(`${idM}.json`, {baseDir: BaseDirectory.AppData})
        await archivoMod.write(new TextEncoder().encode(JSON.stringify(notaModificada, null, 2)))
        await archivoMod.close()
        console.log(`Nota ${nuevoTitulo} modificada correctamente.`)
        return notaModificada
    } catch(error: any) {
        console.error(`Error al modificar nota: ${error}`)
    }
}

export const deleteNota = async(idR: string): Promise<void> => {
    try{
        await remove(`${idR}.json`, {baseDir: BaseDirectory.AppData})
        console.log(`Nota ${idR} eliminada correctamente.`)
    } catch(error: any) {
        console.error(`Error al eliminar nota: ${error}`)
    }
}