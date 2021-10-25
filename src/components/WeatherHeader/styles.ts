import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLOR_BLUE,
    paddingVertical: 30,
    marginBottom: 5,
  },
  info: {
    alignItems: 'center',
    marginBottom: 25,
  },
  weatherInfo: {
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: THEME.COLOR_WHITE,
    fontSize: 15,
  },
  icon: {
    width: 40,
    height: 55,
  },
});
