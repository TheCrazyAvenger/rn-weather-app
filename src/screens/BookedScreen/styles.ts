import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
  current: {
    paddingVertical: 25,
    backgroundColor: THEME.COLOR_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    color: THEME.COLOR_WHITE,
    fontSize: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
