import React from 'react';

import Store from '../../store';

class SignUp extends React.Component {
  render() {
    return (<div id="sign-up">
      <form action="/sign-up" method="post" onSubmit={this.onSignUp}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" name="username" value={this.props.username} onChange={this.onChangeUsername} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" value={this.props.password} onChange={this.onChangePassword} />
        <label htmlFor="confirm">Confirm password:</label>
        <input id="confirm" type="password" name="confirm" value={this.props.confirm} onChange={this.onChangeConfirm} />
        <input type="submit" value="Sign up" />
      </form>
      <a href="/" onClick={this.onClickCancel}>Cancel</a>
    </div>);
  }
  onChangeUsername(e) {
    Store.set('username', e.target.value);
  }
  onChangePassword(e) {
    Store.set('password', e.target.value);
  }
  onChangeConfirm(e) {
    Store.set('confirm', e.target.value);
  }
  onSignUp(e) {
    e.preventDefault();
    Store.signUp();
  }
  onClickCancel(e) {
    e.preventDefault();
    Store.set('page', 'home');
  }
}

export default SignUp;
