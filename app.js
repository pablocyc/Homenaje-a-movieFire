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

function showDetails (data) {
  detailsSelector.style.display = 'block'
  detailsSelector.innerHTML = `<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`
}


const filmSelector = document.getElementById('peliculas')
const titleSelector = document.getElementById('title')
const detailsSelector = document.getElementById('details')

// Eventos

moviesRef.on('value', data => {
  const peliculasData = data.val()
  console.log('data: ', peliculasData)

  let htmlFinal = ''
  // @TODO> Refator por la comunidad, usando Arrays :-
  for (const key in peliculasData) {
    if (peliculasData.hasOwnProperty(key)) {
      const element = peliculasData[key];
      htmlFinal += `<li data-id="${key}">${element.Title}
        <button data-action="details">Detalles</button>
        <button data-action="edit">Editar</button>
        <button data-action="delete">Borrar</button>
      </li>`
    }
  }
  filmSelector.innerHTML = htmlFinal
})

filmSelector.addEventListener('click', event => {
  const target = event.target
  if (target.nodeName === 'BUTTON') {
    const id = target.parentNode.dataset.id
    const action = target.dataset.action
    if (action === 'details') {
      getMovieDetails(id)
        .then(showDetails)
      // console.log('Detalles: ', id)

    } else if (action === 'edit') {
      const newTitle = prompt('Dime el nuevo titulo').trim()
      if (newTitle) {
        getMovieData(newTitle)
          .then(movieDetails => updateMovie(id, movieDetails))
        
      }
      // console.log('Editar:, ', id)

    } else if (action === 'delete') {
      if (confirm('Estas seguro?')) {
        deleteMovie(id)
      }
      // console.log('Borrar: ', id)
    }
  }
})

titleSelector.addEventListener('keyup', event => {
  const titleContent = titleSelector.value.trim()
  if (event.key === 'Enter' && titleContent) {
    console.log('Ahora si!!!', titleContent)
    getMovieData(titleContent)
      .then(addMovie)
  }
})