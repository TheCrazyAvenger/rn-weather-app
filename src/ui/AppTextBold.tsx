import React from 'react';
import {Text, StyleSheet} from 'react-native';

type AppTextProps = {
  style?: any;
};

export const AppTextBold: React.FunctionComponent<AppTextProps> = ({
  style,
  children,
}) => <Text style={{...styles.default, ...style}}>{children}</Text>;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'OpenSans-Bold',
  },
});
