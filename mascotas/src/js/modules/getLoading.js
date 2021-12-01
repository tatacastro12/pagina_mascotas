// @ts-check

/**
 * 
 * @param {HTMLElement} element Selector
 * 
 * @returns { string }
 * Devuelve como resultado el texto o contenido en formato de 
 * de texto sobre el elemento que se le aplique la animación
 * de carga.
 */
const getLoading = (element) => {
    if (!element) return;

    const template = document.querySelector("#loading-template");
    if (!template) return;

    //  @ts-ignore
    const loading = template.content.firstElementChild.cloneNode(true);
    const textElement = element.innerHTML;
    
    const { sizeLoading, notOverwrite, color } = element.dataset;
    
    !notOverwrite
        ? element.textContent = ""
        : loading.classList.add("caja--absolute");

    /** @type { string } */
    let attributes = "";

    // Si el usuario estable un tamaño mediante atributo:
    if ( sizeLoading ) {
        const size = Number(sizeLoading);

        if ( size > 0 ) {
            attributes += `--size-loading: ${size}px;`;
        }
    }

    // Si el usuario establece un color mediante atributo:
    if ( color ) {
        attributes += `--color: ${String(color)}`;
    }

    console.log(String(attributes));

    if (attributes.length > 0) loading.setAttribute("style", attributes);

    // Aplicar animación de carga sobre el elemento seleccionado:
    element.appendChild(loading);

    return textElement;
}

export default getLoading;