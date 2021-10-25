import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {Typography} from '../../ui/Typography';
import {styles} from './styles';

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
        <Typography.Subtitle style={{marginBottom: 5}}>
          {time[index]}:00
        </Typography.Subtitle>
        {data.title === 'Temperature' ? (
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icons[index]}.png`,
            }}
          />
        ) : null}

        <Typography.TitleText>{item}</Typography.TitleText>
      </View>
    );
  };

  return (
    <View style={styles.block}>
      <Typography.TitleText style={{paddingLeft: 19, marginBottom: 15}}>
        {data.title}
      </Typography.TitleText>
      <FlatList
        data={data.data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => renderItem({item, index})}
      />
    </View>
  );
};
