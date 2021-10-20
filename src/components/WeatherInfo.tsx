import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import {WEEK_DAYS} from '../utitlites/data';
import {updateWeek} from '../utitlites/utilities';
import {WeekItem} from './WeekItem';

export const WeatherInfo: React.FunctionComponent = () => {
  const [week, setWeek] = useState(WEEK_DAYS);

  useEffect(() => {
    setWeek(updateWeek());
  }, []);

  const openSite = () => {
    Linking.openURL('https://openweathermap.org/');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.block}>
        <AppTextBold>Five day forecast</AppTextBold>
      </View>
      {week.map((item, i) => (
        <WeekItem key={i} item={item} i={i} />
      ))}
      <View style={{...styles.block, marginTop: 5}}>
        <AppTextBold>View on map</AppTextBold>
      </View>
      <View style={{...styles.block, padding: 100}}>
        <AppTextBold style={{textAlign: 'center'}}>
          There will be map
        </AppTextBold>
      </View>
      <View style={styles.block}>
        <AppTextBold>Used Api</AppTextBold>
      </View>
      <View style={{...styles.block, ...styles.usedApi}}>
        <TouchableOpacity onPress={openSite}>
          <Image
            style={styles.logo}
            source={require('../../assets/OpenWeather-Logo-Light.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
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
