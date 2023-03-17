import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';

export default function Logo() {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.textLogo}>todos</Text>
    </View>
  );
}
