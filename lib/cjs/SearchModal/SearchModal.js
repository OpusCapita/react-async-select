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
      { className: 'combobox-with-search__modal', show: true, onHide: this.handleClose },
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
            getTrProps: function getTrProps(state, row) {
              return {
                onClick: function onClick() {
                  return _this2.handleSelectRow(row);
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
      }).then(function (_ref4) {
        var data = _ref4.data,
            totalCount = _ref4.totalCount;

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
  onClose: function onClose() {},
  onSelect: function onSelect() {}
};

exports.default = SearchModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfVEVYVFMiLCJwcmV2aW91cyIsIm5leHQiLCJsb2FkaW5nIiwibm9EYXRhIiwicGFnZSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwic3RhdGUiLCJzZWFyY2hSZXN1bHRzIiwicGFnZVNpemUiLCJwYWdlcyIsInNlbGVjdGVkUm93IiwidW5kZWZpbmVkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZmV0Y2hEYXRhIiwicmVuZGVyIiwibG9jYWxpemF0aW9uVGV4dHMiLCJmaWx0ZXJzIiwicmVuZGVyZXJzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsIkNlbGwiLCJBZGRpdGlvbmFsQ29tcG9uZW50IiwiY29sdW1uIiwiaWQiLCJvcmlnaW5hbCIsImRpc2FibGVkIiwiZmlyc3RGaWVsZCIsIm90aGVyRmllbGRzIiwidGV4dHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwiaGFuZGxlQ2xvc2UiLCJ0aXRsZSIsInJlbmRlclNlYXJjaEZpZWxkIiwiaSIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVQYWdlU2l6ZUNoYW5nZSIsInJvdyIsIm9uQ2xpY2siLCJoYW5kbGVTZWxlY3RSb3ciLCJjbGFzc05hbWUiLCJpbmRleCIsImhhbmRsZVNlbGVjdCIsInNlbGVjdCIsImNsb3NlIiwiQ29tcG9uZW50Iiwic2V0U2VhcmNoVmFsdWUiLCJmaWVsZE5hbWUiLCJzZXRTdGF0ZSIsIm9uU2VsZWN0Iiwib25DbG9zZSIsImZldGNoVG9rZW4iLCJyZXNvbHZlZFN0YXRlIiwibG9hZE9wdGlvbnMiLCJvZmZzZXQiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwidG90YWxDb3VudCIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsIkZpbHRlciIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0FBR0EsSUFBTUEsb0JBQW9CO0FBQ3hCQyxrQkFBZ0IsSUFEUTtBQUV4QkMscUJBQW1CLEtBRks7QUFHeEJDLHdCQUFzQixJQUhFO0FBSXhCQyx1QkFBcUIsSUFKRztBQUt4QkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixHQUFoQixDQUxPO0FBTXhCQyxtQkFBaUIsRUFOTztBQU94QkMsVUFBUSxJQVBnQjtBQVF4QkMsWUFBVTtBQVJjLENBQTFCOztBQVlBLElBQU1DLGdCQUFnQjtBQUNwQkMsWUFBVSxVQURVO0FBRXBCQyxRQUFNLE1BRmM7QUFHcEJDLFdBQVMsWUFIVztBQUlwQkMsVUFBUSxlQUpZO0FBS3BCQyxRQUFNLE1BTGM7QUFNcEJDLE1BQUksSUFOZ0I7QUFPcEJDLFFBQU0sTUFQYztBQVFwQkMsWUFBVSxjQVJVO0FBU3BCQyxnQkFBYztBQVRNLENBQXRCOztJQWFN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O0FBSlg7QUFKRixLQURGO0FBYUQsRzs7OztBQXNJSHZCLFlBQVltRixZQUFaLEdBQTJCO0FBQ3pCckMsU0FBTyxFQURrQjtBQUV6QnpDLFVBQVEsRUFGaUI7QUFHekI4RCxlQUFhO0FBQUEsV0FBTWlCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRWQsTUFBTSxFQUFSLEVBQVlDLFlBQVksQ0FBeEIsRUFBaEIsQ0FBTjtBQUFBLEdBSFk7QUFJekJSLFdBQVMsbUJBQU0sQ0FDZCxDQUx3QjtBQU16QkQsWUFBVSxvQkFBTSxDQUNmO0FBUHdCLENBQTNCOztrQkFXZS9ELFciLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cblxuY29uc3QgUkVBQ1RfVEFCTEVfUFJPUFMgPSB7XG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuICBtYW51YWw6IHRydWUsXG4gIHNvcnRhYmxlOiBmYWxzZSxcbn07XG5cblxuY29uc3QgREVGQVVMVF9URVhUUyA9IHtcbiAgcHJldmlvdXM6ICdQcmV2aW91cycsXG4gIG5leHQ6ICdOZXh0JyxcbiAgbG9hZGluZzogJ0xvYWRpbmcuLi4nLFxuICBub0RhdGE6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZTogJ1BhZ2UnLFxuICBvZjogJ29mJyxcbiAgcm93czogJ3Jvd3MnLFxuICBwYWdlSnVtcDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvcjogJ3Jvd3MgcGVyIHBhZ2UnLFxufTtcblxuXG5jbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoRmllbGRzLFxuICAgICAgc2VhcmNoUmVzdWx0czogW10sXG4gICAgICBwYWdlOiAwLFxuICAgICAgcGFnZVNpemU6IFJFQUNUX1RBQkxFX1BST1BTLmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIHBhZ2VzOiAxLFxuICAgICAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfTtcbiAgfVxuXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG4gIH1cblxuXG4gIHNldFNlYXJjaFZhbHVlID0gKGZpZWxkTmFtZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaEZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmZldGNoRGF0YSh7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc2VhcmNoRmllbGRzOiB7IC4uLnNlYXJjaEZpZWxkcywgW2ZpZWxkTmFtZV06IHZhbHVlIH1cbiAgICB9KTtcbiAgfTtcblxuXG4gIGhhbmRsZVNlbGVjdFJvdyA9IHJvdyA9PiB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSb3c6IHJvdyB9KTtcblxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLmZldGNoRGF0YSh7IHBhZ2UgfSk7XG4gIH07XG5cblxuICBoYW5kbGVQYWdlU2l6ZUNoYW5nZSA9IChwYWdlU2l6ZSwgcGFnZSkgPT4gdGhpcy5mZXRjaERhdGEoeyBwYWdlU2l6ZSwgcGFnZSB9KTtcblxuXG4gIGhhbmRsZVNlbGVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkUm93IH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cblxuICBmZXRjaFRva2VuID0gMDtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcbiAgICBjb25zdCB7IHBhZ2UsIHBhZ2VTaXplLCBzZWFyY2hGaWVsZHMgfSA9IHJlc29sdmVkU3RhdGU7XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgeyAuLi5yZXNvbHZlZFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmV0Y2hUb2tlbiA9IHRoaXMuZmV0Y2hUb2tlbiArIDE7XG4gICAgICAgIGNvbnN0IGZldGNoVG9rZW4gPSB0aGlzLmZldGNoVG9rZW47XG4gICAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICAgIHNlYXJjaEZpZWxkcyxcbiAgICAgICAgICBvZmZzZXQ6IHBhZ2UgKiBwYWdlU2l6ZSxcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIH0pLnRoZW4oKHsgZGF0YSwgdG90YWxDb3VudCwgfSkgPT4ge1xuICAgICAgICAgIGlmIChmZXRjaFRva2VuID09PSB0aGlzLmZldGNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgICAgcGFnZXM6IE1hdGguY2VpbCh0b3RhbENvdW50IC8gcGFnZVNpemUpLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH07XG5cblxuICByZW5kZXJTZWFyY2hGaWVsZCA9ICh7IG5hbWU6IGZpZWxkTmFtZSwgdmFsdWUgfSwgbGFiZWxQcmVmaXgsIGtleSwgbG9jYWxpemF0aW9uVGV4dHMsIGZpbHRlcnMpID0+IHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnN0IEZpbHRlciA9IGZpbHRlcnNbZmllbGROYW1lXTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb21ib2JveC13aXRoLWN1c3RvbS1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXInIGtleT17YHNlYXJjaC1maWVsZC0ke2tleX1gfT5cbiAgICAgICAgICA8RmlsdGVyIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCB2YWx1ZSl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2xhdGVkUHJlZml4ID0gbG9jYWxpemF0aW9uVGV4dHNbbGFiZWxQcmVmaXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZE5hbWUgPSBsb2NhbGl6YXRpb25UZXh0c1tgZmllbGQuJHtmaWVsZE5hbWV9YF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1maWx0ZXJgfSBrZXk9e2BzZWFyY2gtZmllbGQtJHtrZXl9YH0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWxhYmVsXCIgaHRtbEZvcj17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfT5cbiAgICAgICAgICB7YCR7dHJhbnNsYXRlZFByZWZpeH0gJHt0cmFuc2xhdGVkRmllbGROYW1lfWB9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBpZD17YHNlYXJjaC1maWVsZC0ke2ZpZWxkTmFtZX1gfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbklucHV0PXtlID0+IHRoaXMuc2V0U2VhcmNoVmFsdWUoZmllbGROYW1lLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZE9iamVjdHMgPSBPYmplY3QuZW50cmllcyhzZWFyY2hGaWVsZHMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWUgfSkpO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBmaWVsZE9iamVjdHMubWFwKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSGVhZGVyOiBsb2NhbGl6YXRpb25UZXh0c1tgY29sdW1uLiR7bmFtZX1gXSxcbiAgICAgICAgYWNjZXNzb3I6IG5hbWUsXG4gICAgICAgIENlbGw6IHByb3BzID0+IHtcbiAgICAgICAgICBjb25zdCBBZGRpdGlvbmFsQ29tcG9uZW50ID0gcmVuZGVyZXJzICYmIHJlbmRlcmVyc1twcm9wcy5jb2x1bW4uaWRdIHx8IG51bGw7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY2VsbC12YWx1ZSBjZWxsLXZhbHVlLSR7cHJvcHMub3JpZ2luYWwuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogJyd9YH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBZGRpdGlvbmFsQ29tcG9uZW50ID9cbiAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsQ29tcG9uZW50IHsuLi5wcm9wcy5vcmlnaW5hbH0vPiA6XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cHJvcHMudmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IFtmaXJzdEZpZWxkLCAuLi5vdGhlckZpZWxkc10gPSBmaWVsZE9iamVjdHM7XG5cbiAgICBjb25zdCB0ZXh0cyA9IHtcbiAgICAgIHByZXZpb3VzVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucHJldmlvdXMgfHwgREVGQVVMVF9URVhUUy5wcmV2aW91cyxcbiAgICAgIG5leHRUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5uZXh0IHx8IERFRkFVTFRfVEVYVFMubmV4dCxcbiAgICAgIGxvYWRpbmdUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8IERFRkFVTFRfVEVYVFMubG9hZGluZyxcbiAgICAgIG5vRGF0YVRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YSB8fCBERUZBVUxUX1RFWFRTLm5vRGF0YSxcbiAgICAgIHBhZ2VUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlIHx8IERFRkFVTFRfVEVYVFMucGFnZSxcbiAgICAgIG9mVGV4dDogbG9jYWxpemF0aW9uVGV4dHMub2YgfHwgREVGQVVMVF9URVhUUy5vZixcbiAgICAgIHJvd3NUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5yb3dzIHx8IERFRkFVTFRfVEVYVFMucm93cyxcbiAgICAgIHBhZ2VKdW1wVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucGFnZUp1bXAgfHwgREVGQVVMVF9URVhUUy5wYWdlSnVtcCxcbiAgICAgIHJvd3NTZWxlY3RvclRleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3NTZWxlY3RvciB8fCBERUZBVUxUX1RFWFRTLnJvd3NTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWxcIiBzaG93PXt0cnVlfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICA8L2g0PlxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cbiAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLWZpbHRlcnNcIj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlyc3RGaWVsZCAmJiB0aGlzLnJlbmRlclNlYXJjaEZpZWxkKFxuICAgICAgICAgICAgICAgIGZpcnN0RmllbGQsXG4gICAgICAgICAgICAgICAgJ3NlYXJjaEJ5JyxcbiAgICAgICAgICAgICAgICBgMDAtJHtmaXJzdEZpZWxkLm5hbWV9YCxcbiAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJzXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fbW9kYWwtc2VhcmNoLXJlc3VsdHNcIj5cbiAgICAgICAgICAgIDxSZWFjdFRhYmxlXG4gICAgICAgICAgICAgIHsuLi5SRUFDVF9UQUJMRV9QUk9QU31cbiAgICAgICAgICAgICAgey4uLnRleHRzfVxuICAgICAgICAgICAgICBkYXRhPXtzZWFyY2hSZXN1bHRzfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBwYWdlU2l6ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgIGxvYWRpbmdUZXh0PXtsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nfVxuICAgICAgICAgICAgICBub0RhdGFUZXh0PXtsb2FkaW5nID8gJycgOiBsb2NhbGl6YXRpb25UZXh0cy5ub0RhdGF9XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuaGFuZGxlUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgICAgIGdldFRyUHJvcHM9e1xuICAgICAgICAgICAgICAgIChzdGF0ZSwgcm93KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gdGhpcy5oYW5kbGVTZWxlY3RSb3cocm93KSxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogc2VsZWN0ZWRSb3cgJiYgcm93ICYmIHNlbGVjdGVkUm93LmluZGV4ID09PSByb3cuaW5kZXggPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFJvdyB8fCBzZWxlY3RlZFJvdy5vcmlnaW5hbC5kaXNhYmxlZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bG9jYWxpemF0aW9uVGV4dHMuc2VsZWN0fVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgIHtsb2NhbGl6YXRpb25UZXh0cy5jbG9zZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cblxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuXG5TZWFyY2hNb2RhbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgZmllbGRzOiBbXSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IFtdLCB0b3RhbENvdW50OiAwIH0pLFxuICBvbkNsb3NlOiAoKSA9PiB7XG4gIH0sXG4gIG9uU2VsZWN0OiAoKSA9PiB7XG4gIH0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaE1vZGFsO1xuIl19