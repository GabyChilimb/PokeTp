// index.js

document.addEventListener("DOMContentLoaded", function() {
    var buscarBtn = document.getElementById("buscarBtn");
    buscarBtn.addEventListener("click", function() {
        buscar();
    });
    solicitudAJAX();
});

function solicitudAJAX() {
    var url = "https://pokeapi.co/api/v2/pokemon?limit=1000"; 
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            window.pokemonData = data.results;
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function buscar() {
    var input = document.getElementById("nPokemon");
    var index = input.value - 1;

    if (window.pokemonData && window.pokemonData[index]) {
        buscarPorURL(window.pokemonData[index].url);
    } else {
        alert("Debe ingresar un número válido de Pokémon.");
    }
}

function buscarPorURL(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var container = document.getElementById("ConteinerCard");
            var tipos = data.types.map(function (tipo) {
                return tipo.type.name;
            }).join(', ');
            var peso = data.weight / 10;
            var altura = data.height / 10;
            var cardHTML =
                `<div class="card">
                    <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">Tipo(s): ${tipos}</p>
                        <p class="card-text">Peso: ${peso} kg</p>
                        <p class="card-text">Altura: ${altura} m</p>
                    </div>
                </div>`;

            container.innerHTML = cardHTML;
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
