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
          firstField && this.renderSearchField(firstField, 'searchBy', '00-' + firstField.name, localizationTexts),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'by', i + '-' + field.name, localizationTexts);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          _react2.default.createElement(_reactTable2.default, _extends({}, REACT_TABLE_PROPS, {
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

  this.renderSearchField = function (_ref5, labelPrefix, key, localizationTexts) {
    var fieldName = _ref5.name,
        value = _ref5.value;

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
  onSelect: function onSelect() {}
};

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJub0l0ZW1zIiwiaGFuZGxlRmV0Y2hEYXRhIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93Iiwib25DbGljayIsInNlbGVjdFJvdyIsImNsYXNzTmFtZSIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsIm5ld1NlYXJjaEZpZWxkcyIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvcmlnaW5hbCIsIm9uQ2xvc2UiLCJmZXRjaERhdGEiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIsQ0FBaUI7QUFBQTs7QUFBQSw2QkFDakJDLEtBRGlCLElBQ1QsRUFEUztBQUFBLEtBQWpCLENBRmdCLEVBQXJCO0FBTUEsVUFBS0MsbUJBQUwsZ0JBQ0tOLFlBREw7QUFHQSxVQUFL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O0FBaUJELEtBbEJEO0FBbUJELEc7O09BRUQwQixpQixHQUFvQixpQkFBNkJvQyxXQUE3QixFQUEwQ0MsR0FBMUMsRUFBK0NsRCxpQkFBL0MsRUFBcUU7QUFBQSxRQUE1RDZCLFNBQTRELFNBQWxFMUIsSUFBa0U7QUFBQSxRQUFqREMsS0FBaUQsU0FBakRBLEtBQWlEOztBQUN2RixRQUFNK0MsbUJBQW1CbkQsa0JBQWtCaUQsV0FBbEIsQ0FBekI7QUFDQSxRQUFNRyxzQkFBc0JwRCw2QkFBMkI2QixTQUEzQixDQUE1QjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUssc0RBQUwsRUFBNkQsdUJBQXFCcUIsR0FBbEY7QUFDRTtBQUFBO0FBQUEsVUFBTyxXQUFVLDBDQUFqQixFQUE0RCwyQkFBeUJyQixTQUFyRjtBQUNNc0Isd0JBRE4sU0FDMEJDO0FBRDFCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQnZCLFNBRnRCO0FBR0UsZUFBT3pCLEtBSFQ7QUFJRSxrQkFBVSxxQkFBSztBQUNiLGlCQUFLd0IsY0FBTCxDQUFvQkMsU0FBcEIsRUFBK0J3QixFQUFFQyxNQUFGLENBQVNsRCxLQUF4QztBQUNEO0FBTkg7QUFKRixLQURGO0FBZUQsRzs7OztBQXNHSGhCLFlBQVltRSxZQUFaLEdBQTJCO0FBQ3pCM0MsU0FBTyxFQURrQjtBQUV6Qm5CLFVBQVEsRUFGaUI7QUFHekIrQyxlQUFhO0FBQUEsV0FBTUgsUUFBUUMsT0FBUixDQUFnQixFQUFFSyxNQUFNLEVBQVIsRUFBWUMsWUFBWSxDQUF4QixFQUFoQixDQUFOO0FBQUEsR0FIWTtBQUl6QmxDLGFBQVcsS0FKYztBQUt6QndCLFdBQVMsbUJBQU0sQ0FBRSxDQUxRO0FBTXpCRixZQUFVLG9CQUFNLENBQUU7QUFOTyxDQUEzQjs7a0JBU2U1QyxXIiwiZmlsZSI6IlNlYXJjaE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcblxuaW1wb3J0ICcuL1NlYXJjaE1vZGFsLnNjc3MnO1xuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG5cbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbMywgMTAsIDIwLCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2VTaXplOiAxMCxcblxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RBVEVfVkFMVUVTID0ge1xuICBzZWFyY2hSZXN1bHRzOiBbXSxcbiAgcGFnZTogMCxcbiAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgcGFnZXM6IDEsXG4gIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gIGxvYWRpbmc6IHRydWUsXG59O1xuXG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgIH07XG4gICAgdGhpcy5mZXRjaFRva2VuID0gMDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVNcbiAgICB9O1xuICB9XG5cbiAgc2V0U2VhcmNoVmFsdWUgPSAoZmllbGROYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgc2VhcmNoRmllbGRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5ld1NlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMuaGFuZGxlRmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh7IHZhbHVlOiBzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbC52YWx1ZSB9KTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFUyxcbiAgICAgIHNlYXJjaEZpZWxkczogdGhpcy5kZWZhdWx0U2VhcmNoRmllbGRzLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUZldGNoRGF0YSA9ICgpID0+IHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgLi4uc3RhdGVcbiAgICB9O1xuICAgIGNvbnN0IHtcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNlYXJjaEZpZWxkc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlO1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmV0Y2hUb2tlbikudGhlbih0b2tlbiA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICBkYXRhLFxuICAgICAgICB0b3RhbENvdW50LFxuICAgICAgfSkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT09IHRoaXMuZmV0Y2hUb2tlbikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNlYXJjaEZpZWxkID0gKHsgbmFtZTogZmllbGROYW1lLCB2YWx1ZSB9LCBsYWJlbFByZWZpeCwga2V5LCBsb2NhbGl6YXRpb25UZXh0cykgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRQcmVmaXggPSBsb2NhbGl6YXRpb25UZXh0c1tsYWJlbFByZWZpeF07XG4gICAgY29uc3QgdHJhbnNsYXRlZEZpZWxkTmFtZSA9IGxvY2FsaXphdGlvblRleHRzW2BmaWVsZC4ke2ZpZWxkTmFtZX1gXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHt0cmFuc2xhdGVkUHJlZml4fSAke3RyYW5zbGF0ZWRGaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbmFtZSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudGl0bGUgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLnNlbGVjdCB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5jbG9zZSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19