/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import CalendarScreen from './Calendar'
import HomeScreen from './Home'
import AddEventScreen from './AddEvent'

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Calendar: {
    screen: CalendarScreen,
  },
  AddEvent: {
    screen: AddEventScreen,
  },
},
{
  initialRouteName: 'Home',
  headerMode: 'screen',
});

export default () => <AppNavigator />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
