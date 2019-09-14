import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        pictureTaken: false,
        imageUri: null,
    }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async() => {
      if (this.camera) {
          const options = { quality: 0.8, base64: true }
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
          this.setState({
            pictureTaken: true,
            imageUri: data.uri,
          });
      }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.pictureTaken) {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                    <ImageBackground 
                        style={{
                            flex: 1
                        }}
                        source={{uri: this.state.imageUri}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                height: 40,
                                width: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30,
                                marginLeft: 20,
                                borderRadius: 15,
                            }}
                            onPress={() => this.setState({
                                pictureTaken: false,
                                imageUri: null,
                            })}>
                            <Text>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                height: 40,
                                width: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30,
                                marginLeft: 20,
                                borderRadius: 15,
                            }}
                            onPress={() => this.props.navigation.navigate('DetailsScreen')}>
                            <Text>Retake</Text>
                        </TouchableOpacity>
                    </ImageBackground>
            </View>
        );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            ref={ref => {
                this.camera = ref;
            }}
            style={{ flex: 1 }} 
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  marginTop: 20,
                  marginLeft: 20,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
              <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        alignContent: "center",
                        backgroundColor: 'white',
                        height: 40,
                        width: '30%',
                        marginBottom: 20,
                        borderRadius: 15,
                        marginLeft: -55,
                    }}
                    onPress={() => {
                        this.takePicture();
                    }}>
                        <Text>Take Picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}