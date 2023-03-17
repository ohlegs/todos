import {View} from 'react-native';
import React from 'react';
import Input from './app/components/Input/Input';
import Logo from './app/components/Logo/Logo';
import {Provider} from 'react-redux';
import {store} from './app/redux/store/store';
import List from './app/components/List/List';
import Footers from './app/components/Footer/Footer';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{height: '100%', width: '100%'}}>
        <Logo />
        <Input />
        <List />
        <Footers />
      </View>
    </Provider>
  );
}
