import React from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {THEME} from '../theme';

export const APILogo: React.FunctionComponent = () => {
  const openSite = () => {
    Linking.openURL('https://openweathermap.org/');
  };

  return (
    <View style={{...styles.block, ...styles.usedApi}}>
      <TouchableOpacity onPress={openSite}>
        <Image
          style={styles.logo}
          source={require('../../assets/OpenWeather-Logo-Light.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 23,
    marginBottom: 5,
  },
  usedApi: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 50,
  },
});
