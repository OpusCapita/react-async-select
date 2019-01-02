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
            pageSize: Math.min(pageSize, searchResults.length),
            loadingText: localizationTexts.loading,
            noDataText: loading ? '' : localizationTexts.noData,
            loading: loading,
            pages: pages,
            page: page,
            onPageChange: this.handlePageChange,
            onPageSizeChange: this.handlePageSizeChange,
            getTrProps: function getTrProps(state, row) {
              return {
                onClick: function onClick() {
                  return _this2.handleSelectRow(row);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsImxvYWRpbmciLCJub0RhdGEiLCJwYWdlIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJzdGF0ZSIsInNlYXJjaFJlc3VsdHMiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJmZXRjaERhdGEiLCJyZW5kZXIiLCJsb2NhbGl6YXRpb25UZXh0cyIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiQ2VsbCIsIkFkZGl0aW9uYWxDb21wb25lbnQiLCJjb2x1bW4iLCJpZCIsIm9yaWdpbmFsIiwiZGlzYWJsZWQiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJ0ZXh0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiTWF0aCIsIm1pbiIsImxlbmd0aCIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsIm9uQ2xpY2siLCJoYW5kbGVTZWxlY3RSb3ciLCJjbGFzc05hbWUiLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJzZXRTdGF0ZSIsIm9uU2VsZWN0Iiwib25DbG9zZSIsImZldGNoVG9rZW4iLCJyZXNvbHZlZFN0YXRlIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiY2VpbCIsImxhYmVsUHJlZml4Iiwia2V5IiwiRmlsdGVyIiwidHJhbnNsYXRlZFByZWZpeCIsInRyYW5zbGF0ZWRGaWVsZE5hbWUiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4QixpQkFBOUI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGFBQXZCOztBQUVBLE9BQU8sb0JBQVA7O0FBR0EsSUFBTUMsb0JBQW9CO0FBQ3hCQyxrQkFBZ0IsSUFEUTtBQUV4QkMscUJBQW1CLEtBRks7QUFHeEJDLHdCQUFzQixJQUhFO0FBSXhCQyx1QkFBcUIsSUFKRztBQUt4QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQUxPO0FBTXhCQyxtQkFBaUIsRUFOTztBQU94QkMsVUFBUSxJQVBnQjtBQVF4QkMsWUFBVTtBQVJjLENBQTFCOztBQVlB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O0FBQUEsVUFBTyxXQUFVLDBDQUFqQixFQUE0RCwyQkFBeUJmLFNBQXJGO0FBQ01pQix3QkFETixTQUMwQkM7QUFEMUIsT0FERjtBQUlFO0FBQ0UsY0FBSyxNQURQO0FBRUUsOEJBQW9CbEIsU0FGdEI7QUFHRSxlQUFPeEMsS0FIVDtBQUlFLGlCQUFTO0FBQUEsaUJBQUssT0FBS3VDLGNBQUwsQ0FBb0JDLFNBQXBCLEVBQStCbUIsRUFBRUMsTUFBRixDQUFTNUQsS0FBeEMsQ0FBTDtBQUFBO0FBSlg7QUFKRixLQURGO0FBYUQsRzs7OztBQXNJSHZCLFlBQVlvRixZQUFaLEdBQTJCO0FBQ3pCdEMsU0FBTyxFQURrQjtBQUV6QnpDLFVBQVEsRUFGaUI7QUFHekJnRSxlQUFhO0FBQUEsV0FBTWdCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRWIsTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJSLFdBQVMsbUJBQU0sQ0FDZCxDQUx3QjtBQU16QkQsWUFBVSxvQkFBTSxDQUNmO0FBUHdCLENBQTNCOztBQVdBLGVBQWVqRSxXQUFmIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcbiAgbWFudWFsOiB0cnVlLFxuICBzb3J0YWJsZTogZmFsc2UsXG59O1xuXG5cbmNvbnN0IERFRkFVTFRfVEVYVFMgPSB7XG4gIHByZXZpb3VzOiAnUHJldmlvdXMnLFxuICBuZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmc6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhOiAnTm8gcm93cyBmb3VuZCcsXG4gIHBhZ2U6ICdQYWdlJyxcbiAgb2Y6ICdvZicsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcGFnZUp1bXA6ICdqdW1wIHRvIHBhZ2UnLFxuICByb3dzU2VsZWN0b3I6ICdyb3dzIHBlciBwYWdlJyxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG4gIH1cblxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuICB9XG5cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogeyAuLi5zZWFyY2hGaWVsZHMsIFtmaWVsZE5hbWVdOiB2YWx1ZSB9XG4gICAgfSk7XG4gIH07XG5cblxuICBoYW5kbGVTZWxlY3RSb3cgPSByb3cgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUm93OiByb3cgfSk7XG5cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5mZXRjaERhdGEoeyBwYWdlIH0pO1xuICB9O1xuXG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHRoaXMuZmV0Y2hEYXRhKHsgcGFnZVNpemUsIHBhZ2UgfSk7XG5cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZFJvdyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpO1xuXG5cbiAgZmV0Y2hUb2tlbiA9IDA7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLnN0YXRlIH07XG4gICAgY29uc3QgeyBwYWdlLCBwYWdlU2l6ZSwgc2VhcmNoRmllbGRzIH0gPSByZXNvbHZlZFN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHsgLi4ucmVzb2x2ZWRTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgICAgICBjb25zdCBmZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuO1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICB9KS50aGVuKCh7IGRhdGEsIHRvdGFsQ291bnQsIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmV0Y2hUb2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzLCBmaWx0ZXJzKSA9PiB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVyc1tmaWVsZE5hbWVdKSB7XG4gICAgICBjb25zdCBGaWx0ZXIgPSBmaWx0ZXJzW2ZpZWxkTmFtZV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tYm9ib3gtd2l0aC1jdXN0b20tc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyJyBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgICAgPEZpbHRlciB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgdmFsdWUpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbG9jYWxpemF0aW9uVGV4dHNbYGNvbHVtbi4ke25hbWV9YF0sXG4gICAgICAgIGFjY2Vzc29yOiBuYW1lLFxuICAgICAgICBDZWxsOiBwcm9wcyA9PiB7XG4gICAgICAgICAgY29uc3QgQWRkaXRpb25hbENvbXBvbmVudCA9IHJlbmRlcmVycyAmJiByZW5kZXJlcnNbcHJvcHMuY29sdW1uLmlkXSB8fCBudWxsO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNlbGwtdmFsdWUgY2VsbC12YWx1ZS0ke3Byb3BzLm9yaWdpbmFsLmRpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfWB9PlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQWRkaXRpb25hbENvbXBvbmVudCA/XG4gICAgICAgICAgICAgICAgICA8QWRkaXRpb25hbENvbXBvbmVudCB7Li4ucHJvcHMub3JpZ2luYWx9Lz4gOlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3Byb3BzLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBbZmlyc3RGaWVsZCwgLi4ub3RoZXJGaWVsZHNdID0gZmllbGRPYmplY3RzO1xuXG4gICAgY29uc3QgdGV4dHMgPSB7XG4gICAgICBwcmV2aW91c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnByZXZpb3VzIHx8IERFRkFVTFRfVEVYVFMucHJldmlvdXMsXG4gICAgICBuZXh0VGV4dDogbG9jYWxpemF0aW9uVGV4dHMubmV4dCB8fCBERUZBVUxUX1RFWFRTLm5leHQsXG4gICAgICBsb2FkaW5nVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCBERUZBVUxUX1RFWFRTLmxvYWRpbmcsXG4gICAgICBub0RhdGFUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGEgfHwgREVGQVVMVF9URVhUUy5ub0RhdGEsXG4gICAgICBwYWdlVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZSB8fCBERUZBVUxUX1RFWFRTLnBhZ2UsXG4gICAgICBvZlRleHQ6IGxvY2FsaXphdGlvblRleHRzLm9mIHx8IERFRkFVTFRfVEVYVFMub2YsXG4gICAgICByb3dzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93cyB8fCBERUZBVUxUX1RFWFRTLnJvd3MsXG4gICAgICBwYWdlSnVtcFRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2VKdW1wIHx8IERFRkFVTFRfVEVYVFMucGFnZUp1bXAsXG4gICAgICByb3dzU2VsZWN0b3JUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzU2VsZWN0b3IgfHwgREVGQVVMVF9URVhUUy5yb3dzU2VsZWN0b3IsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dHJ1ZX0gb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgPGg0PlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG90aGVyRmllbGRzLm1hcChcbiAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICdieScsXG4gICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e01hdGgubWluKHBhZ2VTaXplLCBzZWFyY2hSZXN1bHRzLmxlbmd0aCl9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5oYW5kbGVTZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvdyB8fCBzZWxlY3RlZFJvdy5vcmlnaW5hbC5kaXNhYmxlZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuc2VsZWN0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5jbG9zZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBvbkNsb3NlOiAoKSA9PiB7XG4gIH0sXG4gIG9uU2VsZWN0OiAoKSA9PiB7XG4gIH0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19