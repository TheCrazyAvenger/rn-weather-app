import React, {useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, View} from 'react-native';
import MapView from 'react-native-maps';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {Typography} from '../../ui/Typography';
import {WEEK_DAYS} from '../../utitlites/data';
import {la2t, lo2t, updateWeek} from '../../utitlites/utilities';
import {Components} from '../index';
import {styles} from './styles';

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
        <Typography.TitleText>Five day forecast</Typography.TitleText>
      </View>
      {week.map((item, i) => (
        <Components.WeekItem onOpenDay={onOpenDay} key={i} item={item} i={i} />
      ))}
      <View style={{...styles.block, marginTop: 5}}>
        <Typography.TitleText>View on map</Typography.TitleText>
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
        <Typography.TitleText>Used Api</Typography.TitleText>
      </View>
      <Components.APILogo />
    </SafeAreaView>
  );
};
