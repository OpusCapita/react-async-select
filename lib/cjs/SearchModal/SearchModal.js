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


    return _react2.default.createElement(
      _reactBootstrap.Modal,
      { className: 'combobox-with-search__modal', show: this.props.showModal, onHide: this.handleClose },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        { closeButton: true },
        this.props.title
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, this.props.i18n.getMessage('search.by'), '00-' + firstField.name),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, _this2.props.i18n.getMessage('by'), i + '-' + field.name);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          _react2.default.createElement(_reactTable2.default, _extends({}, REACT_TABLE_PROPS, {
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
      _react2.default.createElement(
        _reactBootstrap.Modal.Footer,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            bsStyle: 'primary',
            onClick: this.handleSelect,
            disabled: !selectedRow
          },
          'Select'
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'default', onClick: this.handleClose },
          'Close'
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

    return _react2.default.createElement(
      'div',
      { className: 'combobox-with-search__modal-search-filter', key: 'search-field-' + key },
      _react2.default.createElement(
        'label',
        { className: 'combobox-with-search__modal-search-label', htmlFor: 'search-field-' + fieldName },
        labelPrefix + ' ' + fieldName
      ),
      _react2.default.createElement('input', {
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

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImZpZWxkT2JqZWN0cyIsImVudHJpZXMiLCJuYW1lIiwidmFsdWUiLCJjb2x1bW5zIiwiSGVhZGVyIiwiYWNjZXNzb3IiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJzaG93TW9kYWwiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImkiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsIm5ld1NlYXJjaEZpZWxkcyIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvcmlnaW5hbCIsIm9uQ2xvc2UiLCJmZXRjaERhdGEiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIsQ0FBaUI7QUFBQTs7QUFBQSw2QkFDakJDLEtBRGlCLElBQ1QsRUFEUztBQUFBLEtBQWpCLENBRmdCLEVBQXJCO0FBTUEsVUFBS0MsbUJBQUwsZ0JBQ0tOLFlBREw7QUFHQSxVQUFLTyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsVUFBS0MsS0FBTDtBQUNFUjtBQURGLE9BRUtWLG9CQUZMO0FBYmlC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RDtBQWlCRCxLQWxCRDtBQW1CRCxHOztPQUVEeUIsaUIsR0FBb0IsaUJBQTZCbUMsV0FBN0IsRUFBMENDLEdBQTFDLEVBQWtEO0FBQUEsUUFBekNyQixTQUF5QyxTQUEvQ3pCLElBQStDO0FBQUEsUUFBOUJDLEtBQThCLFNBQTlCQSxLQUE4Qjs7QUFDcEUsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUI2QyxHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QnJCLFNBQXJGO0FBQ01vQixtQkFETixTQUNxQnBCO0FBRHJCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQkEsU0FGdEI7QUFHRSxlQUFPeEIsS0FIVDtBQUlFLGtCQUFVLHFCQUFLO0FBQ2IsaUJBQUt1QixjQUFMLENBQW9CQyxTQUFwQixFQUErQnNCLEVBQUVDLE1BQUYsQ0FBUy9DLEtBQXhDO0FBQ0Q7QUFOSDtBQUpGLEtBREY7QUFlRCxHOzs7O0FBK0ZIZixZQUFZK0QsWUFBWixHQUEyQjtBQUN6QnhDLFNBQU8sRUFEa0I7QUFFekJsQixVQUFRLEVBRmlCO0FBR3pCNkMsZUFBYTtBQUFBLFdBQU1ILFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUssTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJqQyxhQUFXLEtBSmM7QUFLekJ1QixXQUFTLG1CQUFNLENBQUUsQ0FMUTtBQU16QkYsWUFBVSxvQkFBTSxDQUFFLENBTk87QUFPekJqQixRQUFNO0FBQUEsV0FBTXVDLEVBQU47QUFBQTtBQVBtQixDQUEzQjs7a0JBVWVoRSxXIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG5cbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcblxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEVfVkFMVUVTID0ge1xuICBzZWFyY2hSZXN1bHRzOiBbXSxcbiAgcGFnZTogMCxcbiAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgcGFnZXM6IDEsXG4gIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gIGxvYWRpbmc6IHRydWUsXG59O1xuXG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgIH07XG4gICAgdGhpcy5mZXRjaFRva2VuID0gMDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVNcbiAgICB9O1xuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoRmllbGRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlRmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh7IHZhbHVlOiBzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbC52YWx1ZSB9KTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7bGFiZWxQcmVmaXh9ICR7ZmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBuYW1lLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCIgc2hvdz17dGhpcy5wcm9wcy5zaG93TW9kYWx9IG9uSGlkZT17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b249e3RydWV9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRpdGxlfVxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pMThuLmdldE1lc3NhZ2UoJ3NlYXJjaC5ieScpLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pMThuLmdldE1lc3NhZ2UoJ2J5JyksXG4gICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e3RoaXMucHJvcHMuaTE4bi5nZXRNZXNzYWdlKCd0YWJsZS5sb2FkaW5nJyl9XG4gICAgICAgICAgICAgIG5vRGF0YVRleHQ9e2xvYWRpbmcgPyAnJyA6IHRoaXMucHJvcHMuaTE4bi5nZXRNZXNzYWdlKCd0YWJsZS5uby5pdGVtcycpfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICBTZWxlY3RcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+Q2xvc2U8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaTE4bjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBnZXRNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG59O1xuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBzaG93TW9kYWw6IGZhbHNlLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpMThuOiBpZCA9PiBpZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19