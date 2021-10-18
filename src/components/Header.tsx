import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';

export const Header: React.FunctionComponent = () => {
  return (
    <View style={styles.root}>
      <AppTextBold style={styles.cityName}>City</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: THEME.COLOR_WHITE,
  },
  cityName: {
    color: THEME.COLOR_GRAY,
  },
});
