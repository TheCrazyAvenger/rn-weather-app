import {StyleSheet} from 'react-native';
import {THEME} from '../../theme';

export const styles = StyleSheet.create({
  weekItem: {
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: THEME.COLOR_GRAY,
    backgroundColor: THEME.COLOR_WHITE,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
  },
  weekInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
  },
  weekTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  weekend: {
    color: 'red',
  },
  dayText: {
    fontSize: 15,
    color: THEME.COLOR_BLACK,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
