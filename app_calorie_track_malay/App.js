import React, {useEffect, useState} from 'react';
import { ModalPortal } from 'react-native-modals';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import MemberRoute from './src/routes/Member';
import GuestRoute from './src/routes/Guest';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'PlusJakartaSans',
  }
};

setCustomText(customTextProps);

const App = (props) => {
    const [isLogged, SetIsLogged] = useState(true)

    return (
      <Provider store={store}>
        {
          isLogged ? <MemberRoute /> : <GuestRoute />
        }
        <ModalPortal />
      </Provider>
    );
}

export default App;
