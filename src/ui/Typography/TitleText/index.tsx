import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

type AppTextProps = {
  style?: any;
};

export const TitleText: React.FunctionComponent<AppTextProps> = ({
  style,
  children,
}) => <Text style={{...styles.default, ...style}}>{children}</Text>;
