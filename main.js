const API = 'https://rickandmortyapi.com/api';

const buscarPersonajeBtn = document.getElementById('buscar-personaje');
const buscarEpisodioBtn = document.getElementById('buscar-episodio');
const buscarUbicacionBtn = document.getElementById('buscar-ubicacion');
const filtroGenero = document.getElementById('filtro-genero');
const filtroEspecie = document.getElementById('filtro-especie');
const filtroOrigen = document.getElementById('filtro-origen');

const listaPersonajes = document.getElementById('lista-personajes');
const listaEpisodios = document.getElementById('lista-episodios');
const listaUbicaciones = document.getElementById('lista-ubicaciones');

buscarPersonajeBtn.addEventListener('click', buscarPersonajes);
buscarEpisodioBtn.addEventListener('click', buscarEpisodios);
buscarUbicacionBtn.addEventListener('click', buscarUbicaciones);
filtroGenero.addEventListener('change', filtrarPersonajes);
filtroEspecie.addEventListener('change', filtrarPersonajes);
filtroOrigen.addEventListener('change', filtrarPersonajes);

// Función para cargar personajes por defecto al inicio
function cargarPersonajesPorDefecto() {
    fetch(`${API}/character/?page=1`)
        .then(response => response.json())
        .then(data => {
            mostrarPersonajes(data.results);
        })
        .catch(error => console.error('Error:', error));
}

// Función para cargar los primeros 10 episodios
function cargarPrimerosEpisodios() {
    fetch(`${API}/episode/?page=1`)
        .then(response => response.json())
        .then(data => {
            listaEpisodios.innerHTML = '';
            data.results.slice(0, 10).forEach(episodio => {
                listaEpisodios.innerHTML += `
                    <div class="lista-item">
                        <h4>${episodio.name}</h4>
                        <p>Temporada: ${episodio.episode}</p>
                        <p>Fecha de emisión: ${episodio.air_date}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para cargar las primeras ubicaciones
function cargarPrimerasUbicaciones() {
    fetch(`${API}/location/?page=1`)
        .then(response => response.json())
        .then(data => {
            listaUbicaciones.innerHTML = '';
            data.results.slice(0, 10).forEach(ubicacion => {
                listaUbicaciones.innerHTML += `
                    <div class="lista-item">
                        <h4>${ubicacion.name}</h4>
                        <p>Tipo: ${ubicacion.type}</p>
                        <p>Dimensión: ${ubicacion.dimension}</p>
                        <p>Habitantes: ${ubicacion.residents.length}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para buscar personajes por nombre
function buscarPersonajes() {
    const nombre = document.getElementById('nombre-personaje').value;
    fetch(`${API}/character/?name=${nombre}`)
        .then(response => response.json())
        .then(data => {
            mostrarPersonajes(data.results);
        })
        .catch(error => console.error('Error:', error));
}

// Función para mostrar personajes
function mostrarPersonajes(personajes) {
    listaPersonajes.innerHTML = '';
    personajes.forEach(personaje => {
        listaPersonajes.innerHTML += `
            <div class="lista-item">
                <h4>${personaje.name}</h4>
                <p>Especie: ${personaje.species}</p>
                <p>Género: ${personaje.gender}</p>
                <p>Ubicación: ${personaje.location.name}</p>
                <p>Origen: ${personaje.origin.name}</p>
                <p>Estado: ${personaje.status}</p>
                <p>Tipo: ${personaje.type || 'N/A'}</p>
                <img src="${personaje.image}" alt="${personaje.name}" style="width: 100px;">
            </div>
        `;
    });
}

// Función para filtrar personajes por género, especie y origen
function filtrarPersonajes() {
    const generoSeleccionado = filtroGenero.value;
    const especieSeleccionada = filtroEspecie.value;
    const origenSeleccionado = filtroOrigen.value;

    let url = `${API}/character/?page=1`;
    if (generoSeleccionado) url += `&gender=${generoSeleccionado}`;
    if (especieSeleccionada) url += `&species=${especieSeleccionada}`;
    if (origenSeleccionado) url += `&origin=${origenSeleccionado}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarPersonajes(data.results);
        })
        .catch(error => console.error('Error:', error));
}

// Función para buscar episodios por nombre
function buscarEpisodios() {
    const nombre = document.getElementById('nombre-episodio').value;
    fetch(`${API}/episode/?name=${nombre}`)
        .then(response => response.json())
        .then(data => {
            listaEpisodios.innerHTML = '';
            data.results.forEach(episodio => {
                listaEpisodios.innerHTML += `
                    <div class="lista-item">
                        <h4>${episodio.name}</h4>
                        <p>Temporada: ${episodio.episode}</p>
                        <p>Fecha de emisión: ${episodio.air_date}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para buscar ubicaciones por nombre
function buscarUbicaciones() {
    const nombre = document.getElementById('nombre-ubicacion').value;
    fetch(`${API}/location/?name=${nombre}`)
        .then(response => response.json())
        .then(data => {
            listaUbicaciones.innerHTML = '';
            data.results.forEach(ubicacion => {
                listaUbicaciones.innerHTML += `
                    <div class="lista-item">
                        <h4>${ubicacion.name}</h4>
                        <p>Tipo: ${ubicacion.type}</p>
                        <p>Dimensión: ${ubicacion.dimension}</p>
                        <p>Habitantes: ${ubicacion.residents.length}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Cargar personajes, episodios y ubicaciones por defecto al inicio
window.addEventListener('DOMContentLoaded', () => {
    cargarPersonajesPorDefecto();
    cargarPrimerosEpisodios();
    cargarPrimerasUbicaciones();
});
