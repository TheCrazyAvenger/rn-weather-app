import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {DATA, DETAILS} from '../utitlites/data';

export const Details: React.FunctionComponent = () => {
  const weatherItem = ({
    item,
  }: {
    item: {img: string; time: string; temp: number};
  }) => {
    return (
      <View style={styles.weatherItem}>
        <Text>{item.time}</Text>
        <Text>{item.img}</Text>
        <Text>{item.temp}</Text>
      </View>
    );
  };

  const detailsItem = ({item}: {item: {img: string; data: string}}) => {
    return (
      <View style={styles.detailsItem}>
        <Text style={{marginRight: 5}}>{item.img}</Text>
        <Text>{item.data}</Text>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.details}>
          <FlatList data={DETAILS} renderItem={detailsItem} />
        </View>
      }
      data={DATA}
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
  },
  weatherItem: {
    paddingHorizontal: 10,
  },
});
