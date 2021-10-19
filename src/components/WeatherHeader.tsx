import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Details} from './Details';

export const WeatherHeader: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <View style={styles.info}>
        <View style={styles.weatherInfo}>
          <Text>17</Text>
          <Text>Image</Text>
        </View>
        <Text>Cloudy</Text>
        <Text>Feels like 15</Text>
      </View>
      <Details />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'lightblue',
    paddingVertical: 50,
    marginBottom: 5,
  },
  info: {
    alignItems: 'center',
    marginBottom: 25,
  },
  weatherInfo: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between',
  },
});
