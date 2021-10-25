import {useNavigation} from '@react-navigation/core';
import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {removeBookmark} from '../store/actions/bookmarks';
import {fetchWeather, toggleLoading} from '../store/actions/weather';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
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
            <AppTextBold style={styles.cityName}>{item.name}</AppTextBold>
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
      {showBookmarks}
      <View style={{...styles.block, height: '100%'}}>
        <AppText style={{marginBottom: 10}}>
          You could click{' '}
          <Icon name="search" size={18} color={THEME.COLOR_BLACK} /> to find a
          city.
        </AppText>
        <AppText>
          If you want to add it to bookmarks use{' '}
          <Icon name="star" size={18} color={THEME.COLOR_BLACK} />.
        </AppText>
      </View>
    </ScrollView>
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
    paddingVertical: 25,
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
