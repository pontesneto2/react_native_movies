import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, MeuButtom, Title} from './styles';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <MeuButtom onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={36} color="#FFF" />
      </MeuButtom>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
