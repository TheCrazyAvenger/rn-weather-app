import React, {useEffect} from 'react';
import {View, ScrollView, ActivityIndicator, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchWeather, toggleLoading} from '../../store/actions/weather';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {Typography} from '../../ui/Typography';
import Geolocation from '@react-native-community/geolocation';
import {fetchBooks} from '../../store/actions/bookmarks';
import {Components} from '../../components';
import {styles} from './styles';

type MainScreenType = {
  navigation: any;
};

export const MainScreen: React.FunctionComponent<MainScreenType> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const onOpenDay = (dayData: Array<any>) => {
    navigation.navigate('Day', {
      dayData,
    });
  };

  const loading = useTypedSelector(state => state.weather.loader);
  const error = useTypedSelector(state => state.weather.error);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        dispatch(fetchWeather(lat, lon));
      },
      error => {
        dispatch(fetchWeather());
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Typography.TitleText style={styles.error}>
          {error}
        </Typography.TitleText>
        <Button
          title="Повторить"
          onPress={() => {
            dispatch(toggleLoading());
            dispatch(fetchWeather());
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView>
        <Components.WeatherHeader />
        <Components.WeatherInfo onOpenDay={onOpenDay} />
      </ScrollView>
    </View>
  );
};
