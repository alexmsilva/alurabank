import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';

const enum DiaDaSemana {
    DOMINGO,
    SEGUNDA,
    TERCA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO
}

export class NegociacaoController {

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event): void {
        event.preventDefault();

        const data = new Date(this._inputData.value.replace(/-/g, ','));

        if (! this._eDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _eDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.SABADO && data.getDay() != DiaDaSemana.DOMINGO;
    }
}
