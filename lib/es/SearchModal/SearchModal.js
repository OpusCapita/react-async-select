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

    var leftPanel = LeftPanel && React.createElement(LeftPanel, { selectedRow: selectedRow });
    var rightPanel = RightPanel && React.createElement(RightPanel, { selectedRow: selectedRow });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsImxvYWRpbmciLCJub0RhdGEiLCJwYWdlIiwib2YiLCJyb3dzIiwicGFnZUp1bXAiLCJyb3dzU2VsZWN0b3IiLCJnZXREaWFsb2dDbGFzc05hbWUiLCJwYW5lbHMiLCJwYW5lbENvdW50IiwiZmlsdGVyIiwidmFsIiwibGVuZ3RoIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwic3RhdGUiLCJzZWFyY2hSZXN1bHRzIiwicGFnZVNpemUiLCJwYWdlcyIsInNlbGVjdGVkUm93IiwidW5kZWZpbmVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZmV0Y2hEYXRhIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWx0ZXJzIiwicmVuZGVyZXJzIiwiY29tcG9uZW50cyIsIkxlZnRQYW5lbCIsIlJpZ2h0UGFuZWwiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiQ2VsbCIsIkFkZGl0aW9uYWxDb21wb25lbnQiLCJjb2x1bW4iLCJpZCIsIm9yaWdpbmFsIiwiZGlzYWJsZWQiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJ0ZXh0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJsZWZ0UGFuZWwiLCJyaWdodFBhbmVsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJoYW5kbGVTZWxlY3RSb3ciLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJzZXRTdGF0ZSIsIm9uU2VsZWN0Iiwib25DbG9zZSIsImZldGNoVG9rZW4iLCJyZXNvbHZlZFN0YXRlIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUJBQTlCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixhQUF2Qjs7QUFFQSxPQUFPLG9CQUFQOztBQUdBLElBQU1DLG9CQUFvQjtBQUN4QkMsa0JBQWdCLElBRFE7QUFFeEJDLHFCQUFtQixLQUZLO0FBR3hCQyx3QkFBc0IsSUFIRTtBQUl4QkMsdUJBQXFCLElBSkc7QUFLeEJDLG1CQUFpQixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEdBQWIsQ0FMTztBQU14QkMsbUJBQWlCLEVBTk87QUFPeEJDLFVBQVEsSUFQZ0I7QUFReEJDLFlBQVU7QUFSYyxDQUExQjs7QUFZQSxJQUFNQyxnQkFBZ0I7QUFDcEJDLFlBQVUsVUFEVTtBQUVwQkMsUUFBTSxNQUZjO0FBR3BCQyxXQUFTLFlBSFc7QUFJcEJDLFVBQVEsZUFKWTtBQUtwQkMsUUFBTSxNQUxjO0FBTXBCQyxNQUFJLElBTmdCO0FBT3BCQyxRQUFNLE1BUGM7QUFRcEJDLFlBQVUsY0FSVTtBQVNwQkMsZ0JBQWM7QUFUTSxDQUF0Qjs7QUFhQSxJQUFNQyxxQkFBcUIsU0FBckJBLGtCQUFxQixPQUFnQjtBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTs7QUFDekMsTUFBTUMsYUFBYUQsT0FBT0UsTUFBUCxDQUFjO0FBQUEsV0FBTyxDQUFDLENBQUNDLEdBQVQ7QUFBQSxHQUFkLEVBQTRCQyxNQUE1QixHQUFxQyxDQUF4RDtBQUNBLCtDQUEyQ0gsVUFBM0M7QUFDRCxDQUhEOztJQUtNSSxXOzs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixzQkFBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFFakIsUUFBTUMsZUFBZUMsT0FBT0MsTUFBUCxnQkFDbkIsRUFEbUIsU0FFaEJILE1BQU1JLE1BQU4sQ0FBYUMsR0FBYixDQUFpQjtBQUFBOztBQUFBLCtCQUNqQkMsS0FEaUIsSUFDVCxFQURTO0FBQUEsS0FBakIsQ0FGZ0IsRUFBckI7QUFNQSxVQUFLQyxLQUFMLEdBQWE7QUFDWE4sZ0NBRFc7QUFFWE8scUJBQWUsRUFGSjtBQUdYcEIsWUFBTSxDQUhLO0FBSVhxQixnQkFBVW5DLGtCQUFrQk0sZUFKakI7QUFLWDhCLGFBQU8sQ0FMSTtBQU1YQyxtQkFBYUMsU0FORjtBQU9YMUIsZUFBUztBQVBFLEtBQWI7QUFSaUI7QUFpQmxCOzt3QkFHRDJCLGtCLGlDQUFxQjtBQUNuQixTQUFLQyxTQUFMO0FBQ0QsRzs7d0JBeUZEQyxNLHFCQUFTO0FBQUE7O0FBQUEsaUJBU0gsS0FBS1IsS0FURjtBQUFBLFFBRUxDLGFBRkssVUFFTEEsYUFGSztBQUFBLFFBR0xQLFlBSEssVUFHTEEsWUFISztBQUFBLFFBSUxmLE9BSkssVUFJTEEsT0FKSztBQUFBLFFBS0x5QixXQUxLLFVBS0xBLFdBTEs7QUFBQSxRQU1MRCxLQU5LLFVBTUxBLEtBTks7QUFBQSxRQU9MdEIsSUFQSyxVQU9MQSxJQVBLO0FBQUEsUUFRTHFCLFFBUkssVUFRTEEsUUFSSztBQUFBLGlCQWVILEtBQUtULEtBZkY7QUFBQSxRQVdMZ0IsaUJBWEssVUFXTEEsaUJBWEs7QUFBQSxRQVlMQyxPQVpLLFVBWUxBLE9BWks7QUFBQSxRQWFMQyxTQWJLLFVBYUxBLFNBYks7QUFBQSxtQ0FjTEMsVUFkSztBQUFBLFFBY1NDLFNBZFQscUJBY1NBLFNBZFQ7QUFBQSxRQWNvQkMsVUFkcEIscUJBY29CQSxVQWRwQjs7QUFnQlAsUUFBTUMsZUFBZXBCLE9BQU9xQixPQUFQLENBQWV0QixZQUFmLEVBQTZCSSxHQUE3QixDQUFpQztBQUFBLFVBQUVtQixJQUFGO0FBQUEsVUFBUUMsS0FBUjtBQUFBLGFBQW9CLEVBQUVELFVBQUYsRUFBUUMsWUFBUixFQUFwQjtBQUFBLEtBQWpDLENBQXJCO0FBQ0EsUUFBTUMsVUFBVUosYUFBYWpCLEdBQWIsQ0FBaUIsaUJBQWM7QUFBQSxVQUFYbUIsSUFBVyxTQUFYQSxJQUFXOztBQUM3QyxhQUFPO0FBQ0xHLGdCQUFRWCw4QkFBNEJRLElBQTVCLENBREg7QUFFTEksa0JBQVVKLElBRkw7QUFHTEssY0FBTSxxQkFBUztBQUNiLGNBQU1DLHNCQUFzQlosYUFBYUEsVUFBVWxCLE1BQU0rQixNQUFOLENBQWFDLEVBQXZCLENBQWIsSUFBMkMsSUFBdkU7QUFDQSxpQkFDRTtBQUFBO0FBQUEsY0FBSyx1Q0FBb0NoQyxNQUFNaUMsUUFBTixDQUFlQyxRQUFmLEdBQTBCLFVBQTFCLEdBQXVDLEVBQTNFLENBQUw7QUFFSUosa0NBQ0Usb0JBQUMsbUJBQUQsRUFBeUI5QixNQUFNaUMsUUFBL0IsQ0FERixHQUVFO0FBQUE7QUFBQTtBQUFPakMsb0JBQU15QjtBQUFiO0FBSk4sV0FERjtBQVNEO0FBZEksT0FBUDtBQWdCRCxLQWpCZSxDQUFoQjtBQWpCTyxRQW1DQVUsVUFuQ0EsR0FtQzhCYixZQW5DOUI7QUFBQSxRQW1DZWMsV0FuQ2YsR0FtQzhCZCxZQW5DOUI7OztBQXFDUCxRQUFNZSxRQUFRO0FBQ1pDLG9CQUFjdEIsa0JBQWtCaEMsUUFBbEIsSUFBOEJELGNBQWNDLFFBRDlDO0FBRVp1RCxnQkFBVXZCLGtCQUFrQi9CLElBQWxCLElBQTBCRixjQUFjRSxJQUZ0QztBQUdadUQsbUJBQWF4QixrQkFBa0I5QixPQUFsQixJQUE2QkgsY0FBY0csT0FINUM7QUFJWnVELGtCQUFZekIsa0JBQWtCN0IsTUFBbEIsSUFBNEJKLGNBQWNJLE1BSjFDO0FBS1p1RCxnQkFBVTFCLGtCQUFrQjVCLElBQWxCLElBQTBCTCxjQUFjSyxJQUx0QztBQU1adUQsY0FBUTNCLGtCQUFrQjNCLEVBQWxCLElBQXdCTixjQUFjTSxFQU5sQztBQU9adUQsZ0JBQVU1QixrQkFBa0IxQixJQUFsQixJQUEwQlAsY0FBY08sSUFQdEM7QUFRWnVELG9CQUFjN0Isa0JBQWtCekIsUUFBbEIsSUFBOEJSLGNBQWNRLFFBUjlDO0FBU1p1RCx3QkFBa0I5QixrQkFBa0J4QixZQUFsQixJQUFrQ1QsY0FBY1M7QUFUdEQsS0FBZDs7QUFZQSxRQUFNdUQsWUFBWTNCLGFBQWMsb0JBQUMsU0FBRCxJQUFXLGFBQWFULFdBQXhCLEdBQWhDO0FBQ0EsUUFBTXFDLGFBQWEzQixjQUFlLG9CQUFDLFVBQUQsSUFBWSxhQUFhVixXQUF6QixHQUFsQzs7QUFFQSxXQUNFO0FBQUMsV0FBRDtBQUFBO0FBQ0UsbUJBQVUsNkJBRFo7QUFFRSx5QkFBaUJsQixtQkFBbUIsRUFBRUMsUUFBUSxDQUFDcUQsU0FBRCxFQUFZQyxVQUFaLENBQVYsRUFBbkIsQ0FGbkI7QUFHRSxjQUFNLElBSFI7QUFJRSxnQkFBUSxLQUFLQztBQUpmO0FBTUU7QUFBQTtBQUFBLFVBQUssV0FBVSxvQ0FBZjtBQUVJRixxQkFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDJFQUFmO0FBQ0lBO0FBREosU0FITjtBQVFFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNkVBQWY7QUFDRTtBQUFDLGlCQUFELENBQU8sTUFBUDtBQUFBLGNBQWMsYUFBYSxJQUEzQjtBQUNFO0FBQUE7QUFBQTtBQUNHLG1CQUFLL0MsS0FBTCxDQUFXa0Q7QUFEZDtBQURGLFdBREY7QUFNRTtBQUFDLGlCQUFELENBQU8sSUFBUDtBQUFBO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsNENBQWY7QUFFSWYsNEJBQWMsS0FBS2dCLGlCQUFMLENBQ1poQixVQURZLEVBRVosVUFGWSxVQUdOQSxXQUFXWCxJQUhMLEVBSVpSLGlCQUpZLEVBS1pDLE9BTFksQ0FGbEI7QUFXSW1CLDBCQUFZL0IsR0FBWixDQUNFLFVBQUNDLEtBQUQsRUFBUThDLENBQVI7QUFBQSx1QkFBYyxPQUFLRCxpQkFBTCxDQUNaN0MsS0FEWSxFQUVaLElBRlksRUFHVDhDLENBSFMsU0FHSjlDLE1BQU1rQixJQUhGLEVBSVpSLGlCQUpZLEVBS1pDLE9BTFksQ0FBZDtBQUFBLGVBREY7QUFYSixhQURGO0FBdUJFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLDRDQUFmO0FBQ0Usa0NBQUMsVUFBRCxlQUNNM0MsaUJBRE4sRUFFTStELEtBRk47QUFHRSxzQkFBTTdCLGFBSFI7QUFJRSx5QkFBU2tCLE9BSlg7QUFLRSwwQkFBVWpCLFFBTFo7QUFNRSw2QkFBYU8sa0JBQWtCOUIsT0FOakM7QUFPRSw0QkFBWUEsVUFBVSxFQUFWLEdBQWU4QixrQkFBa0I3QixNQVAvQztBQVFFLHlCQUFTRCxPQVJYO0FBU0UsdUJBQU93QixLQVRUO0FBVUUsc0JBQU10QixJQVZSO0FBV0UsOEJBQWMsS0FBS2lFLGdCQVhyQjtBQVlFLGtDQUFrQixLQUFLQyxvQkFaekI7QUFhRSxpQ0FDRSx5QkFBQy9DLEtBQUQsRUFBUWdELEdBQVIsRUFBZ0I7QUFDZCxzQkFBTUMsWUFBWSxDQUFDRCxHQUFELEdBQU8sUUFBUCxHQUFrQixFQUFwQztBQUNBLHlCQUFPO0FBQ0xDO0FBREssbUJBQVA7QUFHRCxpQkFuQkw7QUFxQkUsNEJBQ0Usb0JBQUNqRCxLQUFELEVBQVFnRCxHQUFSLEVBQWdCO0FBQ2Qsc0JBQU1FLFVBQVUsU0FBVkEsT0FBVTtBQUFBLDJCQUFNLE9BQUtDLGVBQUwsQ0FBcUJILEdBQXJCLENBQU47QUFBQSxtQkFBaEI7QUFDQSxzQkFBTUMsWUFBWTdDLGVBQWU0QyxHQUFmLElBQXNCNUMsWUFBWWdELEtBQVosS0FBc0JKLElBQUlJLEtBQWhELEdBQXdELFVBQXhELEdBQXFFLEVBQXZGOztBQUVBLHlCQUFPO0FBQ0xGLG9DQURLO0FBRUxEO0FBRkssbUJBQVA7QUFJRDtBQTlCTDtBQURGO0FBdkJGLFdBTkY7QUFpRUU7QUFBQyxpQkFBRCxDQUFPLE1BQVA7QUFBQTtBQUNFO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLHlCQUFRLFNBRFY7QUFFRSx5QkFBUyxLQUFLSSxZQUZoQjtBQUdFLDBCQUFVLENBQUNqRCxXQUFELElBQWdCQSxZQUFZc0IsUUFBWixDQUFxQkM7QUFIakQ7QUFLR2xCLGdDQUFrQjZDO0FBTHJCLGFBREY7QUFRRTtBQUFDLG9CQUFEO0FBQUEsZ0JBQVEsU0FBUSxTQUFoQixFQUEwQixTQUFTLEtBQUtaLFdBQXhDO0FBQ0dqQyxnQ0FBa0I4QztBQURyQjtBQVJGO0FBakVGLFNBUkY7QUF1RklkLHNCQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNEVBQWY7QUFDSUE7QUFESjtBQXhGTjtBQU5GLEtBREY7QUF1R0QsRzs7O0VBM1F1Qi9FLFM7OztPQTBCeEI4RixjLEdBQWlCLFVBQUNDLFNBQUQsRUFBWXZDLEtBQVosRUFBc0I7QUFBQTs7QUFBQSxRQUM3QnhCLFlBRDZCLEdBQ1osT0FBS00sS0FETyxDQUM3Qk4sWUFENkI7O0FBRXJDLFdBQUthLFNBQUwsQ0FBZTtBQUNiMUIsWUFBTSxDQURPO0FBRWJhLGlDQUFtQkEsWUFBbkIsNkJBQWtDK0QsU0FBbEMsSUFBOEN2QyxLQUE5QztBQUZhLEtBQWY7QUFJRCxHOztPQUdEaUMsZSxHQUFrQjtBQUFBLFdBQU8sT0FBS08sUUFBTCxDQUFjLEVBQUV0RCxhQUFhNEMsR0FBZixFQUFkLENBQVA7QUFBQSxHOztPQUdsQkYsZ0IsR0FBbUIsZ0JBQVE7QUFDekIsV0FBS3ZDLFNBQUwsQ0FBZSxFQUFFMUIsVUFBRixFQUFmO0FBQ0QsRzs7T0FHRGtFLG9CLEdBQXVCLFVBQUM3QyxRQUFELEVBQVdyQixJQUFYO0FBQUEsV0FBb0IsT0FBSzBCLFNBQUwsQ0FBZSxFQUFFTCxrQkFBRixFQUFZckIsVUFBWixFQUFmLENBQXBCO0FBQUEsRzs7T0FHdkJ3RSxZLEdBQWUsWUFBTTtBQUFBLFFBQ1hqRCxXQURXLEdBQ0ssT0FBS0osS0FEVixDQUNYSSxXQURXOztBQUVuQixXQUFLWCxLQUFMLENBQVdrRSxRQUFYLENBQW9CdkQsZUFBZUEsWUFBWXNCLFFBQS9DO0FBQ0EsV0FBS2dCLFdBQUw7QUFDRCxHOztPQUdEQSxXLEdBQWM7QUFBQSxXQUFNLE9BQUtqRCxLQUFMLENBQVdtRSxPQUFYLEVBQU47QUFBQSxHOztPQUdkQyxVLEdBQWEsQzs7T0FFYnRELFMsR0FBWSxpQkFBUztBQUNuQixRQUFNdUQsNkJBQXFCLE9BQUs5RCxLQUExQixFQUFvQ0EsS0FBcEMsQ0FBTjtBQURtQixRQUVYbkIsSUFGVyxHQUVzQmlGLGFBRnRCLENBRVhqRixJQUZXO0FBQUEsUUFFTHFCLFFBRkssR0FFc0I0RCxhQUZ0QixDQUVMNUQsUUFGSztBQUFBLFFBRUtSLFlBRkwsR0FFc0JvRSxhQUZ0QixDQUVLcEUsWUFGTDs7O0FBSW5CLFdBQUtnRSxRQUFMLGNBQ09JLGFBRFAsSUFDc0JuRixTQUFTLElBRC9CLEtBRUUsWUFBTTtBQUNKLGFBQUtrRixVQUFMLEdBQWtCLE9BQUtBLFVBQUwsR0FBa0IsQ0FBcEM7QUFDQSxVQUFNQSxhQUFhLE9BQUtBLFVBQXhCO0FBQ0EsYUFBS3BFLEtBQUwsQ0FBV3NFLFdBQVgsQ0FBdUI7QUFDckJyRSxrQ0FEcUI7QUFFckJzRSxnQkFBUW5GLE9BQU9xQixRQUZNO0FBR3JCK0QsZUFBTy9EO0FBSGMsT0FBdkIsRUFJR2dFLElBSkgsQ0FJUSxpQkFBMkI7QUFBQSxZQUF4QkMsSUFBd0IsU0FBeEJBLElBQXdCO0FBQUEsWUFBbEJDLFVBQWtCLFNBQWxCQSxVQUFrQjs7QUFDakMsWUFBSVAsZUFBZSxPQUFLQSxVQUF4QixFQUFvQztBQUNsQyxpQkFBS0gsUUFBTCxDQUFjO0FBQ1p6RCwyQkFBZWtFLEtBQUtFLEtBQUwsQ0FBVyxDQUFYLEVBQWNuRSxRQUFkLENBREg7QUFFWkMsbUJBQU9tRSxLQUFLQyxJQUFMLENBQVVILGFBQWFsRSxRQUF2QixDQUZLO0FBR1p2QixxQkFBUztBQUhHLFdBQWQ7QUFLRDtBQUNGLE9BWkQ7QUFhRCxLQWxCSDtBQW9CRCxHOztPQUdEaUUsaUIsR0FBb0IsaUJBQTZCNEIsV0FBN0IsRUFBMENDLEdBQTFDLEVBQStDaEUsaUJBQS9DLEVBQWtFQyxPQUFsRSxFQUE4RTtBQUFBLFFBQXJFK0MsU0FBcUUsU0FBM0V4QyxJQUEyRTtBQUFBLFFBQTFEQyxLQUEwRCxTQUExREEsS0FBMEQ7O0FBQ2hHLFFBQUlSLFdBQVdBLFFBQVErQyxTQUFSLENBQWYsRUFBbUM7QUFDakMsVUFBTWlCLFNBQVNoRSxRQUFRK0MsU0FBUixDQUFmO0FBQ0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGtEQUFmLEVBQWtFLHVCQUFxQmdCLEdBQXZGO0FBQ0UsNEJBQUMsTUFBRCxJQUFRLE9BQU92RCxLQUFmLEVBQXNCLFVBQVU7QUFBQSxtQkFBUyxPQUFLc0MsY0FBTCxDQUFvQkMsU0FBcEIsRUFBK0J2QyxLQUEvQixDQUFUO0FBQUEsV0FBaEM7QUFERixPQURGO0FBS0Q7QUFDRCxRQUFNeUQsbUJBQW1CbEUsa0JBQWtCK0QsV0FBbEIsQ0FBekI7QUFDQSxRQUFNSSxzQkFBc0JuRSw2QkFBMkJnRCxTQUEzQixDQUE1QjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUssc0RBQUwsRUFBNkQsdUJBQXFCZ0IsR0FBbEY7QUFDRTtBQUFBO0FBQUEsVUFBTyxXQUFVLDBDQUFqQixFQUE0RCwyQkFBeUJoQixTQUFyRjtBQUNNa0Isd0JBRE4sU0FDMEJDO0FBRDFCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQm5CLFNBRnRCO0FBR0UsZUFBT3ZDLEtBSFQ7QUFJRSxpQkFBUztBQUFBLGlCQUFLLE9BQUtzQyxjQUFMLENBQW9CQyxTQUFwQixFQUErQm9CLEVBQUVDLE1BQUYsQ0FBUzVELEtBQXhDLENBQUw7QUFBQTtBQUpYO0FBSkYsS0FERjtBQWFELEc7Ozs7QUErS0gxQixZQUFZdUYsWUFBWixHQUEyQjtBQUN6QnBDLFNBQU8sRUFEa0I7QUFFekI5QyxVQUFRLEVBRmlCO0FBR3pCa0UsZUFBYTtBQUFBLFdBQU1pQixRQUFRQyxPQUFSLENBQWdCLEVBQUVkLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCUixXQUFTLG1CQUFNLENBQUUsQ0FKUTtBQUt6QkQsWUFBVSxvQkFBTSxDQUFFLENBTE87QUFNekIvQyxjQUFZO0FBTmEsQ0FBM0I7O0FBVUEsZUFBZXBCLFdBQWYiLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFsxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jb25zdCBnZXREaWFsb2dDbGFzc05hbWUgPSAoeyBwYW5lbHMgfSkgPT4ge1xuICBjb25zdCBwYW5lbENvdW50ID0gcGFuZWxzLmZpbHRlcih2YWwgPT4gISF2YWwpLmxlbmd0aCArIDE7XG4gIHJldHVybiBgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXdpdGgtJHtwYW5lbENvdW50fS1wYW5lbHNgO1xufTtcblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG4gIH1cblxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuICB9XG5cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogeyAuLi5zZWFyY2hGaWVsZHMsIFtmaWVsZE5hbWVdOiB2YWx1ZSB9XG4gICAgfSk7XG4gIH07XG5cblxuICBoYW5kbGVTZWxlY3RSb3cgPSByb3cgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUm93OiByb3cgfSk7XG5cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5mZXRjaERhdGEoeyBwYWdlIH0pO1xuICB9O1xuXG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHRoaXMuZmV0Y2hEYXRhKHsgcGFnZVNpemUsIHBhZ2UgfSk7XG5cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZFJvdyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpO1xuXG5cbiAgZmV0Y2hUb2tlbiA9IDA7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLnN0YXRlIH07XG4gICAgY29uc3QgeyBwYWdlLCBwYWdlU2l6ZSwgc2VhcmNoRmllbGRzIH0gPSByZXNvbHZlZFN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHsgLi4ucmVzb2x2ZWRTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgICAgICBjb25zdCBmZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuO1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICB9KS50aGVuKCh7IGRhdGEsIHRvdGFsQ291bnQsIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmV0Y2hUb2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzLCBmaWx0ZXJzKSA9PiB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVyc1tmaWVsZE5hbWVdKSB7XG4gICAgICBjb25zdCBGaWx0ZXIgPSBmaWx0ZXJzW2ZpZWxkTmFtZV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tYm9ib3gtd2l0aC1jdXN0b20tc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyJyBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgICAgPEZpbHRlciB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgdmFsdWUpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgY29tcG9uZW50czogeyBMZWZ0UGFuZWwsIFJpZ2h0UGFuZWwgfSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBsb2NhbGl6YXRpb25UZXh0c1tgY29sdW1uLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICAgIENlbGw6IHByb3BzID0+IHtcbiAgICAgICAgICBjb25zdCBBZGRpdGlvbmFsQ29tcG9uZW50ID0gcmVuZGVyZXJzICYmIHJlbmRlcmVyc1twcm9wcy5jb2x1bW4uaWRdIHx8IG51bGw7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2VsbC12YWx1ZSBjZWxsLXZhbHVlLSR7cHJvcHMub3JpZ2luYWwuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9YH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBZGRpdGlvbmFsQ29tcG9uZW50ID9cbiAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsQ29tcG9uZW50IHsuLi5wcm9wcy5vcmlnaW5hbH0vPiA6XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cHJvcHMudmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICBjb25zdCB0ZXh0cyA9IHtcbiAgICAgIHByZXZpb3VzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucHJldmlvdXMgfHwgREVGQVVMVF9URVhUUy5wcmV2aW91cyxcbiAgICAgIG5leHRUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5uZXh0IHx8IERFRkFVTFRfVEVYVFMubmV4dCxcbiAgICAgIGxvYWRpbmdUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8IERFRkFVTFRfVEVYVFMubG9hZGluZyxcbiAgICAgIG5vRGF0YVRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YSB8fCBERUZBVUxUX1RFWFRTLm5vRGF0YSxcbiAgICAgIHBhZ2VUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlIHx8IERFRkFVTFRfVEVYVFMucGFnZSxcbiAgICAgIG9mVGV4dDogbG9jYWxpemF0aW9uVGV4dHMub2YgfHwgREVGQVVMVF9URVhUUy5vZixcbiAgICAgIHJvd3NUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzIHx8IERFRkFVTFRfVEVYVFMucm93cyxcbiAgICAgIHBhZ2VKdW1wVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZUp1bXAgfHwgREVGQVVMVF9URVhUUy5wYWdlSnVtcCxcbiAgICAgIHJvd3NTZWxlY3RvclRleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3NTZWxlY3RvciB8fCBERUZBVUxUX1RFWFRTLnJvd3NTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgY29uc3QgbGVmdFBhbmVsID0gTGVmdFBhbmVsICYmICg8TGVmdFBhbmVsIHNlbGVjdGVkUm93PXtzZWxlY3RlZFJvd30vPik7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IFJpZ2h0UGFuZWwgJiYgKDxSaWdodFBhbmVsIHNlbGVjdGVkUm93PXtzZWxlY3RlZFJvd30vPik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiXG4gICAgICAgIGRpYWxvZ0NsYXNzTmFtZT17Z2V0RGlhbG9nQ2xhc3NOYW1lKHsgcGFuZWxzOiBbbGVmdFBhbmVsLCByaWdodFBhbmVsXSB9KX1cbiAgICAgICAgc2hvdz17dHJ1ZX1cbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbHNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBsZWZ0UGFuZWwgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLWxlZnRcIj5cbiAgICAgICAgICAgICAgICB7IGxlZnRQYW5lbCB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLWNlbnRlclwiPlxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgICAgIDxoND5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgICAgICBgMDAtJHtmaXJzdEZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgICAgICB7Li4udGV4dHN9XG4gICAgICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhfVxuICAgICAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBnZXRUckdyb3VwUHJvcHM9e1xuICAgICAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICFyb3cgPyBcImhpZGRlblwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB0aGlzLmhhbmRsZVNlbGVjdFJvdyhyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkUm93ICYmIHJvdyAmJiBzZWxlY3RlZFJvdy5pbmRleCA9PT0gcm93LmluZGV4ID8gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvdyB8fCBzZWxlY3RlZFJvdy5vcmlnaW5hbC5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5zZWxlY3R9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLmNsb3NlfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJpZ2h0UGFuZWwgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgeyByaWdodFBhbmVsIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGNvbXBvbmVudHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgY29tcG9uZW50czoge30sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19