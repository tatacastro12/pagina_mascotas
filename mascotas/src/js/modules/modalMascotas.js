import { isButton, isDiv } from "./evaluate.js";

// @ts-check

/**
 *
 * @param {string | HTMLButtonElement} selector
 * Ingrese como parámetro un selector o botón como elemento
 * HTML.
 *
 */
const exitModal = (selector) => {
    /** @type {HTMLButtonElement} */
    const button =
        typeof selector === "string"
            ? document.querySelector(selector)
            : isButton(selector)
            ? selector
            : [];

    if (!button) return;

    const modalContainer = document.querySelector("#modal-container");
    if (!modalContainer) return;

    button.onclick = () => {
        modalContainer.classList.remove("modal-container--show");
        document.body.removeAttribute("style");
    };
};

/**
 *
 * @param {Object<string, string|number|Array<Object<string, string|number>>>} data Debe ingresar
 * un objeto como parámetro.
 *
 * @param {number} id Ingrese el identificador para
 * cargar los datos a la ventana modal de las mascotas.
 *
 * @param {string | HTMLDivElement} selector Debe ingresar un
 * selector o un elemento DIV.
 *
 * @returns { void }
 */
const openModal = (id, data, selector) => {
    if (isNaN(id)) return;

    /** @type {HTMLDivElement | null} */
    const modalContainer =
        typeof selector === "string"
            ? document.querySelector(selector)
            : isDiv(selector)
            ? selector
            : null;

    if (!isDiv(container)) return;

    modalContainer.classList.add("modal-container--show");
    document.body.setAttribute("style", "overflow: hidden");

    // Cargar los datos a la ventana modal:
    const photo = modalContainer.querySelector("#photo-mascota");
    if (photo) photo.src = data.imagen;

    const title = modalContainer.querySelector("#title-mascota");
    if (title) title.innerHTML = data.nombre || "";

    const location = modalContainer.querySelector("#location-mascota");
    if (location) location.innerHTML = data.ubicacion || "";
    
    const personality = modalContainer.querySelector("#personality-mascota");

    if (personality) {
        personality.innerHTML = "";
        
        /** @type {Array<Object<string, string|number>>} */
        const personalidad = data.personalidad || [];

        personalidad.forEach(object => {
            personality.insertAdjacentHTML(
                'beforeend',
    
                `<div class="grid-personality__item">
                    <img src="${object.imagen}" alt="${object.es}" />
                    <p>${object.es}</p>
                </div>`
            );
        });

    }

    const history = modalContainer.querySelector("#history-mascota");
    if (history) {
        history.textContent = "";

        history.insertAdjacentHTML(
            'beforeend',

            `
            <h3>Historia de ${data.nombre}</h3>
            <p>${data.historia}</p>
            `
        );
    }
};

// Probar el botón:
exitModal("#exit-modal");

export { openModal };
