import React from 'react';

import Store from '../../store';
import Login from '../login';
import SignUp from '../sign-up';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  onChangeStore = (state) => {
    this.setState(state);
  }
  componentDidMount() {
    Store.addChangeListener(this.onChangeStore);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChangeStore);
  }
  render() {
    return (<div id="main">
      <h1>Ment</h1>
      {this.renderPage()}
    </div>);
  }
  renderPage() {
    let page;
    switch(this.state.page) {
      case 'sign-up':
        page = <SignUp {...this.state} />;
      break;
      default:
        if(this.state.user && this.state.user.id) {
          page = <div>Welcome {this.state.user.username}</div>;
        } else {
          page = <Login {...this.state} />;
        }
    }
    return page;
  }
}

export default Main;
