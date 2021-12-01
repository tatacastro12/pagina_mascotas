// @ts-check

import createElement from "./createElement.js";
import getLoading from "./getLoading.js";

/**
 * Muestra la lista de usuarios a partir de un registro
 * previo.
 * 
 * @param {string} url Ingrese la URL donde se encuentra el archivo 
 * JSON desde donde se tomarán los usuarios.
 * 
 * @param {string} selector
 * Debe indicar mediante selector el elemento donde se
 * reflejarán los usuarios obtenidos a partir de JSON.
 * 
 * @return { Promise<any> }
 */
const getUsers = async (url, selector) => {
    const usersContent = document.querySelector(selector);
    if (!usersContent) return;

    usersContent.textContent = "";
    
    const response = await fetch(url);
    const data = await response.json();

    const [table, thead, tbody] = createElement("table", "thead", "tbody");

    table.classList.add("table", "table--users");
    table.append(thead, tbody);

    thead.insertAdjacentHTML(
        'beforeend',

        `<tr>
            <th>Foto</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Acciones</th>
        </tr>`
    );
    

    data.usuarios.forEach(user => {
        const { id, url, name, lastname} = user;
        
        tbody.insertAdjacentHTML(
            'beforeend',

            `<tr>
                <td><img src="${url}" alt="${name} ${lastname}" /></td>
                <td>${name}</td>
                <td>${lastname}</td>
                <td>
                    <form action="http://localhost:4000/usuarios/${id}">
                        <button type="submit" class="button button--danger">Eliminar</button>
                    </form>
                </td>
            </tr>`
        );
    });

    if ( !(data.usuarios.length > 0) ) {
        tbody.insertAdjacentHTML(
            'beforeend',

            `<tr>
                <td colspan="4">No hay usuarios</td>
            </tr>`
        )
    }

    usersContent.appendChild(table);

    // @ts-ignore
    usersContent.onsubmit = async (e) => {
        e.preventDefault();
        const element = e.target;

        if (!element.action) return;

        const { action } = element;

        await fetch(action, {
            method: "DELETE"
        });

        
        element.parentNode.parentNode.remove();
        console.log( "Capturados", tbody.childNodes.length);
        if (!(tbody.childNodes.length > 0)) {
            getUsers(url, selector);
        }
    }

    // @ts-ignore
    usersContent.onclick = (e) => {
        const button = e.target;

        if (button.type === "submit") {
            getLoading(button);
        }
    }
}

export default getUsers;