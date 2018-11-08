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
        Header: localizationTexts['field.' + name],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJub0l0ZW1zIiwiaGFuZGxlRmV0Y2hEYXRhIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93Iiwib25DbGljayIsInNlbGVjdFJvdyIsImNsYXNzTmFtZSIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsIm5ld1NlYXJjaEZpZWxkcyIsInNldFN0YXRlIiwiZmV0Y2hEYXRhIiwib25TZWxlY3QiLCJvcmlnaW5hbCIsIm9uQ2xvc2UiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIsQ0FBaUI7QUFBQTs7QUFBQSw2QkFDakJDLEtBRGlCLElBQ1QsRUFEUztBQUFBLEtBQWpCLENBRmdCLEVBQXJCO0FBTUEsVUFBS0MsbUJBQUwsZ0JBQ0tOLFlBREw7QUFHQSxVQUFL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RCxHOztPQUVEMEIsaUIsR0FBb0IsaUJBQTZCb0MsV0FBN0IsRUFBMENDLEdBQTFDLEVBQStDbEQsaUJBQS9DLEVBQXFFO0FBQUEsUUFBNUQ2QixTQUE0RCxTQUFsRTFCLElBQWtFO0FBQUEsUUFBakRDLEtBQWlELFNBQWpEQSxLQUFpRDs7QUFDdkYsUUFBTStDLG1CQUFtQm5ELGtCQUFrQmlELFdBQWxCLENBQXpCO0FBQ0EsUUFBTUcsc0JBQXNCcEQsNkJBQTJCNkIsU0FBM0IsQ0FBNUI7QUFDQSxXQUNFO0FBQUE7QUFBQSxRQUFLLHNEQUFMLEVBQTZELHVCQUFxQnFCLEdBQWxGO0FBQ0U7QUFBQTtBQUFBLFVBQU8sV0FBVSwwQ0FBakIsRUFBNEQsMkJBQXlCckIsU0FBckY7QUFDTXNCLHdCQUROLFNBQzBCQztBQUQxQixPQURGO0FBSUU7QUFDRSxjQUFLLE1BRFA7QUFFRSw4QkFBb0J2QixTQUZ0QjtBQUdFLGVBQU96QixLQUhUO0FBSUUsaUJBQVMsb0JBQUs7QUFDWixpQkFBS3dCLGNBQUwsQ0FBb0JDLFNBQXBCLEVBQStCd0IsRUFBRUMsTUFBRixDQUFTbEQsS0FBeEM7QUFDRDtBQU5IO0FBSkYsS0FERjtBQWVELEc7Ozs7QUFzR0hoQixZQUFZbUUsWUFBWixHQUEyQjtBQUN6QjNDLFNBQU8sRUFEa0I7QUFFekJuQixVQUFRLEVBRmlCO0FBR3pCK0MsZUFBYTtBQUFBLFdBQU1ILFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUssTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJsQyxhQUFXLEtBSmM7QUFLekJ5QixXQUFTLG1CQUFNLENBQUUsQ0FMUTtBQU16QkYsWUFBVSxvQkFBTSxDQUFFO0FBTk8sQ0FBM0I7O2tCQVNlN0MsVyIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5cbmltcG9ydCAnLi9TZWFyY2hNb2RhbC5zY3NzJztcblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzMsIDEwLCAyMCwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG5cbiAgbWFudWFsOiB0cnVlLFxuICBzb3J0YWJsZTogZmFsc2UsXG59O1xuXG5jb25zdCBERUZBVUxUX1NUQVRFX1ZBTFVFUyA9IHtcbiAgc2VhcmNoUmVzdWx0czogW10sXG4gIHBhZ2U6IDAsXG4gIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gIHBhZ2VzOiAxLFxuICBzZWxlY3RlZFJvdzogdW5kZWZpbmVkLFxuICBsb2FkaW5nOiB0cnVlLFxufTtcblxuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3Qgc2VhcmNoRmllbGRzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgLi4ucHJvcHMuZmllbGRzLm1hcChmaWVsZCA9PiAoe1xuICAgICAgICBbZmllbGRdOiAnJyxcbiAgICAgIH0pKSxcbiAgICApO1xuICAgIHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyA9IHtcbiAgICAgIC4uLnNlYXJjaEZpZWxkcyxcbiAgICB9O1xuICAgIHRoaXMuZmV0Y2hUb2tlbiA9IDA7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTXG4gICAgfTtcbiAgfVxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgICBbZmllbGROYW1lXTogdmFsdWUsXG4gICAgfTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzXG4gICAgfSk7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgICBwYWdlOiAwLFxuICAgIH0pO1xuICB9O1xuXG4gIHNlbGVjdFJvdyA9IHJvdyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZFJvdzogcm93LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZUNoYW5nZSA9IHBhZ2UgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChzZWxlY3RlZFJvdyAmJiBzZWxlY3RlZFJvdy5vcmlnaW5hbCk7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVMsXG4gICAgICBzZWFyY2hGaWVsZHM6IHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVGZXRjaERhdGEgPSAoKSA9PiB0aGlzLmZldGNoRGF0YSgpO1xuXG4gIGZldGNoRGF0YSA9IHN0YXRlID0+IHtcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfTtcbiAgICBjb25zdCB7XG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzZWFyY2hGaWVsZHNcbiAgICB9ID0gcmVzb2x2ZWRTdGF0ZTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZldGNoVG9rZW4pLnRoZW4odG9rZW4gPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sb2FkT3B0aW9ucyh7XG4gICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgIH0pLnRoZW4oKHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdG90YWxDb3VudCxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IGRhdGEuc2xpY2UoMCwgcGFnZVNpemUpLFxuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudGl0bGUgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLnNlbGVjdCB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5jbG9zZSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19