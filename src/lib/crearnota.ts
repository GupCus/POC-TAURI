import { create, BaseDirectory, mkdir } from "@tauri-apps/plugin-fs";

export const crearJSON = async(nombre: string, contenido: any): Promise<void> => {
    try{
        const archivo = await create(`${nombre}`, {
            baseDir: BaseDirectory.AppData
        })
        await archivo.write(new TextEncoder().encode(`${contenido}`))
        await archivo.close()
        console.log(`Nota guardada correctamente en ${BaseDirectory.AppData}`)
    } catch(error) {
        console.log(`Error ${error}`)
    }
}