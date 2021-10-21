import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import {WEEK_DAYS} from '../utitlites/data';
import {updateWeek} from '../utitlites/utilities';
import {WeekItem} from './WeekItem';

export const WeatherInfo: React.FunctionComponent = () => {
  const [week, setWeek] = useState(WEEK_DAYS);

  const latitude = useTypedSelector(state => state.weather.latitude);
  const longitude = useTypedSelector(state => state.weather.longitude);

  useEffect(() => {
    setWeek(updateWeek());
  }, []);

  const openMap = () => {
    Linking.openURL(
      `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=${latitude}&lon=${longitude}&zoom=10`,
    );
  };

  const xtile = Math.floor(((longitude + 180) / 360) * Math.pow(2, 10));
  const ytile = Math.floor(
    ((1 -
      Math.log(
        Math.tan((latitude * Math.PI) / 180) +
          1 / Math.cos((latitude * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      Math.pow(2, 10),
  );

  const openSite = () => {
    Linking.openURL('https://openweathermap.org/');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.block}>
        <AppTextBold>Five day forecast</AppTextBold>
      </View>
      {week.map((item, i) => (
        <WeekItem key={i} item={item} i={i} />
      ))}
      <View style={{...styles.block, marginTop: 5}}>
        <AppTextBold>View on map</AppTextBold>
      </View>
      <View style={{...styles.block, padding: 0, position: 'relative'}}>
        <MapView
          onPress={openMap}
          scrollEnabled={false}
          zoomEnabled={false}
          style={{width: '100%', height: 200}}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.7,
            longitudeDelta: 0.7,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
        />
        <Image
          style={{position: 'absolute', width: '100%', height: 200}}
          source={{
            uri: `https://tile.openweathermap.org/map/clouds_new/10/${Math.round(
              xtile,
            )}/${Math.round(ytile)}.png?appid=7fb17b0400480080f824b5827af64eca`,
          }}
        />
      </View>
      <View style={styles.block}>
        <AppTextBold>Used Api</AppTextBold>
      </View>
      <View style={{...styles.block, ...styles.usedApi}}>
        <TouchableOpacity onPress={openSite}>
          <Image
            style={styles.logo}
            source={require('../../assets/OpenWeather-Logo-Light.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
  usedApi: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 50,
  },
});
