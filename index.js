const API_KEY = 'http://www.omdbapi.com/?apikey=14495380&'

// clicked button
$('.search-btn').on('click', () => {
  const value = $('.search-value').val()
  if (value.length > 2) {
    getMoviesBySearch(value)
  }
})

// entered input (ASCII CODE = 13)
$('.search-value').keypress(({ keyCode }) => {
  if (keyCode == '13') {
    const value = $('.search-value').val()
    if (value.length > 2) {
      getMoviesBySearch(value)
    }
  }
})

// getmovie function by user input search
function getMoviesBySearch(value) {
  $.ajax({
    url: `${API_KEY}s=${value}`,
    success: ({ Search }) => {
      appendMovieToContent(Search)
    },
    error: ({ responseJSON: { Error } }) => {
      console.log(Error)
    }
  })
}

function appendMovieToContent(Search) {
  try {
    const content = Search.map(({ Title, Year, Poster, imdbID }) => {
      return `
        <div class="col-lg-3 d-flex align-items-center flex-column">
          <img src="${(Poster === 'N/A') ? 'default.jpg' : Poster}" alt="default" width=250>
          <h5 class="card-title">${Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${Year}</h6>
          <button type="button" class="btn btn-primary movie-detail" data-bs-toggle="modal" data-bs-target="#movieModal" data-movie-id="${imdbID}">Lihat detail</button>
        </div>`
    })

    // append content to movie-content
    $('.movie-content').html(content)

    // movie-detail button clicked
    $('.movie-detail').on('click', movieDetail)

  } catch (e) {
    $('.movie-content').html('Pencarian tidak ditemukan')
  }
}

// function to get movie detail by clicking button 
function movieDetail() {
  $.ajax({
    url: `${API_KEY}i=${$(this).data('movie-id')}`,
    success: ({ Poster, Title, Year, Genre, Director, Actors, Writer, Plot }) => {
      $('.modal-content').html(`
        <div class="modal-header">
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
        </div>
      `)
    },
    error: (e) => {
      console.log(e.responseText)
    }
  })
}