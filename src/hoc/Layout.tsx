import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header} from '../components/Header';
import {THEME} from '../theme';

export const Layout: React.FunctionComponent = ({children}) => {
  return (
    <View style={styles.root}>
      <Header />
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
});
