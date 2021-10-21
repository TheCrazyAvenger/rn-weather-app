import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';
import {getMonth, getWeather} from '../utitlites/utilities';

type WeekItemType = {
  item: {name: string; id: number};
  i: number;
  onOpenDay: (dayData: Array<any>) => void;
};

export const WeekItem: React.FunctionComponent<WeekItemType> = ({
  item,
  i,
  onOpenDay,
}) => {
  if (i === 5 || i === 6) return null;

  const [month, setMonth] = useState('No data');
  useEffect(() => {
    setMonth(getMonth());
  }, []);

  const data = useTypedSelector(state => state.weather.data.list);
  const day = useTypedSelector(state => state.weather.weekWeather);
  const night = useTypedSelector(state => state.weather.nightWeather);
  const dayData = getWeather(data, new Date().getDate() + i);

  const weekendStyle = item.id === 5 || item.id === 6 ? styles.weekend : null;

  const {temp: tempDay} = day![i].main;
  const {temp: tempNight} = night![i].main;
  const icon = day![i].weather[0].icon;

  return (
    <TouchableOpacity
      style={styles.weekItem}
      activeOpacity={0.7}
      onPress={() => onOpenDay(dayData)}>
      <View>
        <AppText style={styles.dateText}>
          {`${new Date().getDate() + i} ${month}`}
        </AppText>
        <AppText style={{...styles.dayText, ...weekendStyle}}>
          {item.name}
        </AppText>
      </View>
      <View style={styles.weekInfo}>
        <Image
          style={styles.icon}
          source={{uri: `http://openweathermap.org/img/wn/${icon}.png`}}
        />
        <View style={styles.weekTemp}>
          <AppTextBold>{Math.round(tempDay)}°</AppTextBold>
          <AppText>{Math.round(tempNight)}°</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  weekItem: {
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: THEME.COLOR_GRAY,
    backgroundColor: THEME.COLOR_WHITE,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
  },
  weekInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
  },
  weekTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  weekend: {
    color: 'red',
  },
  dayText: {
    fontSize: 15,
    color: THEME.COLOR_BLACK,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
