import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {BackButtom, Name} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';

const ModalLink = ({link, title, closeModal}) => {
  return (
    <>
      <BackButtom onPress={closeModal}>
        <Icon name="close" size={35} color="#FFF" />
        <Name numberOfLines={1}>{title}</Name>
      </BackButtom>

      <WebView
        source={{uri: link}}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="#384058"
            size="large"
            style={styles.flexContainer}
          />
        )}
      />
    </>
  );
};


const styles = StyleSheet.create({
  flexContainer: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalLink;
