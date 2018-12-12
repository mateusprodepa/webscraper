import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { View, Text } from 'react-native'

// Screens

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class GalleryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Galeria!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Gallery: GalleryScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName

        if(routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if(routeName === 'Gallery') {
          iconName = `ios-images${focused ? '' : '-outline'}`
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#F74D4D',
      inactiveTintColor: '#CCCCCC'
    }
  }
)

export default createAppContainer(TabNavigator)
