import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { DEBOUNCE_LIMIT } from '../ComboboxWithSearch/ComboboxWithSearch';

import './SearchModal.scss';


const REACT_TABLE_PROPS = {
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [10, 20, 50, 100],
  defaultPageSize: 10,
  manual: true,
  sortable: false,
};


const DEFAULT_TEXTS = {
  previous: 'Previous',
  next: 'Next',
  loading: 'Loading...',
  noData: 'No rows found',
  page: 'Page',
  of: 'of',
  rows: 'rows',
  pageJump: 'jump to page',
  rowsSelector: 'rows per page',
};


const getDialogClassName = ({ panels }) => {
  const panelCount = panels.filter(val => !!val).length + 1;
  return `combobox-with-search__modal-with-${panelCount}-panels`;
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
    this.state = {
      searchFields,
      searchResults: [],
      page: 0,
      pageSize: REACT_TABLE_PROPS.defaultPageSize,
      pages: 1,
      selectedRow: undefined,
      loading: true,
    };

    this.loadOptionsDebounced = AwesomeDebouncePromise(
      props.loadOptions,
      DEBOUNCE_LIMIT,
    );
  }


  componentWillMount() {
    this.fetchData();
  }


  setSearchValue = (fieldName, value) => {
    const { searchFields } = this.state;
    this.fetchData({
      page: 0,
      searchFields: { ...searchFields, [fieldName]: value }
    });
  };


  handleSelectRow = row => this.setState({ selectedRow: row });


  handlePageChange = page => {
    this.fetchData({ page });
  };


  handlePageSizeChange = (pageSize, page) => this.fetchData({ pageSize, page });


  handleSelect = () => {
    const { selectedRow } = this.state;
    this.props.onSelect(selectedRow && selectedRow.original);
    this.handleClose();
  };


  handleClose = () => this.props.onClose();


  fetchToken = 0;

  fetchData = state => {
    const resolvedState = { ...this.state, ...state };
    const { page, pageSize, searchFields } = resolvedState;

    this.setState(
      { ...resolvedState, loading: true },
      () => {
        this.fetchToken = this.fetchToken + 1;
        const fetchToken = this.fetchToken;
        this.loadOptionsDebounced({
          searchFields,
          offset: page * pageSize,
          limit: pageSize,
        }).then(({ data, totalCount, }) => {
          if (fetchToken === this.fetchToken) {
            this.setState({
              searchResults: data.slice(0, pageSize),
              pages: Math.ceil(totalCount / pageSize),
              loading: false
            });
          }
        })
      }
    );
  };


  renderSearchField = ({ name: fieldName, value }, labelPrefix, key, localizationTexts, filters) => {
    if (filters && filters[fieldName]) {
      const Filter = filters[fieldName];
      return (
        <div className='combobox-with-custom-search__modal-search-filter' key={`search-field-${key}`}>
          <Filter value={value} onChange={value => this.setSearchValue(fieldName, value)}/>
        </div>
      );
    }
    const translatedPrefix = localizationTexts[labelPrefix];
    const translatedFieldName = localizationTexts[`field.${fieldName}`];
    return (
      <div className={`combobox-with-search__modal-search-filter`} key={`search-field-${key}`}>
        <label className="combobox-with-search__modal-search-label" htmlFor={`search-field-${fieldName}`}>
          {`${translatedPrefix} ${translatedFieldName}`}
        </label>
        <input
          type="text"
          id={`search-field-${fieldName}`}
          value={value}
          onInput={e => this.setSearchValue(fieldName, e.target.value)}
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
    const {
      localizationTexts,
      filters,
      renderers,
      components: { LeftPanel, RightPanel },
    } = this.props;
    const fieldObjects = Object.entries(searchFields).map(([name, value]) => ({ name, value }));
    const columns = fieldObjects.map(({ name }) => {
      return {
        Header: localizationTexts[`column.${name}`],
        accessor: name,
        Cell: props => {
          const AdditionalComponent = renderers && renderers[props.column.id] || null;
          return (
            <div className={`cell-value cell-value-${props.original.disabled ? 'disabled' : ''}`}>
              {
                AdditionalComponent ?
                  <AdditionalComponent {...props.original}/> :
                  <span>{props.value}</span>
              }
            </div>
          );
        }
      };
    });
    const [firstField, ...otherFields] = fieldObjects;

    const texts = {
      previousText: localizationTexts.previous || DEFAULT_TEXTS.previous,
      nextText: localizationTexts.next || DEFAULT_TEXTS.next,
      loadingText: localizationTexts.loading || DEFAULT_TEXTS.loading,
      noDataText: localizationTexts.noData || DEFAULT_TEXTS.noData,
      pageText: localizationTexts.page || DEFAULT_TEXTS.page,
      ofText: localizationTexts.of || DEFAULT_TEXTS.of,
      rowsText: localizationTexts.rows || DEFAULT_TEXTS.rows,
      pageJumpText: localizationTexts.pageJump || DEFAULT_TEXTS.pageJump,
      rowsSelectorText: localizationTexts.rowsSelector || DEFAULT_TEXTS.rowsSelector,
    };

    const leftPanel = LeftPanel && (<LeftPanel selectedRow={selectedRow}/>);
    const rightPanel = RightPanel && (<RightPanel selectedRow={selectedRow}/>);

    return (
      <Modal
        className="combobox-with-search__modal"
        dialogClassName={getDialogClassName({ panels: [leftPanel, rightPanel] })}
        show={true}
        style={{ display: 'flex' }}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton={true}>
          <h4 className="combobox-with-search__modal-title combobox-with-search__modal-title--1-panel">
            {this.props.title}
          </h4>
        </Modal.Header>
        <div className="combobox-with-search__modal-panels">
          {
            leftPanel && (
              <div className="combobox-with-search__modal-panel combobox-with-search__modal-panel--left">
                { leftPanel }
              </div>
            )
          }
          <div className="combobox-with-search__modal-panel combobox-with-search__modal-panel--center">
            <Modal.Body>
              <h4 className="combobox-with-search__modal-title combobox-with-search__modal-title--2-3-panels">
                {this.props.title}
              </h4>
              <div className="combobox-with-search__modal-search-filters">
                {
                  firstField && this.renderSearchField(
                    firstField,
                    'searchBy',
                    `00-${firstField.name}`,
                    localizationTexts,
                    filters
                  )
                }
                {
                  otherFields.map(
                    (field, i) => this.renderSearchField(
                      field,
                      'by',
                      `${i}-${field.name}`,
                      localizationTexts,
                      filters
                    )
                  )
                }
              </div>
              <div className="combobox-with-search__modal-search-results">
                <ReactTable
                  {...REACT_TABLE_PROPS}
                  {...texts}
                  data={searchResults}
                  columns={columns}
                  pageSize={pageSize}
                  loadingText={localizationTexts.loading}
                  noDataText={loading ? '' : localizationTexts.noData}
                  loading={loading}
                  pages={pages}
                  page={page}
                  onPageChange={this.handlePageChange}
                  onPageSizeChange={this.handlePageSizeChange}
                  getTrGroupProps={
                    (state, row) => {
                      const className = !row ? "hidden" : "";
                      return {
                        className,
                      };
                    }
                  }
                  getTrProps={
                    (state, row) => {
                      const onClick = () => this.handleSelectRow(row);
                      const className = selectedRow && row && selectedRow.index === row.index ? "selected" : "";

                      return {
                        onClick,
                        className,
                      };
                    }
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                bsStyle="primary"
                onClick={this.handleSelect}
                disabled={!selectedRow || selectedRow.original.disabled}
              >
                {localizationTexts.select}
              </Button>
              <Button bsStyle="default" onClick={this.handleClose}>
                {localizationTexts.close}
              </Button>
            </Modal.Footer>
          </div>
          {
            rightPanel && (
              <div className="combobox-with-search__modal-panel combobox-with-search__modal-panel--right">
                { rightPanel }
              </div>
            )
          }
        </div>
      </Modal>
    );
  }
}


SearchModal.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.array,
  filters: PropTypes.object,
  renderers: PropTypes.object,
  loadOptions: PropTypes.func,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  localizationTexts: PropTypes.object,
  components: PropTypes.object.isRequired,
};


SearchModal.defaultProps = {
  title: '',
  fields: [],
  loadOptions: () => Promise.resolve({ data: [], totalCount: 0 }),
  onClose: () => {},
  onSelect: () => {},
  components: {},
};


export default SearchModal;
