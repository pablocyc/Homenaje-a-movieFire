console.log('Hola mundo...')

const moviesRef = firebase.database().ref('peliculas')

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




// moviesRef.update({
//   title: "The Hulk",
//   description: "bla bla bla",
// })
  
  // [new Date().getTime(), 'Hola', 'fin'])

// firebase.database().ref('users/' + userId).set({
//   username: name,
//   email: email,
//   profile_picture : imageUrl
// }, function(error) {
//   if (error) {
//     // The write failed...
//   } else {
//     // Data saved successfully!
//   }
// });

