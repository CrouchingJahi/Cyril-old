import React from 'react';
import { findDOMNode } from 'react-dom';
import { routeEvent } from './Router.jsx';

const { string } = React.PropTypes;

export default class Link extends React.Component {
  propTypes: {
    state: string
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    findDOMNode(this).dispatchEvent(routeEvent(this.props.state));
  }

  render() {
    return <a href onClick={ this.handleClick }>{ this.props.children }</a>;
  }
}
