import { Negociacao } from './Negociacao';
import { Imprimivel } from './Imprimivel';

export class Negociacoes implements Imprimivel {

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao> {
        return ([] as Array<Negociacao>).concat(this._negociacoes);
    }

    imprimir(): void {
        console.log('-- Negociações --');
        console.log(JSON.stringify(this._negociacoes));
    }
}
