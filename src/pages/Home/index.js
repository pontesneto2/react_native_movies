import React, {useState, useEffect} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';

import {
  Container,
  SearchContainer,
  Input,
  SearchButtom,
  Title,
  BannerButtom,
  Banner,
  SliderMovie,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import api, {key} from '../../services/api';
import {getListMovies, randomBanner} from '../../utils/movie';

const Home = ({navigation}) => {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      // const response = await api.get('/movie/now_playing', {
      //  params:{
      //    api_key: key,
      //    language: 'pt-BR',
      //    page: 1,
      //  }
      //});

      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),

        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),

        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(
          nowData.data.results[randomBanner(nowData.data.results)],
        );
        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);
        setLoading(false);
      }
    }

    getMovies();

    //Para abortar qualquer requisição quando mudar de pagina e aida tiver alguma requisição que não foi concluída
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigatoDatailsPage(item) {
    navigation.navigate('Detail', {id: item.id});
  }

  function hadleSearchMovie() {

    if (input === '') {
      return;
    }
    navigation.navigate('Search', {name: input});
    setInput('');
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={text => setInput(text)}
        />

        <SearchButtom onPress={hadleSearchMovie}>
          <Icon name="search" size={30} color="#FFF" />
        </SearchButtom>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButtom
          activeOpacity={0.9}
          onPress={() => navigatoDatailsPage(bannerMovie)}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`,
            }}
          />
        </BannerButtom>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigatePage={() => navigatoDatailsPage(item)}
            />
          )}
          keyExtractor={item => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigatePage={() => navigatoDatailsPage(item)}
            />
          )}
          keyExtractor={item => String(item.id)}
        />

        <Title>Mais votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigatePage={() => navigatoDatailsPage(item)}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
};

export default Home;
