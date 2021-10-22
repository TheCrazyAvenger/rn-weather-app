import React, {useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {useTypedSelector} from '../store/hooks/useTypedSelector';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import {WEEK_DAYS} from '../utitlites/data';
import {la2t, lo2t, updateWeek} from '../utitlites/utilities';
import {APILogo} from './APILogo';
import {WeekItem} from './WeekItem';

type WeatherInfoType = {
  onOpenDay: (dayData: Array<any>) => void;
};

export const WeatherInfo: React.FunctionComponent<WeatherInfoType> = ({
  onOpenDay,
}) => {
  const [week, setWeek] = useState(WEEK_DAYS);

  const longitude = useTypedSelector(state => state.weather.longitude);
  const latitude = useTypedSelector(state => state.weather.latitude);
  let xtile = lo2t(longitude, 2);
  let ytile = la2t(latitude, 2);

  useEffect(() => {
    setWeek(updateWeek());
  }, []);

  const openMap = () => {
    Linking.openURL(
      `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=${latitude}&lon=${longitude}&zoom=10`,
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.block}>
        <AppTextBold>Five day forecast</AppTextBold>
      </View>
      {week.map((item, i) => (
        <WeekItem onOpenDay={onOpenDay} key={i} item={item} i={i} />
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
            latitudeDelta: ytile,
            longitudeDelta: xtile,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
        />
        <Image
          style={{position: 'absolute', width: '100%', height: 200}}
          source={{
            uri: `https://tile.openweathermap.org/map/precipitation_new/2/${xtile}/${ytile}.png?appid=7fb17b0400480080f824b5827af64eca`,
          }}
        />
      </View>
      <View style={styles.block}>
        <AppTextBold>Used Api</AppTextBold>
      </View>
      <APILogo />
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
