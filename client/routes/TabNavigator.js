import React, { Component } from "react"
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import { View, Text } from "react-native"

// Screens
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';


const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Gallery: GalleryScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {

        const { routeName } = navigation.state;

        let iconName;

        if(routeName === "Home") {
          iconName = `ios-home`
        } else if(routeName === "Gallery") {
          iconName = `ios-images`
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: "#7FCFCF",
      inactiveTintColor: "#FFFFFF",
      labelStyle: {
        // fontSize: 12,
        marginBottom: 4
      },
      style: {
        backgroundColor: '#086C6C'
      }
    }
  }
)

export default createAppContainer(TabNavigator)
