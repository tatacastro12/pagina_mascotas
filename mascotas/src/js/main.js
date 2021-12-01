import {} from "./modules/getSVG.js";
import {} from "./modules/modalMascotas.js";

import { getFormData } from "./register.js";
import getModule from "./render.js";
import {} from "./svg.js";

import getUsers from "./modules/getusers.js";
import getLoading from "./modules/getLoading.js";
import { getAnimals } from "./modules/getAnimals.js";

/**
 * Formulario de registro
 * @param {string} path Ruta del formulario de registro
 *
 * @returns { void }
 */
const formRegister = (path) => {
    // Probando nuestra función:
    const _path = "src/html/registro.html";
    if (_path !== path) return;

    const register = document.querySelector("#form-register");
    if (!register) return;

    const passwords = register.querySelectorAll("[type='password']");

    console.log(passwords);

    // Obtenemos los campos de contraseña del formulario
    const [a, b] = passwords;

    /**
     *
     * @param {HTMLInputElement} a Contraseña
     * @param {HTMLInputElement} b Contraseña repetida
     * @returns { void }
     *
     */
    const coincide = (a, b) => {
        if (!(a || b)) return;

        if (a.value === b.value && a.value.trim().length > 4) {
            a.classList.add("form__text--pass");
            b.classList.add("form__text--pass");
            return;
        }

        a.classList.remove("form__text--pass");
        b.classList.remove("form__text--pass");
    };

    // Capturar evento de entrada de datos en el
    // campo de contraseña:
    a.addEventListener("input", () => {
        coincide(a, b);
    });

    // Capturar evento de entrada de datos en el
    // campo de contraseña repetida:
    b.addEventListener("input", () => {
        coincide(b, a);
    });

    // Capturar el evento de envío del formulario de registro de
    // usuarios para capturar sus datos y realizar el envío mediante
    // Ajax utilizando la función fetch():
    register.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = getFormData(register);
        const button = register.querySelector("[type='submit']");
        let textButton;

        // Carga la animación al botón de envío del formulario:
        if ( button ) textButton = getLoading(button);

        // Si el campo que se detecta es una contraseña la cifrará
        for (let key in data) {
            data[key] = key === "password" ? md5(data[key]) : data[key];
        }

        // Registrar nuevos usuarios:
        await fetch(register.action, {
            method: register.method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        // Probaremos nuestra función antes de continuar:
        await getUsers("data/bdusers.json", "#users-data");
        if (e.target.type === "submit") {
            e.target.textContent = textButton;
        }

        // Termina la animación una vez completado el registro
        // del usuario:
        if (button) button.textContent = textButton;
    });
};

/**
 * Al seleccionar un menú de navegación con esta función debe
 * tomar en cuenta debe tener enlaces.
 *
 * @param {string} selector
 * Debe ingresar un selector para seleccionar un menú. Es
 * obligatorio que el menú tenga enlaces.
 *
 * @returns { void }
 */
const menu = async (selector) => {
    const menuHeader = document.querySelector(selector);
    if (!menuHeader) return;

    let pathModule = localStorage.getItem("module");
    pathModule ??= "src/html/mascotas.html";

    // Datos predefinidos al momento de cargar la página
    // web en el navegador:
    await getModule(pathModule, "#container", true);

    formRegister(pathModule);
    // Probaremos nuestra función antes de continuar:
    getUsers("data/bdusers.json", "#users-data");

    menuHeader.onclick = async (e) => {
        e.preventDefault();
        const element = e.target;

        if (element.href) {
            const href = element.getAttribute("href");

            await getModule(href, "#container", true);
            localStorage.setItem("module", href);

            formRegister(href);

            // Probaremos nuestra función antes de continuar:
            getUsers("data/bdusers.json", "#users-data");
        }
    };
};

menu("#menu-header");

const container = document.querySelector("#container");

if (container) {
    container.onclick = (e) => {
        const element = e.target;
        const { especie } = element.dataset;

        if ( especie && element.href ) {
            e.preventDefault();
            getAnimals(element.href, "#animal-container", especie);
        }

        
    }
}