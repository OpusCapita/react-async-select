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
  pageSizeOptions: [10, 20, 50, 100],
  defaultPageSize: 10,
  manual: true,
  sortable: false
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
    _this.state = {
      searchFields: searchFields,
      searchResults: [],
      page: 0,
      pageSize: REACT_TABLE_PROPS.defaultPageSize,
      pages: 1,
      selectedRow: undefined,
      loading: true
    };
    return _this;
  }

  SearchModal.prototype.componentWillMount = function componentWillMount() {
    this.fetchData();
  };

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
      { className: 'combobox-with-search__modal', show: true, onHide: this.handleClose },
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
            onPageChange: this.handlePageChange,
            onPageSizeChange: this.handlePageSizeChange,
            getTrGroupProps: function getTrGroupProps(state, row) {
              var className = !row ? "hidden" : "";
              return {
                className: className
              };
            },
            getTrProps: function getTrProps(state, row) {
              var onClick = function onClick() {
                return _this2.handleSelectRow(row);
              };
              var className = selectedRow && row && selectedRow.index === row.index ? "selected" : "";

              return {
                onClick: onClick,
                className: className
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

    _this3.fetchData({
      page: 0,
      searchFields: _extends({}, searchFields, (_extends2 = {}, _extends2[fieldName] = value, _extends2))
    });
  };

  this.handleSelectRow = function (row) {
    return _this3.setState({ selectedRow: row });
  };

  this.handlePageChange = function (page) {
    _this3.fetchData({ page: page });
  };

  this.handlePageSizeChange = function (pageSize, page) {
    return _this3.fetchData({ pageSize: pageSize, page: page });
  };

  this.handleSelect = function () {
    var selectedRow = _this3.state.selectedRow;

    _this3.props.onSelect(selectedRow && selectedRow.original);
    _this3.handleClose();
  };

  this.handleClose = function () {
    return _this3.props.onClose();
  };

  this.fetchToken = 0;

  this.fetchData = function (state) {
    var resolvedState = _extends({}, _this3.state, state);
    var page = resolvedState.page,
        pageSize = resolvedState.pageSize,
        searchFields = resolvedState.searchFields;


    _this3.setState(_extends({}, resolvedState, { loading: true }), function () {
      _this3.fetchToken = _this3.fetchToken + 1;
      var fetchToken = _this3.fetchToken;
      _this3.props.loadOptions({
        searchFields: searchFields,
        offset: page * pageSize,
        limit: pageSize
      }).then(function (_ref4) {
        var data = _ref4.data,
            totalCount = _ref4.totalCount;

        if (fetchToken === _this3.fetchToken) {
          _this3.setState({
            searchResults: data.slice(0, pageSize),
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
  onClose: function onClose() {},
  onSelect: function onSelect() {}
};

export default SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsImxvYWRpbmciLCJub0RhdGEiLCJwYWdlIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJzdGF0ZSIsInNlYXJjaFJlc3VsdHMiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJmZXRjaERhdGEiLCJyZW5kZXIiLCJsb2NhbGl6YXRpb25UZXh0cyIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiQ2VsbCIsIkFkZGl0aW9uYWxDb21wb25lbnQiLCJjb2x1bW4iLCJpZCIsIm9yaWdpbmFsIiwiZGlzYWJsZWQiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJ0ZXh0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93IiwiY2xhc3NOYW1lIiwib25DbGljayIsImhhbmRsZVNlbGVjdFJvdyIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvbkNsb3NlIiwiZmV0Y2hUb2tlbiIsInJlc29sdmVkU3RhdGUiLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2xpY2UiLCJNYXRoIiwiY2VpbCIsImxhYmVsUHJlZml4Iiwia2V5IiwiRmlsdGVyIiwidHJhbnNsYXRlZFByZWZpeCIsInRyYW5zbGF0ZWRGaWVsZE5hbWUiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGFBQXZCOztBQUVBLE9BQU8sb0JBQVA7O0FBR0EsSUFBTUMsb0JBQW9CO0FBQ3hCQyxrQkFBZ0IsSUFEUTtBQUV4QkMscUJBQW1CLEtBRks7QUFHeEJDLHdCQUFzQixJQUhFO0FBSXhCQyx1QkFBcUIsSUFKRztBQUt4QkMsbUJBQWlCLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsR0FBYixDQUxPO0FBTXhCQyxtQkFBaUIsRUFOTztBQU94QkMsVUFBUSxJQVBnQjtBQVF4QkMsWUFBVTtBQVJjLENBQTFCOztBQVlBLElBQU1DLGdCQUFnQjtBQUNwQkMsWUFBVSxV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QixDQUF6QjtBQUNBLFFBQU1JLHNCQUFzQjlELDZCQUEyQjJDLFNBQTNCLENBQTVCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUJnQixHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QmhCLFNBQXJGO0FBQ01rQix3QkFETixTQUMwQkM7QUFEMUIsT0FERjtBQUlFO0FBQ0UsY0FBSyxNQURQO0FBRUUsOEJBQW9CbkIsU0FGdEI7QUFHRSxlQUFPckMsS0FIVDtBQUlFLGlCQUFTO0FBQUEsaUJBQUssT0FBS29DLGNBQUwsQ0FBb0JDLFNBQXBCLEVBQStCb0IsRUFBRUMsTUFBRixDQUFTMUQsS0FBeEMsQ0FBTDtBQUFBO0FBSlg7QUFKRixLQURGO0FBYUQsRzs7OztBQW1KSHZCLFlBQVlrRixZQUFaLEdBQTJCO0FBQ3pCcEMsU0FBTyxFQURrQjtBQUV6QnpDLFVBQVEsRUFGaUI7QUFHekI2RCxlQUFhO0FBQUEsV0FBTWlCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRWQsTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJSLFdBQVMsbUJBQU0sQ0FDZCxDQUx3QjtBQU16QkQsWUFBVSxvQkFBTSxDQUNmO0FBUHdCLENBQTNCOztBQVdBLGVBQWU5RCxXQUFmIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcbiAgbWFudWFsOiB0cnVlLFxuICBzb3J0YWJsZTogZmFsc2UsXG59O1xuXG5cbmNvbnN0IERFRkFVTFRfVEVYVFMgPSB7XG4gIHByZXZpb3VzOiAnUHJldmlvdXMnLFxuICBuZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmc6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhOiAnTm8gcm93cyBmb3VuZCcsXG4gIHBhZ2U6ICdQYWdlJyxcbiAgb2Y6ICdvZicsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcGFnZUp1bXA6ICdqdW1wIHRvIHBhZ2UnLFxuICByb3dzU2VsZWN0b3I6ICdyb3dzIHBlciBwYWdlJyxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG4gIH1cblxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuICB9XG5cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogeyAuLi5zZWFyY2hGaWVsZHMsIFtmaWVsZE5hbWVdOiB2YWx1ZSB9XG4gICAgfSk7XG4gIH07XG5cblxuICBoYW5kbGVTZWxlY3RSb3cgPSByb3cgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUm93OiByb3cgfSk7XG5cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5mZXRjaERhdGEoeyBwYWdlIH0pO1xuICB9O1xuXG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHRoaXMuZmV0Y2hEYXRhKHsgcGFnZVNpemUsIHBhZ2UgfSk7XG5cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZFJvdyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpO1xuXG5cbiAgZmV0Y2hUb2tlbiA9IDA7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLnN0YXRlIH07XG4gICAgY29uc3QgeyBwYWdlLCBwYWdlU2l6ZSwgc2VhcmNoRmllbGRzIH0gPSByZXNvbHZlZFN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHsgLi4ucmVzb2x2ZWRTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgICAgICBjb25zdCBmZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuO1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICB9KS50aGVuKCh7IGRhdGEsIHRvdGFsQ291bnQsIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmV0Y2hUb2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzLCBmaWx0ZXJzKSA9PiB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVyc1tmaWVsZE5hbWVdKSB7XG4gICAgICBjb25zdCBGaWx0ZXIgPSBmaWx0ZXJzW2ZpZWxkTmFtZV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tYm9ib3gtd2l0aC1jdXN0b20tc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyJyBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgICAgPEZpbHRlciB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgdmFsdWUpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbG9jYWxpemF0aW9uVGV4dHNbYGNvbHVtbi4ke25hbWV9YF0sXG4gICAgICAgIGFjY2Vzc29yOiBuYW1lLFxuICAgICAgICBDZWxsOiBwcm9wcyA9PiB7XG4gICAgICAgICAgY29uc3QgQWRkaXRpb25hbENvbXBvbmVudCA9IHJlbmRlcmVycyAmJiByZW5kZXJlcnNbcHJvcHMuY29sdW1uLmlkXSB8fCBudWxsO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNlbGwtdmFsdWUgY2VsbC12YWx1ZS0ke3Byb3BzLm9yaWdpbmFsLmRpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfWB9PlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQWRkaXRpb25hbENvbXBvbmVudCA/XG4gICAgICAgICAgICAgICAgICA8QWRkaXRpb25hbENvbXBvbmVudCB7Li4ucHJvcHMub3JpZ2luYWx9Lz4gOlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3Byb3BzLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBbZmlyc3RGaWVsZCwgLi4ub3RoZXJGaWVsZHNdID0gZmllbGRPYmplY3RzO1xuXG4gICAgY29uc3QgdGV4dHMgPSB7XG4gICAgICBwcmV2aW91c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnByZXZpb3VzIHx8IERFRkFVTFRfVEVYVFMucHJldmlvdXMsXG4gICAgICBuZXh0VGV4dDogbG9jYWxpemF0aW9uVGV4dHMubmV4dCB8fCBERUZBVUxUX1RFWFRTLm5leHQsXG4gICAgICBsb2FkaW5nVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCBERUZBVUxUX1RFWFRTLmxvYWRpbmcsXG4gICAgICBub0RhdGFUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGEgfHwgREVGQVVMVF9URVhUUy5ub0RhdGEsXG4gICAgICBwYWdlVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZSB8fCBERUZBVUxUX1RFWFRTLnBhZ2UsXG4gICAgICBvZlRleHQ6IGxvY2FsaXphdGlvblRleHRzLm9mIHx8IERFRkFVTFRfVEVYVFMub2YsXG4gICAgICByb3dzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93cyB8fCBERUZBVUxUX1RFWFRTLnJvd3MsXG4gICAgICBwYWdlSnVtcFRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2VKdW1wIHx8IERFRkFVTFRfVEVYVFMucGFnZUp1bXAsXG4gICAgICByb3dzU2VsZWN0b3JUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzU2VsZWN0b3IgfHwgREVGQVVMVF9URVhUUy5yb3dzU2VsZWN0b3IsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dHJ1ZX0gb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgPGg0PlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG90aGVyRmllbGRzLm1hcChcbiAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICdieScsXG4gICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17bG9jYWxpemF0aW9uVGV4dHMubG9hZGluZ31cbiAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VTaXplQ2hhbmdlfVxuICAgICAgICAgICAgICBnZXRUckdyb3VwUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSAhcm93ID8gXCJoaWRkZW5cIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBnZXRUclByb3BzPXtcbiAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9ICgpID0+IHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93IHx8IHNlbGVjdGVkUm93Lm9yaWdpbmFsLmRpc2FibGVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5zZWxlY3R9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLmNsb3NlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIG9uQ2xvc2U6ICgpID0+IHtcbiAgfSxcbiAgb25TZWxlY3Q6ICgpID0+IHtcbiAgfSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=