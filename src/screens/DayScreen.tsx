import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppTextBold} from '../ui/AppTextBold';

type DayScreenType = {
  route: any;
};

export const DayScreen: React.FunctionComponent<DayScreenType> = ({route}) => {
  console.log(route.params);
  return (
    <View style={styles.center}>
      <AppTextBold>Day Screen</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
