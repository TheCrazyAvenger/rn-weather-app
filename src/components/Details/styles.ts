import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    paddingLeft: 15,
    marginRight: 20,
  },
  detailsItem: {
    flexDirection: 'row',
    marginBottom: 9,
  },
  weatherItem: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  detailsIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    color: THEME.COLOR_WHITE,
  },
});
