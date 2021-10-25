import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
  usedApi: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 50,
  },
});
