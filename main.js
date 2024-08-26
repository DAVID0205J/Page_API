const API = 'https://rickandmortyapi.com/api';

const buscarPersonajeBtn = document.getElementById('buscar-personaje');
const buscarEpisodioBtn = document.getElementById('buscar-episodio');
const buscarUbicacionBtn = document.getElementById('buscar-ubicacion');

const listaPersonajes = document.getElementById('lista-personajes');
const listaEpisodios = document.getElementById('lista-episodios');
const listaUbicaciones = document.getElementById('lista-ubicaciones');

buscarPersonajeBtn.addEventListener('click', buscarPersonajes);
buscarEpisodioBtn.addEventListener('click', buscarEpisodios);
buscarUbicacionBtn.addEventListener('click', buscarUbicaciones);

function buscarPersonajes() {
    const nombre = document.getElementById('nombre-personaje').value;
    fetch(`${API}/character/?name=${nombre}`)
        .then(response => response.json())
        .then(data => {
            listaPersonajes.innerHTML = '';
            data.results.forEach(personaje => {
                listaPersonajes.innerHTML += `
                    <div class="lista-item">
                        <h4>${personaje.name}</h4>
                        <p>Especie: ${personaje.species}</p>
                        <p>Género: ${personaje.gender}</p>
                        <p>Ubicación: ${personaje.location.name}</p>
                        <img src="${personaje.image}" alt="${personaje.name}" style="width: 100px;">
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

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
 