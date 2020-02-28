import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import { Async as Select } from '@opuscapita/react-select';
import { createFilter } from 'react-select';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import FloatingMenu from './FloatingMenu';
import SearchModal from '../SearchModal';

import 'react-table/react-table.css'
import './ComboboxWithSearch.scss';

const ICON_SIZE = {
  width: 15,
  height: 15,
};

export const DEBOUNCE_LIMIT = 500;


export class ComboboxWithSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.loadOptionsDebounced = AwesomeDebouncePromise(
      props.loadOptions,
      DEBOUNCE_LIMIT,
    );
  }

  componentDidMount() {
    this.dropdownFieldNode = ReactDOM.findDOMNode(this);
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

  render() {
    const {
      onSelect, // eslint-disable-line no-unused-vars
      localizationTexts,
      isDisabled,
      filters,
      renderers,
      modal: modalProps,
      value,
      ...extraProps
    } = this.props;
    const DropdownIndicator = (props) => {
      return !isDisabled && (
        <div className="combobox-with-search__search-button">
          <Icon
            type="indicator"
            name="search"
            onClick={this.handleOpen}
            {...ICON_SIZE}
          />
        </div>
      );
    };
    const Menu = props => {
      const newProps = {
        ...props,
        dropdownFieldNode: this.dropdownFieldNode,
      };
      return FloatingMenu(newProps);
    };

    return (
      <div className="combobox-with-search">
        <div className="combobox-with-search__combobox">
          <Select
            {...extraProps}
            isDisabled={isDisabled}
            loadOptions={this.loadOptionsDebounced}
            onChange={onSelect}
            value={value}
            components={{
              DropdownIndicator,
              Menu,
            }}
            noOptionsMessage={() => (localizationTexts.noItems || '--')}
            loadingMessage={() => (localizationTexts.loading || 'Loading...')}
            filterOption={createFilter({
              ignoreCase: true,
              ignoreAccents: false,
              matchFrom: 'any',
            })}
            innerRef={(node) => { this.props.setRef(node); }}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        {
          this.state.showModal ?
            <SearchModal
              onClose={this.handleClose}
              onSelect={onSelect}
              localizationTexts={localizationTexts}
              filters={filters}
              renderers={renderers}
              {...modalProps}
            /> :
            null
        }
      </div>
    );
  }
}

ComboboxWithSearch.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  filters: PropTypes.object,
  renderers: PropTypes.object,
  loadOptions: PropTypes.func,
  onSelect: PropTypes.func,
  localizationTexts: PropTypes.object,
  isDisabled: PropTypes.bool,
  modal: PropTypes.shape({
    title: PropTypes.string,
    fields: PropTypes.array,
    loadOptions: PropTypes.func,
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
  }),
  setRef: PropTypes.func,
  onKeyDown: PropTypes.func,
};

ComboboxWithSearch.defaultProps = {
  loadOptions: () => Promise.resolve([]),
  onSelect: () => {},
  isDisabled: false,
  setRef: () => {},
  onKeyDown: () => {},
};

export default ComboboxWithSearch;
