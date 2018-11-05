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


    return _react2.default.createElement(
      _reactBootstrap.Modal,
      { className: 'combobox-with-search__modal', show: this.props.showModal, onHide: this.handleClose },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        { closeButton: true },
        _react2.default.createElement(
          'h4',
          null,
          i18n.getMessage(this.props.title)
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-filters' },
          firstField && this.renderSearchField(firstField, 'Search.By', '00-' + firstField.name, getTranslation),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'By', i + '-' + field.name, getTranslation);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-search-results' },
          _react2.default.createElement(_reactTable2.default, _extends({}, REACT_TABLE_PROPS, {
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
          getTranslation('Select')
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'default', onClick: this.handleClose },
          getTranslation('Close')
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

  this.renderSearchField = function (_ref5, labelPrefix, key, getTranslation) {
    var fieldName = _ref5.name,
        value = _ref5.value;

    var translatedPrefix = getTranslation(labelPrefix);
    var translatedFieldName = getTranslation('Search.Field.' + fieldName + '.Label');
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
  onSelect: function onSelect() {},
  i18n: function i18n(id) {
    return id;
  },
  mapTranslationKey: function mapTranslationKey(key) {
    return key;
  }
};

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImkxOG4iLCJtYXBUcmFuc2xhdGlvbktleSIsImdldFRyYW5zbGF0aW9uIiwiZ2V0TWVzc2FnZSIsImtleSIsImZpZWxkT2JqZWN0cyIsImVudHJpZXMiLCJuYW1lIiwidmFsdWUiLCJjb2x1bW5zIiwiSGVhZGVyIiwiYWNjZXNzb3IiLCJmaXJzdEZpZWxkIiwib3RoZXJGaWVsZHMiLCJzaG93TW9kYWwiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiaGFuZGxlRmV0Y2hEYXRhIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93Iiwib25DbGljayIsInNlbGVjdFJvdyIsImNsYXNzTmFtZSIsImluZGV4IiwiaGFuZGxlU2VsZWN0IiwiQ29tcG9uZW50Iiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJuZXdTZWFyY2hGaWVsZHMiLCJzZXRTdGF0ZSIsIm9uU2VsZWN0Iiwib3JpZ2luYWwiLCJvbkNsb3NlIiwiZmV0Y2hEYXRhIiwicmVzb2x2ZWRTdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImxvYWRPcHRpb25zIiwib2Zmc2V0IiwibGltaXQiLCJkYXRhIiwidG90YWxDb3VudCIsInRva2VuIiwic2xpY2UiLCJNYXRoIiwiY2VpbCIsImxhYmVsUHJlZml4IiwidHJhbnNsYXRlZFByZWZpeCIsInRyYW5zbGF0ZWRGaWVsZE5hbWUiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURROztBQUd4QkMscUJBQW1CLEtBSEs7QUFJeEJDLHdCQUFzQixJQUpFO0FBS3hCQyx1QkFBcUIsSUFMRztBQU14QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQU5PO0FBT3hCQyxtQkFBaUIsRUFQTzs7QUFTeEJDLFVBQVEsSUFUZ0I7QUFVeEJDLFlBQVU7QUFWYyxDQUExQjs7QUFhQSxJQUFNQyx1QkFBdUI7QUFDM0JDLGlCQUFlLEVBRFk7QUFFM0JDLFFBQU0sQ0FGcUI7QUFHM0JDLFlBQVVaLGtCQUFrQk0sZUFIRDtBQUkzQk8sU0FBTyxDQUpvQjtBQUszQkMsZUFBYUMsU0FMYztBQU0zQkMsV0FBUztBQU5rQixDQUE3Qjs7SUFVTUMsVzs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBR2pCLFFBQU1DLGVBQWVDLE9BQU9DLE1BQVAsZ0JBQ25CLEVBRG1CLFNBRWhCSCxNQUFNSSxNQUFOLENBQWFDLEdBQWIsQ0FBaUI7QUFBQTs7QUFBQSw2QkFDakJDLEtBRGlCLElBQ1QsRUFEUztBQUFBLEtBQWpCLENBRmdCLEVBQXJCO0FBTUEsVUFBS0MsbUJBQUwsZ0JBQ0tO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LG1CQUFNLENBQUUsQ0FMUTtBQU16QkYsWUFBVSxvQkFBTSxDQUFFLENBTk87QUFPekJqQyxRQUFNO0FBQUEsV0FBTXdELEVBQU47QUFBQSxHQVBtQjtBQVF6QnZELHFCQUFtQjtBQUFBLFdBQU9HLEdBQVA7QUFBQTtBQVJNLENBQTNCOztrQkFXZWhCLFciLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcblxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURV9WQUxVRVMgPSB7XG4gIHNlYXJjaFJlc3VsdHM6IFtdLFxuICBwYWdlOiAwLFxuICBwYWdlU2l6ZTogUkVBQ1RfVEFCTEVfUFJPUFMuZGVmYXVsdFBhZ2VTaXplLFxuICBwYWdlczogMSxcbiAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgbG9hZGluZzogdHJ1ZSxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgfTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFU1xuICAgIH07XG4gIH1cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5oYW5kbGVGZXRjaERhdGEoe1xuICAgICAgc2VhcmNoRmllbGRzOiBuZXdTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgc2VsZWN0Um93ID0gcm93ID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkUm93OiByb3csXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZVNpemVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHsgdmFsdWU6IHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsLnZhbHVlIH0pO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTLFxuICAgICAgc2VhcmNoRmllbGRzOiB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlRmV0Y2hEYXRhID0gKCkgPT4gdGhpcy5mZXRjaERhdGEoKTtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAuLi5zdGF0ZVxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgc2VhcmNoRmllbGRzXG4gICAgfSA9IHJlc29sdmVkU3RhdGU7XG4gICAgdGhpcy5mZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuICsgMTtcbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5mZXRjaFRva2VuKS50aGVuKHRva2VuID0+IHtcbiAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgIG9mZnNldDogcGFnZSAqIHBhZ2VTaXplLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICB9KS50aGVuKCh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRvdGFsQ291bnQsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBwYWdlU2l6ZSksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGdldFRyYW5zbGF0aW9uKSA9PiB7XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGdldFRyYW5zbGF0aW9uKGxhYmVsUHJlZml4KTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gZ2V0VHJhbnNsYXRpb24oYFNlYXJjaC5GaWVsZC4ke2ZpZWxkTmFtZX0uTGFiZWxgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcmB9IGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtbGFiZWxcIiBodG1sRm9yPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9PlxuICAgICAgICAgIHtgJHt0cmFuc2xhdGVkUHJlZml4fSAke3RyYW5zbGF0ZWRGaWVsZE5hbWV9YH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGlkPXtgc2VhcmNoLWZpZWxkLSR7ZmllbGROYW1lfWB9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2VhcmNoUmVzdWx0cyxcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBzZWxlY3RlZFJvdyxcbiAgICAgIHBhZ2VzLFxuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGkxOG4sXG4gICAgICBtYXBUcmFuc2xhdGlvbktleVxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGdldFRyYW5zbGF0aW9uID0ga2V5ID0+IGkxOG4uZ2V0TWVzc2FnZShcbiAgICAgIG1hcFRyYW5zbGF0aW9uS2V5KGtleSlcbiAgICApO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IG5hbWUsXG4gICAgICAgIGFjY2Vzc29yOiBuYW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBjb25zdCBbZmlyc3RGaWVsZCwgLi4ub3RoZXJGaWVsZHNdID0gZmllbGRPYmplY3RzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWxcIiBzaG93PXt0aGlzLnByb3BzLnNob3dNb2RhbH0gb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgPGg0PlxuICAgICAgICAgICAgeyBpMThuLmdldE1lc3NhZ2UodGhpcy5wcm9wcy50aXRsZSkgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnU2VhcmNoLkJ5JyxcbiAgICAgICAgICAgICAgICBgMDAtJHtmaXJzdEZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICBnZXRUcmFuc2xhdGlvblxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG90aGVyRmllbGRzLm1hcChcbiAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICdCeScsXG4gICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgIGdldFRyYW5zbGF0aW9uXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgZGF0YT17c2VhcmNoUmVzdWx0c31cbiAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBsb2FkaW5nVGV4dD17Z2V0VHJhbnNsYXRpb24oJ1RhYmxlLkxvYWRpbmcnKX1cbiAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogZ2V0VHJhbnNsYXRpb24oJ1RhYmxlLk5vLkl0ZW1zJyl9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25GZXRjaERhdGE9e3RoaXMuaGFuZGxlRmV0Y2hEYXRhfVxuICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgKHN0YXRlLCByb3cpID0+ICh7XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNlbGVjdFJvdyhyb3cpLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBzZWxlY3RlZFJvdyAmJiByb3cgJiYgc2VsZWN0ZWRSb3cuaW5kZXggPT09IHJvdy5pbmRleCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgZ2V0VHJhbnNsYXRpb24oJ1NlbGVjdCcpIH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgICAgICB7IGdldFRyYW5zbGF0aW9uKCdDbG9zZScpIH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaTE4bjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBnZXRNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIG1hcFRyYW5zbGF0aW9uS2V5OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIHNob3dNb2RhbDogZmFsc2UsXG4gIG9uQ2xvc2U6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGkxOG46IGlkID0+IGlkLFxuICBtYXBUcmFuc2xhdGlvbktleToga2V5ID0+IGtleSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19