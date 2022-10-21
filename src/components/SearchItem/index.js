import React from 'react';
import {Alert} from 'react-native';
import {Container, Banner, Title, RateContainer, Rate} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchItem = ({data, navigatePage}) => {
  function detailMovies() {
    if (data.release_date === '') {
      Alert.alert('Filmes ainda sem data');
      return;
    }
    navigatePage(data);
  }
  return (
    <Container activeOpacity={0.7} onPress={detailMovies}>
      {data?.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
          }}
        />
      ) : (
        <Banner
          resizeMethod="resize"
          source={require('../../assets/semfoto.png')}
        />
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Icon name="star" size={12} color="#FABB1E" />
        <Rate> {data?.vote_average}/10 </Rate>
      </RateContainer>
    </Container>
  );
};

export default SearchItem;
