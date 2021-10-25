import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    paddingVertical: 15,
    marginBottom: 5,
  },
  weatherItem: {
    paddingHorizontal: 19,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
