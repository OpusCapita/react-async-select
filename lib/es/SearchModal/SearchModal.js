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

    var leftPanel = LeftPanel && LeftPanel({ selectedRow: selectedRow });
    var rightPanel = RightPanel && RightPanel({ selectedRow: selectedRow });

    return React.createElement(
      Modal,
      {
        className: 'combobox-with-search__modal',
        dialogClassName: getDialogClassName({ panels: [leftPanel, rightPanel] }),
        show: true,
        onHide: this.handleClose
      },
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
      _this3.props.loadOptions({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsImxvYWRpbmciLCJub0RhdGEiLCJwYWdlIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJnZXREaWFsb2dDbGFzc05hbWUiLCJwYW5lbHMiLCJwYW5lbENvdW50IiwiZmlsdGVyIiwidmFsIiwibGVuZ3RoIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwic3RhdGUiLCJzZWFyY2hSZXN1bHRzIiwicGFnZVNpemUiLCJwYWdlcyIsInNlbGVjdGVkUm93IiwidW5kZWZpbmVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZmV0Y2hEYXRhIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWx0ZXJzIiwicmVuZGVyZXJzIiwiY29tcG9uZW50cyIsIkxlZnRQYW5lbCIsIlJpZ2h0UGFuZWwiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiQ2VsbCIsIkFkZGl0aW9uYWxDb21wb25lbnQiLCJjb2x1bW4iLCJpZCIsIm9yaWdpbmFsIiwiZGlzYWJsZWQiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJ0ZXh0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJsZWZ0UGFuZWwiLCJyaWdodFBhbmVsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJoYW5kbGVTZWxlY3RSb3ciLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJzZXRTdGF0ZSIsIm9uU2VsZWN0Iiwib25DbG9zZSIsImZldGNoVG9rZW4iLCJyZXNvbHZlZFN0YXRlIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUJBQTlCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixhQUF2Qjs7QUFFQSxPQUFPLG9CQUFQOztBQUdBLElBQU1DLG9CQUFvQjtBQUN4QkMsa0JBQWdCLElBRFE7QUFFeEJDLHFCQUFtQixLQUZLO0FBR3hCQyx3QkFBc0IsSUFIRTtBQUl4QkMsdUJBQXFCLElBSkc7QUFLeEJDLG1CQUFpQixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEdBQWIsQ0FMTztBQU14QkMsbUJBQWlCLEVBTk87QUFPeEJDLFVBQVEsSUFQZ0I7QUFReEJDLFlBQVU7QUFSYyxDQUExQjs7QUFZQSxJQUFNQyxnQkFBZ0I7QUFDcEJDLFlBQVUsVUFEVTtBQUVwQkMsUUFBTSxNQUZjO0FBR3BCQyxXQUFTLFlBSFc7QUFJcEJDLFVBQVEsZUFKWTtBQUtwQkMsUUFBTSxNQUxjO0FBTXBCQyxNQUFJLElBTmdCO0FBT3BCQyxRQUFNLE1BUGM7QUFRcEJDLFlBQVUsY0FSVTtBQVNwQkMsZ0JBQWM7QUFUTSxDQUF0Qjs7QUFhQSxJQUFNQyxxQkFBcUIsU0FBckJBLGtCQUFxQixPQUFnQjtBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTs7QUFDekMsTUFBTUMsYUFBYUQsT0FBT0UsTUFBUCxDQUFjO0FBQUEsV0FBTyxDQUFDLENBQUNDLEdBQVQ7QUFBQSxHQUFkLEVBQTRCQyxNQUE1QixHQUFxQyxDQUF4RDtBQUNBLCtDQUEyQ0gsVUFBM0M7QUFDRCxDQUhEOztJQUtNSSxXOzs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixzQkFBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUMsT0FBT0MsTUFBUCxnQkFDbkIsRUFEbUIsU0FFaEJILE1BQU1JLE1BQU4sQ0FBYUMsR0FBYixDQUFpQjtBQUFBOztBQUFBLCtCQUNqQkMsS0FEaUIsSUFDVCxFQURTO0FBQUEsS0FBakIsQ0FGZ0IsRUFBckI7QUFNQSxVQUFLQyxLQUFMLEdBQWE7QUFDWE4sZ0NBRFc7QUFFWE8scUJBQWUsRUFGSjtBQUdYcEIsWUFBTSxDQUhLO0FBSVhxQixnQkFBVW5DLGtCQUFrQk0sZUFKakI7QUFLWDhCLGFBQU8sQ0FMSTtBQU1YQyxtQkFBYUMsU0FORjtBQU9YMUIsZUFBUztBQVBFLEtBQWI7QUFSaUI7QUFpQmxCOzt3QkFHRDJCLGtCLGlDQUFxQjtBQUNuQixTQUFLQyxTQUFMO0FBQ0QsRzs7d0JBeUZEQyxNLHFCQUFTO0FBQUE7O0FBQUEsaUJBU0gsS0FBS1IsS0FURjtBQUFBLFFBRUxDLGFBRkssVUFFTEEsYUFGSztBQUFBLFFBR0xQLFlBSEssVUFHTEEsWUFISztBQUFBLFFBSUxmLE9BSkssVUFJTEEsT0FKSztBQUFBLFFBS0x5QixXQUxLLFVBS0xBLFdBTEs7QUFBQSxRQU1MRCxLQU5LLFVBTUxBLEtBTks7QUFBQSxRQU9MdEIsSUFQSyxVQU9MQSxJQVBLO0FBQUEsUUFRTHFCLFFBUkssVUFRTEEsUUFSSztBQUFBLGlCQWVILEtBQUtULEtBZkY7QUFBQSxRQVdMZ0IsaUJBWEssVUFXTEEsaUJBWEs7QUFBQSxRQVlMQyxPQVpLLFVBWUxBLE9BWks7QUFBQSxRQWFMQyxTQWJLLFVBYUxBLFNBYks7QUFBQSxtQ0FjTEMsVUFkSztBQUFBLFFBY1NDLFNBZFQscUJBY1NBLFNBZFQ7QUFBQSxRQWNvQkMsVUFkcEIscUJBY29CQSxVQWRwQjs7QUFnQlAsUUFBTUMsZUFBZXBCLE9BQU9xQixPQUFQLENBQWV0QixZQUFmLEVBQTZCSSxHQUE3QixDQUFpQztBQUFBLFVBQUVtQixJQUFGO0FBQUEsVUFBUUMsS0FBUjtBQUFBLGFBQW9CLEVBQUVELFVBQUYsRUFBUUMsWUFBUixFQUFwQjtBQUFBLEtBQWpDLENBQXJCO0FBQ0EsUUFBTUMsVUFBVUosYUFBYWpCLEdBQWIsQ0FBaUIsaUJBQWM7QUFBQSxVQUFYbUIsSUFBVyxTQUFYQSxJQUFXOztBQUM3QyxhQUFPO0FBQ0xHLGdCQUFRWCw4QkFBNEJRLElBQTVCLENBREg7QUFFTEksa0JBQVVKLElBRkw7QUFHTEssY0FBTSxxQkFBUztBQUNiLGNBQU1DLHNCQUFzQlosYUFBYUEsVUFBVWxCLE1BQU0rQixNQUFOLENBQWFDLEVBQXZCLENBQWIsSUFBMkMsSUFBdkU7QUFDQSxpQkFDRTtBQUFBO0FBQUEsY0FBSyx1Q0FBb0NoQyxNQUFNaUMsUUFBTixDQUFlQyxRQUFmLEdBQTBCLFVBQTFCLEdBQXVDLEVBQTNFLENBQUw7QUFFSUosa0NBQ0Usb0JBQUMsbUJBQUQsRUFBeUI5QixNQUFNaUMsUUFBL0IsQ0FERixHQUVFO0FBQUE7QUFBQTtBQUFPakMsb0JBQU15QjtBQUFiO0FBSk4sV0FERjtBQVNEO0FBZEksT0FBUDtBQWdCRCxLQWpCZSxDQUFoQjtBQWpCTyxRQW1DQVUsVUFuQ0EsR0FtQzhCYixZQW5DOUI7QUFBQSxRQW1DZWMsV0FuQ2YsR0FtQzhCZCxZQW5DOUI7OztBQXFDUCxRQUFNZSxRQUFRO0FBQ1pDLG9CQUFjdEIsa0JBQWtCaEMsUUFBbEIsSUFBOEJELGNBQWNDLFFBRDlDO0FBRVp1RCxnQkFBVXZCLGtCQUFrQi9CLElBQWxCLElBQTBCRixjQUFjRSxJQUZ0QztBQUdadUQsbUJBQWF4QixrQkFBa0I5QixPQUFsQixJQUE2QkgsY0FBY0csT0FINUM7QUFJWnVELGtCQUFZekIsa0JBQWtCN0IsTUFBbEIsSUFBNEJKLGNBQWNJLE1BSjFDO0FBS1p1RCxnQkFBVTFCLGtCQUFrQjVCLElBQWxCLElBQTBCTCxjQUFjSyxJQUx0QztBQU1adUQsY0FBUTNCLGtCQUFrQjNCLEVBQWxCLElBQXdCTixjQUFjTSxFQU5sQztBQU9adUQsZ0JBQVU1QixrQkFBa0IxQixJQUFsQixJQUEwQlAsY0FBY08sSUFQdEM7QUFRWnVELG9CQUFjN0Isa0JBQWtCekIsUUFBbEIsSUFBOEJSLGNBQWNRLFFBUjlDO0FBU1p1RCx3QkFBa0I5QixrQkFBa0J4QixZQUFsQixJQUFrQ1QsY0FBY1M7QUFUdEQsS0FBZDs7QUFZQSxRQUFNdUQsWUFBWTNCLGFBQWFBLFVBQVUsRUFBRVQsd0JBQUYsRUFBVixDQUEvQjtBQUNBLFFBQU1xQyxhQUFhM0IsY0FBY0EsV0FBVyxFQUFFVix3QkFBRixFQUFYLENBQWpDOztBQUVBLFdBQ0U7QUFBQyxXQUFEO0FBQUE7QUFDRSxtQkFBVSw2QkFEWjtBQUVFLHlCQUFpQmxCLG1CQUFtQixFQUFFQyxRQUFRLENBQUNxRCxTQUFELEVBQVlDLFVBQVosQ0FBVixFQUFuQixDQUZuQjtBQUdFLGNBQU0sSUFIUjtBQUlFLGdCQUFRLEtBQUtDO0FBSmY7QUFNRTtBQUFBO0FBQUEsVUFBSyxXQUFVLG9DQUFmO0FBRUlGLHFCQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsMkVBQWY7QUFDSUE7QUFESixTQUhOO0FBUUU7QUFBQTtBQUFBLFlBQUssV0FBVSw2RUFBZjtBQUNFO0FBQUMsaUJBQUQsQ0FBTyxNQUFQO0FBQUEsY0FBYyxhQUFhLElBQTNCO0FBQ0U7QUFBQTtBQUFBO0FBQ0csbUJBQUsvQyxLQUFMLENBQVdrRDtBQURkO0FBREYsV0FERjtBQU1FO0FBQUMsaUJBQUQsQ0FBTyxJQUFQO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSw0Q0FBZjtBQUVJZiw0QkFBYyxLQUFLZ0IsaUJBQUwsQ0FDWmhCLFVBRFksRUFFWixVQUZZLFVBR05BLFdBQVdYLElBSEwsRUFJWlIsaUJBSlksRUFLWkMsT0FMWSxDQUZsQjtBQVdJbUIsMEJBQVkvQixHQUFaLENBQ0UsVUFBQ0MsS0FBRCxFQUFROEMsQ0FBUjtBQUFBLHVCQUFjLE9BQUtELGlCQUFMLENBQ1o3QyxLQURZLEVBRVosSUFGWSxFQUdUOEMsQ0FIUyxTQUdKOUMsTUFBTWtCLElBSEYsRUFJWlIsaUJBSlksRUFLWkMsT0FMWSxDQUFkO0FBQUEsZUFERjtBQVhKLGFBREY7QUF1QkU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsNENBQWY7QUFDRSxrQ0FBQyxVQUFELGVBQ00zQyxpQkFETixFQUVNK0QsS0FGTjtBQUdFLHNCQUFNN0IsYUFIUjtBQUlFLHlCQUFTa0IsT0FKWDtBQUtFLDBCQUFVakIsUUFMWjtBQU1FLDZCQUFhTyxrQkFBa0I5QixPQU5qQztBQU9FLDRCQUFZQSxVQUFVLEVBQVYsR0FBZThCLGtCQUFrQjdCLE1BUC9DO0FBUUUseUJBQVNELE9BUlg7QUFTRSx1QkFBT3dCLEtBVFQ7QUFVRSxzQkFBTXRCLElBVlI7QUFXRSw4QkFBYyxLQUFLaUUsZ0JBWHJCO0FBWUUsa0NBQWtCLEtBQUtDLG9CQVp6QjtBQWFFLGlDQUNFLHlCQUFDL0MsS0FBRCxFQUFRZ0QsR0FBUixFQUFnQjtBQUNkLHNCQUFNQyxZQUFZLENBQUNELEdBQUQsR0FBTyxRQUFQLEdBQWtCLEVBQXBDO0FBQ0EseUJBQU87QUFDTEM7QUFESyxtQkFBUDtBQUdELGlCQW5CTDtBQXFCRSw0QkFDRSxvQkFBQ2pELEtBQUQsRUFBUWdELEdBQVIsRUFBZ0I7QUFDZCxzQkFBTUUsVUFBVSxTQUFWQSxPQUFVO0FBQUEsMkJBQU0sT0FBS0MsZUFBTCxDQUFxQkgsR0FBckIsQ0FBTjtBQUFBLG1CQUFoQjtBQUNBLHNCQUFNQyxZQUFZN0MsZUFBZTRDLEdBQWYsSUFBc0I1QyxZQUFZZ0QsS0FBWixLQUFzQkosSUFBSUksS0FBaEQsR0FBd0QsVUFBeEQsR0FBcUUsRUFBdkY7O0FBRUEseUJBQU87QUFDTEYsb0NBREs7QUFFTEQ7QUFGSyxtQkFBUDtBQUlEO0FBOUJMO0FBREY7QUF2QkYsV0FORjtBQWlFRTtBQUFDLGlCQUFELENBQU8sTUFBUDtBQUFBO0FBQ0U7QUFBQyxvQkFBRDtBQUFBO0FBQ0UseUJBQVEsU0FEVjtBQUVFLHlCQUFTLEtBQUtJLFlBRmhCO0FBR0UsMEJBQVUsQ0FBQ2pELFdBQUQsSUFBZ0JBLFlBQVlzQixRQUFaLENBQXFCQztBQUhqRDtBQUtHbEIsZ0NBQWtCNkM7QUFMckIsYUFERjtBQVFFO0FBQUMsb0JBQUQ7QUFBQSxnQkFBUSxTQUFRLFNBQWhCLEVBQTBCLFNBQVMsS0FBS1osV0FBeEM7QUFDR2pDLGdDQUFrQjhDO0FBRHJCO0FBUkY7QUFqRUYsU0FSRjtBQXVGSWQsc0JBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSw0RUFBZjtBQUNJQTtBQURKO0FBeEZOO0FBTkYsS0FERjtBQXVHRCxHOzs7RUEzUXVCL0UsUzs7O09BMEJ4QjhGLGMsR0FBaUIsVUFBQ0MsU0FBRCxFQUFZdkMsS0FBWixFQUFzQjtBQUFBOztBQUFBLFFBQzdCeEIsWUFENkIsR0FDWixPQUFLTSxLQURPLENBQzdCTixZQUQ2Qjs7QUFFckMsV0FBS2EsU0FBTCxDQUFlO0FBQ2IxQixZQUFNLENBRE87QUFFYmEsaUNBQW1CQSxZQUFuQiw2QkFBa0MrRCxTQUFsQyxJQUE4Q3ZDLEtBQTlDO0FBRmEsS0FBZjtBQUlELEc7O09BR0RpQyxlLEdBQWtCO0FBQUEsV0FBTyxPQUFLTyxRQUFMLENBQWMsRUFBRXRELGFBQWE0QyxHQUFmLEVBQWQsQ0FBUDtBQUFBLEc7O09BR2xCRixnQixHQUFtQixnQkFBUTtBQUN6QixXQUFLdkMsU0FBTCxDQUFlLEVBQUUxQixVQUFGLEVBQWY7QUFDRCxHOztPQUdEa0Usb0IsR0FBdUIsVUFBQzdDLFFBQUQsRUFBV3JCLElBQVg7QUFBQSxXQUFvQixPQUFLMEIsU0FBTCxDQUFlLEVBQUVMLGtCQUFGLEVBQVlyQixVQUFaLEVBQWYsQ0FBcEI7QUFBQSxHOztPQUd2QndFLFksR0FBZSxZQUFNO0FBQUEsUUFDWGpELFdBRFcsR0FDSyxPQUFLSixLQURWLENBQ1hJLFdBRFc7O0FBRW5CLFdBQUtYLEtBQUwsQ0FBV2tFLFFBQVgsQ0FBb0J2RCxlQUFlQSxZQUFZc0IsUUFBL0M7QUFDQSxXQUFLZ0IsV0FBTDtBQUNELEc7O09BR0RBLFcsR0FBYztBQUFBLFdBQU0sT0FBS2pELEtBQUwsQ0FBV21FLE9BQVgsRUFBTjtBQUFBLEc7O09BR2RDLFUsR0FBYSxDOztPQUVidEQsUyxHQUFZLGlCQUFTO0FBQ25CLFFBQU11RCw2QkFBcUIsT0FBSzlELEtBQTFCLEVBQW9DQSxLQUFwQyxDQUFOO0FBRG1CLFFBRVhuQixJQUZXLEdBRXNCaUYsYUFGdEIsQ0FFWGpGLElBRlc7QUFBQSxRQUVMcUIsUUFGSyxHQUVzQjRELGFBRnRCLENBRUw1RCxRQUZLO0FBQUEsUUFFS1IsWUFGTCxHQUVzQm9FLGFBRnRCLENBRUtwRSxZQUZMOzs7QUFJbkIsV0FBS2dFLFFBQUwsY0FDT0ksYUFEUCxJQUNzQm5GLFNBQVMsSUFEL0IsS0FFRSxZQUFNO0FBQ0osYUFBS2tGLFVBQUwsR0FBa0IsT0FBS0EsVUFBTCxHQUFrQixDQUFwQztBQUNBLFVBQU1BLGFBQWEsT0FBS0EsVUFBeEI7QUFDQSxhQUFLcEUsS0FBTCxDQUFXc0UsV0FBWCxDQUF1QjtBQUNyQnJFLGtDQURxQjtBQUVyQnNFLGdCQUFRbkYsT0FBT3FCLFFBRk07QUFHckIrRCxlQUFPL0Q7QUFIYyxPQUF2QixFQUlHZ0UsSUFKSCxDQUlRLGlCQUEyQjtBQUFBLFlBQXhCQyxJQUF3QixTQUF4QkEsSUFBd0I7QUFBQSxZQUFsQkMsVUFBa0IsU0FBbEJBLFVBQWtCOztBQUNqQyxZQUFJUCxlQUFlLE9BQUtBLFVBQXhCLEVBQW9DO0FBQ2xDLGlCQUFLSCxRQUFMLENBQWM7QUFDWnpELDJCQUFla0UsS0FBS0UsS0FBTCxDQUFXLENBQVgsRUFBY25FLFFBQWQsQ0FESDtBQUVaQyxtQkFBT21FLEtBQUtDLElBQUwsQ0FBVUgsYUFBYWxFLFFBQXZCLENBRks7QUFHWnZCLHFCQUFTO0FBSEcsV0FBZDtBQUtEO0FBQ0YsT0FaRDtBQWFELEtBbEJIO0FBb0JELEc7O09BR0RpRSxpQixHQUFvQixpQkFBNkI0QixXQUE3QixFQUEwQ0MsR0FBMUMsRUFBK0NoRSxpQkFBL0MsRUFBa0VDLE9BQWxFLEVBQThFO0FBQUEsUUFBckUrQyxTQUFxRSxTQUEzRXhDLElBQTJFO0FBQUEsUUFBMURDLEtBQTBELFNBQTFEQSxLQUEwRDs7QUFDaEcsUUFBSVIsV0FBV0EsUUFBUStDLFNBQVIsQ0FBZixFQUFtQztBQUNqQyxVQUFNaUIsU0FBU2hFLFFBQVErQyxTQUFSLENBQWY7QUFDQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsa0RBQWYsRUFBa0UsdUJBQXFCZ0IsR0FBdkY7QUFDRSw0QkFBQyxNQUFELElBQVEsT0FBT3ZELEtBQWYsRUFBc0IsVUFBVTtBQUFBLG1CQUFTLE9BQUtzQyxjQUFMLENBQW9CQyxTQUFwQixFQUErQnZDLEtBQS9CLENBQVQ7QUFBQSxXQUFoQztBQURGLE9BREY7QUFLRDtBQUNELFFBQU15RCxtQkFBbUJsRSxrQkFBa0IrRCxXQUFsQixDQUF6QjtBQUNBLFFBQU1JLHNCQUFzQm5FLDZCQUEyQmdELFNBQTNCLENBQTVCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUJnQixHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QmhCLFNBQXJGO0FBQ01rQix3QkFETixTQUMwQkM7QUFEMUIsT0FERjtBQUlFO0FBQ0UsY0FBSyxNQURQO0FBRUUsOEJBQW9CbkIsU0FGdEI7QUFHRSxlQUFPdkMsS0FIVDtBQUlFLGlCQUFTO0FBQUEsaUJBQUssT0FBS3NDLGNBQUwsQ0FBb0JDLFNBQXBCLEVBQStCb0IsRUFBRUMsTUFBRixDQUFTNUQsS0FBeEMsQ0FBTDtBQUFBO0FBSlg7QUFKRixLQURGO0FBYUQsRzs7OztBQStLSDFCLFlBQVl1RixZQUFaLEdBQTJCO0FBQ3pCcEMsU0FBTyxFQURrQjtBQUV6QjlDLFVBQVEsRUFGaUI7QUFHekJrRSxlQUFhO0FBQUEsV0FBTWlCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRWQsTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJSLFdBQVMsbUJBQU0sQ0FBRSxDQUpRO0FBS3pCRCxZQUFVLG9CQUFNLENBQUUsQ0FMTztBQU16Qi9DLGNBQVk7QUFOYSxDQUEzQjs7QUFVQSxlQUFlcEIsV0FBZiIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5cbmltcG9ydCAnLi9TZWFyY2hNb2RhbC5zY3NzJztcblxuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzEwLCAyMCwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuXG5jb25zdCBERUZBVUxUX1RFWFRTID0ge1xuICBwcmV2aW91czogJ1ByZXZpb3VzJyxcbiAgbmV4dDogJ05leHQnLFxuICBsb2FkaW5nOiAnTG9hZGluZy4uLicsXG4gIG5vRGF0YTogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlOiAnUGFnZScsXG4gIG9mOiAnb2YnLFxuICByb3dzOiAncm93cycsXG4gIHBhZ2VKdW1wOiAnanVtcCB0byBwYWdlJyxcbiAgcm93c1NlbGVjdG9yOiAncm93cyBwZXIgcGFnZScsXG59O1xuXG5cbmNvbnN0IGdldERpYWxvZ0NsYXNzTmFtZSA9ICh7IHBhbmVscyB9KSA9PiB7XG4gIGNvbnN0IHBhbmVsQ291bnQgPSBwYW5lbHMuZmlsdGVyKHZhbCA9PiAhIXZhbCkubGVuZ3RoICsgMTtcbiAgcmV0dXJuIGBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtd2l0aC0ke3BhbmVsQ291bnR9LXBhbmVsc2A7XG59O1xuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgc2VhcmNoUmVzdWx0czogW10sXG4gICAgICBwYWdlOiAwLFxuICAgICAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIHBhZ2VzOiAxLFxuICAgICAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfTtcbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gIH1cblxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiB7IC4uLnNlYXJjaEZpZWxkcywgW2ZpZWxkTmFtZV06IHZhbHVlIH1cbiAgICB9KTtcbiAgfTtcblxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IHJvdyA9PiB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSb3c6IHJvdyB9KTtcblxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLmZldGNoRGF0YSh7IHBhZ2UgfSk7XG4gIH07XG5cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4gdGhpcy5mZXRjaERhdGEoeyBwYWdlU2l6ZSwgcGFnZSB9KTtcblxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkUm93IH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblxuICBmZXRjaFRva2VuID0gMDtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcbiAgICBjb25zdCB7IHBhZ2UsIHBhZ2VTaXplLCBzZWFyY2hGaWVsZHMgfSA9IHJlc29sdmVkU3RhdGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgeyAuLi5yZXNvbHZlZFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgICAgIGNvbnN0IGZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW47XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIH0pLnRoZW4oKHsgZGF0YSwgdG90YWxDb3VudCwgfSkgPT4ge1xuICAgICAgICAgIGlmIChmZXRjaFRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH07XG5cblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMsIGZpbHRlcnMpID0+IHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnN0IEZpbHRlciA9IGZpbHRlcnNbZmllbGROYW1lXTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb21ib2JveC13aXRoLWN1c3RvbS1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXInIGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgICA8RmlsdGVyIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCB2YWx1ZSl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBjb21wb25lbnRzOiB7IExlZnRQYW5lbCwgUmlnaHRQYW5lbCB9LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgICAgQ2VsbDogcHJvcHMgPT4ge1xuICAgICAgICAgIGNvbnN0IEFkZGl0aW9uYWxDb21wb25lbnQgPSByZW5kZXJlcnMgJiYgcmVuZGVyZXJzW3Byb3BzLmNvbHVtbi5pZF0gfHwgbnVsbDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjZWxsLXZhbHVlIGNlbGwtdmFsdWUtJHtwcm9wcy5vcmlnaW5hbC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFkZGl0aW9uYWxDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxDb21wb25lbnQgey4uLnByb3BzLm9yaWdpbmFsfS8+IDpcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9wcy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBMZWZ0UGFuZWwgJiYgTGVmdFBhbmVsKHsgc2VsZWN0ZWRSb3cgfSk7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IFJpZ2h0UGFuZWwgJiYgUmlnaHRQYW5lbCh7IHNlbGVjdGVkUm93IH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbFxuICAgICAgICBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWxcIlxuICAgICAgICBkaWFsb2dDbGFzc05hbWU9e2dldERpYWxvZ0NsYXNzTmFtZSh7IHBhbmVsczogW2xlZnRQYW5lbCwgcmlnaHRQYW5lbF0gfSl9XG4gICAgICAgIHNob3c9e3RydWV9XG4gICAgICAgIG9uSGlkZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWxzXCI+XG4gICAgICAgICAge1xuICAgICAgICAgICAgbGVmdFBhbmVsICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsLS1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgeyBsZWZ0UGFuZWwgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsLS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b249e3RydWV9PlxuICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgJ3NlYXJjaEJ5JyxcbiAgICAgICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG90aGVyRmllbGRzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGZpZWxkLCBpKSA9PiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICdieScsXG4gICAgICAgICAgICAgICAgICAgICAgYCR7aX0tJHtmaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICAgICAgey4uLnRleHRzfVxuICAgICAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17bG9jYWxpemF0aW9uVGV4dHMubG9hZGluZ31cbiAgICAgICAgICAgICAgICAgIG5vRGF0YVRleHQ9e2xvYWRpbmcgPyAnJyA6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YX1cbiAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VTaXplQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZ2V0VHJHcm91cFByb3BzPXtcbiAgICAgICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSAhcm93ID8gXCJoaWRkZW5cIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBnZXRUclByb3BzPXtcbiAgICAgICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbkNsaWNrID0gKCkgPT4gdGhpcy5oYW5kbGVTZWxlY3RSb3cocm93KTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc2VsZWN0ZWRSb3cgfHwgc2VsZWN0ZWRSb3cub3JpZ2luYWwuZGlzYWJsZWR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuc2VsZWN0fVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5jbG9zZX1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICByaWdodFBhbmVsICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsLS1yaWdodFwiPlxuICAgICAgICAgICAgICAgIHsgcmlnaHRQYW5lbCB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBjb21wb25lbnRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59O1xuXG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIG9uQ2xvc2U6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGNvbXBvbmVudHM6IHt9LFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hNb2RhbDtcbiJdfQ==