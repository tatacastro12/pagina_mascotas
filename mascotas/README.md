# Adopción de mascotas

Para clonar este proyecto debe escribir lo siguiente:

```bash
git clone https://github.com/dlunamontilla/mascotas.git
```

Y para actualizarlo cada cierto período de tiempo:

```bash
git pull origin master
```

Donde `master` es el nombre de la rama.

## Uso de la función `getModule`:

La función `getModule(url, selector)` nos permite obtener el contenido de los archivos HTML como módulos independientes, donde `url` es la ruta donde se encuentra el archivo y `selector` es el selector del elemento al que le cargaremos los datos del archivo seleccionado.

### Sintaxis

```js
getModule(url: string, selector: string);

```

### Ejemplo de uso

Si queremos cargar el contenido del archivo `mascotas.html` en nuestro archivo principal `index.html` debemos utilizar la siguiente línea:

```js
getModule("src/html/mascotas.html", "#container");
```

Donde `src/html/mascotas.html` es la ubicación del archivo al que queremos tomar su contenido y `#container` el elemento HTML donde queremos cargar el contenido del archivo seleccionado.