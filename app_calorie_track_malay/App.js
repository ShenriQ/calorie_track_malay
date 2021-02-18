import React from 'react';
import {Provider} from 'react-redux'
import store from './src/redux/store';
import Route from './src/views/Route';

class App extends React.Component {
  render()
  {
    return (
      <Provider store = {store}>
        <Route />
      </Provider>
    );
  }
}

export default App;
