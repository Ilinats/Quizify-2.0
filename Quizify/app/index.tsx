import { View, Text } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import {globalVariable} from '../try';

const index = () => {
  console.log("Session:", globalVariable.Session);
  return (
    <View>
    { globalVariable.Session ? <Redirect href={'/(tabs)'} /> : <Redirect href={'/(auth)/sign-in'} /> }
    </View>
  );
};

export default index;