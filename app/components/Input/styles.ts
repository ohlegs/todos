import {Dimensions, StyleSheet} from 'react-native';
import {border} from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: border,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    maxWidth: Dimensions.get('screen').width * 0.75,
  },

  list: {
    marginBottom: 100,
    height: '100%',
  },
});
