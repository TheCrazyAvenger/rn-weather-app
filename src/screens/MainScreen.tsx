import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {WeatherHeader} from '../components/WeatherHeader';
import {WeatherInfo} from '../components/WeatherInfo';
import {fetchWeather, toggleLoading} from '../store/actions/weather';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import Geolocation from '@react-native-community/geolocation';
import {fetchBooks} from '../store/actions/bookmarks';

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
        <AppTextBold style={styles.error}>{error}</AppTextBold>
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
        <WeatherHeader />
        <WeatherInfo onOpenDay={onOpenDay} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 10,
  },
});
