import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';
import {Details} from './Details';

export const WeatherHeader: React.FunctionComponent = () => {
  const data = useTypedSelector(state => state.weather.data);
  const {list} = data;

  const now = list[0];
  const {temp, feels_like, humidity, pressure} = now.main;
  const weather = now.weather[0];
  const {icon, description} = weather;
  const wind = now.wind.speed;

  const details = [
    {img: 'wind', data: wind, type: 'm/s'},
    {img: 'crosshair', data: pressure, type: 'hPa'},
    {img: 'droplet', data: humidity, type: '%'},
  ];

  return (
    <View style={styles.root}>
      <View style={styles.info}>
        <View style={styles.weatherInfo}>
          <AppTextBold style={{...styles.text, fontSize: 35}}>
            {Math.round(temp)}°
          </AppTextBold>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}.png`,
            }}
          />
        </View>
        <AppTextBold style={styles.text}>{description}</AppTextBold>
        <AppText style={styles.text}>
          Feels like: {Math.round(feels_like)}°
        </AppText>
      </View>
      <Details list={list} details={details} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#00ccff',
    paddingVertical: 30,
    marginBottom: 5,
  },
  info: {
    alignItems: 'center',
    marginBottom: 25,
  },
  weatherInfo: {
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: THEME.COLOR_WHITE,
    fontSize: 15,
  },
  icon: {
    width: 40,
    height: 55,
  },
});
