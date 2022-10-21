import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';

import {Container, ListMovies} from './styles';
import {getMoviesSave, deletaMovie} from '../../utils/storage';
import FavoriteItem from '../../components/FavoriteItem';

import {useIsFocused} from '@react-navigation/native';

const Movies = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const isFocuted = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@primereact');

      if (isActive) {
        setMovies(result);
        //console.log(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocuted]);

  async function handleDelete(id) {
    const result = await deletaMovie(id);
    setMovies(result);
  }

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', {id: item.id});
  }

  return (
    <Container>
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <FavoriteItem
            data={item}
            deletaMovie={handleDelete}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
};

export default Movies;
