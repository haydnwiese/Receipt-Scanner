import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CameraView from '../Components/CameraView';
import DetailsScreen from '../Components/DetailsScreen';

const RootStack = createStackNavigator({
    CameraView: {
      screen: CameraView,
    },
    DetailsScreen: {
      screen: DetailsScreen,
    }
  });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;