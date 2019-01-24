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
      _this3.props.loadOptions({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfVEVYVFMiLCJwcmV2aW91cyIsIm5leHQiLCJsb2FkaW5nIiwibm9EYXRhIiwicGFnZSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiZ2V0RGlhbG9nQ2xhc3NOYW1lIiwicGFuZWxzIiwicGFuZWxDb3VudCIsImZpbHRlciIsInZhbCIsImxlbmd0aCIsIlNlYXJjaE1vZGFsIiwicHJvcHMiLCJzZWFyY2hGaWVsZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsInN0YXRlIiwic2VhcmNoUmVzdWx0cyIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImZldGNoRGF0YSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmlsdGVycyIsInJlbmRlcmVycyIsImNvbXBvbmVudHMiLCJMZWZ0UGFuZWwiLCJSaWdodFBhbmVsIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwibGVmdFBhbmVsIiwicmlnaHRQYW5lbCIsImRpc3BsYXkiLCJoYW5kbGVDbG9zZSIsInRpdGxlIiwicmVuZGVyU2VhcmNoRmllbGQiLCJpIiwiaGFuZGxlUGFnZUNoYW5nZSIsImhhbmRsZVBhZ2VTaXplQ2hhbmdlIiwicm93IiwiY2xhc3NOYW1lIiwib25DbGljayIsImhhbmRsZVNlbGVjdFJvdyIsImluZGV4IiwiaGFuZGxlU2VsZWN0Iiwic2VsZWN0IiwiY2xvc2UiLCJDb21wb25lbnQiLCJzZXRTZWFyY2hWYWx1ZSIsImZpZWxkTmFtZSIsInNldFN0YXRlIiwib25TZWxlY3QiLCJvbkNsb3NlIiwiZmV0Y2hUb2tlbiIsInJlc29sdmVkU3RhdGUiLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2xpY2UiLCJNYXRoIiwiY2VpbCIsImxhYmVsUHJlZml4Iiwia2V5IiwiRmlsdGVyIiwidHJhbnNsYXRlZFByZWZpeCIsInRyYW5zbGF0ZWRGaWVsZE5hbWUiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFHQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGtCQUFnQixJQURRO0FBRXhCQyxxQkFBbUIsS0FGSztBQUd4QkMsd0JBQXNCLElBSEU7QUFJeEJDLHVCQUFxQixJQUpHO0FBS3hCQyxtQkFBaUIsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxHQUFiLENBTE87QUFNeEJDLG1CQUFpQixFQU5PO0FBT3hCQyxVQUFRLElBUGdCO0FBUXhCQyxZQUFVO0FBUmMsQ0FBMUI7O0FBWUEsSUFBTUMsZ0JBQWdCO0FBQ3BCQyxZQUFVLFVBRFU7QUFFcEJDLFFBQU0sTUFGYztBQUdw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QixTQUFyRjtBQUNNa0Isd0JBRE4sU0FDMEJDO0FBRDFCLE9BREY7QUFJRTtBQUNFLGNBQUssTUFEUDtBQUVFLDhCQUFvQm5CLFNBRnRCO0FBR0UsZUFBT3pDLEtBSFQ7QUFJRSxpQkFBUztBQUFBLGlCQUFLLE9BQUt3QyxjQUFMLENBQW9CQyxTQUFwQixFQUErQm9CLEVBQUVDLE1BQUYsQ0FBUzlELEtBQXhDLENBQUw7QUFBQTtBQUpYO0FBSkYsS0FERjtBQWFELEc7Ozs7QUFtTEgxQixZQUFZeUYsWUFBWixHQUEyQjtBQUN6QnJDLFNBQU8sRUFEa0I7QUFFekIvQyxVQUFRLEVBRmlCO0FBR3pCb0UsZUFBYTtBQUFBLFdBQU1pQixRQUFRQyxPQUFSLENBQWdCLEVBQUVkLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCUixXQUFTLG1CQUFNLENBQUUsQ0FKUTtBQUt6QkQsWUFBVSxvQkFBTSxDQUFFLENBTE87QUFNekJqRCxjQUFZO0FBTmEsQ0FBM0I7O2tCQVVlcEIsVyIsImZpbGUiOiJTZWFyY2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tICdyZWFjdC10YWJsZSc7XG5cbmltcG9ydCAnLi9TZWFyY2hNb2RhbC5zY3NzJztcblxuXG5jb25zdCBSRUFDVF9UQUJMRV9QUk9QUyA9IHtcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzEwLCAyMCwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuXG5jb25zdCBERUZBVUxUX1RFWFRTID0ge1xuICBwcmV2aW91czogJ1ByZXZpb3VzJyxcbiAgbmV4dDogJ05leHQnLFxuICBsb2FkaW5nOiAnTG9hZGluZy4uLicsXG4gIG5vRGF0YTogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlOiAnUGFnZScsXG4gIG9mOiAnb2YnLFxuICByb3dzOiAncm93cycsXG4gIHBhZ2VKdW1wOiAnanVtcCB0byBwYWdlJyxcbiAgcm93c1NlbGVjdG9yOiAncm93cyBwZXIgcGFnZScsXG59O1xuXG5cbmNvbnN0IGdldERpYWxvZ0NsYXNzTmFtZSA9ICh7IHBhbmVscyB9KSA9PiB7XG4gIGNvbnN0IHBhbmVsQ291bnQgPSBwYW5lbHMuZmlsdGVyKHZhbCA9PiAhIXZhbCkubGVuZ3RoICsgMTtcbiAgcmV0dXJuIGBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtd2l0aC0ke3BhbmVsQ291bnR9LXBhbmVsc2A7XG59O1xuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgc2VhcmNoUmVzdWx0czogW10sXG4gICAgICBwYWdlOiAwLFxuICAgICAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIHBhZ2VzOiAxLFxuICAgICAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfTtcbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gIH1cblxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiB7IC4uLnNlYXJjaEZpZWxkcywgW2ZpZWxkTmFtZV06IHZhbHVlIH1cbiAgICB9KTtcbiAgfTtcblxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IHJvdyA9PiB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSb3c6IHJvdyB9KTtcblxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLmZldGNoRGF0YSh7IHBhZ2UgfSk7XG4gIH07XG5cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4gdGhpcy5mZXRjaERhdGEoeyBwYWdlU2l6ZSwgcGFnZSB9KTtcblxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkUm93IH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblxuICBmZXRjaFRva2VuID0gMDtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcbiAgICBjb25zdCB7IHBhZ2UsIHBhZ2VTaXplLCBzZWFyY2hGaWVsZHMgfSA9IHJlc29sdmVkU3RhdGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgeyAuLi5yZXNvbHZlZFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgICAgIGNvbnN0IGZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW47XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIH0pLnRoZW4oKHsgZGF0YSwgdG90YWxDb3VudCwgfSkgPT4ge1xuICAgICAgICAgIGlmIChmZXRjaFRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH07XG5cblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMsIGZpbHRlcnMpID0+IHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnN0IEZpbHRlciA9IGZpbHRlcnNbZmllbGROYW1lXTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb21ib2JveC13aXRoLWN1c3RvbS1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXInIGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgICA8RmlsdGVyIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCB2YWx1ZSl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBjb21wb25lbnRzOiB7IExlZnRQYW5lbCwgUmlnaHRQYW5lbCB9LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgICAgQ2VsbDogcHJvcHMgPT4ge1xuICAgICAgICAgIGNvbnN0IEFkZGl0aW9uYWxDb21wb25lbnQgPSByZW5kZXJlcnMgJiYgcmVuZGVyZXJzW3Byb3BzLmNvbHVtbi5pZF0gfHwgbnVsbDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjZWxsLXZhbHVlIGNlbGwtdmFsdWUtJHtwcm9wcy5vcmlnaW5hbC5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEFkZGl0aW9uYWxDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxDb21wb25lbnQgey4uLnByb3BzLm9yaWdpbmFsfS8+IDpcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9wcy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBMZWZ0UGFuZWwgJiYgKDxMZWZ0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcbiAgICBjb25zdCByaWdodFBhbmVsID0gUmlnaHRQYW5lbCAmJiAoPFJpZ2h0UGFuZWwgc2VsZWN0ZWRSb3c9e3NlbGVjdGVkUm93fS8+KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPXtnZXREaWFsb2dDbGFzc05hbWUoeyBwYW5lbHM6IFtsZWZ0UGFuZWwsIHJpZ2h0UGFuZWxdIH0pfVxuICAgICAgICBzaG93PXt0cnVlfVxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcgfX1cbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXRpdGxlIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZS0tMS1wYW5lbFwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgPC9oND5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsc1wiPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxlZnRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tbGVmdFwiPlxuICAgICAgICAgICAgICAgIHsgbGVmdFBhbmVsIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tY2VudGVyXCI+XG4gICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC10aXRsZSBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtdGl0bGUtLTItMy1wYW5lbHNcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgICAgICdzZWFyY2hCeScsXG4gICAgICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBvdGhlckZpZWxkcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAnYnknLFxuICAgICAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgICAgIHsuLi50ZXh0c31cbiAgICAgICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgcGFnZVNpemU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2xvY2FsaXphdGlvblRleHRzLmxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgcGFnZXM9e3BhZ2VzfVxuICAgICAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGdldFRyR3JvdXBQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gIXJvdyA/IFwiaGlkZGVuXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZ2V0VHJQcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25DbGljayA9ICgpID0+IHRoaXMuaGFuZGxlU2VsZWN0Um93KHJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkUm93IHx8IHNlbGVjdGVkUm93Lm9yaWdpbmFsLmRpc2FibGVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLnNlbGVjdH1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuY2xvc2V9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge1xuICAgICAgICAgICAgcmlnaHRQYW5lbCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXBhbmVsIGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbC0tcmlnaHRcIj5cbiAgICAgICAgICAgICAgICB7IHJpZ2h0UGFuZWwgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cblxuU2VhcmNoTW9kYWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgY29tcG9uZW50czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBjb21wb25lbnRzOiB7fSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoTW9kYWw7XG4iXX0=