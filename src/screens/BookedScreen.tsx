import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {AppTextBold} from '../ui/AppTextBold';

type BackScreenType = {
  route: any;
};

export const BookedScreen: React.FunctionComponent<BackScreenType> = ({
  route,
}) => {
  const {data, name} = route.params;
  console.log(data.list);

  const now = data.list[0];
  const icon = now.weather[0].icon;
  const {temp} = now.main;

  return (
    <View style={styles.root}>
      <View style={styles.block}>
        <AppTextBold>Current place</AppTextBold>
      </View>
      <View
        style={{
          ...styles.block,
          ...styles.current,
        }}>
        <AppTextBold style={styles.cityName}>{name}</AppTextBold>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}.png`,
            }}
          />
          <AppTextBold style={styles.cityName}>{Math.round(temp)}°</AppTextBold>
        </View>
      </View>
      <View style={styles.block}>
        <AppTextBold>Booked</AppTextBold>
      </View>
      <View style={{...styles.block, height: '100%'}}>
        <AppText style={{marginBottom: 10}}>
          You can click{' '}
          <Icon name="search" size={18} color={THEME.COLOR_BLACK} /> to find a
          city.
        </AppText>
        <AppText>
          After that use{' '}
          <Icon name="star" size={18} color={THEME.COLOR_BLACK} /> to add it to
          bookmarks
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
  current: {
    paddingVertical: 30,
    backgroundColor: '#00ccff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    color: THEME.COLOR_WHITE,
    fontSize: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
