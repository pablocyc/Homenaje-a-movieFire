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
  const url = `https://www.omdbapi.com/?t=${title}&apikey=${apikey}`
  return fetch(url).then(res => res.json())
}
