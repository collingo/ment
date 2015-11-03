import {EventEmitter} from 'events';

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
  get() {
    return data;
  },
  set(path, value) {
    console.log('Setting', path, value);
    data[path] = value;
    Store.emit('change', data);
  },
  login() {
    console.log('Logging in with', data.username, data.password);
  },
  signUp() {
    console.log('Signing up with', data.username, data.password, data.confirm);
  }
});

export default Store;
