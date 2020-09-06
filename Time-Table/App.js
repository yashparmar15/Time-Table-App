import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import CourseList from './src/screens/CourseList';
import EE301 from './src/screens/EE301';
import EE229 from './src/screens/EE229';
import EE308 from './src/screens/EE308';
import EE325 from './src/screens/EE325';
import HS301 from './src/screens/HS301';
import TT from './src/screens/TT';
import LoginScreen from './src/screens/Login';
import FeedbackScreen from './src/screens/FeedbackScreen'; 
import Users from './src/screens/Users';
import Profile from './src/screens/ProfileScreen';
const navigator = createStackNavigator({
  Home : HomeScreen,
  Courses : CourseList,
  EE301 : EE301,
  EE229 : EE229,
  EE325 : EE325,
  EE308 : EE308,
  HS301 : HS301,
  TT : {screen : TT},
  Feedback : FeedbackScreen,
  Users : Users,
  Login : { screen : LoginScreen},
  Profile : Profile,
},{
  headerMode : 'none'
}
);

export default createAppContainer(navigator);