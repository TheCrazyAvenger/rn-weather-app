import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';

type DetailsTypes = {
  list: Array<any>;
  details: Array<{img: string; data: number; type: string}>;
};

export const Details: React.FunctionComponent<DetailsTypes> = ({
  list,
  details,
}) => {
  const weatherItem = ({item}: {item: {[key: string]: any}}) => {
    const time = new Date(item['dt_txt']).getHours();
    const icon = item.weather[0].icon;
    const temp = item.main.temp;

    return (
      <View style={styles.weatherItem}>
        <AppText style={styles.text}>{time}:00</AppText>
        <Image
          style={styles.icon}
          source={{uri: `http://openweathermap.org/img/wn/${icon}.png`}}
        />
        <AppTextBold style={styles.text}>{Math.round(temp)}°</AppTextBold>
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
        <AppTextBold style={styles.text}>
          {Math.round(item.data)}
          <AppText>{item.type}</AppText>
        </AppTextBold>
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
      horizontal={true}
      renderItem={weatherItem}
    />
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    paddingLeft: 15,
    marginRight: 20,
  },
  detailsItem: {
    flexDirection: 'row',
    marginBottom: 9,
  },
  weatherItem: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  detailsIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    color: THEME.COLOR_WHITE,
  },
});
