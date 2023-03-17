import {StyleSheet, Dimensions} from 'react-native';
import {border} from '../../colors';
import {black} from './../../colors';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: border,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    height: 70,
  },

  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCheck: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    padding: 3,
  },
  buttonRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 20,
    color: black,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  input: {
    height: '100%',
    width: Dimensions.get('screen').width * 0.75,
    borderWidth: 1,
  },
});
