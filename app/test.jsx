import React from 'react';
import { render } from 'react-dom';
import Autocomplete from 'react-autocomplete';
import CategoryInput from './ui/common/CategoryInput';
//import Autocomplete from './ui/common/Autocomplete';

document.addEventListener("DOMContentLoaded", () => {
  let state = {
    group: '',
    category: '',
    subcategory: ''
  };
  let val = 'bla';
  let items = ['black', 'blue', 'brown', 'green'];
//<CategoryInput id="ugh" value={state} />
  render(
    <div>
      <Autocomplete
        getItemValue={i => i}
        value={val}
        items={items}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item}
          </div>
        }
      />
    </div>
  , document.getElementById('cyril'));
});
