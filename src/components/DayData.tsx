import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {THEME} from '../theme';
import {TIME} from '../utitlites/data';

type DayDataTypes = {
  data: any;
};

export const DayData: React.FunctionComponent<DayDataTypes> = ({data}) => {
  const renderInfo = (item: any, i: number) => {
    return (
      <View key={i} style={styles.info}>
        <Text>{TIME[i]}</Text>
        <Text>{item.img}</Text>
        <Text>{item.data}</Text>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {data.map((item: any, i: number) => renderInfo(item, i))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: THEME.COLOR_WHITE,
    marginBottom: 5,
  },
  info: {
    // width: '30%',
  },
});
