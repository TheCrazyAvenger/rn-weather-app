import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const APILogo: React.FunctionComponent = () => {
  const openSite = () => {
    Linking.openURL('https://openweathermap.org/');
  };

  return (
    <View style={{...styles.block, ...styles.usedApi}}>
      <TouchableOpacity onPress={openSite}>
        <Image
          style={styles.logo}
          source={require('../../../assets/OpenWeather-Logo-Light.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
