import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducer from './reducer/index';

const POSTDATA = [
  {
    postID: 'id1',
    postIssuer: { issuerID: '', issuerName: '' },
    postImage: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    // postMessage: 'hekko',
    postTag: 'OUTFIT',
    likeIssuerId: ['id1', 'id2', 'id3'],
  },
];

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
