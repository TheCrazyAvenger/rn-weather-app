import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';

type DayInfoType = {
  data: any;
  time: Array<number>;
  icons: Array<string>;
};

export const DayInfo: React.FunctionComponent<DayInfoType> = ({
  data,
  time,
  icons,
}) => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    const align = data.title === 'Temperature' ? 'center' : undefined;
    return (
      <View style={{...styles.weatherItem, alignItems: align}}>
        <AppText style={{marginBottom: 5}}>{time[index]}:00</AppText>
        {data.title === 'Temperature' ? (
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icons[index]}.png`,
            }}
          />
        ) : null}

        <AppTextBold>{item}</AppTextBold>
      </View>
    );
  };

  return (
    <View style={styles.block}>
      <AppTextBold style={{paddingLeft: 19, marginBottom: 15}}>
        {data.title}
      </AppTextBold>
      <FlatList
        data={data.data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => renderItem({item, index})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    paddingVertical: 15,
    marginBottom: 5,
  },
  weatherItem: {
    paddingHorizontal: 19,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
