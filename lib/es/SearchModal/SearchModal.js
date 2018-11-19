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
        Header: localizationTexts['column.' + name],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWVsZE9iamVjdHMiLCJlbnRyaWVzIiwibmFtZSIsInZhbHVlIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwic2hvd01vZGFsIiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsIm5vSXRlbXMiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZWxlY3QiLCJjbG9zZSIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwibmV3U2VhcmNoRmllbGRzIiwic2V0U3RhdGUiLCJmZXRjaERhdGEiLCJvblNlbGVjdCIsIm9yaWdpbmFsIiwib25DbG9zZSIsInJlc29sdmVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwiZGF0YSIsInRvdGFsQ291bnQiLCJ0b2tlbiIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsYUFBdkI7O0FBRUEsT0FBTyxvQkFBUDs7QUFFQSxJQUFNQyxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFB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b0JBQU0sQ0FBRTtBQU5PLENBQTNCOztBQVNBLGVBQWU1QyxXQUFmIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG5cbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcblxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEVfVkFMVUVTID0ge1xuICBzZWFyY2hSZXN1bHRzOiBbXSxcbiAgcGFnZTogMCxcbiAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgcGFnZXM6IDEsXG4gIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gIGxvYWRpbmc6IHRydWUsXG59O1xuXG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgIH07XG4gICAgdGhpcy5mZXRjaFRva2VuID0gMDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVNcbiAgICB9O1xuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoRmllbGRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHNcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBzZWFyY2hGaWVsZHM6IG5ld1NlYXJjaEZpZWxkcyxcbiAgICAgIHBhZ2U6IDAsXG4gICAgfSk7XG4gIH07XG5cbiAgc2VsZWN0Um93ID0gcm93ID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93OiByb3csXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVNpemVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5LCBsb2NhbGl6YXRpb25UZXh0cykgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRQcmVmaXggPSBsb2NhbGl6YXRpb25UZXh0c1tsYWJlbFByZWZpeF07XG4gICAgY29uc3QgdHJhbnNsYXRlZEZpZWxkTmFtZSA9IGxvY2FsaXphdGlvblRleHRzW2BmaWVsZC4ke2ZpZWxkTmFtZX1gXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHt0cmFuc2xhdGVkUHJlZml4fSAke3RyYW5zbGF0ZWRGaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uSW5wdXQ9e2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWFyY2hWYWx1ZShmaWVsZE5hbWUsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBsb2NhbGl6YXRpb25UZXh0c1tgY29sdW1uLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudGl0bGUgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLnNlbGVjdCB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5jbG9zZSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19