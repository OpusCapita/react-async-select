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
    var localizationTexts = this.props.localizationTexts;

    var fieldObjects = Object.entries(searchFields).map(function (_ref2) {
      var name = _ref2[0],
          value = _ref2[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref3) {
      var name = _ref3.name;

      return {
        Header: localizationTexts['column.' + name],
        accessor: name
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
          firstField && this.renderSearchField(firstField, 'searchBy', '00-' + firstField.name, localizationTexts),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'by', i + '-' + field.name, localizationTexts);
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
            disabled: !selectedRow
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

  this.renderSearchField = function (_ref5, labelPrefix, key, localizationTexts) {
    var fieldName = _ref5.name,
        value = _ref5.value;

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
          _this3.setSearchValue(fieldName, e.target.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJERUZBVUxUX1RFWFRTIiwicHJldmlvdXMiLCJuZXh0Iiwibm9EYXRhIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0Iiwic2hvd01vZGFsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsImhhbmRsZUZldGNoRGF0YSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsIm9uQ2xpY2siLCJzZWxlY3RSb3ciLCJjbGFzc05hbWUiLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJuZXdTZWFyY2hGaWVsZHMiLCJzZXRTdGF0ZSIsImZldGNoRGF0YSIsIm9uU2VsZWN0Iiwib3JpZ2luYWwiLCJvbkNsb3NlIiwicmVzb2x2ZWRTdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImxvYWRPcHRpb25zIiwib2Zmc2V0IiwibGltaXQiLCJkYXRhIiwidG90YWxDb3VudCIsInRva2VuIiwic2xpY2UiLCJNYXRoIiwiY2VpbCIsImxhYmVsUHJlZml4Iiwia2V5IiwidHJhbnNsYXRlZFByZWZpeCIsInRyYW5zbGF0ZWRGaWVsZE5hbWUiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUJBQTlCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixhQUF2Qjs7QUFFQSxPQUFPLG9CQUFQOztBQUVBLElBQU1DLG9CQUFvQjtBQUN4QkMsa0JBQWdCLElBRFE7O0FBR3hCQyxxQkFBbUIsS0FISztBQUl4QkMsd0JBQXNCLElBSkU7QUFLeEJDLHVCQUFxQixJQUxHO0FBTXhCQyxtQkFBaUIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBTk87QUFPeEJDLG1CQUFpQixFQVBPOztBQVN4QkMsVUFBUSxJQVRnQjtBQVV4QkMsWUFBVTtBQVZjLENBQTFCOztBQWFBLElBQU1DLHVCQUF1QjtBQUMzQkMsaUJB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OiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5cbmltcG9ydCAnLi9TZWFyY2hNb2RhbC5zY3NzJztcblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzMsIDEwLCAyMCwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG5cbiAgbWFudWFsOiB0cnVlLFxuICBzb3J0YWJsZTogZmFsc2UsXG59O1xuXG5jb25zdCBERUZBVUxUX1NUQVRFX1ZBTFVFUyA9IHtcbiAgc2VhcmNoUmVzdWx0czogW10sXG4gIHBhZ2U6IDAsXG4gIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gIHBhZ2VzOiAxLFxuICBzZWxlY3RlZFJvdzogdW5kZWZpbmVkLFxuICBsb2FkaW5nOiB0cnVlLFxufTtcblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3Qgc2VhcmNoRmllbGRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgLi4ucHJvcHMuZmllbGRzLm1hcChmaWVsZCA9PiAoe1xuICAgICAgICBbZmllbGRdOiAnJyxcbiAgICAgIH0pKSxcbiAgICApO1xuICAgIHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICB9O1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IDA7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTXG4gICAgfTtcbiAgfVxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgICBbZmllbGROYW1lXTogdmFsdWUsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzXG4gICAgfSk7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgICBwYWdlOiAwLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbCk7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVMsXG4gICAgICBzZWFyY2hGaWVsZHM6IHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVGZXRjaERhdGEgPSAoKSA9PiB0aGlzLmZldGNoRGF0YSgpO1xuXG4gIGZldGNoRGF0YSA9IHN0YXRlID0+IHtcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfTtcbiAgICBjb25zdCB7XG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzZWFyY2hGaWVsZHNcbiAgICB9ID0gcmVzb2x2ZWRTdGF0ZTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZldGNoVG9rZW4pLnRoZW4odG9rZW4gPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sb2FkT3B0aW9ucyh7XG4gICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgIH0pLnRoZW4oKHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdG90YWxDb3VudCxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IGRhdGEuc2xpY2UoMCwgcGFnZVNpemUpLFxuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbG9jYWxpemF0aW9uVGV4dHNbYGNvbHVtbi4ke25hbWV9YF0sXG4gICAgICAgIGFjY2Vzc29yOiBuYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBbZmlyc3RGaWVsZCwgLi4ub3RoZXJGaWVsZHNdID0gZmllbGRPYmplY3RzO1xuXG4gICAgY29uc3QgdGV4dHMgPSB7XG4gICAgICBwcmV2aW91c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnByZXZpb3VzIHx8IERFRkFVTFRfVEVYVFMucHJldmlvdXMsXG4gICAgICBuZXh0VGV4dDogbG9jYWxpemF0aW9uVGV4dHMubmV4dCB8fCBERUZBVUxUX1RFWFRTLm5leHQsXG4gICAgICBsb2FkaW5nVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCBERUZBVUxUX1RFWFRTLmxvYWRpbmcsXG4gICAgICBub0RhdGFUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGEgfHwgREVGQVVMVF9URVhUUy5ub0RhdGEsXG4gICAgICBwYWdlVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZSB8fCBERUZBVUxUX1RFWFRTLnBhZ2UsXG4gICAgICBvZlRleHQ6IGxvY2FsaXphdGlvblRleHRzLm9mIHx8IERFRkFVTFRfVEVYVFMub2YsXG4gICAgICByb3dzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93cyB8fCBERUZBVUxUX1RFWFRTLnJvd3MsXG4gICAgICBwYWdlSnVtcFRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2VKdW1wIHx8IERFRkFVTFRfVEVYVFMucGFnZUp1bXAsXG4gICAgICByb3dzU2VsZWN0b3JUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzU2VsZWN0b3IgfHwgREVGQVVMVF9URVhUUy5yb3dzU2VsZWN0b3IsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dGhpcy5wcm9wcy5zaG93TW9kYWx9IG9uSGlkZT17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b249e3RydWV9PlxuICAgICAgICAgIDxoND5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50aXRsZSB9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgKGZpZWxkLCBpKSA9PiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAnYnknLFxuICAgICAgICAgICAgICAgICAgYCR7aX0tJHtmaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0c1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17bG9jYWxpemF0aW9uVGV4dHMubG9hZGluZ31cbiAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLnNlbGVjdCB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5jbG9zZSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19