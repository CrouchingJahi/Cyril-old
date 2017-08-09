import React from 'react';
import Services from '../services/Services';

import CategoryInput from '../common/CategoryInput';

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      edit_regex: this.props.matcher.id
    };
    this.click = this.click.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  click(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
  }

  inputChange(e) {
    this.setState({edit_regex: e.target.value});
  }

  render() {
    let cat = this.props.matcher.category;
    let id = this.props.matcher.id.toString();
    return (
      <span>
        <a href onClick={this.click}>{id}</a>
        { this.state.editing &&
          <span>
            <h4>Edit</h4>
            <input type="text"
              name="edit_regex"
              value={this.state.edit_regex}
              onChange={this.inputChange}
            />
            <CategoryInput id={id} value={cat} />
          </span>
        }
      </span>
    );
  }
}

export default class CategoriesSettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchers: []
    };
  }

  componentDidMount() {
    Services.getMatchers(matchers => {
      this.setState({
        matchers: matchers || []
      });
    });
  }

  render() {
    return (
      <div id="settings-categories">
        <h2>Categories Settings</h2>
        <p>Edit the regex keys that categorize your purchases.</p>
        <h4>Keys</h4>
        <ul>
          { this.state.matchers.map((matcher, id) =>
            <li key={id}><Listing matcher={matcher} /></li>
          )}
        </ul>
      </div>
    );
  }
}
