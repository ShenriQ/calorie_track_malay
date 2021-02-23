import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import MemberRoute from './src/routes/Member';
import GuestRoute from './src/routes/Guest';

const App = (props) => {
    const [isLogged, SetIsLogged] = useState(false)

    return (
      <Provider store={store}>
        {
          isLogged ? <MemberRoute /> : <GuestRoute />
        }
      </Provider>
    );
}

export default App;
