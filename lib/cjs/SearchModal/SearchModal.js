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
    var localizationTexts = this.props.localizationTexts;

    var fieldObjects = Object.entries(searchFields).map(function (_ref2) {
      var name = _ref2[0],
          value = _ref2[1];
      return { name: name, value: value };
    });
    var columns = fieldObjects.map(function (_ref3) {
      var name = _ref3.name;

      return {
        Header: localizationTexts['column.' + name],
        accessor: name
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
          firstField && this.renderSearchField(firstField, 'searchBy', '00-' + firstField.name, localizationTexts),
          otherFields.map(function (field, i) {
            return _this2.renderSearchField(field, 'by', i + '-' + field.name, localizationTexts);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJSRUFDVF9UQUJMRV9QUk9QUyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJtYW51YWwiLCJzb3J0YWJsZSIsIkRFRkFVTFRfU1RBVEVfVkFMVUVTIiwic2VhcmNoUmVzdWx0cyIsInBhZ2UiLCJwYWdlU2l6ZSIsInBhZ2VzIiwic2VsZWN0ZWRSb3ciLCJ1bmRlZmluZWQiLCJsb2FkaW5nIiwiREVGQVVMVF9URVhUUyIsInByZXZpb3VzIiwibmV4dCIsIm5vRGF0YSIsIm9mIiwicm93cyIsInBhZ2VKdW1wIiwicm93c1NlbGVjdG9yIiwiU2VhcmNoTW9kYWwiLCJwcm9wcyIsInNlYXJjaEZpZWxkcyIsIk9iamVjdCIsImFzc2lnbiIsImZpZWxkcyIsIm1hcCIsImZpZWxkIiwiZGVmYXVsdFNlYXJjaEZpZWxkcyIsImZldGNoVG9rZW4iLCJzdGF0ZSIsInJlbmRlciIsImxvY2FsaXphdGlvblRleHRzIiwiZmllbGRPYmplY3RzIiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImZpcnN0RmllbGQiLCJvdGhlckZpZWxkcyIsInRleHRzIiwicHJldmlvdXNUZXh0IiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwicGFnZUp1bXBUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwidGl0bGUiLCJyZW5kZXJTZWFyY2hGaWVsZCIsImkiLCJoYW5kbGVGZXRjaERhdGEiLCJoYW5kbGVQYWdlQ2hhbmdlIiwiaGFuZGxlUGFnZVNpemVDaGFuZ2UiLCJyb3ciLCJvbkNsaWNrIiwic2VsZWN0Um93IiwiY2xhc3NOYW1lIiwiaW5kZXgiLCJoYW5kbGVTZWxlY3QiLCJzZWxlY3QiLCJjbG9zZSIsIkNvbXBvbmVudCIsInNldFNlYXJjaFZhbHVlIiwiZmllbGROYW1lIiwibmV3U2VhcmNoRmllbGRzIiwic2V0U3RhdGUiLCJmZXRjaERhdGEiLCJvblNlbGVjdCIsIm9yaWdpbmFsIiwib25DbG9zZSIsInJlc29sdmVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJsb2FkT3B0aW9ucyIsIm9mZnNldCIsImxpbWl0IiwiZGF0YSIsInRvdGFsQ291bnQiLCJ0b2tlbiIsInNsaWNlIiwiTWF0aCIsImNlaWwiLCJsYWJlbFByZWZpeCIsImtleSIsInRyYW5zbGF0ZWRQcmVmaXgiLCJ0cmFuc2xhdGVkRmllbGROYW1lIiwiZSIsInRhcmdldCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQUVBLElBQU1BLG9CQUFvQjtBQUN4QkMsa0JBQWdCLElBRFE7O0FBR3hCQyxxQkFBbUIsS0FISztBQUl4QkMsd0JBQXNCLElBSkU7QUFLeEJDLHVCQUFxQixJQUxHO0FBTXhCQyxtQkFBaUIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEdBQWhCLENBTk87QUFPeEJDLG1CQUFpQixFQVBPOztBQVN4QkMsVUFBUSxJQVRnQjtBQVV4QkMsWUFBVTtBQVZjLENBQTFCOztBQWFBLElBQU1DLHVCQUF1QjtBQUMzQkMsaUJBQWUsRUFEWTtBQUUzQkMsUUFBTSxDQUZxQjtBQUczQkMsWUFBVVosa0JBQWtCTSxlQUhEO0FBSTNCTyxTQUFPLENBSm9CO0FBSzNCQyxlQUFhQyxTQUxjO0FBTTNCQyxXQUFTO0FBTmtCLENBQTdCOztBQVNBLElBQU1DLGdCQUFnQjtBQUNwQkMsWUFBVSxVQURVO0FBRXBCQyxRQUFNLE1BRmM7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QyxFQUErQzNELGlCQUEvQyxFQUFxRTtBQUFBLFFBQTVEc0MsU0FBNEQsU0FBbEVuQyxJQUFrRTtBQUFBLFFBQWpEQyxLQUFpRCxTQUFqREEsS0FBaUQ7O0FBQ3ZGLFFBQU13RCxtQkFBbUI1RCxrQkFBa0IwRCxXQUFsQixDQUF6QjtBQUNBLFFBQU1HLHNCQUFzQjdELDZCQUEyQnNDLFNBQTNCLENBQTVCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxzREFBTCxFQUE2RCx1QkFBcUJxQixHQUFsRjtBQUNFO0FBQUE7QUFBQSxVQUFPLFdBQVUsMENBQWpCLEVBQTRELDJCQUF5QnJCLFNBQXJGO0FBQ01zQix3QkFETixTQUMwQkM7QUFEMUIsT0FERjtBQUlFO0FBQ0UsY0FBSyxNQURQO0FBRUUsOEJBQW9CdkIsU0FGdEI7QUFHRSxlQUFPbEMsS0FIVDtBQUlFLGlCQUFTLG9CQUFLO0FBQ1osaUJBQUtpQyxjQUFMLENBQW9CQyxTQUFwQixFQUErQndCLEVBQUVDLE1BQUYsQ0FBUzNELEtBQXhDO0FBQ0Q7QUFOSDtBQUpGLEtBREY7QUFlRCxHOzs7O0FBbUhIaEIsWUFBWTRFLFlBQVosR0FBMkI7QUFDekIxQyxTQUFPLEVBRGtCO0FBRXpCN0IsVUFBUSxFQUZpQjtBQUd6QndELGVBQWE7QUFBQSxXQUFNSCxRQUFRQyxPQUFSLENBQWdCLEVBQUVLLE1BQU0sRUFBUixFQUFZQyxZQUFZLENBQXhCLEVBQWhCLENBQU47QUFBQSxHQUhZO0FBSXpCakMsYUFBVyxLQUpjO0FBS3pCd0IsV0FBUyxtQkFBTSxDQUFFLENBTFE7QUFNekJGLFlBQVUsb0JBQU0sQ0FBRTtBQU5PLENBQTNCOztrQkFTZXRELFciLCJmaWxlIjoiU2VhcmNoTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSAncmVhY3QtdGFibGUnO1xuXG5pbXBvcnQgJy4vU2VhcmNoTW9kYWwuc2Nzcyc7XG5cbmNvbnN0IFJFQUNUX1RBQkxFX1BST1BTID0ge1xuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcblxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFszLCAxMCwgMjAsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDEwLFxuXG4gIG1hbnVhbDogdHJ1ZSxcbiAgc29ydGFibGU6IGZhbHNlLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURV9WQUxVRVMgPSB7XG4gIHNlYXJjaFJlc3VsdHM6IFtdLFxuICBwYWdlOiAwLFxuICBwYWdlU2l6ZTogUkVBQ1RfVEFCTEVfUFJPUFMuZGVmYXVsdFBhZ2VTaXplLFxuICBwYWdlczogMSxcbiAgc2VsZWN0ZWRSb3c6IHVuZGVmaW5lZCxcbiAgbG9hZGluZzogdHJ1ZSxcbn07XG5cbmNvbnN0IERFRkFVTFRfVEVYVFMgPSB7XG4gIHByZXZpb3VzOiAnUHJldmlvdXMnLFxuICBuZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmc6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhOiAnTm8gcm93cyBmb3VuZCcsXG4gIHBhZ2U6ICdQYWdlJyxcbiAgb2Y6ICdvZicsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcGFnZUp1bXA6ICdqdW1wIHRvIHBhZ2UnLFxuICByb3dzU2VsZWN0b3I6ICdyb3dzIHBlciBwYWdlJyxcbn07XG5cblxuY2xhc3MgU2VhcmNoTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHNlYXJjaEZpZWxkcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIC4uLnByb3BzLmZpZWxkcy5tYXAoZmllbGQgPT4gKHtcbiAgICAgICAgW2ZpZWxkXTogJycsXG4gICAgICB9KSksXG4gICAgKTtcbiAgICB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMgPSB7XG4gICAgICAuLi5zZWFyY2hGaWVsZHMsXG4gICAgfTtcbiAgICB0aGlzLmZldGNoVG9rZW4gPSAwO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAuLi5ERUZBVUxUX1NUQVRFX1ZBTFVFU1xuICAgIH07XG4gIH1cblxuICBzZXRTZWFyY2hWYWx1ZSA9IChmaWVsZE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hGaWVsZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV3U2VhcmNoRmllbGRzID0ge1xuICAgICAgLi4uc2VhcmNoRmllbGRzLFxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWFyY2hGaWVsZHM6IG5ld1NlYXJjaEZpZWxkc1xuICAgIH0pO1xuICAgIHRoaXMuZmV0Y2hEYXRhKHtcbiAgICAgIHNlYXJjaEZpZWxkczogbmV3U2VhcmNoRmllbGRzLFxuICAgICAgcGFnZTogMCxcbiAgICB9KTtcbiAgfTtcblxuICBzZWxlY3RSb3cgPSByb3cgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRSb3c6IHJvdyxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VDaGFuZ2UgPSBwYWdlID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVBhZ2VTaXplQ2hhbmdlID0gKHBhZ2VTaXplLCBwYWdlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlU2l6ZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkUm93LFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3Qoc2VsZWN0ZWRSb3cgJiYgc2VsZWN0ZWRSb3cub3JpZ2luYWwpO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC4uLkRFRkFVTFRfU1RBVEVfVkFMVUVTLFxuICAgICAgc2VhcmNoRmllbGRzOiB0aGlzLmRlZmF1bHRTZWFyY2hGaWVsZHMsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gIH07XG5cbiAgaGFuZGxlRmV0Y2hEYXRhID0gKCkgPT4gdGhpcy5mZXRjaERhdGEoKTtcblxuICBmZXRjaERhdGEgPSBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAuLi5zdGF0ZVxuICAgIH07XG4gICAgY29uc3Qge1xuICAgICAgcGFnZSxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgc2VhcmNoRmllbGRzXG4gICAgfSA9IHJlc29sdmVkU3RhdGU7XG4gICAgdGhpcy5mZXRjaFRva2VuID0gdGhpcy5mZXRjaFRva2VuICsgMTtcbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5mZXRjaFRva2VuKS50aGVuKHRva2VuID0+IHtcbiAgICAgIHRoaXMucHJvcHMubG9hZE9wdGlvbnMoe1xuICAgICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICAgIG9mZnNldDogcGFnZSAqIHBhZ2VTaXplLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICB9KS50aGVuKCh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRvdGFsQ291bnQsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdGhpcy5mZXRjaFRva2VuKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBkYXRhLnNsaWNlKDAsIHBhZ2VTaXplKSxcbiAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICBwYWdlczogTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBwYWdlU2l6ZSksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyU2VhcmNoRmllbGQgPSAoeyBuYW1lOiBmaWVsZE5hbWUsIHZhbHVlIH0sIGxhYmVsUHJlZml4LCBrZXksIGxvY2FsaXphdGlvblRleHRzKSA9PiB7XG4gICAgY29uc3QgdHJhbnNsYXRlZFByZWZpeCA9IGxvY2FsaXphdGlvblRleHRzW2xhYmVsUHJlZml4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVkRmllbGROYW1lID0gbG9jYWxpemF0aW9uVGV4dHNbYGZpZWxkLiR7ZmllbGROYW1lfWBdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyYH0ga2V5PXtgc2VhcmNoLWZpZWxkLSR7a2V5fWB9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX21vZGFsLXNlYXJjaC1sYWJlbFwiIGh0bWxGb3I9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH0+XG4gICAgICAgICAge2Ake3RyYW5zbGF0ZWRQcmVmaXh9ICR7dHJhbnNsYXRlZEZpZWxkTmFtZX1gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgaWQ9e2BzZWFyY2gtZmllbGQtJHtmaWVsZE5hbWV9YH1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25JbnB1dD17ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFNlYXJjaFZhbHVlKGZpZWxkTmFtZSwgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFJlc3VsdHMsXG4gICAgICBzZWFyY2hGaWVsZHMsXG4gICAgICBsb2FkaW5nLFxuICAgICAgc2VsZWN0ZWRSb3csXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlU2l6ZSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBsb2NhbGl6YXRpb25UZXh0c1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkT2JqZWN0cyA9IE9iamVjdC5lbnRyaWVzKHNlYXJjaEZpZWxkcykubWFwKChbbmFtZSwgdmFsdWVdKSA9PiAoeyBuYW1lLCB2YWx1ZSB9KSk7XG4gICAgY29uc3QgY29sdW1ucyA9IGZpZWxkT2JqZWN0cy5tYXAoKHsgbmFtZSB9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIZWFkZXI6IGxvY2FsaXphdGlvblRleHRzW2Bjb2x1bW4uJHtuYW1lfWBdLFxuICAgICAgICBhY2Nlc3NvcjogbmFtZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc3QgW2ZpcnN0RmllbGQsIC4uLm90aGVyRmllbGRzXSA9IGZpZWxkT2JqZWN0cztcblxuICAgIGNvbnN0IHRleHRzID0ge1xuICAgICAgcHJldmlvdXNUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wcmV2aW91cyB8fCBERUZBVUxUX1RFWFRTLnByZXZpb3VzLFxuICAgICAgbmV4dFRleHQ6IGxvY2FsaXphdGlvblRleHRzLm5leHQgfHwgREVGQVVMVF9URVhUUy5uZXh0LFxuICAgICAgbG9hZGluZ1RleHQ6IGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgREVGQVVMVF9URVhUUy5sb2FkaW5nLFxuICAgICAgbm9EYXRhVGV4dDogbG9jYWxpemF0aW9uVGV4dHMubm9EYXRhIHx8IERFRkFVTFRfVEVYVFMubm9EYXRhLFxuICAgICAgcGFnZVRleHQ6IGxvY2FsaXphdGlvblRleHRzLnBhZ2UgfHwgREVGQVVMVF9URVhUUy5wYWdlLFxuICAgICAgb2ZUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5vZiB8fCBERUZBVUxUX1RFWFRTLm9mLFxuICAgICAgcm93c1RleHQ6IGxvY2FsaXphdGlvblRleHRzLnJvd3MgfHwgREVGQVVMVF9URVhUUy5yb3dzLFxuICAgICAgcGFnZUp1bXBUZXh0OiBsb2NhbGl6YXRpb25UZXh0cy5wYWdlSnVtcCB8fCBERUZBVUxUX1RFWFRTLnBhZ2VKdW1wLFxuICAgICAgcm93c1NlbGVjdG9yVGV4dDogbG9jYWxpemF0aW9uVGV4dHMucm93c1NlbGVjdG9yIHx8IERFRkFVTFRfVEVYVFMucm93c1NlbGVjdG9yLFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsIGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbFwiIHNob3c9e3RoaXMucHJvcHMuc2hvd01vZGFsfSBvbkhpZGU9e3RoaXMuaGFuZGxlQ2xvc2V9PlxuICAgICAgICA8TW9kYWwuSGVhZGVyIGNsb3NlQnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudGl0bGUgfVxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtZmlsdGVyc1wiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmaXJzdEZpZWxkICYmIHRoaXMucmVuZGVyU2VhcmNoRmllbGQoXG4gICAgICAgICAgICAgICAgZmlyc3RGaWVsZCxcbiAgICAgICAgICAgICAgICAnc2VhcmNoQnknLFxuICAgICAgICAgICAgICAgIGAwMC0ke2ZpcnN0RmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3RoZXJGaWVsZHMubWFwKFxuICAgICAgICAgICAgICAgIChmaWVsZCwgaSkgPT4gdGhpcy5yZW5kZXJTZWFyY2hGaWVsZChcbiAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgJ2J5JyxcbiAgICAgICAgICAgICAgICAgIGAke2l9LSR7ZmllbGQubmFtZX1gLFxuICAgICAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19tb2RhbC1zZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgey4uLlJFQUNUX1RBQkxFX1BST1BTfVxuICAgICAgICAgICAgICB7Li4udGV4dHN9XG4gICAgICAgICAgICAgIGRhdGE9e3NlYXJjaFJlc3VsdHN9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgbG9hZGluZ1RleHQ9e2xvY2FsaXphdGlvblRleHRzLmxvYWRpbmd9XG4gICAgICAgICAgICAgIG5vRGF0YVRleHQ9e2xvYWRpbmcgPyAnJyA6IGxvY2FsaXphdGlvblRleHRzLm5vRGF0YX1cbiAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgcGFnZXM9e3BhZ2VzfVxuICAgICAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAgICAgICBvbkZldGNoRGF0YT17dGhpcy5oYW5kbGVGZXRjaERhdGF9XG4gICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5oYW5kbGVQYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlPXt0aGlzLmhhbmRsZVBhZ2VTaXplQ2hhbmdlfVxuICAgICAgICAgICAgICBnZXRUclByb3BzPXtcbiAgICAgICAgICAgICAgICAoc3RhdGUsIHJvdykgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2VsZWN0Um93KHJvdyksXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHNlbGVjdGVkUm93ICYmIHJvdyAmJiBzZWxlY3RlZFJvdy5pbmRleCA9PT0gcm93LmluZGV4ID8gXCJzZWxlY3RlZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgIGRpc2FibGVkPXshc2VsZWN0ZWRSb3d9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyBsb2NhbGl6YXRpb25UZXh0cy5zZWxlY3QgfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gYnNTdHlsZT1cImRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgIHsgbG9jYWxpemF0aW9uVGV4dHMuY2xvc2UgfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5TZWFyY2hNb2RhbC5wcm9wVHlwZXMgPSB7XG4gIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cblNlYXJjaE1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGl0bGU6ICcnLFxuICBmaWVsZHM6IFtdLFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogW10sIHRvdGFsQ291bnQ6IDAgfSksXG4gIHNob3dNb2RhbDogZmFsc2UsXG4gIG9uQ2xvc2U6ICgpID0+IHt9LFxuICBvblNlbGVjdDogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hNb2RhbDtcbiJdfQ==