import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

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

ReactDOM.render(<App />, document.getElementById('root'));
