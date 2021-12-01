/**
 * @param { Array<string> } elements
 * Puede agregar una cantidad indeterminada de parámetros
 * las cuales, cada una respresentará un elemento creado.
 * 
 * @return {Array<HTMLElement>}
 */

const createElement = (...elements) => {
    return elements.map(element => {
        return document.createElement(element);
    });
}

export default createElement;