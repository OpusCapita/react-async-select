var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import ReactTable from 'react-table';

import './SearchModal.scss';

var REACT_TABLE_PROPS = {
  showPagination: true,

  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [3, 10, 20, 50, 100],
  defaultPageSize: 10,

  manual: true,
  sortable: false
};

var DEFAULT_STATE_VALUES = {
  searchResults: [],
  page: 0,
  pageSize: REACT_TABLE_PROPS.defaultPageSize,
  pages: 1,
  selectedRow: undefined,
  loading: true
};

var DEFAULT_TEXTS = {
  previous: 'Previous',
  next: 'Next',
  loading: 'Loading...',
  noData: 'No rows found',
  page: 'Page',
  of: 'of',
  rows: 'rows',
  pageJump: 'jump to page',
  rowsSelector: 'rows per page'
};

var SearchModal = (_temp = _class = function (_Component) {
  _inherits(SearchModal, _Component);

  function SearchModal(props) {
    _classCallCheck(this, SearchModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var searchFields = Object.assign.apply(Object, [{}].concat(props.fields.map(function (field) {
      var _ref;

      return _ref = {}, _ref[field] = '', _ref;
    })));
    _this.defaultSearchFields = _extends({}, searchFields);
    _this.fetchToken = 0;
    _this.state = _extends({
      searchFields: searchFields
    }, DEFAULT_STATE_VALUES);
    return _this;
  }

  SearchModal.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
        searchResults = _state.searchResults,
        searchFields = _state.searchFields,
        loading = _state.loading,
        selectedRow = _state.selectedRow,
        pages = _state.pages,
        page = _state.page,
        pageSize = _state.pageSize;
    var _props = this.props,
        localizationTexts = _props.localizationTexts,
        filters = _props.filters,
        renderers = _props.renderers;

    var fieldObjects = Object.entries(searchFields).map(function (_ref2) {
      var name = _ref2[0],
          value = _ref2[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref3) {
      var name = _ref3.name;

      return {
        Header: localizationTexts['column.' + name],
        accessor: name,
        Cell: function Cell(props) {
          var AdditionalComponent = renderers && renderers[props.column.id] || null;
          return React.createElement(
            'div',
            { className: 'cell-value cell-value-' + (props.original.disabled ? 'disabled' : '') },
            AdditionalComponent ? React.createElement(AdditionalComponent, props.original) : React.createElement(
              'span',
              null,
              props.value
            )
          );
        }
      };
    });
    var firstField = fieldObjects[0],
        otherFields = fieldObjects.slice(1);


    var texts = {
      previousText: localizationTexts.previous || DEFAULT_TEXTS.previous,
      nextText: localizationTexts.next || DEFAULT_TEXTS.next,
      loadingText: localizationTexts.loading || DEFAULT_TEXTS.loading,
      noDataText: localizationTexts.noData || DEFAULT_TEXTS.noData,
      pageText: localizationTexts.page || DEFAULT_TEXTS.page,
      ofText: localizationTexts.of || DEFAULT_TEXTS.of,
      rowsText: localizationTexts.rows || DEFAULT_TEXTS.rows,
      pageJumpText: localizationTexts.pageJump || DEFAULT_TEXTS.pageJump,
      rowsSelectorText: localizationTexts.rowsSelector || DEFAULT_TEXTS.rowsSelector
    };

    return React.createElement(
      Modal,
      { className: 'combobox-with-search__modal', show: this.props.showModal, onHide: this.handleClose },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        React.createElement(
          'h4',
          null,
          this.props.title
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, 'searchBy', '00-' + firstField.name, localizationTexts, filters),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'by', i + '-' + field.name, localizationTexts, filters);
          })
        ),
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          React.createElement(ReactTable, _extends({}, REACT_TABLE_PROPS, texts, {
            data: searchResults,
            columns: columns,
            pageSize: pageSize,
            loadingText: localizationTexts.loading,
            noDataText: loading ? '' : localizationTexts.noData,
            loading: loading,
            pages: pages,
            page: page,
            onFetchData: this.handleFetchData,
            onPageChange: this.handlePageChange,
            onPageSizeChange: this.handlePageSizeChange,
            getTrProps: function getTrProps(state, row) {
              return {
                onClick: function onClick() {
                  return _this2.selectRow(row);
                },
                className: selectedRow && row && selectedRow.index === row.index ? "selected" : ""
              };
            }
          }))
        )
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          {
            bsStyle: 'primary',
            onClick: this.handleSelect,
            disabled: !selectedRow || selectedRow.original.disabled
          },
          localizationTexts.select
        ),
        React.createElement(
          Button,
          { bsStyle: 'default', onClick: this.handleClose },
          localizationTexts.close
        )
      )
    );
  };

  return SearchModal;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setSearchValue = function (fieldName, value) {
    var _extends2;

    var searchFields = _this3.state.searchFields;

    var newSearchFields = _extends({}, searchFields, (_extends2 = {}, _extends2[fieldName] = value, _extends2));
    _this3.setState({
      searchFields: newSearchFields
    });
    _this3.fetchData({
      searchFields: newSearchFields,
      page: 0
    });
  };

  this.selectRow = function (row) {
    _this3.setState({
      selectedRow: row
    });
  };

  this.handlePageChange = function (page) {
    _this3.setState({
      page: page
    });
  };

  this.handlePageSizeChange = function (pageSize, page) {
    _this3.setState({
      pageSize: pageSize
    });
  };

  this.handleSelect = function () {
    var selectedRow = _this3.state.selectedRow;

    _this3.props.onSelect(selectedRow && selectedRow.original);
    _this3.handleClose();
  };

  this.handleClose = function () {
    _this3.setState(_extends({}, DEFAULT_STATE_VALUES, {
      searchFields: _this3.defaultSearchFields
    }));
    _this3.props.onClose();
  };

  this.handleFetchData = function () {
    return _this3.fetchData();
  };

  this.fetchData = function (state) {
    var resolvedState = _extends({}, _this3.state, state);
    var page = resolvedState.page,
        pageSize = resolvedState.pageSize,
        searchFields = resolvedState.searchFields;

    _this3.fetchToken = _this3.fetchToken + 1;
    _this3.setState({ loading: true });
    Promise.resolve(_this3.fetchToken).then(function (token) {
      _this3.props.loadOptions({
        searchFields: searchFields,
        offset: page * pageSize,
        limit: pageSize
      }).then(function (_ref4) {
        var data = _ref4.data,
            totalCount = _ref4.totalCount;

        if (token === _this3.fetchToken) {
          _this3.setState({
            searchResults: data.slice(0, pageSize),
            page: page,
            pages: Math.ceil(totalCount / pageSize),
            loading: false
          });
        }
      });
    });
  };

  this.renderSearchField = function (_ref5, labelPrefix, key, localizationTexts, filters) {
    var fieldName = _ref5.name,
        value = _ref5.value;

    if (filters && filters[fieldName]) {
      var Filter = filters[fieldName];
      return React.createElement(
        'div',
        { className: 'combobox-with-custom-search__modal-search-filter', key: 'search-field-' + key },
        React.createElement(Filter, { value: value, onChange: function onChange(value) {
            return _this3.setSearchValue(fieldName, value);
          } })
      );
    }
    var translatedPrefix = localizationTexts[labelPrefix];
    var translatedFieldName = localizationTexts['field.' + fieldName];
    return React.createElement(
      'div',
      { className: 'combobox-with-search__modal-search-filter', key: 'search-field-' + key },
      React.createElement(
        'label',
        { className: 'combobox-with-search__modal-search-label', htmlFor: 'search-field-' + fieldName },
        translatedPrefix + ' ' + translatedFieldName
      ),
      React.createElement('input', {
        type: 'text',
        id: 'search-field-' + fieldName,
        value: value,
        onInput: function onInput(e) {
          return _this3.setSearchValue(fieldName, e.target.value);
        }
      })
    );
  };
}, _temp);


SearchModal.defaultProps = {
  title: '',
  fields: [],
  loadOptions: function loadOptions() {
    return Promise.resolve({ data: [], totalCount: 0 });
  },
  showModal: false,
  onClose: function onClose() {},
  onSelect: function onSelect() {}
};

export default SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJERUZBVUxUX1RFWFRTIiwicHJldmlvdXMiLCJuZXh0Iiwibm9EYXRhIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWx0ZXJzIiwicmVuZGVyZXJzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0Iiwic2hvd01vZGFsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsImhhbmRsZUZldGNoRGF0YSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsIm9uQ2xpY2siLCJzZWxlY3RSb3ciLCJjbGFzc05hbWUiLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJuZXdTZWFyY2hGaWVsZHMiLCJzZXRTdGF0ZSIsImZldGNoRGF0YSIsIm9uU2VsZWN0Iiwib25DbG9zZSIsInJlc29sdmVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwiZGF0YSIsInRvdGFsQ291bnQiLCJ0b2tlbiIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsYUFBdkI7O0FBRUEsT0FBTyxvQkFBUDs7QUFFQSxJQUFNQyxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hC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SUFBUSxPQUFPM0QsS0FBZixFQUFzQixVQUFVO0FBQUEsbUJBQVMsT0FBS3NDLGNBQUwsQ0FBb0JDLFNBQXBCLEVBQStCdkMsS0FBL0IsQ0FBVDtBQUFBLFdBQWhDO0FBREYsT0FERjtBQUtEO0FBQ0QsUUFBTTZELG1CQUFtQm5FLGtCQUFrQmdFLFdBQWxCLENBQXpCO0FBQ0EsUUFBTUksc0JBQXNCcEUsNkJBQTJCNkMsU0FBM0IsQ0FBNUI7QUFDQSxXQUNFO0FBQUE7QUFBQSxRQUFLLHNEQUFMLEVBQTZELHVCQUFxQm9CLEdBQWxGO0FBQ0U7QUFBQTtBQUFBLFVBQU8sV0FBVSwwQ0FBakIsRUFBNEQsMkJBQXlCcEIsU0FBckY7QUFDTXNCLHdCQUROLFNBQzBCQztBQUQxQixPQURGO0FBSUU7QUFDRSxjQUFLLE1BRFA7QUFFRSw4QkFBb0J2QixTQUZ0QjtBQUdFLGVBQU92QyxLQUhUO0FBSUUsaUJBQVM7QUFBQSxpQkFBSyxPQUFLc0MsY0FBTCxDQUFvQkMsU0FBcEIsRUFBK0J3QixFQUFFQyxNQUFGLENBQVNoRSxLQUF4QyxDQUFMO0FBQUE7QUFKWDtBQUpGLEtBREY7QUFhRCxHOzs7O0FBcUlIbEIsWUFBWW1GLFlBQVosR0FBMkI7QUFDekJ6QyxTQUFPLEVBRGtCO0FBRXpCckMsVUFBUSxFQUZpQjtBQUd6QjhELGVBQWE7QUFBQSxXQUFNSCxRQUFRQyxPQUFSLENBQWdCLEVBQUVLLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCL0IsYUFBVyxLQUpjO0FBS3pCc0IsV0FBUyxtQkFBTSxDQUNkLENBTndCO0FBT3pCRCxZQUFVLG9CQUFNLENBQ2Y7QUFSd0IsQ0FBM0I7O0FBV0EsZUFBZTdELFdBQWYiLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcblxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURV9WQUxVRVMgPSB7XG4gIHNlYXJjaFJlc3VsdHM6IFtdLFxuICBwYWdlOiAwLFxuICBwYWdlU2l6ZTogUkVBQ1RfVEFCTEVfUFJPUFMuZGVmYXVsdFBhZ2VTaXplLFxuICBwYWdlczogMSxcbiAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgbG9hZGluZzogdHJ1ZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfVEVYVFMgPSB7XG4gIHByZXZpb3VzOiAnUHJldmlvdXMnLFxuICBuZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmc6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhOiAnTm8gcm93cyBmb3VuZCcsXG4gIHBhZ2U6ICdQYWdlJyxcbiAgb2Y6ICdvZicsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcGFnZUp1bXA6ICdqdW1wIHRvIHBhZ2UnLFxuICByb3dzU2VsZWN0b3I6ICdyb3dzIHBlciBwYWdlJyxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgfTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFU1xuICAgIH07XG4gIH1cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWFyY2hGaWVsZHM6IG5ld1NlYXJjaEZpZWxkc1xuICAgIH0pO1xuICAgIHRoaXMuZmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgICAgcGFnZTogMCxcbiAgICB9KTtcbiAgfTtcblxuICBzZWxlY3RSb3cgPSByb3cgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRSb3c6IHJvdyxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VTaXplQ2hhbmdlID0gKHBhZ2VTaXplLCBwYWdlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlU2l6ZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTLFxuICAgICAgc2VhcmNoRmllbGRzOiB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlRmV0Y2hEYXRhID0gKCkgPT4gdGhpcy5mZXRjaERhdGEoKTtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAuLi5zdGF0ZVxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgc2VhcmNoRmllbGRzXG4gICAgfSA9IHJlc29sdmVkU3RhdGU7XG4gICAgdGhpcy5mZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuICsgMTtcbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5mZXRjaFRva2VuKS50aGVuKHRva2VuID0+IHtcbiAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgIG9mZnNldDogcGFnZSAqIHBhZ2VTaXplLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICB9KS50aGVuKCh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRvdGFsQ291bnQsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBwYWdlU2l6ZSksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzLCBmaWx0ZXJzKSA9PiB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVyc1tmaWVsZE5hbWVdKSB7XG4gICAgICBjb25zdCBGaWx0ZXIgPSBmaWx0ZXJzW2ZpZWxkTmFtZV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tYm9ib3gtd2l0aC1jdXN0b20tc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyJyBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgICAgPEZpbHRlciB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgdmFsdWUpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVyc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgICAgQ2VsbDogcHJvcHMgPT4ge1xuICAgICAgICAgIGNvbnN0IEFkZGl0aW9uYWxDb21wb25lbnQgPSByZW5kZXJlcnMgJiYgcmVuZGVyZXJzW3Byb3BzLmNvbHVtbi5pZF0gfHwgbnVsbDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjZWxsLXZhbHVlIGNlbGwtdmFsdWUtJHtwcm9wcy5vcmlnaW5hbC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFkZGl0aW9uYWxDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxDb21wb25lbnQgey4uLnByb3BzLm9yaWdpbmFsfS8+IDpcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9wcy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICA8L2g0PlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgJ3NlYXJjaEJ5JyxcbiAgICAgICAgICAgICAgICBgMDAtJHtmaXJzdEZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgey4uLnRleHRzfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25GZXRjaERhdGE9e3RoaXMuaGFuZGxlRmV0Y2hEYXRhfVxuICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+ICh7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNlbGVjdFJvdyhyb3cpLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93IHx8IHNlbGVjdGVkUm93Lm9yaWdpbmFsLmRpc2FibGVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5zZWxlY3R9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLmNsb3NlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge1xuICB9LFxuICBvblNlbGVjdDogKCkgPT4ge1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=