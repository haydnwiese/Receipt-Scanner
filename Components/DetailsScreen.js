import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons';
import Environment from "../config/environment";

export default class DetailsScreen extends React.Component {
    state = {
        imageUri: null,
        loading: true,
        currencyFrom: 'CAD',
        currencyTo: 'USD',
        dectectionData: null,
    }

    async componentWillMount() {
        const imageBase64 = await this.props.navigation.getParam('imageBase64', 'no-image');
        this.makeTextDetectionRequest(imageBase64);
    }

    makeTextDetectionRequest = async (imageBase64) => {
        const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + Environment["GOOGLE_CLOUD_VISION_API_KEY"];
        const data = {
            requests: [
                {
                    image: {
                        content: imageBase64
                    },
                    features: [
                        {
                            type: "TEXT_DETECTION"
                        }
                    ]
                }
            ]
        };

        try {
            let response = await fetch(url, {
                method: 'POST', 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            
            let responseJson = await response.json();
            console.log(responseJson);

            let textAnnotations = responseJson.responses[0].textAnnotations;
            let textAnnotationsSorted = [];
            let included = [];
            let purchaseValues = [];

            if (textAnnotations !== undefined) {
                textAnnotations.forEach((element, index) => {
                    // console.log(element.description[0]);
                    let match = element.description.match(/[0-9]+\.[0-9]{2}/i);
                    let value = parseFloat(match).toFixed(2);

                    if (index !== 0 && match !== null && !included.includes(value)) {
                        textAnnotationsSorted.push({description: value, index: index});
                        included.push(value);
                    }
                });

                textAnnotationsSorted.forEach(element => {
                    purchaseValues.push({amount: element.description, label: textAnnotations[element.index + textAnnotationsSorted.length].description})
                });
            }
            // await textAnnotations.sort((a,b) => (a.description.charAt(0) > b.description.charAt(0)) ? 1 : ((b.description.charAt(0) > a.description.charAt(0)) ? -1 : 0));

            // for ()
            // console.log(purchaseValues);
            this.setState({ loading: false, dectectionData: purchaseValues });
            // console.log(this.state.dectectionData);
        } catch (error) {
            console.log(error);
        }
    };

    renderListItem = (item) => {
        return(
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                <Text style={{margin: 20}}>{item.label}</Text> 
                <Text style={{margin: 20}}>{item.amount}</Text>
            </View>
        );
    }
    
    render() {
        if (this.state.loading) {
            return(
                <View style={{flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator animating={this.state.loading} size='large' color='black'/>
                </View>
            );
        } else {
            return(
                <View 
                    style={{
                        flex: 1, 
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            marginTop: 20,
                        }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {this.state.currencyFrom} => {this.state.currencyTo}
                        </Text>
                    </View>

                    <View style={{flex: 1, marginTop: 30}}>
                        <FlatList
                            data={this.state.dectectionData}
                            renderItem={({item}) => this.renderListItem(item)}
                            ItemSeparatorComponent={() => (
                                <View style={{backgroundColor: 'grey', alignSelf: 'center', height: 1, width: '90%'}}/>
                            )}
                            extraData={this.state}
                        />
                    </View>
                </View>
            );
        }
    }
}