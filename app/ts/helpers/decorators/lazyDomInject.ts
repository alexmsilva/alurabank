export function lazyDomInject(seletor: string) {

    return function(target: any, key: string) {
        let elemento: Element;

        const getter = function() {
            if (! elemento) {
                console.log(`Buscando ${seletor} para injetar em ${key}`);
                elemento = <HTMLInputElement>document.querySelector(seletor);
            }

            return elemento;
        };

       Object.defineProperty(target, key, {
           get: getter
       });
    }
}
