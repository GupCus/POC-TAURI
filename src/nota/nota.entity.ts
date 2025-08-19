export class Nota {
    constructor(
        public id: string,
        public nombre: string,
        public contenido: string,
        public createdAt: string,
        public updatedAt: string | null
    ) {}
}