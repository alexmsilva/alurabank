import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

    obterNegociacoes(handler: ResponseHandler): Promise<Array<Negociacao>> {
        return fetch('http://127.0.0.1:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: Array<NegociacaoParcial>) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(error => {
                console.log(error);
                return error
            });
    }
}

export interface ResponseHandler {
    (res: Response): Response
}
