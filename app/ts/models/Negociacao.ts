import { SuperObjeto } from './SuperObjeto';

export class Negociacao implements SuperObjeto<Negociacao> {

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

    get volume(): number {
        return this.quantidade * this.valor;
    }

    imprimir(): void {
        console.log('-- Negociação --');
        console.log(`Data: ${this.data}`);
        console.log(`Quantidade: ${this.quantidade}`);
        console.log(`Valor: ${this.valor}`);
        console.log(`Volume: ${this.volume}`);
    }

    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}
