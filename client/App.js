import React from 'react';


import { StatusBar, View } from 'react-native'
import TabNavigator from './routes/TabNavigator'
import LoginScreen from './screens/LoginScreen'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(() => {})

const isLoggedIn = true;

const App = () => {
    return (
      <View store={store} style={{ flex: 1 }}>
        <StatusBar
            backgroundColor="#F74D4D"
            barStyle="dark-content"
        />
        {isLoggedIn ? <TabNavigator /> : <LoginScreen />}
      </View>
    )
}

export default App;
