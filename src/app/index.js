'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';
import Store from './store';

Store.init().then(state => {
  ReactDOM.render(
    <Main state={state} />,
    document.getElementById('main')
  );
});
