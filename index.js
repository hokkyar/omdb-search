const API_KEY = 'https://www.omdbapi.com/?apikey=14495380&'
const movieContent = document.querySelector('.movie-content')
const modalContent = document.querySelector('.modal-content')
const searchBtn = document.querySelector('.search-btn')
const inputValue = document.querySelector('.search-value')

searchBtn.addEventListener('click', () => {
  const userInput = document.querySelector('.search-value').value
  process(userInput)
})

inputValue.addEventListener('keypress', ({ keyCode }) => {
  if (keyCode == '13') {
    const userInput = document.querySelector('.search-value').value
    if (userInput.length > 2) {
      process(userInput)
    }
  }
})

function process(userInput) {
  fetch(`${API_KEY}s=${userInput}`)
    .then(res => res.json())
    .then(({ Search: movies }) => {
      let movieList = ''
      movies.forEach((movie) => {
        movieList += showList(movie)
      })
      movieContent.innerHTML = movieList

      const movieDetail = document.querySelectorAll('.movie-detail')
      movieDetail.forEach(btn => {
        btn.addEventListener('click', function () {
          fetch(`${API_KEY}i=${this.getAttribute('data-movie-id')}`)
            .then(res => res.json())
            .then(movie => {
              modalContent.innerHTML = showMovieDetail(movie)
            })
        })
      })
    })
}

function showList({ imdbID, Poster, Title, Year }) {
  return `<div class="col-lg-3 d-flex align-items-center flex-column">
            <img src="${(Poster === 'N/A') ? 'default.jpg' : Poster}" alt="default" width=250>
            <h5 class="card-title">${Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${Year}</h6>
            <button type="button" class="btn btn-primary movie-detail" data-bs-toggle="modal" data-bs-target="#movieModal" data-movie-id="${imdbID}">Lihat detail</button>
        </div>`
}

function showMovieDetail({ Poster, Title, Year, Genre, Director, Actors, Writer, Plot }) {
  return `<div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${Title} (${Year})</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <img src="${(Poster === 'N/A') ? 'default.jpg' : Poster}" alt="default" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Genre : </strong>${Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>${Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong> <br> ${Plot}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`
}