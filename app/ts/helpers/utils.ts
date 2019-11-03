import { Imprimivel } from '../models/Imprimivel';

export function imprime(...objetos: Array<Imprimivel>) {
    objetos.forEach(objeto => objeto.imprimir());
}
