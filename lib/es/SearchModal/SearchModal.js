var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { DEBOUNCE_LIMIT } from '../ComboboxWithSearch/ComboboxWithSearch';

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

var getDialogClassName = function getDialogClassName(_ref) {
  var panels = _ref.panels;

  var panelCount = panels.filter(function (val) {
    return !!val;
  }).length + 1;
  return 'combobox-with-search__modal-with-' + panelCount + '-panels';
};

var SearchModal = (_temp = _class = function (_Component) {
  _inherits(SearchModal, _Component);

  function SearchModal(props) {
    _classCallCheck(this, SearchModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var searchFields = Object.assign.apply(Object, [{}].concat(props.fields.map(function (field) {
      var _ref2;

      return _ref2 = {}, _ref2[field] = '', _ref2;
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

    _this.loadOptionsDebounced = AwesomeDebouncePromise(props.loadOptions, DEBOUNCE_LIMIT);
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
        renderers = _props.renderers,
        _props$components = _props.components,
        LeftPanel = _props$components.LeftPanel,
        RightPanel = _props$components.RightPanel;

    var fieldObjects = Object.entries(searchFields).map(function (_ref3) {
      var name = _ref3[0],
          value = _ref3[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref4) {
      var name = _ref4.name;

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

    var leftPanel = LeftPanel && React.createElement(LeftPanel, { selectedRow: selectedRow });
    var rightPanel = RightPanel && React.createElement(RightPanel, { selectedRow: selectedRow });

    return React.createElement(
      Modal,
      {
        className: 'combobox-with-search__modal',
        dialogClassName: getDialogClassName({ panels: [leftPanel, rightPanel] }),
        show: true,
        style: { display: 'flex' },
        onHide: this.handleClose
      },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        React.createElement(
          'h4',
          { className: 'combobox-with-search__modal-title combobox-with-search__modal-title--1-panel' },
          this.props.title
        )
      ),
      React.createElement(
        'div',
        { className: 'combobox-with-search__modal-panels' },
        leftPanel && React.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--left' },
          leftPanel
        ),
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--center' },
          React.createElement(
            Modal.Body,
            null,
            React.createElement(
              'h4',
              { className: 'combobox-with-search__modal-title combobox-with-search__modal-title--2-3-panels' },
              this.props.title
            ),
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
        ),
        rightPanel && React.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--right' },
          rightPanel
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
      _this3.loadOptionsDebounced({
        searchFields: searchFields,
        offset: page * pageSize,
        limit: pageSize
      }).then(function (_ref5) {
        var data = _ref5.data,
            totalCount = _ref5.totalCount;

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

  this.renderSearchField = function (_ref6, labelPrefix, key, localizationTexts, filters) {
    var fieldName = _ref6.name,
        value = _ref6.value;

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
  onSelect: function onSelect() {},
  components: {}
};

export default SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIkF3ZXNvbWVEZWJvdW5jZVByb21pc2UiLCJERUJPVU5DRV9MSU1JVCIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsImxvYWRpbmciLCJub0RhdGEiLCJwYWdlIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJnZXREaWFsb2dDbGFzc05hbWUiLCJwYW5lbHMiLCJwYW5lbENvdW50IiwiZmlsdGVyIiwidmFsIiwibGVuZ3RoIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwic3RhdGUiLCJzZWFyY2hSZXN1bHRzIiwicGFnZVNpemUiLCJwYWdlcyIsInNlbGVjdGVkUm93IiwidW5kZWZpbmVkIiwibG9hZE9wdGlvbnNEZWJvdW5jZWQiLCJsb2FkT3B0aW9ucyIsImNvbXBvbmVudFdpbGxNb3VudCIsImZldGNoRGF0YSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmlsdGVycyIsInJlbmRlcmVycyIsImNvbXBvbmVudHMiLCJMZWZ0UGFuZWwiLCJSaWdodFBhbmVsIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwibGVmdFBhbmVsIiwicmlnaHRQYW5lbCIsImRpc3BsYXkiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93IiwiY2xhc3NOYW1lIiwib25DbGljayIsImhhbmRsZVNlbGVjdFJvdyIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvbkNsb3NlIiwiZmV0Y2hUb2tlbiIsInJlc29sdmVkU3RhdGUiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUJBQTlCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixhQUF2QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDBCQUFuQzs7QUFFQSxTQUFTQyxjQUFULFFBQStCLDBDQUEv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QUEsVUFBSyxXQUFVLGtEQUFmLEVBQWtFLHVCQUFxQmUsR0FBdkY7QUFDRSw0QkFBQyxNQUFELElBQVEsT0FBT3ZELEtBQWYsRUFBc0IsVUFBVTtBQUFBLG1CQUFTLE9BQUt1QyxjQUFMLENBQW9CQyxTQUFwQixFQUErQnhDLEtBQS9CLENBQVQ7QUFBQSxXQUFoQztBQURGLE9BREY7QUFLRDtBQUNELFFBQU15RCxtQkFBbUJsRSxrQkFBa0IrRCxXQUFsQixDQUF6QjtBQUNBLFFBQU1JLHNCQUFzQm5FLDZCQUEyQmlELFNBQTNCLENBQTVCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUJlLEdBQWxGO0FBQ0U7QUFBQTtBQUFBLFVBQU8sV0FBVSwwQ0FBakIsRUFBNEQsMkJBQXlCZixTQUFyRjtBQUNNaUIsd0JBRE4sU0FDMEJDO0FBRDFCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQmxCLFNBRnRCO0FBR0UsZUFBT3hDLEtBSFQ7QUFJRSxpQkFBUztBQUFBLGlCQUFLLE9BQUt1QyxjQUFMLENBQW9CQyxTQUFwQixFQUErQm1CLEVBQUVDLE1BQUYsQ0FBUzVELEtBQXhDLENBQUw7QUFBQTtBQUpYO0FBSkYsS0FERjtBQWFELEc7Ozs7QUFtTEg1QixZQUFZeUYsWUFBWixHQUEyQjtBQUN6Qm5DLFNBQU8sRUFEa0I7QUFFekJqRCxVQUFRLEVBRmlCO0FBR3pCVSxlQUFhO0FBQUEsV0FBTTJFLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRWQsTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJQLFdBQVMsbUJBQU0sQ0FBRSxDQUpRO0FBS3pCRCxZQUFVLG9CQUFNLENBQUUsQ0FMTztBQU16QmhELGNBQVk7QUFOYSxDQUEzQjs7QUFVQSxlQUFldEIsV0FBZiIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5pbXBvcnQgQXdlc29tZURlYm91bmNlUHJvbWlzZSBmcm9tICdhd2Vzb21lLWRlYm91bmNlLXByb21pc2UnO1xuXG5pbXBvcnQgeyBERUJPVU5DRV9MSU1JVCB9IGZyb20gJy4uL0NvbWJvYm94V2l0aFNlYXJjaC9Db21ib2JveFdpdGhTZWFyY2gnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFsxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jb25zdCBnZXREaWFsb2dDbGFzc05hbWUgPSAoeyBwYW5lbHMgfSkgPT4ge1xuICBjb25zdCBwYW5lbENvdW50ID0gcGFuZWxzLmZpbHRlcih2YWwgPT4gISF2YWwpLmxlbmd0aCArIDE7XG4gIHJldHVybiBgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXdpdGgtJHtwYW5lbENvdW50fS1wYW5lbHNgO1xufTtcblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkID0gQXdlc29tZURlYm91bmNlUHJvbWlzZShcbiAgICAgIHByb3BzLmxvYWRPcHRpb25zLFxuICAgICAgREVCT1VOQ0VfTElNSVQsXG4gICAgKTtcbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gIH1cblxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiB7IC4uLnNlYXJjaEZpZWxkcywgW2ZpZWxkTmFtZV06IHZhbHVlIH1cbiAgICB9KTtcbiAgfTtcblxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IHJvdyA9PiB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSb3c6IHJvdyB9KTtcblxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLmZldGNoRGF0YSh7IHBhZ2UgfSk7XG4gIH07XG5cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4gdGhpcy5mZXRjaERhdGEoeyBwYWdlU2l6ZSwgcGFnZSB9KTtcblxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkUm93IH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblxuICBmZXRjaFRva2VuID0gMDtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcbiAgICBjb25zdCB7IHBhZ2UsIHBhZ2VTaXplLCBzZWFyY2hGaWVsZHMgfSA9IHJlc29sdmVkU3RhdGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgeyAuLi5yZXNvbHZlZFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgICAgIGNvbnN0IGZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW47XG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNEZWJvdW5jZWQoe1xuICAgICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIH0pLnRoZW4oKHsgZGF0YSwgdG90YWxDb3VudCwgfSkgPT4ge1xuICAgICAgICAgIGlmIChmZXRjaFRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH07XG5cblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMsIGZpbHRlcnMpID0+IHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnN0IEZpbHRlciA9IGZpbHRlcnNbZmllbGROYW1lXTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb21ib2JveC13aXRoLWN1c3RvbS1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXInIGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgICA8RmlsdGVyIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCB2YWx1ZSl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBjb21wb25lbnRzOiB7IExlZnRQYW5lbCwgUmlnaHRQYW5lbCB9LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgICAgQ2VsbDogcHJvcHMgPT4ge1xuICAgICAgICAgIGNvbnN0IEFkZGl0aW9uYWxDb21wb25lbnQgPSByZW5kZXJlcnMgJiYgcmVuZGVyZXJzW3Byb3BzLmNvbHVtbi5pZF0gfHwgbnVsbDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjZWxsLXZhbHVlIGNlbGwtdmFsdWUtJHtwcm9wcy5vcmlnaW5hbC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFkZGl0aW9uYWxDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxDb21wb25lbnQgey4uLnByb3BzLm9yaWdpbmFsfS8+IDpcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9wcy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBMZWZ0UGFuZWwgJiYgKDxMZWZ0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcbiAgICBjb25zdCByaWdodFBhbmVsID0gUmlnaHRQYW5lbCAmJiAoPFJpZ2h0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPXtnZXREaWFsb2dDbGFzc05hbWUoeyBwYW5lbHM6IFtsZWZ0UGFuZWwsIHJpZ2h0UGFuZWxdIH0pfVxuICAgICAgICBzaG93PXt0cnVlfVxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcgfX1cbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXRpdGxlIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZS0tMS1wYW5lbFwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxlZnRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tbGVmdFwiPlxuICAgICAgICAgICAgICAgIHsgbGVmdFBhbmVsIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tY2VudGVyXCI+XG4gICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZSBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtdGl0bGUtLTItMy1wYW5lbHNcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAnYnknLFxuICAgICAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2xvY2FsaXphdGlvblRleHRzLmxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgcGFnZXM9e3BhZ2VzfVxuICAgICAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGdldFRyR3JvdXBQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gIXJvdyA/IFwiaGlkZGVuXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9ICgpID0+IHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93IHx8IHNlbGVjdGVkUm93Lm9yaWdpbmFsLmRpc2FibGVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLnNlbGVjdH1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuY2xvc2V9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge1xuICAgICAgICAgICAgcmlnaHRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tcmlnaHRcIj5cbiAgICAgICAgICAgICAgICB7IHJpZ2h0UGFuZWwgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgY29tcG9uZW50czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBjb21wb25lbnRzOiB7fSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=