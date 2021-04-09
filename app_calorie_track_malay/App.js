import React from 'react';
import {
  setCustomText
} from 'react-native-global-props';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppMain from './src/AppMain';

const customTextProps = {
  style: {
    fontFamily: 'PlusJakartaSans',
  }
};

setCustomText(customTextProps);

const App = (props) => {
    return (
      <Provider store={store}>
        <AppMain />
      </Provider>
    );
}

export default App;
