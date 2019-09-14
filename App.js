import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextDetection from './Components/TextDetection';
import CameraView from './Components/CameraView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CameraView />
      </View>
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
