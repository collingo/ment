import React from 'react';

import Store from '../../store';

class Login extends React.Component {
  render() {
    return (<div id="login">
      <form action="/api/login" method="post" onSubmit={this.onLogin}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" name="username" value={this.props.username} onChange={this.onChangeUsername} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" value={this.props.password} onChange={this.onChangePassword} />
        <input type="submit" value="Login" />
        <a href="/sign-up" onClick={this.onClickSignUp}>Sign up</a>
      </form>
    </div>);
  }
  onChangeUsername(e) {
    Store.set('username', e.target.value);
  }
  onChangePassword(e) {
    Store.set('password', e.target.value);
  }
  onLogin(e) {
    e.preventDefault();
    Store.login();
  }
  onClickSignUp(e) {
    e.preventDefault();
    Store.set('page', 'sign-up');
  }
}

export default Login;
