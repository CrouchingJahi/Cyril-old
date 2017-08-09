import React from 'react';
import Services from '../services/Services';
import Autocomplete from 'react-autocomplete';

//import Autocomplete from './Autocomplete';

export default class CategoryInput extends React.Component {
  defaultProps() {
    return {
      value: {
        group: '',
        category: '',
        subcategory: ''
      }
    };
  }
  constructor(props) {
    super(props);

    this.state = this.props.value;
//    this.state.categories = {};
    this.state.categories = {
      color: {
        cool: {
          blue: null,
          purple: null,
          green: null
        },
        neutral: {
          brown: null
        },
        warm: {
          red: null,
          yellow: null
        }
      },
      food: {}
    };

    this.acParams = {
      getItemValue: i => i,
      menuStyle: {
//        'background-color': 
      },
      renderItem: i => <p>{i}</p>
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(level, value) {
    this.setState({[level]: value});
  }

  /*componentDidMount() {
    let input = this;
    Services.getCategorizations((categories = {}) => {
      console.log(categories);
      input.setState({categories});
    });
  }*/

  render() {
    let id = `category_${this.props.id}`;
    let id_group = `${id}_group`;
    let id_category = `${id}_category`;
    let id_subcategory = `${id}_subcategory`;

    let shouldCategoryShow = !!this.state.group;
//    let shouldSubcategoryShow = shouldCategoryShow && this.state.category && (this.state.categories[this.state.group][this.state.category] || !this.state.categories[this.state.group]);
    let shouldSubcategoryShow = shouldCategoryShow && this.state.category;
    return (
      <div className="category_input" id={id}>
        <span>
          <Autocomplete
            name="group"
            items={ Object.keys(this.state.categories) }
            getItemValue={this.acParams.getItemValue}
            renderItem={this.acParams.renderItem}
            value={ this.state.group }
            menuStyle={this.acParams.menuStyle}
            />
        </span>
        { shouldCategoryShow &&
          <span>
            <input name={id_category} list={id_category} value={this.state.category} onChange={this.onChange} />
            <datalist id={id_category}>
              { Object.keys(this.state.categories[this.state.group] || {}).map(cat => <option key={cat} value={cat} />) }
            </datalist>
          </span>
        }
        { shouldSubcategoryShow &&
          <span>
            <input name={id_subcategory} list={id_subcategory} value={this.state.subcategory} onChange={this.onChange} />
            { this.state.categories[this.state.group] &&
              <datalist id={id_subcategory}>
                { Object.keys(this.state.categories[this.state.group][this.state.category]).map(sub => <option key={sub} value={sub} />) }
              </datalist>
            }
          </span>
        }
      </div>
    );
  }
}

CategoryInput.propTypes = {
  id: React.PropTypes.string.isRequired
};
