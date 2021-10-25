import React from 'react';
import {Image, View} from 'react-native';
import {Components} from '..';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {Typography} from '../../ui/Typography';
import {styles} from './styles';

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
          <Typography.TitleText style={{...styles.text, fontSize: 35}}>
            {Math.round(temp)}°
          </Typography.TitleText>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}.png`,
            }}
          />
        </View>
        <Typography.TitleText style={styles.text}>
          {description}
        </Typography.TitleText>
        <Typography.Subtitle style={styles.text}>
          Feels like: {Math.round(feels_like)}°
        </Typography.Subtitle>
      </View>
      <Components.Details list={list} details={details} />
    </View>
  );
};
