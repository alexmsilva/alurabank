import { Imprimivel, Igualavel } from './index';

export interface SuperObjeto<T> extends Imprimivel, Igualavel<T> {}
