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
    var localizationTexts = this.props.localizationTexts;

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
          React.createElement(ReactTable, _extends({}, REACT_TABLE_PROPS, {
            data: searchResults,
            columns: columns,
            pageSize: pageSize,
            loadingText: localizationTexts.loading,
            noDataText: loading ? '' : localizationTexts.noItems,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwic2hvd01vZGFsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsIm5vSXRlbXMiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZWxlY3QiLCJjbG9zZSIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwibmV3U2VhcmNoRmllbGRzIiwic2V0U3RhdGUiLCJmZXRjaERhdGEiLCJvblNlbGVjdCIsIm9yaWdpbmFsIiwib25DbG9zZSIsInJlc29sdmVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwiZGF0YSIsInRvdGFsQ291bnQiLCJ0b2tlbiIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsYUFBdkI7O0FBRUEsT0FBTyxvQkFBUDs7QUFFQSxJQUFNQyxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFB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QUxRO0FBTXpCRixZQUFVLG9CQUFNLENBQUU7QUFOTyxDQUEzQjs7QUFTQSxlQUFlNUMsV0FBZiIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5cbmltcG9ydCAnLi9TZWFyY2hNb2RhbC5zY3NzJztcblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzMsIDEwLCAyMCwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG5cbiAgbWFudWFsOiB0cnVlLFxuICBzb3J0YWJsZTogZmFsc2UsXG59O1xuXG5jb25zdCBERUZBVUxUX1NUQVRFX1ZBTFVFUyA9IHtcbiAgc2VhcmNoUmVzdWx0czogW10sXG4gIHBhZ2U6IDAsXG4gIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gIHBhZ2VzOiAxLFxuICBzZWxlY3RlZFJvdzogdW5kZWZpbmVkLFxuICBsb2FkaW5nOiB0cnVlLFxufTtcblxuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3Qgc2VhcmNoRmllbGRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgLi4ucHJvcHMuZmllbGRzLm1hcChmaWVsZCA9PiAoe1xuICAgICAgICBbZmllbGRdOiAnJyxcbiAgICAgIH0pKSxcbiAgICApO1xuICAgIHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICB9O1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IDA7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTXG4gICAgfTtcbiAgfVxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgICBbZmllbGROYW1lXTogdmFsdWUsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzXG4gICAgfSk7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgICBwYWdlOiAwLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh7IHZhbHVlOiBzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbC52YWx1ZSB9KTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5LCBsb2NhbGl6YXRpb25UZXh0cykgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRQcmVmaXggPSBsb2NhbGl6YXRpb25UZXh0c1tsYWJlbFByZWZpeF07XG4gICAgY29uc3QgdHJhbnNsYXRlZEZpZWxkTmFtZSA9IGxvY2FsaXphdGlvblRleHRzW2BmaWVsZC4ke2ZpZWxkTmFtZX1gXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHt0cmFuc2xhdGVkUHJlZml4fSAke3RyYW5zbGF0ZWRGaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uSW5wdXQ9e2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWFyY2hWYWx1ZShmaWVsZE5hbWUsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBuYW1lLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dGhpcy5wcm9wcy5zaG93TW9kYWx9IG9uSGlkZT17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b249e3RydWV9PlxuICAgICAgICAgIDxoND5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50aXRsZSB9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgKGZpZWxkLCBpKSA9PiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAnYnknLFxuICAgICAgICAgICAgICAgICAgYCR7aX0tJHtmaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0c1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2xvY2FsaXphdGlvblRleHRzLmxvYWRpbmd9XG4gICAgICAgICAgICAgIG5vRGF0YVRleHQ9e2xvYWRpbmcgPyAnJyA6IGxvY2FsaXphdGlvblRleHRzLm5vSXRlbXN9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25GZXRjaERhdGE9e3RoaXMuaGFuZGxlRmV0Y2hEYXRhfVxuICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+ICh7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNlbGVjdFJvdyhyb3cpLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgbG9jYWxpemF0aW9uVGV4dHMuc2VsZWN0IH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLmNsb3NlIH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBzaG93TW9kYWw6IGZhbHNlLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=