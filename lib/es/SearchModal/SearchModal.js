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
    var _props = this.props,
        i18n = _props.i18n,
        mapTranslationKey = _props.mapTranslationKey;

    var getTranslation = function getTranslation(key) {
      return i18n.getMessage(mapTranslationKey(key));
    };
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
          i18n.getMessage(this.props.title)
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, 'Search.By', '00-' + firstField.name, getTranslation),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'By', i + '-' + field.name, getTranslation);
          })
        ),
        React.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          React.createElement(ReactTable, _extends({}, REACT_TABLE_PROPS, {
            data: searchResults,
            columns: columns,
            pageSize: pageSize,
            loadingText: getTranslation('Table.Loading'),
            noDataText: loading ? '' : getTranslation('Table.No.Items'),
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
          getTranslation('Select')
        ),
        React.createElement(
          Button,
          { bsStyle: 'default', onClick: this.handleClose },
          getTranslation('Close')
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

  this.renderSearchField = function (_ref5, labelPrefix, key, getTranslation) {
    var fieldName = _ref5.name,
        value = _ref5.value;

    var translatedPrefix = getTranslation(labelPrefix);
    var translatedFieldName = getTranslation('Search.Field.' + fieldName + '.Label');
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
  },
  mapTranslationKey: function mapTranslationKey(key) {
    return key;
  }
};

export default SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIk1vZGFsIiwiQnV0dG9uIiwiUmVhY3RUYWJsZSIsIlJFQUNUX1RBQkxFX1BST1BTIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsIm1hbnVhbCIsInNvcnRhYmxlIiwiREVGQVVMVF9TVEFURV9WQUxVRVMiLCJzZWFyY2hSZXN1bHRzIiwicGFnZSIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRpbmciLCJTZWFyY2hNb2RhbCIsInByb3BzIiwic2VhcmNoRmllbGRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibWFwIiwiZmllbGQiLCJkZWZhdWx0U2VhcmNoRmllbGRzIiwiZmV0Y2hUb2tlbiIsInN0YXRlIiwicmVuZGVyIiwiaTE4biIsIm1hcFRyYW5zbGF0aW9uS2V5IiwiZ2V0VHJhbnNsYXRpb24iLCJnZXRNZXNzYWdlIiwia2V5IiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsIm5ld1NlYXJjaEZpZWxkcyIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvcmlnaW5hbCIsIm9uQ2xvc2UiLCJmZXRjaERhdGEiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsYUFBdkI7O0FBRUEsT0FBTyxvQkFBUDs7QUFFQSxJQUFNQyxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7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QnRDLFNBQU8sRUFEa0I7QUFFekJ2QixVQUFRLEVBRmlCO0FBR3pCK0MsZUFBYTtBQUFBLFdBQU1ILFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUssTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekI5QixhQUFXLEtBSmM7QUFLekJvQixXQUFTLG1CQUFNLENBQUUsQ0FMUTtBQU16QkYsWUFBVSxvQkFBTSxDQUFFLENBTk87QUFPekJoQyxRQUFNO0FBQUEsV0FBTXVELEVBQU47QUFBQSxHQVBtQjtBQVF6QnRELHFCQUFtQjtBQUFBLFdBQU9HLEdBQVA7QUFBQTtBQVJNLENBQTNCOztBQVdBLGVBQWVoQixXQUFmIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG5cbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcblxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEVfVkFMVUVTID0ge1xuICBzZWFyY2hSZXN1bHRzOiBbXSxcbiAgcGFnZTogMCxcbiAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgcGFnZXM6IDEsXG4gIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gIGxvYWRpbmc6IHRydWUsXG59O1xuXG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgIH07XG4gICAgdGhpcy5mZXRjaFRva2VuID0gMDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVNcbiAgICB9O1xuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoRmllbGRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlRmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh7IHZhbHVlOiBzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbC52YWx1ZSB9KTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5LCBnZXRUcmFuc2xhdGlvbikgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRQcmVmaXggPSBnZXRUcmFuc2xhdGlvbihsYWJlbFByZWZpeCk7XG4gICAgY29uc3QgdHJhbnNsYXRlZEZpZWxkTmFtZSA9IGdldFRyYW5zbGF0aW9uKGBTZWFyY2guRmllbGQuJHtmaWVsZE5hbWV9LkxhYmVsYCk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBpMThuLFxuICAgICAgbWFwVHJhbnNsYXRpb25LZXlcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBnZXRUcmFuc2xhdGlvbiA9IGtleSA9PiBpMThuLmdldE1lc3NhZ2UoXG4gICAgICBtYXBUcmFuc2xhdGlvbktleShrZXkpXG4gICAgKTtcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBuYW1lLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dGhpcy5wcm9wcy5zaG93TW9kYWx9IG9uSGlkZT17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b249e3RydWV9PlxuICAgICAgICAgIDxoND5cbiAgICAgICAgICAgIHsgaTE4bi5nZXRNZXNzYWdlKHRoaXMucHJvcHMudGl0bGUpIH1cbiAgICAgICAgICA8L2g0PlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgJ1NlYXJjaC5CeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgZ2V0VHJhbnNsYXRpb25cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgKGZpZWxkLCBpKSA9PiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAnQnknLFxuICAgICAgICAgICAgICAgICAgYCR7aX0tJHtmaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgICBnZXRUcmFuc2xhdGlvblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2dldFRyYW5zbGF0aW9uKCdUYWJsZS5Mb2FkaW5nJyl9XG4gICAgICAgICAgICAgIG5vRGF0YVRleHQ9e2xvYWRpbmcgPyAnJyA6IGdldFRyYW5zbGF0aW9uKCdUYWJsZS5Oby5JdGVtcycpfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGdldFRyYW5zbGF0aW9uKCdTZWxlY3QnKSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBnZXRUcmFuc2xhdGlvbignQ2xvc2UnKSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGkxOG46IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgZ2V0TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxuICBtYXBUcmFuc2xhdGlvbktleTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBzaG93TW9kYWw6IGZhbHNlLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpMThuOiBpZCA9PiBpZCxcbiAgbWFwVHJhbnNsYXRpb25LZXk6IGtleSA9PiBrZXksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hNb2RhbDtcbiJdfQ==