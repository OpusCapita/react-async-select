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
        onHide: this.handleClose
      },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfVEVYVFMiLCJwcmV2aW91cyIsIm5leHQiLCJsb2FkaW5nIiwibm9EYXRhIiwicGFnZSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiZ2V0RGlhbG9nQ2xhc3NOYW1lIiwicGFuZWxzIiwicGFuZWxDb3VudCIsImZpbHRlciIsInZhbCIsImxlbmd0aCIsIlNlYXJjaE1vZGFsIiwicHJvcHMiLCJzZWFyY2hGaWVsZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsInN0YXRlIiwic2VhcmNoUmVzdWx0cyIsInBhZ2VTaXplIiwicGFnZXMiLCJzZWxlY3RlZFJvdyIsInVuZGVmaW5lZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImZldGNoRGF0YSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmlsdGVycyIsInJlbmRlcmVycyIsImNvbXBvbmVudHMiLCJMZWZ0UGFuZWwiLCJSaWdodFBhbmVsIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwibGVmdFBhbmVsIiwicmlnaHRQYW5lbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiaGFuZGxlU2VsZWN0Um93IiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZWxlY3QiLCJjbG9zZSIsIkNvbXBvbmVudCIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwic2V0U3RhdGUiLCJvblNlbGVjdCIsIm9uQ2xvc2UiLCJmZXRjaFRva2VuIiwicmVzb2x2ZWRTdGF0ZSIsImxvYWRPcHRpb25zIiwib2Zmc2V0IiwibGltaXQiLCJ0aGVuIiwiZGF0YSIsInRvdGFsQ291bnQiLCJzbGljZSIsIk1hdGgiLCJjZWlsIiwibGFiZWxQcmVmaXgiLCJrZXkiLCJGaWx0ZXIiLCJ0cmFuc2xhdGVkUHJlZml4IiwidHJhbnNsYXRlZEZpZWxkTmFtZSIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQUdBLElBQU1BLG9CQUFvQjtBQUN4QkMsa0JBQWdCLElBRFE7QUFFeEJDLHFCQUFtQixLQUZLO0FBR3hCQyx3QkFBc0IsSUFIRTtBQUl4QkMsdUJBQXFCLElBSkc7QUFLeEJDLG1CQUFpQixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEdBQWIsQ0FMTztBQU14QkMsbUJBQWlCLEVBTk87QUFPeEJDLFVBQVEsSUFQZ0I7QUFReEJDLFlBQVU7QUFSYyxDQUExQjs7QUFZQSxJQUFNQyxnQkFBZ0I7QUFDcEJDLFlBQVUsVUFEVTtBQUVwQkMsUUFBTSxNQUZjO0FBR3BCQyxXQUFTLFlB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Y0FBTCxDQUFvQkMsU0FBcEIsRUFBK0JvQixFQUFFQyxNQUFGLENBQVM3RCxLQUF4QyxDQUFMO0FBQUE7QUFKWDtBQUpGLEtBREY7QUFhRCxHOzs7O0FBK0tIMUIsWUFBWXdGLFlBQVosR0FBMkI7QUFDekJyQyxTQUFPLEVBRGtCO0FBRXpCOUMsVUFBUSxFQUZpQjtBQUd6Qm1FLGVBQWE7QUFBQSxXQUFNaUIsUUFBUUMsT0FBUixDQUFnQixFQUFFZCxNQUFNLEVBQVIsRUFBWUMsWUFBWSxDQUF4QixFQUFoQixDQUFOO0FBQUEsR0FIWTtBQUl6QlIsV0FBUyxtQkFBTSxDQUFFLENBSlE7QUFLekJELFlBQVUsb0JBQU0sQ0FBRSxDQUxPO0FBTXpCaEQsY0FBWTtBQU5hLENBQTNCOztrQkFVZXBCLFciLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFsxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jb25zdCBnZXREaWFsb2dDbGFzc05hbWUgPSAoeyBwYW5lbHMgfSkgPT4ge1xuICBjb25zdCBwYW5lbENvdW50ID0gcGFuZWxzLmZpbHRlcih2YWwgPT4gISF2YWwpLmxlbmd0aCArIDE7XG4gIHJldHVybiBgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXdpdGgtJHtwYW5lbENvdW50fS1wYW5lbHNgO1xufTtcblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBzZWFyY2hGaWVsZHMgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICAuLi5wcm9wcy5maWVsZHMubWFwKGZpZWxkID0+ICh7XG4gICAgICAgIFtmaWVsZF06ICcnLFxuICAgICAgfSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IFtdLFxuICAgICAgcGFnZTogMCxcbiAgICAgIHBhZ2VTaXplOiBSRUFDVF9UQUJMRV9QUk9QUy5kZWZhdWx0UGFnZVNpemUsXG4gICAgICBwYWdlczogMSxcbiAgICAgIHNlbGVjdGVkUm93OiB1bmRlZmluZWQsXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgIH07XG4gIH1cblxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuICB9XG5cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5mZXRjaERhdGEoe1xuICAgICAgcGFnZTogMCxcbiAgICAgIHNlYXJjaEZpZWxkczogeyAuLi5zZWFyY2hGaWVsZHMsIFtmaWVsZE5hbWVdOiB2YWx1ZSB9XG4gICAgfSk7XG4gIH07XG5cblxuICBoYW5kbGVTZWxlY3RSb3cgPSByb3cgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkUm93OiByb3cgfSk7XG5cblxuICBoYW5kbGVQYWdlQ2hhbmdlID0gcGFnZSA9PiB7XG4gICAgdGhpcy5mZXRjaERhdGEoeyBwYWdlIH0pO1xuICB9O1xuXG5cbiAgaGFuZGxlUGFnZVNpemVDaGFuZ2UgPSAocGFnZVNpemUsIHBhZ2UpID0+IHRoaXMuZmV0Y2hEYXRhKHsgcGFnZVNpemUsIHBhZ2UgfSk7XG5cblxuICBoYW5kbGVTZWxlY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZFJvdyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkUm93ICYmIHNlbGVjdGVkUm93Lm9yaWdpbmFsKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH07XG5cblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpO1xuXG5cbiAgZmV0Y2hUb2tlbiA9IDA7XG5cbiAgZmV0Y2hEYXRhID0gc3RhdGUgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLnN0YXRlIH07XG4gICAgY29uc3QgeyBwYWdlLCBwYWdlU2l6ZSwgc2VhcmNoRmllbGRzIH0gPSByZXNvbHZlZFN0YXRlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHsgLi4ucmVzb2x2ZWRTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW4gKyAxO1xuICAgICAgICBjb25zdCBmZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuO1xuICAgICAgICB0aGlzLnByb3BzLmxvYWRPcHRpb25zKHtcbiAgICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgICAgb2Zmc2V0OiBwYWdlICogcGFnZVNpemUsXG4gICAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICB9KS50aGVuKCh7IGRhdGEsIHRvdGFsQ291bnQsIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmV0Y2hUb2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogZGF0YS5zbGljZSgwLCBwYWdlU2l6ZSksXG4gICAgICAgICAgICAgIHBhZ2VzOiBNYXRoLmNlaWwodG90YWxDb3VudCAvIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzLCBmaWx0ZXJzKSA9PiB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVyc1tmaWVsZE5hbWVdKSB7XG4gICAgICBjb25zdCBGaWx0ZXIgPSBmaWx0ZXJzW2ZpZWxkTmFtZV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29tYm9ib3gtd2l0aC1jdXN0b20tc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyJyBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgICAgPEZpbHRlciB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgdmFsdWUpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzZWFyY2hSZXN1bHRzLFxuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgICAgcGFnZXMsXG4gICAgICBwYWdlLFxuICAgICAgcGFnZVNpemUsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgY29tcG9uZW50czogeyBMZWZ0UGFuZWwsIFJpZ2h0UGFuZWwgfSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBsb2NhbGl6YXRpb25UZXh0c1tgY29sdW1uLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICAgIENlbGw6IHByb3BzID0+IHtcbiAgICAgICAgICBjb25zdCBBZGRpdGlvbmFsQ29tcG9uZW50ID0gcmVuZGVyZXJzICYmIHJlbmRlcmVyc1twcm9wcy5jb2x1bW4uaWRdIHx8IG51bGw7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2VsbC12YWx1ZSBjZWxsLXZhbHVlLSR7cHJvcHMub3JpZ2luYWwuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9YH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBZGRpdGlvbmFsQ29tcG9uZW50ID9cbiAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsQ29tcG9uZW50IHsuLi5wcm9wcy5vcmlnaW5hbH0vPiA6XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cHJvcHMudmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICBjb25zdCB0ZXh0cyA9IHtcbiAgICAgIHByZXZpb3VzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucHJldmlvdXMgfHwgREVGQVVMVF9URVhUUy5wcmV2aW91cyxcbiAgICAgIG5leHRUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5uZXh0IHx8IERFRkFVTFRfVEVYVFMubmV4dCxcbiAgICAgIGxvYWRpbmdUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8IERFRkFVTFRfVEVYVFMubG9hZGluZyxcbiAgICAgIG5vRGF0YVRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YSB8fCBERUZBVUxUX1RFWFRTLm5vRGF0YSxcbiAgICAgIHBhZ2VUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlIHx8IERFRkFVTFRfVEVYVFMucGFnZSxcbiAgICAgIG9mVGV4dDogbG9jYWxpemF0aW9uVGV4dHMub2YgfHwgREVGQVVMVF9URVhUUy5vZixcbiAgICAgIHJvd3NUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzIHx8IERFRkFVTFRfVEVYVFMucm93cyxcbiAgICAgIHBhZ2VKdW1wVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZUp1bXAgfHwgREVGQVVMVF9URVhUUy5wYWdlSnVtcCxcbiAgICAgIHJvd3NTZWxlY3RvclRleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3NTZWxlY3RvciB8fCBERUZBVUxUX1RFWFRTLnJvd3NTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgY29uc3QgbGVmdFBhbmVsID0gTGVmdFBhbmVsICYmICg8TGVmdFBhbmVsIHNlbGVjdGVkUm93PXtzZWxlY3RlZFJvd30vPik7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IFJpZ2h0UGFuZWwgJiYgKDxSaWdodFBhbmVsIHNlbGVjdGVkUm93PXtzZWxlY3RlZFJvd30vPik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiXG4gICAgICAgIGRpYWxvZ0NsYXNzTmFtZT17Z2V0RGlhbG9nQ2xhc3NOYW1lKHsgcGFuZWxzOiBbbGVmdFBhbmVsLCByaWdodFBhbmVsXSB9KX1cbiAgICAgICAgc2hvdz17dHJ1ZX1cbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbHNcIj5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBsZWZ0UGFuZWwgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLWxlZnRcIj5cbiAgICAgICAgICAgICAgICB7IGxlZnRQYW5lbCB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLWNlbnRlclwiPlxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj17dHJ1ZX0+XG4gICAgICAgICAgICAgIDxoND5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJzXCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgICAgICBgMDAtJHtmaXJzdEZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgICAgICAoZmllbGQsIGkpID0+IHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgICAgICBgJHtpfS0ke2ZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgICAgICB7Li4uUkVBQ1RfVEFCTEVfUFJPUFN9XG4gICAgICAgICAgICAgICAgICB7Li4udGV4dHN9XG4gICAgICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgbm9EYXRhVGV4dD17bG9hZGluZyA/ICcnIDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhfVxuICAgICAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBnZXRUckdyb3VwUHJvcHM9e1xuICAgICAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICFyb3cgPyBcImhpZGRlblwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB0aGlzLmhhbmRsZVNlbGVjdFJvdyhyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkUm93ICYmIHJvdyAmJiBzZWxlY3RlZFJvdy5pbmRleCA9PT0gcm93LmluZGV4ID8gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvdyB8fCBzZWxlY3RlZFJvdy5vcmlnaW5hbC5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5zZWxlY3R9XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIGJzU3R5bGU9XCJkZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZX0+XG4gICAgICAgICAgICAgICAge2xvY2FsaXphdGlvblRleHRzLmNsb3NlfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJpZ2h0UGFuZWwgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1wYW5lbCBjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtcGFuZWwtLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgeyByaWdodFBhbmVsIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5cblNlYXJjaE1vZGFsLnByb3BUeXBlcyA9IHtcbiAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGNvbXBvbmVudHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cblxuU2VhcmNoTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG4gIGZpZWxkczogW10sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBkYXRhOiBbXSwgdG90YWxDb3VudDogMCB9KSxcbiAgb25DbG9zZTogKCkgPT4ge30sXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgY29tcG9uZW50czoge30sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19