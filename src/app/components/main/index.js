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
    console.log('store change', state);
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
      {this.renderPage()}
    </div>);
  }
  renderPage() {
    let page;
    switch(this.state.page) {
      case 'sign-up':
        page = <SignUp username={this.state.username} password={this.state.password} confirm={this.state.confirm} />;
      break;
      default:
        page = <Login username={this.state.username} password={this.state.password} />;
    }
    return page;
  }
}

export default Main;
