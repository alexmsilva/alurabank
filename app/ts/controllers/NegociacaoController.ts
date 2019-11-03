import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { lazyDomInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from "../services/NegociocaoService";
import { imprime } from '../helpers/index';

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

    @lazyDomInject('#data')
    private _inputData: HTMLInputElement;

    @lazyDomInject('#quantidade')
    private _inputQuantidade: HTMLInputElement;

    @lazyDomInject('#valor')
    private _inputValor: HTMLInputElement;

    _service = new NegociacaoService();

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
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

        imprime(negociacao, this._negociacoes);
    }

    @throttle()
    async importNegociacoes() {
        try {
            const negociacoes = await this._service.obterNegociacoes((res: Response) => {
                if (res.ok) return res;
                throw new Error(res.statusText);
            });

            const negociacoesImportadas = this._negociacoes.paraArray();

            negociacoes
                .filter(negociacao => ! negociacoesImportadas.some(nImportada => negociacao.ehIgual(nImportada)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch(error) {
            this._mensagemView.update(error);
        }
    }

    private _eDiaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.SABADO && data.getDay() != DiaDaSemana.DOMINGO;
    }
}
