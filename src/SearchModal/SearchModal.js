import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import ReactTable from 'react-table';

import './SearchModal.scss';

const REACT_TABLE_PROPS = {
  showPagination: true,

  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [3, 10, 20, 50, 100],
  defaultPageSize: 10,

  manual: true,
  sortable: false,
};

const DEFAULT_STATE_VALUES = {
  searchResults: [],
  page: 0,
  pageSize: REACT_TABLE_PROPS.defaultPageSize,
  pages: 1,
  selectedRow: undefined,
  loading: true,
};


class SearchModal extends Component {
  constructor(props) {
    super(props);

    const searchFields = Object.assign(
      {},
      ...props.fields.map(field => ({
        [field]: '',
      })),
    );
    this.defaultSearchFields = {
      ...searchFields,
    };
    this.fetchToken = 0;
    this.state = {
      searchFields,
      ...DEFAULT_STATE_VALUES
    };
  }

  setSearchValue = (fieldName, value) => {
    const { searchFields } = this.state;
    const newSearchFields = {
      ...searchFields,
      [fieldName]: value,
    };
    this.setState({
      page: 0,
      searchFields: newSearchFields,
    });
    this.handleFetchData({
      searchFields: newSearchFields,
    });
  };

  selectRow = row => {
    this.setState({
      selectedRow: row,
    });
  }

  handlePageChange = page => {
    this.setState({
      page
    });
  }

  handlePageSizeChange = (pageSize, page) => {
    this.setState({
      pageSize
    });
  }

  handleSelect = () => {
    const {
      selectedRow,
    } = this.state;
    this.props.onSelect({ value: selectedRow && selectedRow.original.value });
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      ...DEFAULT_STATE_VALUES,
      searchFields: this.defaultSearchFields,
    });
    this.props.onClose();
  };

  handleFetchData = () => this.fetchData();

  fetchData = state => {
    const resolvedState = {
      ...this.state,
      ...state
    };
    const {
      page,
      pageSize,
      searchFields
    } = resolvedState;
    this.fetchToken = this.fetchToken + 1;
    this.setState({ loading: true });
    Promise.resolve(this.fetchToken).then(token => {
      this.props.loadOptions({
        searchFields,
        offset: page * pageSize,
        limit: pageSize,
      }).then(({
        data,
        totalCount,
      }) => {
        if (token === this.fetchToken) {
          this.setState({
            searchResults: data.slice(0, pageSize),
            page,
            pages: Math.ceil(totalCount / pageSize),
            loading: false,
          });
        }
      });
    });
  };

  renderSearchField = ({ name: fieldName, value }, labelPrefix, key) => {
    return (
      <div className={`combobox-with-search__modal-search-filter`} key={`search-field-${key}`}>
        <label className="combobox-with-search__modal-search-label" htmlFor={`search-field-${fieldName}`}>
          {`${labelPrefix} ${fieldName}`}
        </label>
        <input
          type="text"
          id={`search-field-${fieldName}`}
          value={value}
          onChange={e => {
            this.setSearchValue(fieldName, e.target.value)
          }}
        />
      </div>
    );
  };

  render() {
    const {
      searchResults,
      searchFields,
      loading,
      selectedRow,
      pages,
      page,
      pageSize,
    } = this.state;
    const fieldObjects = Object.entries(searchFields).map(([name, value]) => ({ name, value }));
    const columns = fieldObjects.map(({ name }) => {
      return {
        Header: name,
        accessor: name,
      };
    });
    const [firstField, ...otherFields] = fieldObjects;

    return (
      <Modal className="combobox-with-search__modal" show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton={true}>
          {this.props.title}
        </Modal.Header>
        <Modal.Body>
          <div className="combobox-with-search__modal-search-filters">
            {
              firstField && this.renderSearchField(
                firstField,
                this.props.i18n.getMessage('search.by'),
                `00-${firstField.name}`
              )
            }
            {
              otherFields.map(
                (field, i) => this.renderSearchField(
                  field,
                  this.props.i18n.getMessage('by'),
                  `${i}-${field.name}`
                )
              )
            }
          </div>
          <div className="combobox-with-search__modal-search-results">
            <ReactTable
              {...REACT_TABLE_PROPS}
              data={searchResults}
              columns={columns}
              pageSize={pageSize}
              loadingText={this.props.i18n.getMessage('table.loading')}
              noDataText={loading ? '' : this.props.i18n.getMessage('table.no.items')}
              loading={loading}
              pages={pages}
              page={page}
              onFetchData={this.handleFetchData}
              onPageChange={this.handlePageChange}
              onPageSizeChange={this.handlePageSizeChange}
              getTrProps={
                (state, row) => ({
                  onClick: () => this.selectRow(row),
                  className: selectedRow && row && selectedRow.index === row.index ? "selected" : ""
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={this.handleSelect}
            disabled={!selectedRow}
          >
            Select
          </Button>
          <Button bsStyle="default" onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SearchModal.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.array,
  loadOptions: PropTypes.func,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  i18n: PropTypes.shape({
    getMessage: PropTypes.func,
  }),
};

SearchModal.defaultProps = {
  title: '',
  fields: [],
  loadOptions: () => Promise.resolve({ data: [], totalCount: 0 }),
  showModal: false,
  onClose: () => {},
  onSelect: () => {},
  i18n: id => id,
};

export default SearchModal;
