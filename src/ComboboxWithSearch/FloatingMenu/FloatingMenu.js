import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

import TetherComponent from '../TetherComponent';
import './FloatingMenu.scss';

const options = {
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [
    {
      to: 'window',
      attachment: 'together',
    },
  ],
};

const FloatingMenu = props => {
  const { dropdownFieldNode, ...menuProps } = props;
  return (
    <TetherComponent
      target={dropdownFieldNode}
      options={options}
      matchWidth={true}
    >
      <div className='combobox-with-search-floating-menu'>
        <components.Menu {...menuProps}>
          {menuProps.children}
        </components.Menu>
      </div>
    </TetherComponent>
  );
};

FloatingMenu.propTypes = {
  dropdownFieldNode: PropTypes.element,
};

export default FloatingMenu;
