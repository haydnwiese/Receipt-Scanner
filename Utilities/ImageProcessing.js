import RNTextDetector from react-native-text-detector;

processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    if (!(visionResp && visionResp.length > 0)) {
        throw "UNMATCHED";
    }
    this.setState({
        visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    });
};

mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_x = screenWidth / imageProperties.width;

    return visionResp.map(item => {
        return {
            ...item,
            position: {
                width: item.bounding.width * IMAGE_TO_SCREEN_x,
                left: item.bounding.left * IMAGE_TO_SCREEN_x,
                height: item.bounding.height * IMAGE_TO_SCREEN_Y,
                top: item.bounding.top * IMAGE_TO_SCREEN_Y
            }
        };
    });
};