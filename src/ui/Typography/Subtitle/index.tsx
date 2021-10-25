import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {styles} from './styles';

type AppTextProps = {
  style?: any;
};

export const Subtitle: React.FunctionComponent<AppTextProps> = ({
  style,
  children,
}) => <Text style={{...styles.default, ...style}}>{children}</Text>;
