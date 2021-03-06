import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextDetection from './Utilities/TextDetection';
import CameraExample from './Components/CameraView';
import AppNavigator from './Navigation/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
