import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

    protected _elemento: Element | null;

    constructor(private seletor: string, private scapeScript: boolean = true) {
        this._elemento = document.querySelector(seletor);
    }

    @logarTempoDeExecucao()
    update(model: T) {
        let template = this.template(model);
        if (this.scapeScript) {
            template = template.replace(/<script>[sS]+<\/script>/g, '');
        }

        this._elemento!.innerHTML = template;
    }

    abstract template(model: T): string;
}
