import { writeTextFile, readTextFile, BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";

export const guardarJSON = async (filename: string, data:any): Promise<void> => {
    try {
        await mkdir('mininotes', {
            baseDir: BaseDirectory.AppData,
            recursive: true
        }).catch(() => {
            console.log(`catch error mkdir`)
        })

        await writeTextFile(filename, JSON.stringify(data, null, 2), {
            baseDir: BaseDirectory.AppData
        }).catch(() => {
            console.log(`catch error writetextfile`)
        })

        console.log(`${filename} guardado correctamente en appdata`)
    } catch(error){
        console.error(`Error guardando archivo`, error)
        throw error
    }
}

export const leerJSON = async <Nota>(filename: string): Promise<Nota | null> => {
    try {
        const fileExists = await exists(filename, {baseDir: BaseDirectory.AppData})

        if(!fileExists){
            console.log(`${filename} no existe en appdata`)
            return null
        }

        const contenido = await readTextFile(filename,{
            baseDir: BaseDirectory.AppData
        })

        return JSON.parse(contenido) as Nota
    } catch (error) {
        console.error('Error cargando archivo', error)
        return null
    }

    
}