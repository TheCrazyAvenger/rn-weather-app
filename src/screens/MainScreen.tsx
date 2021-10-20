import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {Header} from '../components/Header';
import {WeatherHeader} from '../components/WeatherHeader';
import {WeatherInfo} from '../components/WeatherInfo';
import {fetchWeather, toggleLoading} from '../store/actions/weather';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';

export const MainScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const data = useTypedSelector(state => state.weather.data);
  const loading = useTypedSelector(state => state.weather.loader);
  const error = useTypedSelector(state => state.weather.error);

  useEffect(() => {
    dispatch(fetchWeather());
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

  const {list} = data;

  return (
    <View style={styles.root}>
      <ScrollView>
        <WeatherHeader list={list} />
        <WeatherInfo />
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
