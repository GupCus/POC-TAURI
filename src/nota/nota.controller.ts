import { Nota } from "./nota.entity.ts"
import { v4 as uuidv4 } from "uuid"
import { BaseDirectory, create, readDir, readTextFile, remove } from "@tauri-apps/plugin-fs"
import dayjs from "dayjs"

export const addNota = async(nomb: string, contenido: string): Promise<void> => {
    //const id = Date.now()
    const idNota = uuidv4()
    const nota = new Nota(
            idNota.toString(),
            nomb,
            contenido,
            dayjs().toISOString(),
            null
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
            if(archivo.name.endsWith(`.json`)){
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
    try { //guardar fecha de creacion de la anterior nota antes de pisarla
        const notaVieja = JSON.parse(await readTextFile(`${idM}.json`, {baseDir: BaseDirectory.AppData}))
        await remove(`${idM}.json`, {baseDir: BaseDirectory.AppData})
        const notaModificada = new Nota(
            idM,
            nuevoTitulo,
            nuevoContenido,
            notaVieja.createdAt, //usa la fecha de la nota vieja
            dayjs().toISOString()
        )
        console.log(notaModificada)
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