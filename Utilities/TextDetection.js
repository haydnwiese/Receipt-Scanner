import React from 'react';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";
import { View, Text } from 'react-native';

export async function detectText(uri) {
    try {
        const visionResp = await RNTextDetector.detectFromUri(uri);
        console.log('visionResp', visionResp);
    } catch (e) {
        console.warn(e);
    }
}; 