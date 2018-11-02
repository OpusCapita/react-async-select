/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SearchModal from './SearchModal';

describe('SearchModal', () => {
  it('mounts correctly', () => {
    const props = {
      title: '',
      fields: ['key'],
      loadOptions: () => Promise.resolve({
        data: [],
        totalCount: 0
      }),
      showModal: true,
      onClose: () => {},
      onSelect: () => {},
      i18n: { getMessage: id => id },
    };
    const wrapper = mount(
      <SearchModal {...props} />
    );
    expect(wrapper).to.not.be.undefined;
  });
});
