import React from 'react';


import { StatusBar, View } from 'react-native';
import TabNavigator from './routes/TabNavigator';
import LoginScreen from './screens/LoginScreen';

import { Provider } from 'react-redux';
import store from './store';

const isLoggedIn = true;

const App = () => {
    return (
      <Provider store={store}>
        <View store={store} style={{ flex: 1 }}>
          <StatusBar
              backgroundColor="#1C3649"
              barStyle="dark-content"
          />
          {isLoggedIn ? <TabNavigator /> : <LoginScreen />}
        </View>
      </Provider>
    )
}

export default App;
