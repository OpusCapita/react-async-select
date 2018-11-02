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

    var fieldObjects = Object.entries(searchFields).map(function (_ref2) {
      var name = _ref2[0],
          value = _ref2[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref3) {
      var name = _ref3.name;

      return {
        Header: name,
        accessor: name
      };
    });
    var firstField = fieldObjects[0],
        otherFields = fieldObjects.slice(1);


    return React.createElement(
      Modal,
      { className: 'combobox-with-search__modal', show: this.props.showModal, onHide: this.handleClose },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        this.props.title
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, this.props.i18n.getMessage('search.by'), '00-' + firstField.name),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, _this2.props.i18n.getMessage('by'), i + '-' + field.name);
          })
        ),
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          React.createElement(ReactTable, _extends({}, REACT_TABLE_PROPS, {
            data: searchResults,
            columns: columns,
            pageSize: pageSize,
            loadingText: this.props.i18n.getMessage('table.loading'),
            noDataText: loading ? '' : this.props.i18n.getMessage('table.no.items'),
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
          'Select'
        ),
        React.createElement(
          Button,
          { bsStyle: 'default', onClick: this.handleClose },
          'Close'
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
      page: 0,
      searchFields: newSearchFields
    });
    _this3.handleFetchData({
      searchFields: newSearchFields
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

    _this3.props.onSelect({ value: selectedRow && selectedRow.original.value });
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

  this.renderSearchField = function (_ref5, labelPrefix, key) {
    var fieldName = _ref5.name,
        value = _ref5.value;

    return React.createElement(
      'div',
      { className: 'combobox-with-search__modal-search-filter', key: 'search-field-' + key },
      React.createElement(
        'label',
        { className: 'combobox-with-search__modal-search-label', htmlFor: 'search-field-' + fieldName },
        labelPrefix + ' ' + fieldName
      ),
      React.createElement('input', {
        type: 'text',
        id: 'search-field-' + fieldName,
        value: value,
        onChange: function onChange(e) {
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
  onSelect: function onSelect() {},
  i18n: function i18n(id) {
    return id;
  }
};

export default SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkxOG4iLCJnZXRNZXNzYWdlIiwiaSIsImhhbmRsZUZldGNoRGF0YSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsIm9uQ2xpY2siLCJzZWxlY3RSb3ciLCJjbGFzc05hbWUiLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwibmV3U2VhcmNoRmllbGRzIiwic2V0U3RhdGUiLCJvblNlbGVjdCIsIm9yaWdpbmFsIiwib25DbG9zZSIsImZldGNoRGF0YSIsInJlc29sdmVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwiZGF0YSIsInRvdGFsQ291bnQiLCJ0b2tlbiIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsYUFBdkI7O0FBRUEsT0FBTyxvQkFBUDs7QUFFQSxJQUFNQyxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIs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LCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcblxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURV9WQUxVRVMgPSB7XG4gIHNlYXJjaFJlc3VsdHM6IFtdLFxuICBwYWdlOiAwLFxuICBwYWdlU2l6ZTogUkVBQ1RfVEFCTEVfUFJPUFMuZGVmYXVsdFBhZ2VTaXplLFxuICBwYWdlczogMSxcbiAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgbG9hZGluZzogdHJ1ZSxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgfTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFU1xuICAgIH07XG4gIH1cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5oYW5kbGVGZXRjaERhdGEoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgc2VsZWN0Um93ID0gcm93ID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93OiByb3csXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVNpemVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHsgdmFsdWU6IHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsLnZhbHVlIH0pO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTLFxuICAgICAgc2VhcmNoRmllbGRzOiB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlRmV0Y2hEYXRhID0gKCkgPT4gdGhpcy5mZXRjaERhdGEoKTtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAuLi5zdGF0ZVxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgc2VhcmNoRmllbGRzXG4gICAgfSA9IHJlc29sdmVkU3RhdGU7XG4gICAgdGhpcy5mZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuICsgMTtcbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5mZXRjaFRva2VuKS50aGVuKHRva2VuID0+IHtcbiAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgIG9mZnNldDogcGFnZSAqIHBhZ2VTaXplLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICB9KS50aGVuKCh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRvdGFsQ291bnQsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBwYWdlU2l6ZSksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXkpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHtsYWJlbFByZWZpeH0gJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IG5hbWUsXG4gICAgICAgIGFjY2Vzc29yOiBuYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBbZmlyc3RGaWVsZCwgLi4ub3RoZXJGaWVsZHNdID0gZmllbGRPYmplY3RzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWxcIiBzaG93PXt0aGlzLnByb3BzLnNob3dNb2RhbH0gb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmkxOG4uZ2V0TWVzc2FnZSgnc2VhcmNoLmJ5JyksXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWBcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgKGZpZWxkLCBpKSA9PiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmkxOG4uZ2V0TWVzc2FnZSgnYnknKSxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17dGhpcy5wcm9wcy5pMThuLmdldE1lc3NhZ2UoJ3RhYmxlLmxvYWRpbmcnKX1cbiAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogdGhpcy5wcm9wcy5pMThuLmdldE1lc3NhZ2UoJ3RhYmxlLm5vLml0ZW1zJyl9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25GZXRjaERhdGE9e3RoaXMuaGFuZGxlRmV0Y2hEYXRhfVxuICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+ICh7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNlbGVjdFJvdyhyb3cpLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFNlbGVjdFxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5DbG9zZTwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBpMThuOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGdldE1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIHNob3dNb2RhbDogZmFsc2UsXG4gIG9uQ2xvc2U6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGkxOG46IGlkID0+IGlkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=