import React from 'react';
import { shallow, mount } from 'enzyme';

import Services from '../../app/ui/services/Services';

import CategoryInput from '../../app/ui/common/CategoryInput.jsx';

xdescribe('the category input component', () => {
  let mockService;
  beforeAll(() => mockService = Proxy.revocable(Services, {}));
  afterAll(() => mockService.revoke());

  describe('loads with categorization options from db', () => {
    it('when db gives no results', () => {
      mockService.proxy.getCategorizations = (cb) => {
        cb();
      };
      let component = mount(<CategoryInput id="unit" />);
      expect(component.state().categories).toEqual({});
    });
    it('when db has results', () => {
      let data = { test: {} };
      mockService.proxy.getCategorizations = (cb) => {
        cb(data);
      };
      let component = mount(<CategoryInput id="unit" />);
      expect(component.state().categories).toEqual(data);
    });
  });

  describe('displays correct options', () => {
    let component;
    let mockService;
    let mockData = {
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
    beforeAll(() => {
      mockService = Proxy.revocable(Services, {});
      mockService.proxy.getCategorizations = (cb) => {
        cb(mockData);
      };
      component = mount(<CategoryInput id="colors" />);
    });
    afterAll(() => mockService.revoke());
    let getOpts = (level) => {
      return component.find('#category_colors_' + level + ' option').getNodes().map(n => n.value).sort();
    }
    let getGroups = () => getOpts('group');
    let getCategories = () => getOpts('category');
    let getSubcategories = () => getOpts('subcategory');

    it('for the first level', () => {
      let options = component.find('#category_colors_group option');
      expect(getGroups()).toEqual(['color', 'food']);
    });
    it('for the second level', () => {
      component.setState({group: 'food'});
      expect(getCategories()).toEqual([]);
    });
    it('for the third level', () => {
      component.setState({group: 'color', category: 'warm'});
      expect(getCategories()).toEqual(['cool', 'neutral', 'warm']);
      expect(getSubcategories()).toEqual(['red', 'yellow']);

      component.setState({group:'color', category: 'neutral'});
      expect(getCategories()).toEqual(['cool', 'neutral', 'warm']);
      expect(getSubcategories()).toEqual(['brown']);
    });
  });
});
