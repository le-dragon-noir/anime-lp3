import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ReviewScreen from '../screens/ReviewScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'News';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="News"
        component={HomeScreen}
        options={{
          title: 'News',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="newspaper-o" />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={LinksScreen}
        options={{
          title: 'List',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="book" />,
        }}
      />
      <BottomTab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          title: 'Reviews',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="edit" />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="male" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const getHeaderTitle = (route) =>
  route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

