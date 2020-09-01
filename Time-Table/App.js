import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import CourseList from './src/screens/CourseList';
const navigator = createStackNavigator({
  Home : HomeScreen,
  Courses : CourseList
},{
  initialRouteName : 'Home',
  defaultNavigationOptions : {
    title : 'Time Table'
  }
});

export default createAppContainer(navigator);