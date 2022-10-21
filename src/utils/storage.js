import AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar os filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}

//Salvar um novo filme
export async function saveMovie(key, newMovie) {
  let moviesStored = await getMoviesSave(key);

  //Se tiver algum filme salvo com esse mesmo ID ou duplicado precisamos ignorar o 'some' devolve true ou false
  const hasMovie = moviesStored.some(item => item.id === newMovie.id);

  if (hasMovie) {
    //console.log('Esse filme já existe na sua Lista');
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  //console.log('Filme salvo com sucesso');
}

//Deletar algum filme especifico
export async function deletaMovie(id) {
  let moviesStored = await getMoviesSave('@primereact');

  let myMovies = moviesStored.filter(item => {
    return item.id != id;
  });

  await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));
  //console.log('Filme deletado com sucesso');
  return myMovies;
}


//Filtrar algum filme se já está salvo
export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@primereact');

  //find devolve true ou false
  const hasMovie = moviesStored.find(item => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}
