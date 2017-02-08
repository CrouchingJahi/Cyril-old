import React from 'react';
import { findDOMNode } from 'react-dom';

const { string, object } = React.PropTypes;

export function routeEvent(state) {
  return new CustomEvent('route', {
    detail: state,
    bubbles: true,
    cancelable: true
  });
}

export default class Router extends React.Component {
  propTypes: {
    default: string,
    states: object
  }

  constructor(props) {
    super(props);

    this.state = {
      route: this.props.default
    };

    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    findDOMNode(this).addEventListener('route', this.changeState);
  }

  componentWillUnmount() {
    findDOMNode(this).removeEventListener('route', this.changeState);
  }

  changeState(e) {
    const state = e.detail;

    if (!state || !this.props.states[state]) {
      throw new Error('illegal route: ' + state);
    }
    else {
      this.setState({
        route: e.detail
      });
    }
  }

  render() {
    var Route = this.props.states[this.state.route];
    return <div id="router"><Route /></div>;
  }
}
