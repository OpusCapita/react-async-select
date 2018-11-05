
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import { Async as Select } from '@opuscapita/react-select';

import SearchModal from './SearchModal';

import 'react-table/react-table.css'
import './ComboboxWithSearch.scss';

const ICON_SIZE = {
  width: 15,
  height: 15,
};

export class ComboboxWithSearch extends Component {
  constructor(props) {
    super(props);
    const {
      value,
    } = props;
    this.state = {
      value,
      showModal: false,
    };
  }

  handleOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleChange = (valueObj) => {
    const value = valueObj && valueObj.value;
    this.setState({
      value,
    });
    this.props.onSelect(value);
    return value;
  }

  render() {
    return (
      <div className="combobox-with-search">
        <div className="combobox-with-search__combobox">
          <Select
            {...this.props}
            onChange={this.handleChange}
            value={this.state.value}
          />
          <div className="combobox-with-search__search-button">
            <Icon
              type="indicator"
              name="search"
              onClick={this.handleOpen}
              {...ICON_SIZE}
            />
          </div>
        </div>
        <SearchModal
          showModal={this.state.showModal}
          onClose={this.handleClose}
          onSelect={this.handleChange}
          localizationTexts={this.props.localizationTexts}
          {...this.props.modal}
        />
      </div>
    );
  }
}

ComboboxWithSearch.propTypes = {
  value: PropTypes.any,
  onSelect: PropTypes.func,
  loadOptions: PropTypes.func,
  localizationTexts: PropTypes.object,
  modal: PropTypes.shape({
    title: PropTypes.string,
    fields: PropTypes.array,
    loadOptions: PropTypes.func,
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
  }),
};

ComboboxWithSearch.defaultProps = {
  onSelect: () => {},
  loadOptions: () => Promise.resolve({ options: [] }),
};

export default ComboboxWithSearch;
