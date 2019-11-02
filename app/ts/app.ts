import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

document
    .querySelector('.form')!
    .addEventListener('submit', controller.adiciona.bind(controller));

document
    .querySelector('#btn-import')!
    .addEventListener('click', controller.importNegociacoes.bind(controller));
