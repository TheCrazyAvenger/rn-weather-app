import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {Typography} from '../../ui/Typography';
import {getMonth, getWeather} from '../../utitlites/utilities';
import {styles} from './styles';

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

  const [month, setMonth] = useState<string>('No data');
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + i));
  useEffect(() => {
    setMonth(getMonth(date.getMonth()));
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
        <Typography.Subtitle style={styles.dateText}>
          {`${date.getDate()} ${month}`}
        </Typography.Subtitle>
        <Typography.Subtitle style={{...styles.dayText, ...weekendStyle}}>
          {item.name}
        </Typography.Subtitle>
      </View>
      <View style={styles.weekInfo}>
        <Image
          style={styles.icon}
          source={{uri: `http://openweathermap.org/img/wn/${icon}.png`}}
        />
        <View style={styles.weekTemp}>
          <Typography.TitleText>{Math.round(tempDay)}°</Typography.TitleText>
          <Typography.Subtitle>{Math.round(tempNight)}°</Typography.Subtitle>
        </View>
      </View>
    </TouchableOpacity>
  );
};
