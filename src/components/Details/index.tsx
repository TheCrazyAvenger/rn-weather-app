import React from 'react';
import {FlatList, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {THEME} from '../../theme';
import {Typography} from '../../ui/Typography';
import {styles} from './styles';

type DetailsTypes = {
  list: Array<any>;
  details: Array<{img: string; data: number; type: string}>;
};

export const Details: React.FunctionComponent<DetailsTypes> = ({
  list,
  details,
}) => {
  const weatherItem = ({item}: {item: {[key: string]: any}}) => {
    const time = new Date(item['dt'] * 1000).getHours();

    const icon = item.weather[0].icon;
    const temp = item.main.temp;

    return (
      <View style={styles.weatherItem}>
        <Typography.Subtitle style={styles.text}>{time}:00</Typography.Subtitle>
        <Image
          style={styles.icon}
          source={{uri: `http://openweathermap.org/img/wn/${icon}.png`}}
        />
        <Typography.TitleText style={styles.text}>
          {Math.round(temp)}°
        </Typography.TitleText>
      </View>
    );
  };

  const detailsItem = ({
    item,
  }: {
    item: {img: string; data: number; type: string};
  }) => {
    return (
      <View style={styles.detailsItem}>
        <Icon
          style={{marginRight: 5}}
          name={item.img}
          size={17}
          color={THEME.COLOR_WHITE}
        />
        <Typography.TitleText style={styles.text}>
          {Math.round(item.data)}
          <Typography.Subtitle>{item.type}</Typography.Subtitle>
        </Typography.TitleText>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.details}>
          <FlatList data={details} renderItem={detailsItem} />
        </View>
      }
      data={list}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={weatherItem}
    />
  );
};
