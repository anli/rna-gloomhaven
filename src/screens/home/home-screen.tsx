import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const Component = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

const options: StackNavigationOptions = {
  headerShown: false,
};

export const HomeScreen = {
  Component,
  options,
};
