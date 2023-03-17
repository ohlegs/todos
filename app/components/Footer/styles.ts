import {StyleSheet} from 'react-native';
import {border, red, transparent} from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: border,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    padding: 3,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: transparent,
    marginHorizontal: 5,
  },
});
