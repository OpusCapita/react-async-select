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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJub0l0ZW1zIiwiaGFuZGxlRmV0Y2hEYXRhIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93Iiwib25DbGljayIsInNlbGVjdFJvdyIsImNsYXNzTmFtZSIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsIm5ld1NlYXJjaEZpZWxkcyIsInNldFN0YXRlIiwiZmV0Y2hEYXRhIiwib25TZWxlY3QiLCJvcmlnaW5hbCIsIm9uQ2xvc2UiLCJyZXNvbHZlZFN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsImRhdGEiLCJ0b3RhbENvdW50IiwidG9rZW4iLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIsQ0FBaUI7QUFBQTs7QUFBQSw2QkFDakJDLEtBRGlCLElBQ1QsRUFEUztBQUFBLEtBQWpCLENBRmdCLEVBQXJCO0FBTUEsVUFBS0MsbUJBQUwsZ0JBQ0tOLFlBREw7QUFHQSxVQUFL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QUFpQkQsS0FsQkQ7QUFtQkQsRzs7T0FFRDBCLGlCLEdBQW9CLGlCQUE2Qm9DLFdBQTdCLEVBQTBDQyxHQUExQyxFQUErQ2xELGlCQUEvQyxFQUFxRTtBQUFBLFFBQTVENkIsU0FBNEQsU0FBbEUxQixJQUFrRTtBQUFBLFFBQWpEQyxLQUFpRCxTQUFqREEsS0FBaUQ7O0FBQ3ZGLFFBQU0rQyxtQkFBbUJuRCxrQkFBa0JpRCxXQUFsQixDQUF6QjtBQUNBLFFBQU1HLHNCQUFzQnBELDZCQUEyQjZCLFNBQTNCLENBQTVCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUJxQixHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QnJCLFNBQXJGO0FBQ01zQix3QkFETixTQUMwQkM7QUFEMUIsT0FERjtBQUlFO0FBQ0UsY0FBSyxNQURQO0FBRUUsOEJBQW9CdkIsU0FGdEI7QUFHRSxlQUFPekIsS0FIVDtBQUlFLGlCQUFTLG9CQUFLO0FBQ1osaUJBQUt3QixjQUFMLENBQW9CQyxTQUFwQixFQUErQndCLEVBQUVDLE1BQUYsQ0FBU2xELEtBQXhDO0FBQ0Q7QUFOSDtBQUpGLEtBREY7QUFlRCxHOzs7O0FBc0dIaEIsWUFBWW1FLFlBQVosR0FBMkI7QUFDekIzQyxTQUFPLEVBRGtCO0FBRXpCbkIsVUFBUSxFQUZpQjtBQUd6QitDLGVBQWE7QUFBQSxXQUFNSCxRQUFRQyxPQUFSLENBQWdCLEVBQUVLLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCbEMsYUFBVyxLQUpjO0FBS3pCeUIsV0FBUyxtQkFBTSxDQUFFLENBTFE7QUFNekJGLFlBQVUsb0JBQU0sQ0FBRTtBQU5PLENBQTNCOztrQkFTZTdDLFciLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcblxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURV9WQUxVRVMgPSB7XG4gIHNlYXJjaFJlc3VsdHM6IFtdLFxuICBwYWdlOiAwLFxuICBwYWdlU2l6ZTogUkVBQ1RfVEFCTEVfUFJPUFMuZGVmYXVsdFBhZ2VTaXplLFxuICBwYWdlczogMSxcbiAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgbG9hZGluZzogdHJ1ZSxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgfTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFU1xuICAgIH07XG4gIH1cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWFyY2hGaWVsZHM6IG5ld1NlYXJjaEZpZWxkc1xuICAgIH0pO1xuICAgIHRoaXMuZmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgICAgcGFnZTogMCxcbiAgICB9KTtcbiAgfTtcblxuICBzZWxlY3RSb3cgPSByb3cgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRSb3c6IHJvdyxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VTaXplQ2hhbmdlID0gKHBhZ2VTaXplLCBwYWdlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlU2l6ZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoeyB2YWx1ZTogc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwudmFsdWUgfSk7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLi4uREVGQVVMVF9TVEFURV9WQUxVRVMsXG4gICAgICBzZWFyY2hGaWVsZHM6IHRoaXMuZGVmYXVsdFNlYXJjaEZpZWxkcyxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVGZXRjaERhdGEgPSAoKSA9PiB0aGlzLmZldGNoRGF0YSgpO1xuXG4gIGZldGNoRGF0YSA9IHN0YXRlID0+IHtcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfTtcbiAgICBjb25zdCB7XG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzZWFyY2hGaWVsZHNcbiAgICB9ID0gcmVzb2x2ZWRTdGF0ZTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nOiB0cnVlIH0pO1xuICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZldGNoVG9rZW4pLnRoZW4odG9rZW4gPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sb2FkT3B0aW9ucyh7XG4gICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgIH0pLnRoZW4oKHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdG90YWxDb3VudCxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IGRhdGEuc2xpY2UoMCwgcGFnZVNpemUpLFxuICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmllbGRPYmplY3RzID0gT2JqZWN0LmVudHJpZXMoc2VhcmNoRmllbGRzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRPYmplY3RzLm1hcCgoeyBuYW1lIH0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhlYWRlcjogbmFtZSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudGl0bGUgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zfVxuICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgIG9uRmV0Y2hEYXRhPXt0aGlzLmhhbmRsZUZldGNoRGF0YX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvd31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGxvY2FsaXphdGlvblRleHRzLnNlbGVjdCB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBic1N0eWxlPVwiZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5jbG9zZSB9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgc2hvd01vZGFsOiBmYWxzZSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19