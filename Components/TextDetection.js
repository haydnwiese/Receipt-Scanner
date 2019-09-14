import React from 'react';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";
import { View, Text } from 'react-native';

export default class TextDetection extends React.Component {
    componentDidMount() {
        this.detectText();
    }
    
    detectText = async () => {
        try {
            const options = {
                quality: 0.8,
                base64: true,
                skipProcessing: true,
            };
            const { uri } = await RNCamera.takePictureAsync(options);
            const visionResp = await RNTextDetector.detectFromUri(uri);
            console.log('visionResp', visionResp);
        } catch (e) {
            console.warn(e);
        }
    }; 
    
    render() {
        return(
            <View>
            </View>
        );
    }
}