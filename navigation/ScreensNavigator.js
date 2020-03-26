import * as React from 'react';
import { createStackNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MediaViewScreen from '../screens/MediaViewScreen';
import { StackView } from '@react-navigation/stack';

const Navigator = createStackNavigator();

export default function ScreenNavigator({ navigation }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <Navigator.Navigator>
      <Navigator.Screen
        name="Media"
        component={MediaViewScreen}
      />
      <Navigator.Screen
        name="List"
        component={LinksScreen}
        options={{
          title: 'Anime list',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="book" />,
        }}
      />
    </Navigator.Navigator>
  );
}

const getHeaderTitle = (route) => 
  route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

