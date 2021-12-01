/**
 * Este archivo es para uso temporal mientras se arma el proyecto 
 * para separar por módulos los archivos HTML.
 */

/**
 * 
 * @param {string} url Obtener un módulo en formato d texto
 * 
 * @param {boolean} clear Determinar si debe quitar todo el contenido
 * del elemento seleccionado antes de incorporar sobre él un módulo.
 * 
 * @param {string} selector Ingrese un selector como parámetro
 * para seleccionar capturar el elemento HTML al que agregaremos
 * nuestro módulo.
 * 
 */
const getModule = async (url, selector, clear = false) => {
    const module = document.querySelector(selector);
    if (!module) return;

    const response = await fetch(url);
    const data = await response.text();

    if (!!clear) {
        module.textContent = "";
    }

    module.insertAdjacentHTML('beforeend', data.trim());
}

export default getModule;