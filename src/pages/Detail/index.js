import React, {useState, useEffect} from 'react';
import {ScrollView, Modal, Alert} from 'react-native';
import {
  Container,
  Header,
  HeaderButtom,
  Banner,
  ButtomLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconStar from 'react-native-vector-icons/MaterialIcons';
import api, {key} from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import {saveMovie, hasMovie, deletaMovie} from '../../utils/storage';

const Detail = ({route, navigation}) => {
  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        })
        .catch(err => {
          console.log(err);
        });

      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie(response.data);
        setFavoritedMovie(isFavorite);
        //console.log(response.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    //Para abortar qualquer requisição quando mudar de pagina e aida tiver alguma requisição que não foi concluída
    return () => {
      isActive = false;
    };
  }, []);

  async function handleFavoriteMovie(movieSalve) {
    if (favoritedMovie) {
      await deletaMovie(movie.id);
      setFavoritedMovie(false);
      Alert.alert('Filme removido da sua lista');
    } else {
      await saveMovie('@primereact', movieSalve);
      setFavoritedMovie(true);
      Alert.alert('Filme salvo na sua Lista');
    }
  }

  return (
    <Container>
      <Header>
        <HeaderButtom activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#FFF" />
        </HeaderButtom>

        <HeaderButtom onPress={() => handleFavoriteMovie(movie)}>
          {favoritedMovie ? (
            <Icon name="bookmark" size={28} color="#FFF" />
          ) : (
            <Icon name="bookmark-outline" size={28} color="#FFF" />
          )}
        </HeaderButtom>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      <ButtomLink activeOpacity={0.7} onPress={() => setOpenLink(true)}>
        <Icon name="link-variant" size={28} color="#FFF" />
      </ButtomLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<IconStar name="star" size={24} color="#FABB1E" />}
          emptyStar={<IconStar name="star-outline" size={24} color="#FABB1E" />}
          halfStar={<IconStar name="star-half" size={24} color="#FABB1E" />}
          disabled={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={movie?.genres}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Genres data={item} />}
      />

      <ScrollView howsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
};

export default Detail;
