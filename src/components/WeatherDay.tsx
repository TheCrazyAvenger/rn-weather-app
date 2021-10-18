import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import {TEMP, WIND} from '../utitlites/data';
import {DayData} from './DayData';

export const WeatherDay: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <AppTextBold>About this day</AppTextBold>
      </View>
      <DayData data={TEMP} />
      <DayData data={WIND} />
      <DayData data={WIND} />
      <DayData data={WIND} />
      <DayData data={WIND} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
  },
  title: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
});
