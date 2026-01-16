const container = document.querySelector('.container');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const API_KEY = '903ee5b1';

function fetchMovies(query) {
    if (!query) return;

    container.innerHTML = "";

    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=903ee5b1 &s=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                container.innerHTML = "<p>No movies found</p>";
                return;
            }

            data.Search.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
                    <h3>${movie.Title}</h3>
                    <b>Year: ${movie.Year}</b>
                    <p>RRatings: ${movie.Ratings}</p>
                    <p>Type: ${movie.Type}</p>
                    <button>Download Now</button>
                `;
                container.appendChild(card);
            });
        });
}

searchButton.addEventListener('click', () => {
    fetchMovies(searchInput.value.trim());
});