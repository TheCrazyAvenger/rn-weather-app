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
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';
import {WEEK_DAYS} from '../utitlites/data';
import {getMonth, updateWeek} from '../utitlites/utilities';

export const WeatherInfo: React.FunctionComponent = () => {
  const [week, setWeek] = useState(WEEK_DAYS);
  const [month, setMonth] = useState('No data');

  useEffect(() => {
    setWeek(updateWeek());
    setMonth(getMonth());
  }, []);

  const openSite = () => {
    Linking.openURL('https://openweathermap.org/');
  };

  const weekItem = (item: {name: string; id: number}, i: number) => {
    if (i === 5 || i === 6) return null;

    const weekendStyle = item.id === 5 || item.id === 6 ? styles.weekend : null;

    return (
      <TouchableOpacity
        key={i}
        style={styles.weekItem}
        activeOpacity={0.7}
        onPress={() => console.log('Pressed')}>
        <AppText style={styles.dateText}>
          {`${new Date().getDate() + i} ${month}`}`
        </AppText>
        <AppText style={{...styles.dayText, ...weekendStyle}}>
          {item.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.block}>
        <AppTextBold>Five day forecast</AppTextBold>
      </View>
      {week.map((item, i) => weekItem(item, i))}
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
  weekItem: {
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: THEME.COLOR_GRAY,
    backgroundColor: THEME.COLOR_WHITE,
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 12,
  },
  weekend: {
    color: 'red',
  },
  dayText: {
    fontSize: 15,
    color: THEME.COLOR_BLACK,
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
