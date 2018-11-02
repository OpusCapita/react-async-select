/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ComboboxWithSearch from './ComboboxWithSearch';

describe('ComboboxWithSearch', () => {
  it('mounts correctly', () => {
    before(() => {
      this.comboboxWithSearch = new ComboboxWithSearch();
    });

    const props = {
      value: '',
      onSelect: () => {},
      loadOptions: () => Promise.resolve({ options: [{ label: 'a', value: 'a' }] }),
      i18n: { getMessage: id => id },
      modal: {
        title: '',
        fields: ['key'],
        loadOptions: () => Promise.resolve({
          data: [{ key: 'a', value: 'a' }],
          totalCount: 0
        }),
        showModal: true,
        onClose: () => {},
        onSelect: () => {},
      },
    };
    const wrapper = mount(
      <ComboboxWithSearch {...props} />
    );
    expect(wrapper).to.not.be.undefined;
  });
});
