'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

require('./SearchModal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          return _react2.default.createElement(
            'div',
            { className: 'cell-value cell-value-' + (props.original.disabled ? 'disabled' : '') },
            AdditionalComponent ? _react2.default.createElement(AdditionalComponent, props.original) : _react2.default.createElement(
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

    return _react2.default.createElement(
      _reactBootstrap.Modal,
      { className: 'combobox-with-search__modal', show: this.props.showModal, onHide: this.handleClose },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        { closeButton: true },
        _react2.default.createElement(
          'h4',
          null,
          this.props.title
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, 'searchBy', '00-' + firstField.name, localizationTexts, filters),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'by', i + '-' + field.name, localizationTexts, filters);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          _react2.default.createElement(_reactTable2.default, _extends({}, REACT_TABLE_PROPS, texts, {
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
      _react2.default.createElement(
        _reactBootstrap.Modal.Footer,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            bsStyle: 'primary',
            onClick: this.handleSelect,
            disabled: !selectedRow || selectedRow.original.disabled
          },
          localizationTexts.select
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'default', onClick: this.handleClose },
          localizationTexts.close
        )
      )
    );
  };

  return SearchModal;
}(_react.Component), _initialiseProps = function _initialiseProps() {
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

  this.renderSearchField = function (_ref5, labelPrefix, key, localizationTexts, filters) {
    var fieldName = _ref5.name,
        value = _ref5.value;

    if (filters && filters[fieldName]) {
      var Filter = filters[fieldName];
      return _react2.default.createElement(
        'div',
        { className: 'combobox-with-custom-search__modal-search-filter', key: 'search-field-' + key },
        _react2.default.createElement(Filter, { value: value, onChange: function onChange(value) {
            return _this3.setSearchValue(fieldName, value);
          } })
      );
    }
    var translatedPrefix = localizationTexts[labelPrefix];
    var translatedFieldName = localizationTexts['field.' + fieldName];
    return _react2.default.createElement(
      'div',
      { className: 'combobox-with-search__modal-search-filter', key: 'search-field-' + key },
      _react2.default.createElement(
        'label',
        { className: 'combobox-with-search__modal-search-label', htmlFor: 'search-field-' + fieldName },
        translatedPrefix + ' ' + translatedFieldName
      ),
      _react2.default.createElement('input', {
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
  showModal: false,
  onClose: function onClose() {},
  onSelect: function onSelect() {}
};

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsIm5vRGF0YSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmlsdGVycyIsInJlbmRlcmVycyIsImZpZWxkT2JqZWN0cyIsImVudHJpZXMiLCJuYW1lIiwidmFsdWUiLCJjb2x1bW5zIiwiSGVhZGVyIiwiYWNjZXNzb3IiLCJDZWxsIiwiQWRkaXRpb25hbENvbXBvbmVudCIsImNvbHVtbiIsImlkIiwib3JpZ2luYWwiLCJkaXNhYmxlZCIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInRleHRzIiwicHJldmlvdXNUZXh0IiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwicGFnZUp1bXBUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZWxlY3QiLCJjbG9zZSIsIkNvbXBvbmVudCIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwibmV3U2VhcmNoRmllbGRzIiwic2V0U3RhdGUiLCJmZXRjaERhdGEiLCJvblNlbGVjdCIsIm9uQ2xvc2UiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJGaWx0ZXIiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFB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SSxzQkFBc0JyRSw2QkFBMkI4QyxTQUEzQixDQUE1QjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUssc0RBQUwsRUFBNkQsdUJBQXFCb0IsR0FBbEY7QUFDRTtBQUFBO0FBQUEsVUFBTyxXQUFVLDBDQUFqQixFQUE0RCwyQkFBeUJwQixTQUFyRjtBQUNNc0Isd0JBRE4sU0FDMEJDO0FBRDFCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQnZCLFNBRnRCO0FBR0UsZUFBT3hDLEtBSFQ7QUFJRSxpQkFBUztBQUFBLGlCQUFLLE9BQUt1QyxjQUFMLENBQW9CQyxTQUFwQixFQUErQndCLEVBQUVDLE1BQUYsQ0FBU2pFLEtBQXhDLENBQUw7QUFBQTtBQUpYO0FBSkYsS0FERjtBQWFELEc7Ozs7QUFxSUhsQixZQUFZb0YsWUFBWixHQUEyQjtBQUN6QjFDLFNBQU8sRUFEa0I7QUFFekJyQyxVQUFRLEVBRmlCO0FBR3pCK0QsZUFBYTtBQUFBLFdBQU1ILFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUssTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJoQyxhQUFXLEtBSmM7QUFLekJ1QixXQUFTLG1CQUFNLENBQ2QsQ0FOd0I7QUFPekJELFlBQVUsb0JBQU0sQ0FDZjtBQVJ3QixDQUEzQjs7a0JBV2U5RCxXIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG5cbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcblxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEVfVkFMVUVTID0ge1xuICBzZWFyY2hSZXN1bHRzOiBbXSxcbiAgcGFnZTogMCxcbiAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgcGFnZXM6IDEsXG4gIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gIGxvYWRpbmc6IHRydWUsXG59O1xuXG5jb25zdCBERUZBVUxUX1RFWFRTID0ge1xuICBwcmV2aW91czogJ1ByZXZpb3VzJyxcbiAgbmV4dDogJ05leHQnLFxuICBsb2FkaW5nOiAnTG9hZGluZy4uLicsXG4gIG5vRGF0YTogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlOiAnUGFnZScsXG4gIG9mOiAnb2YnLFxuICByb3dzOiAncm93cycsXG4gIHBhZ2VKdW1wOiAnanVtcCB0byBwYWdlJyxcbiAgcm93c1NlbGVjdG9yOiAncm93cyBwZXIgcGFnZScsXG59O1xuXG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgIH07XG4gICAgdGhpcy5mZXRjaFRva2VuID0gMDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVNcbiAgICB9O1xuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoRmllbGRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHNcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBzZWFyY2hGaWVsZHM6IG5ld1NlYXJjaEZpZWxkcyxcbiAgICAgIHBhZ2U6IDAsXG4gICAgfSk7XG4gIH07XG5cbiAgc2VsZWN0Um93ID0gcm93ID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93OiByb3csXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVNpemVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5LCBsb2NhbGl6YXRpb25UZXh0cywgZmlsdGVycykgPT4ge1xuICAgIGlmIChmaWx0ZXJzICYmIGZpbHRlcnNbZmllbGROYW1lXSkge1xuICAgICAgY29uc3QgRmlsdGVyID0gZmlsdGVyc1tmaWVsZE5hbWVdO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbWJvYm94LXdpdGgtY3VzdG9tLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcicga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICAgIDxGaWx0ZXIgdmFsdWU9e3ZhbHVlfSBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5zZXRTZWFyY2hWYWx1ZShmaWVsZE5hbWUsIHZhbHVlKX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHRyYW5zbGF0ZWRQcmVmaXggPSBsb2NhbGl6YXRpb25UZXh0c1tsYWJlbFByZWZpeF07XG4gICAgY29uc3QgdHJhbnNsYXRlZEZpZWxkTmFtZSA9IGxvY2FsaXphdGlvblRleHRzW2BmaWVsZC4ke2ZpZWxkTmFtZX1gXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHt0cmFuc2xhdGVkUHJlZml4fSAke3RyYW5zbGF0ZWRGaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uSW5wdXQ9e2UgPT4gdGhpcy5zZXRTZWFyY2hWYWx1ZShmaWVsZE5hbWUsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBsb2NhbGl6YXRpb25UZXh0c1tgY29sdW1uLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICAgIENlbGw6IHByb3BzID0+IHtcbiAgICAgICAgICBjb25zdCBBZGRpdGlvbmFsQ29tcG9uZW50ID0gcmVuZGVyZXJzICYmIHJlbmRlcmVyc1twcm9wcy5jb2x1bW4uaWRdIHx8IG51bGw7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2VsbC12YWx1ZSBjZWxsLXZhbHVlLSR7cHJvcHMub3JpZ2luYWwuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9YH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBZGRpdGlvbmFsQ29tcG9uZW50ID9cbiAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsQ29tcG9uZW50IHsuLi5wcm9wcy5vcmlnaW5hbH0vPiA6XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cHJvcHMudmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICBjb25zdCB0ZXh0cyA9IHtcbiAgICAgIHByZXZpb3VzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucHJldmlvdXMgfHwgREVGQVVMVF9URVhUUy5wcmV2aW91cyxcbiAgICAgIG5leHRUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5uZXh0IHx8IERFRkFVTFRfVEVYVFMubmV4dCxcbiAgICAgIGxvYWRpbmdUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8IERFRkFVTFRfVEVYVFMubG9hZGluZyxcbiAgICAgIG5vRGF0YVRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YSB8fCBERUZBVUxUX1RFWFRTLm5vRGF0YSxcbiAgICAgIHBhZ2VUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlIHx8IERFRkFVTFRfVEVYVFMucGFnZSxcbiAgICAgIG9mVGV4dDogbG9jYWxpemF0aW9uVGV4dHMub2YgfHwgREVGQVVMVF9URVhUUy5vZixcbiAgICAgIHJvd3NUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzIHx8IERFRkFVTFRfVEVYVFMucm93cyxcbiAgICAgIHBhZ2VKdW1wVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZUp1bXAgfHwgREVGQVVMVF9URVhUUy5wYWdlSnVtcCxcbiAgICAgIHJvd3NTZWxlY3RvclRleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3NTZWxlY3RvciB8fCBERUZBVUxUX1RFWFRTLnJvd3NTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWxcIiBzaG93PXt0aGlzLnByb3BzLnNob3dNb2RhbH0gb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgPGg0PlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpcnN0RmllbGQgJiYgdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgYDAwLSR7Zmlyc3RGaWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG90aGVyRmllbGRzLm1hcChcbiAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICdieScsXG4gICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17bG9jYWxpemF0aW9uVGV4dHMubG9hZGluZ31cbiAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvdyB8fCBzZWxlY3RlZFJvdy5vcmlnaW5hbC5kaXNhYmxlZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuc2VsZWN0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5jbG9zZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIHNob3dNb2RhbDogZmFsc2UsXG4gIG9uQ2xvc2U6ICgpID0+IHtcbiAgfSxcbiAgb25TZWxlY3Q6ICgpID0+IHtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19