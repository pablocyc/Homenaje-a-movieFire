const moviesRef = firebase.database().ref('peliculas')
const apikey = '😉😉 TU TOKEN'

// CRUD (CREATE, READ, UPDATE, DELETE)

function addMovie (data) {
  return moviesRef.push(data)
}

function deleteMovie (id) {
  return moviesRef.child(id).remove()
}

function updateMovie (id, data) {
  return moviesRef.child(id).set(data)
}

function getMovieDetails (id) {
  return new Promise ((resolve, reject) => {
    moviesRef.child(id).on('value', data => {
      resolve(data.val())
    })
  })
}

// @TODO: Refactor para trabajar con UI directamente
function getMovies () {
  moviesRef.on('value', data => {
    console.log('data: ', data.val())
  })
}

function getMovieData (title) {
  // @TODO> Refator por la comunidad
  const url = `https://www.omdbapi.com/?t=${title}&apikey=${apikey}`
  return fetch(url).then(res => res.json())
}


const filmSelector = document.getElementById('peliculas')
const titleSelector = document.getElementById('title')

// Eventos

moviesRef.on('value', data => {
  const peliculasData = data.val()
  console.log('data: ', peliculasData)

  let htmlFinal = ''
  // @TODO> Refator por la comunidad, usando Arrays :-
  for (const key in peliculasData) {
    if (peliculasData.hasOwnProperty(key)) {
      const element = peliculasData[key];
      htmlFinal += `<li>${element.Title}</li>`
    }
  }
  filmSelector.innerHTML = htmlFinal
})

titleSelector.addEventListener('keyup', event => {
  const titleContent = titleSelector.value.trim()
  if (event.key === 'Enter' && titleContent) {
    console.log('Ahora si!!!', titleContent)
    getMovieData(titleContent)
      .then(addMovie)
  }
})