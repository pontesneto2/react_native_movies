import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton,
} from './styles';

const FavoriteItem = ({data, deletaMovie, navigatePage}) => {
  return (
    <Container>
      <Title size={22}> {data.title} </Title>

      <RateContainer>
        <Icon name="star" size={12} color="#FABB1E" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigatePage(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => deletaMovie(data.id)}>
          <Icon name="delete-outline" size={24} color="#FFF" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
};

export default FavoriteItem;
