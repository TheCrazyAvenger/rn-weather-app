import {useNavigation} from '@react-navigation/core';
import React, {useMemo} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {removeBookmark} from '../../store/actions/bookmarks';
import {fetchWeather, toggleLoading} from '../../store/actions/weather';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {THEME} from '../../theme';
import {Typography} from '../../ui/Typography';
import {styles} from './styles';

type BackScreenType = {
  route: any;
};

export const BookedScreen: React.FunctionComponent<BackScreenType> = ({
  route,
}) => {
  const {data, name} = route.params;

  const bookmarks = useTypedSelector(state => state.bookmarks.bookmarks);

  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const now = data.list[0];
  const icon = now.weather[0].icon;
  const {temp} = now.main;

  const showBookmarks = useMemo(() => {
    if (bookmarks) {
      return bookmarks.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={{
              ...styles.block,
              ...styles.current,
            }}
            onPress={() => {
              dispatch(toggleLoading());
              dispatch(fetchWeather(item.lat, item.lon));
              navigation.navigate('Main');
            }}
            activeOpacity={0.7}>
            <Typography.TitleText style={styles.cityName}>
              {item.name}
            </Typography.TitleText>
            <TouchableOpacity activeOpacity={0.7}>
              <Icon
                onPress={() => dispatch(removeBookmark(item.name))}
                name="x"
                color={THEME.COLOR_WHITE}
                size={25}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      });
    } else {
      return null;
    }
  }, [bookmarks]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.block}>
        <Typography.TitleText>Current place</Typography.TitleText>
      </View>
      <View
        style={{
          ...styles.block,
          ...styles.current,
        }}>
        <Typography.TitleText style={styles.cityName}>
          {name}
        </Typography.TitleText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}.png`,
            }}
          />
          <Typography.TitleText style={styles.cityName}>
            {Math.round(temp)}°
          </Typography.TitleText>
        </View>
      </View>
      <View style={styles.block}>
        <Typography.TitleText>Booked</Typography.TitleText>
      </View>
      {showBookmarks}
      <View style={{...styles.block, height: '100%'}}>
        <Typography.Subtitle style={{marginBottom: 10}}>
          You could click{' '}
          <Icon name="search" size={18} color={THEME.COLOR_BLACK} /> to find a
          city.
        </Typography.Subtitle>
        <Typography.Subtitle>
          If you want to add it to bookmarks use{' '}
          <Icon name="star" size={18} color={THEME.COLOR_BLACK} />.
        </Typography.Subtitle>
      </View>
    </ScrollView>
  );
};
