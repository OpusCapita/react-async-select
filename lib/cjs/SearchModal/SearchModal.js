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

var _awesomeDebouncePromise = require('awesome-debounce-promise');

var _awesomeDebouncePromise2 = _interopRequireDefault(_awesomeDebouncePromise);

var _ComboboxWithSearch = require('../ComboboxWithSearch/ComboboxWithSearch');

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
  pageSizeOptions: [10, 20, 50, 100],
  defaultPageSize: 10,
  manual: true,
  sortable: false
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

var getDialogClassName = function getDialogClassName(_ref) {
  var panels = _ref.panels;

  var panelCount = panels.filter(function (val) {
    return !!val;
  }).length + 1;
  return 'combobox-with-search__modal-with-' + panelCount + '-panels';
};

var SearchModal = (_temp = _class = function (_Component) {
  _inherits(SearchModal, _Component);

  function SearchModal(props) {
    _classCallCheck(this, SearchModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var searchFields = Object.assign.apply(Object, [{}].concat(props.fields.map(function (field) {
      var _ref2;

      return _ref2 = {}, _ref2[field] = '', _ref2;
    })));
    _this.state = {
      searchFields: searchFields,
      searchResults: [],
      page: 0,
      pageSize: REACT_TABLE_PROPS.defaultPageSize,
      pages: 1,
      selectedRow: undefined,
      loading: true
    };

    _this.loadOptionsDebounced = (0, _awesomeDebouncePromise2.default)(props.loadOptions, _ComboboxWithSearch.DEBOUNCE_LIMIT);
    return _this;
  }

  SearchModal.prototype.componentWillMount = function componentWillMount() {
    this.fetchData();
  };

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
        renderers = _props.renderers,
        _props$components = _props.components,
        LeftPanel = _props$components.LeftPanel,
        RightPanel = _props$components.RightPanel;

    var fieldObjects = Object.entries(searchFields).map(function (_ref3) {
      var name = _ref3[0],
          value = _ref3[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref4) {
      var name = _ref4.name;

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

    var leftPanel = LeftPanel && _react2.default.createElement(LeftPanel, { selectedRow: selectedRow });
    var rightPanel = RightPanel && _react2.default.createElement(RightPanel, { selectedRow: selectedRow });

    return _react2.default.createElement(
      _reactBootstrap.Modal,
      {
        className: 'combobox-with-search__modal',
        dialogClassName: getDialogClassName({ panels: [leftPanel, rightPanel] }),
        show: true,
        style: { display: 'flex' },
        onHide: this.handleClose
      },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        { closeButton: true },
        _react2.default.createElement(
          'h4',
          { className: 'combobox-with-search__modal-title combobox-with-search__modal-title--1-panel' },
          this.props.title
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'combobox-with-search__modal-panels' },
        leftPanel && _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--left' },
          leftPanel
        ),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--center' },
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'h4',
              { className: 'combobox-with-search__modal-title combobox-with-search__modal-title--2-3-panels' },
              this.props.title
            ),
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
                onPageChange: this.handlePageChange,
                onPageSizeChange: this.handlePageSizeChange,
                getTrGroupProps: function getTrGroupProps(state, row) {
                  var className = !row ? "hidden" : "";
                  return {
                    className: className
                  };
                },
                getTrProps: function getTrProps(state, row) {
                  var onClick = function onClick() {
                    return _this2.handleSelectRow(row);
                  };
                  var className = selectedRow && row && selectedRow.index === row.index ? "selected" : "";

                  return {
                    onClick: onClick,
                    className: className
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
        ),
        rightPanel && _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__modal-panel combobox-with-search__modal-panel--right' },
          rightPanel
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

    _this3.fetchData({
      page: 0,
      searchFields: _extends({}, searchFields, (_extends2 = {}, _extends2[fieldName] = value, _extends2))
    });
  };

  this.handleSelectRow = function (row) {
    return _this3.setState({ selectedRow: row });
  };

  this.handlePageChange = function (page) {
    _this3.fetchData({ page: page });
  };

  this.handlePageSizeChange = function (pageSize, page) {
    return _this3.fetchData({ pageSize: pageSize, page: page });
  };

  this.handleSelect = function () {
    var selectedRow = _this3.state.selectedRow;

    _this3.props.onSelect(selectedRow && selectedRow.original);
    _this3.handleClose();
  };

  this.handleClose = function () {
    return _this3.props.onClose();
  };

  this.fetchToken = 0;

  this.fetchData = function (state) {
    var resolvedState = _extends({}, _this3.state, state);
    var page = resolvedState.page,
        pageSize = resolvedState.pageSize,
        searchFields = resolvedState.searchFields;


    _this3.setState(_extends({}, resolvedState, { loading: true }), function () {
      _this3.fetchToken = _this3.fetchToken + 1;
      var fetchToken = _this3.fetchToken;
      _this3.loadOptionsDebounced({
        searchFields: searchFields,
        offset: page * pageSize,
        limit: pageSize
      }).then(function (_ref5) {
        var data = _ref5.data,
            totalCount = _ref5.totalCount;

        if (fetchToken === _this3.fetchToken) {
          _this3.setState({
            searchResults: data.slice(0, pageSize),
            pages: Math.ceil(totalCount / pageSize),
            loading: false
          });
        }
      });
    });
  };

  this.renderSearchField = function (_ref6, labelPrefix, key, localizationTexts, filters) {
    var fieldName = _ref6.name,
        value = _ref6.value;

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
  onClose: function onClose() {},
  onSelect: function onSelect() {},
  components: {}
};

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfVEVYVFMiLCJwcmV2aW91cyIsIm5leHQiLCJsb2FkaW5nIiwibm9EYXRhIiwicGFnZSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiZ2V0RGlhbG9nQ2xhc3NOYW1lIiwicGFuZWxzIiwicGFuZWxDb3VudCIsImZpbHRlciIsInZhbCIsImxlbmd0aCIsIlNlYXJjaE1vZGFsIiwicHJvcHMiLCJzZWFyY2hGaWVsZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsInN0YXRlIiwic2VhcmNoUmVzdWx0cyIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImxvYWRPcHRpb25zRGVib3VuY2VkIiwibG9hZE9wdGlvbnMiLCJERUJPVU5DRV9MSU1JVCIsImNvbXBvbmVudFdpbGxNb3VudCIsImZldGNoRGF0YSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmlsdGVycyIsInJlbmRlcmVycyIsImNvbXBvbmVudHMiLCJMZWZ0UGFuZWwiLCJSaWdodFBhbmVsIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwibGVmdFBhbmVsIiwicmlnaHRQYW5lbCIsImRpc3BsYXkiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93IiwiY2xhc3NOYW1lIiwib25DbGljayIsImhhbmRsZVNlbGVjdFJvdyIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvbkNsb3NlIiwiZmV0Y2hUb2tlbiIsInJlc29sdmVkU3RhdGUiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFHQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURRO0FBRXhCQyxxQkFBbUIsS0FGSztBQUd4QkMsd0JBQXNCLElBSEU7QUFJeEJDLHVCQUFxQixJQUpHO0FBS3hCQyxtQkFBaUIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxHQUFiLENBTE87QUFNeEJDLG1CQUFpQixFQU5PO0FBT3hCQyxVQUFRLElBUGdCO0FBUXhCQyxZQUFVO0FBUmMsQ0FBMUI7O0FB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QUEzQixDQUE1QjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUssc0RBQUwsRUFBNkQsdUJBQXFCZSxHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QmYsU0FBckY7QUFDTWlCLHdCQUROLFNBQzBCQztBQUQxQixPQURGO0FBSUU7QUFDRSxjQUFLLE1BRFA7QUFFRSw4QkFBb0JsQixTQUZ0QjtBQUdFLGVBQU96QyxLQUhUO0FBSUUsaUJBQVM7QUFBQSxpQkFBSyxPQUFLd0MsY0FBTCxDQUFvQkMsU0FBcEIsRUFBK0JtQixFQUFFQyxNQUFGLENBQVM3RCxLQUF4QyxDQUFMO0FBQUE7QUFKWDtBQUpGLEtBREY7QUFhRCxHOzs7O0FBbUxIN0IsWUFBWTJGLFlBQVosR0FBMkI7QUFDekJwQyxTQUFPLEVBRGtCO0FBRXpCbEQsVUFBUSxFQUZpQjtBQUd6QlUsZUFBYTtBQUFBLFdBQU02RSxRQUFRQyxPQUFSLENBQWdCLEVBQUVkLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCUCxXQUFTLG1CQUFNLENBQUUsQ0FKUTtBQUt6QkQsWUFBVSxvQkFBTSxDQUFFLENBTE87QUFNekJqRCxjQUFZO0FBTmEsQ0FBM0I7O2tCQVVldkIsVyIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5pbXBvcnQgQXdlc29tZURlYm91bmNlUHJvbWlzZSBmcm9tICdhd2Vzb21lLWRlYm91bmNlLXByb21pc2UnO1xuXG5pbXBvcnQgeyBERUJPVU5DRV9MSU1JVCB9IGZyb20gJy4uL0NvbWJvYm94V2l0aFNlYXJjaC9Db21ib2JveFdpdGhTZWFyY2gnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFsxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jb25zdCBnZXREaWFsb2dDbGFzc05hbWUgPSAoeyBwYW5lbHMgfSkgPT4ge1xuICBjb25zdCBwYW5lbENvdW50ID0gcGFuZWxzLmZpbHRlcih2YWwgPT4gISF2YWwpLmxlbmd0aCArIDE7XG4gIHJldHVybiBgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXdpdGgtJHtwYW5lbENvdW50fS1wYW5lbHNgO1xufTtcblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkID0gQXdlc29tZURlYm91bmNlUHJvbWlzZShcbiAgICAgIHByb3BzLmxvYWRPcHRpb25zLFxuICAgICAgREVCT1VOQ0VfTElNSVQsXG4gICAgKTtcbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gIH1cblxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiB7IC4uLnNlYXJjaEZpZWxkcywgW2ZpZWxkTmFtZV06IHZhbHVlIH1cbiAgICB9KTtcbiAgfTtcblxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IHJvdyA9PiB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSb3c6IHJvdyB9KTtcblxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLmZldGNoRGF0YSh7IHBhZ2UgfSk7XG4gIH07XG5cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4gdGhpcy5mZXRjaERhdGEoeyBwYWdlU2l6ZSwgcGFnZSB9KTtcblxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkUm93IH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblxuICBmZXRjaFRva2VuID0gMDtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcbiAgICBjb25zdCB7IHBhZ2UsIHBhZ2VTaXplLCBzZWFyY2hGaWVsZHMgfSA9IHJlc29sdmVkU3RhdGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgeyAuLi5yZXNvbHZlZFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgICAgIGNvbnN0IGZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW47XG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnNEZWJvdW5jZWQoe1xuICAgICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIH0pLnRoZW4oKHsgZGF0YSwgdG90YWxDb3VudCwgfSkgPT4ge1xuICAgICAgICAgIGlmIChmZXRjaFRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH07XG5cblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMsIGZpbHRlcnMpID0+IHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnN0IEZpbHRlciA9IGZpbHRlcnNbZmllbGROYW1lXTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb21ib2JveC13aXRoLWN1c3RvbS1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXInIGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgICA8RmlsdGVyIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCB2YWx1ZSl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBjb21wb25lbnRzOiB7IExlZnRQYW5lbCwgUmlnaHRQYW5lbCB9LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgICAgQ2VsbDogcHJvcHMgPT4ge1xuICAgICAgICAgIGNvbnN0IEFkZGl0aW9uYWxDb21wb25lbnQgPSByZW5kZXJlcnMgJiYgcmVuZGVyZXJzW3Byb3BzLmNvbHVtbi5pZF0gfHwgbnVsbDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjZWxsLXZhbHVlIGNlbGwtdmFsdWUtJHtwcm9wcy5vcmlnaW5hbC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFkZGl0aW9uYWxDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxDb21wb25lbnQgey4uLnByb3BzLm9yaWdpbmFsfS8+IDpcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9wcy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBMZWZ0UGFuZWwgJiYgKDxMZWZ0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcbiAgICBjb25zdCByaWdodFBhbmVsID0gUmlnaHRQYW5lbCAmJiAoPFJpZ2h0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPXtnZXREaWFsb2dDbGFzc05hbWUoeyBwYW5lbHM6IFtsZWZ0UGFuZWwsIHJpZ2h0UGFuZWxdIH0pfVxuICAgICAgICBzaG93PXt0cnVlfVxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcgfX1cbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXRpdGxlIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZS0tMS1wYW5lbFwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxlZnRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tbGVmdFwiPlxuICAgICAgICAgICAgICAgIHsgbGVmdFBhbmVsIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tY2VudGVyXCI+XG4gICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZSBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtdGl0bGUtLTItMy1wYW5lbHNcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAnYnknLFxuICAgICAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2xvY2FsaXphdGlvblRleHRzLmxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgcGFnZXM9e3BhZ2VzfVxuICAgICAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGdldFRyR3JvdXBQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gIXJvdyA/IFwiaGlkZGVuXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9ICgpID0+IHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93IHx8IHNlbGVjdGVkUm93Lm9yaWdpbmFsLmRpc2FibGVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLnNlbGVjdH1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuY2xvc2V9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge1xuICAgICAgICAgICAgcmlnaHRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tcmlnaHRcIj5cbiAgICAgICAgICAgICAgICB7IHJpZ2h0UGFuZWwgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgY29tcG9uZW50czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBjb21wb25lbnRzOiB7fSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=