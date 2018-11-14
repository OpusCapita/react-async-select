
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

const valueBecomesDefinedOrIsCleared = (nextProps, currentProps) => !!nextProps.value !== !!currentProps.value;
const OptionValueChanges = (nextProps, currentProps) => nextProps.value && currentProps.value &&
  nextProps.value.value !== currentProps.value.value;

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

  componentWillReceiveProps(nextProps) {
    if (valueBecomesDefinedOrIsCleared(nextProps, this.props) || OptionValueChanges(nextProps, this.props)) {
      this.setState({
        value: nextProps.value,
      });
    }
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

  handleChange = (value) => {
    this.props.handleChange({
      value,
      setState: newState => this.setState({ ...newState }),
      onSelect: value => this.props.onSelect(value),
    });
  }

  render() {
    const {
      value,
      loadOptions,
      onSelect, // eslint-disable-line no-unused-vars
      handleChange, // eslint-disable-line no-unused-vars
      localizationTexts,
      modal: modalProps,
      ...extraProps
    } = this.props;
    return (
      <div className="combobox-with-search">
        <div className="combobox-with-search__combobox">
          <Select
            {...extraProps}
            value={value}
            loadOptions={loadOptions}
            onChange={value => this.handleChange(value)}
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
          localizationTexts={localizationTexts}
          {...modalProps}
        />
      </div>
    );
  }
}

ComboboxWithSearch.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  loadOptions: PropTypes.func,
  onSelect: PropTypes.func,
  handleChange: PropTypes.func,
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
  loadOptions: () => Promise.resolve({ options: [] }),
  onSelect: () => {},
  handleChange: ({ value, setState, onSelect }) => {
    setState({ value });
    onSelect(value);
    return value;
  },
};

export default ComboboxWithSearch;
