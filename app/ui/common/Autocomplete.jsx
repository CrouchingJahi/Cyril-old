import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      popup: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.openSuggest = this.openSuggest.bind(this);
    this.closeSuggest = this.closeSuggest.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value,
      popup: true
    });
  }

  onClick(e) {
    this.setState({
      value: e.target.textContent,
      popup: false
    });
  }
  onBlur(e) {
    console.log('blur',e);
  }

  openSuggest() {
    this.setState({ popup: true });
  }

  closeSuggest() {
    this.setState({ popup: false });
  }

  render() {
    let cssClass = this.state.popup ? 'autocomplete active' : 'autocomplete inactive';
    let suggestions = this.state.popup ? this.props.items.filter(i => i.toLowerCase().includes(this.state.value.toLowerCase())) : [];
    return (
      <div className={cssClass}>
        <input
          value={this.state.value}
          onChange={this.onChange}
          onFocus={this.openSuggest}
          onBlur={this.onBlur}
          />
        <ul className="suggest" onClick={this.onClick}>
          { suggestions.map(i => (
            <li key={i} onFocus={e => console.log('focus')}>{i}</li>
          )) }
        </ul>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  value: React.PropTypes.string.isRequired
}
