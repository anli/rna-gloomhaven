import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

const options: StackNavigationOptions = {
  headerShown: false,
};

export default {
  Component: HomeScreen,
  options,
};
