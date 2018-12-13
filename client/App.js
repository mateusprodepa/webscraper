import React from 'react';


import { StatusBar, View } from 'react-native';
import TabNavigator from './routes/TabNavigator';
import LoginScreen from './screens/LoginScreen';

import { Provider } from 'react-redux';
// import store from './store/store';

const isLoggedIn = true;

const App = () => {
    return (
      // <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "#1C3649" }}>
          <StatusBar
              backgroundColor="#1C3649"
              barStyle="dark-content"
          />
          {isLoggedIn ? <TabNavigator /> : <LoginScreen />}
        </View>
      // </Provider>
    )
}

export default App;
