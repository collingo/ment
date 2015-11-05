import {EventEmitter} from 'events';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const data = {};

window.data = data;

const Store = Object.assign({}, EventEmitter.prototype, {
  init() {
    return Promise.resolve({});
  },
  addChangeListener(callback) {
    Store.on('change', callback);
  },
  removeChangeListener(callback) {
    Store.removeListener('change', callback);
  },
  set(path, value) {
    data[path] = value;
    Store.emit('change', data);
  },
  login() {
    console.log('Logging in with', data.username, data.password);
    fetch('/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      })
    }).then(function(response) {
      console.log('status', response.status, response);
      return response.json().then(user => {
        console.log('user', user);
        Store.set('user', user);
      });
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  },
  signUp() {
    console.log('Signing up with', data.username, data.password, data.confirm);
  }
});

export default Store;
