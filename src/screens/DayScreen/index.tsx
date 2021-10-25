import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import {Components} from '../../components';
import {styles} from './styles';

type DayScreenType = {
  route: any;
  data: Array<string>;
};

export const DayScreen: React.FunctionComponent<DayScreenType> = ({route}) => {
  const {dayData} = route.params;

  const timeData: Array<number> = [];
  const iconData: Array<string> = [];
  const tempData: Array<string> = [];
  const humidityData: Array<string> = [];
  const pressureData: Array<string> = [];
  const windData: Array<string> = [];
  const visibleData: Array<number> = [];

  dayData.map((item: any) => {
    const time = new Date(item['dt'] * 1000).getHours();
    const icon = item.weather[0].icon;

    const {visibility} = item;
    const {humidity, pressure, temp} = item.main;
    const wind = item.wind.speed;

    timeData.push(time);
    iconData.push(icon);
    tempData.push(`${Math.round(temp)}°`);
    humidityData.push(`${Math.round(humidity)}%`);
    pressureData.push(`${Math.round(pressure)}hPa`);
    windData.push(`${Math.round(wind)}m/s`);
    visibleData.push(visibility);
  });

  const data = [
    {title: 'Temperature', data: tempData},
    {title: 'Humidity', data: humidityData},
    {title: 'Pressure', data: pressureData},
    {title: 'Wind', data: windData},
    {title: 'Visibility', data: visibleData},
  ];

  const renderData = useMemo(
    () =>
      data.map(item => {
        return (
          <Components.DayInfo
            key={item.title}
            data={item}
            time={timeData}
            icons={iconData}
          />
        );
      }),
    [data],
  );

  return (
    <ScrollView style={styles.root}>
      {renderData}
      <Components.APILogo />
    </ScrollView>
  );
};
