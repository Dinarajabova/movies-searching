const movieList = document.querySelector(".movies-list");

const elTemplate = document.querySelector("#movies-template").content;

// Kinolar arrayini slice qilish
const movie = kinolar.slice(0, 100);

let createItem = function(kino) {
    let newEl = elTemplate.cloneNode(true);

    newEl.querySelector(".movie-title").textContent = kino.title;
    newEl.querySelector(".movie-year").textContent = kino.year;
    newEl.querySelector(".casting").textContent = "Casting:"
    let castingList = newEl.querySelector(".cast-list");

    // Casting list uchun for    
    for (let j = 0; j < kino.cast.length; j++) {
        const castItem = kino.cast[j];
     
        const castingItem = createElement("li", "cast-item", castItem);
        castingList.append(castingItem);
    }
    
    return newEl
}


// elementlarni render qilish
let renderElements = function() {
    let moviesFragmentWrapper = document.createDocumentFragment();
    movie.forEach(function(kino) {

        moviesFragmentWrapper.append(createItem(kino));

    });
    movieList.append(moviesFragmentWrapper);
}

renderElements();


// Inputni charirish
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");


// Form buttunga event listener qo'shish
searchForm.addEventListener("change", function(evt) {
    evt.preventDefault();

    movieList.innerHTML = "";

    let inputValue = searchInput.value.trim();
    let searchingMovie = [];
 
    var searchRegex = new RegExp(inputValue, "gi");

     
    kinolar.forEach((kino) => {
        if (kino.title.match(searchRegex)) {
            searchingMovie.push(kino);
        }
    })

    // izlangan kinolarni yangi arrayga createElement qilish
    for (let k = 0; k < searchingMovie.length; k++) {
        const searchedMovie = searchingMovie[k];

        const sMovieItem = createElement("li", "card w-25 m-3 bg-info");
        const sMovieTitle = createElement("h3", "movie-title text-center text-danger h1", searchedMovie.title);
        const sMovieYear = createElement("p", "movie-year fs-3 text-success", searchedMovie.year);
        const sMovieCast = createElement("h4", "casting h2", "Casting");
        const sCastingList = createElement("ul", "cast-item");
        const sMovieGenre = createElement("h4", "h2", "Genres:");
        const sGenresList = createElement("p", "text-primary", searchedMovie.genres);
    


        for (let j = 0; j < searchedMovie.cast.length; j++) {
            const sCastItem = searchedMovie.cast[j];

        
            const sCastingItem = createElement("li", "", sCastItem);
            sCastingList.append(sCastingItem);
        }
        
        movieList.append(sMovieItem);
        sMovieItem.append(sMovieTitle, sMovieYear, sMovieCast, sCastingList, sMovieGenre, sGenresList);
    }


    console.log(searchingMovie);
 })
    