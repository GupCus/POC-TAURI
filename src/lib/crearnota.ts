import { create, BaseDirectory, readDir, } from "@tauri-apps/plugin-fs";

// CREAR FUNCION QUE CHECKEE QUE EXISTA LA CARPETA DE LA APP EN APPDATA/ROAMING

export const crearNota = async(nombre: string, contenido: any): Promise<void> => {
    try{
        const archivo = await create(`${nombre}`, {
            baseDir: BaseDirectory.AppData
        })
        await archivo.write(new TextEncoder().encode(`${contenido}`))
        await archivo.close()
        console.log(`Nota guardada correctamente en 'AppData/${nombre}'`)
    } catch(error) {
        console.log(`Error ${error}`)
    }
}

export const allNotas = async(): Promise<string[] | undefined> => {
    try{
        const notas = await readDir('',{
            baseDir: BaseDirectory.AppData
        })
        console.log(notas)
        return notas.map(file => file.name ?? "")
        } catch(error) {
        console.log(`Error leyendo la carpeta:  ${error}`)
        return []
    }
}