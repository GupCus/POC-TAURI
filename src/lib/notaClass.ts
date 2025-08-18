import { create, BaseDirectory, readDir, readTextFile, readFile} from "@tauri-apps/plugin-fs";

export class Nota {
    constructor(
        public id: string,
        public nombre: string,
        public contenido: string
    ) {}
}

export const crearNota = async(nomb: string, contenido: string): Promise<void> => {
    const idNota = (Math.random() * 100)
    const nota = new Nota(
            idNota.toString(),
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
        console.log(`Error ${error}`)
    }
}

export const allNotas = async(): Promise<Nota[] | undefined> => {
    try{
        const files = await readDir('',{
            baseDir: BaseDirectory.AppData
        });
        const notas: Nota[] = [];
        for (const file of files) {
            const contenidoArchivo = await readTextFile(file.name, {
                baseDir: BaseDirectory.AppData
            });
            try {
                const notaObj = JSON.parse(contenidoArchivo);
                notas.push(new Nota(notaObj.id, notaObj.nombre, notaObj.contenido));
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