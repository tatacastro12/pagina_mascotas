import createElement from "./createElement.js";
import getLoading from "./getLoading.js";
import { openModal } from "./modalMascotas.js";

/**
 *
 * @param {string} url Ingrese la ruta del archivo JSON para obtener
 * los datos de los animales.
 *
 * @param {string | HTMLDivElement} selector
 * 
 * @param {string} especie 
 * Este parámetro es opcional y tiene como animal por defecto
 * los gatos.
 * 
 */
const getAnimals = async (url, selector, especie = "gatos") => {
    /**
     * @type {HTMLDivElement|null}
     */
    const container =
        typeof selector === "string"
            ? document.querySelector(selector)
            : isDiv(selector)
            ? selector
            : null;

    if (typeof url !== "string" || !container) return;

    // Indicar al usuario que se están cargando los datos:
    getLoading(container);

    const response = await fetch(url);

    /** @type {Array<Object<string, string | number>> } */
    const data = await response.json();

    const animals = data[especie];
    if (!Array.isArray(animals)) return;

    const [cards] = createElement("div");

    cards.classList.add("animal-card");

    animals.forEach(animal => {
        const {id, nombre, raza, imagen} = animal;

        cards.insertAdjacentHTML(
            'beforeend',

            `<a href="data/bd${especie}.json" class="animal-card__item" data-id="${id}">
                <div class="animal-card__item__photo">
                    <img src="${imagen}" alt="${nombre}" />
                </div>
                
                <div class="animal-card__item__description">
                    <h4>${nombre}</h4>
                    <p>${raza}</p>
                </div>
            </a>`
        );
    });

    container.textContent = "";
    container.appendChild(cards);

    let count = 0;
    cards.addEventListener("click", (e) => {
        const element = e.target;
        const { id } = element.dataset;

        console.log( id, element );
    
        if (id) {
            e.preventDefault();
            const search = data[especie].find(row => Number(row.id) === Number(id));
            openModal(Number(id), search, "#modal-container");
        }
    });
};

export { getAnimals };
