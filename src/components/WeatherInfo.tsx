import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';
import {TEMP, WEEK_DAYS} from '../utitlites/data';
import {getMonth, updateWeek} from '../utitlites/utilities';
import {WeatherDay} from './WeatherDay';

export const WeatherInfo: React.FunctionComponent = () => {
  const [week, setWeek] = useState(WEEK_DAYS);
  const [month, setMonth] = useState('No data');
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setWeek(updateWeek());
    setMonth(getMonth());
  }, []);

  const weekItem = (item: any, i: number) => {
    if (i === 5 || i === 6) return null;

    const backgroundColor =
      i === selectedId ? THEME.COLOR_GRAY_LIGHT : THEME.COLOR_WHITE;

    const weekendStyle = item.id === 5 || item.id === 6 ? styles.weekend : null;
    return (
      <TouchableOpacity
        style={{
          ...styles.weekItem,
          backgroundColor: backgroundColor,
        }}
        activeOpacity={0.7}
        onPress={() => setSelectedId(i)}>
        <AppText style={styles.dateText}>
          {new Date().getDate() + i} {month}
        </AppText>
        <AppText style={{...styles.dayText, ...weekendStyle}}>
          {item.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={week}
        initialNumToRender={5}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => weekItem(item, index)}
        horizontal={true}
        extraData={selectedId}
      />
      <WeatherDay />
      <View style={styles.block}>
        <AppTextBold>View on map</AppTextBold>
      </View>
      <View style={styles.block}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  weekItem: {
    paddingHorizontal: 15,
    width: 120,
    paddingVertical: 8,
    borderRightColor: THEME.COLOR_GRAY_LIGHT,
    borderRightWidth: 0.5,
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
});
