'use strict';

exports.__esModule = true;
exports.ComboboxWithSearch = exports.DEBOUNCE_LIMIT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIcons = require('@opuscapita/react-icons');

var _reactSelect = require('@opuscapita/react-select');

var _reactSelect2 = require('react-select');

var _awesomeDebouncePromise = require('awesome-debounce-promise');

var _awesomeDebouncePromise2 = _interopRequireDefault(_awesomeDebouncePromise);

var _FloatingMenu = require('./FloatingMenu');

var _FloatingMenu2 = _interopRequireDefault(_FloatingMenu);

var _SearchModal = require('../SearchModal');

var _SearchModal2 = _interopRequireDefault(_SearchModal);

require('react-table/react-table.css');

require('./ComboboxWithSearch.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIZE = {
  width: 15,
  height: 15
};

var DEBOUNCE_LIMIT = exports.DEBOUNCE_LIMIT = 500;

var ComboboxWithSearch = exports.ComboboxWithSearch = function (_Component) {
  _inherits(ComboboxWithSearch, _Component);

  function ComboboxWithSearch(props) {
    _classCallCheck(this, ComboboxWithSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleOpen = function () {
      _this.setState({
        showModal: true
      });
    };

    _this.handleClose = function () {
      _this.setState({
        showModal: false
      });
    };

    _this.state = {
      showModal: false
    };

    _this.loadOptionsDebounced = (0, _awesomeDebouncePromise2.default)(props.loadOptions, DEBOUNCE_LIMIT);
    return _this;
  }

  ComboboxWithSearch.prototype.componentDidMount = function componentDidMount() {
    this.dropdownFieldNode = _reactDom2.default.findDOMNode(this);
  };

  ComboboxWithSearch.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onSelect = _props.onSelect,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        value = _props.value,
        extraProps = _objectWithoutProperties(_props, ['onSelect', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal', 'value']);

    var DropdownIndicator = function DropdownIndicator(props) {
      return !isDisabled && _react2.default.createElement(
        'div',
        { className: 'combobox-with-search__search-button' },
        _react2.default.createElement(_reactIcons.Icon, _extends({
          type: 'indicator',
          name: 'search',
          onClick: _this2.handleOpen
        }, ICON_SIZE))
      );
    };
    var Menu = function Menu(props) {
      var newProps = _extends({}, props, {
        dropdownFieldNode: _this2.dropdownFieldNode
      });
      return (0, _FloatingMenu2.default)(newProps);
    };

    return _react2.default.createElement(
      'div',
      { className: 'combobox-with-search' },
      _react2.default.createElement(
        'div',
        { className: 'combobox-with-search__combobox' },
        _react2.default.createElement(_reactSelect.Async, _extends({}, extraProps, {
          isDisabled: isDisabled,
          loadOptions: this.loadOptionsDebounced,
          onChange: onSelect,
          value: value,
          components: {
            DropdownIndicator: DropdownIndicator,
            Menu: Menu
          },
          noOptionsMessage: function noOptionsMessage() {
            return localizationTexts.noItems || '--';
          },
          loadingMessage: function loadingMessage() {
            return localizationTexts.loading || 'Loading...';
          },
          filterOption: (0, _reactSelect2.createFilter)({
            ignoreCase: true,
            ignoreAccents: false,
            matchFrom: 'any'
          }),
          innerRef: function innerRef(node) {
            _this2.props.setRef(node);
          },
          onKeyDown: this.props.onKeyDown
        }))
      ),
      this.state.showModal ? _react2.default.createElement(_SearchModal2.default, _extends({
        onClose: this.handleClose,
        onSelect: onSelect,
        localizationTexts: localizationTexts,
        filters: filters,
        renderers: renderers
      }, modalProps)) : null
    );
  };

  return ComboboxWithSearch;
}(_react.Component);

ComboboxWithSearch.defaultProps = {
  loadOptions: function loadOptions() {
    return Promise.resolve([]);
  },
  onSelect: function onSelect() {},
  isDisabled: false,
  setRef: function setRef() {},
  onKeyDown: function onKeyDown() {}
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiREVCT1VOQ0VfTElNSVQiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsImhhbmRsZU9wZW4iLCJzZXRTdGF0ZSIsInNob3dNb2RhbCIsImhhbmRsZUNsb3NlIiwic3RhdGUiLCJsb2FkT3B0aW9uc0RlYm91bmNlZCIsImxvYWRPcHRpb25zIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJyZW5kZXIiLCJvblNlbGVjdCIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJ2YWx1ZSIsImV4dHJhUHJvcHMiLCJEcm9wZG93bkluZGljYXRvciIsIk1lbnUiLCJuZXdQcm9wcyIsIm5vSXRlbXMiLCJsb2FkaW5nIiwiaWdub3JlQ2FzZSIsImlnbm9yZUFjY2VudHMiLCJtYXRjaEZyb20iLCJub2RlIiwic2V0UmVmIiwib25LZXlEb3duIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQkMsU0FBTyxFQURTO0FBRWhCQyxVQUFRO0FBRlEsQ0FBbEI7O0FBS08sSUFBTUMsMENBQWlCLEdBQXZCOztJQUdNQyxrQixXQUFBQSxrQjs7O0FBQ1gsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFpQm5CQyxV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RSxDQUZjO0FBR2hDRSxjQUFZLEtBSG9CO0FBSWhDZ0IsVUFBUSxrQkFBTSxDQUFFLENBSmdCO0FBS2hDQyxhQUFXLHFCQUFNLENBQUU7QUFMYSxDQUFsQzs7a0JBUWVqQyxrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEF3ZXNvbWVEZWJvdW5jZVByb21pc2UgZnJvbSAnYXdlc29tZS1kZWJvdW5jZS1wcm9taXNlJztcblxuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL0Zsb2F0aW5nTWVudSc7XG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX0xJTUlUID0gNTAwO1xuXG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkID0gQXdlc29tZURlYm91bmNlUHJvbWlzZShcbiAgICAgIHByb3BzLmxvYWRPcHRpb25zLFxuICAgICAgREVCT1VOQ0VfTElNSVQsXG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZHJvcGRvd25GaWVsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgdmFsdWUsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgY29uc3QgTWVudSA9IHByb3BzID0+IHtcbiAgICAgIGNvbnN0IG5ld1Byb3BzID0ge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgZHJvcGRvd25GaWVsZE5vZGU6IHRoaXMuZHJvcGRvd25GaWVsZE5vZGUsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIEZsb2F0aW5nTWVudShuZXdQcm9wcyk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnNEZWJvdW5jZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25TZWxlY3R9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBNZW51LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zIHx8ICctLScpfVxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8ICdMb2FkaW5nLi4uJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBpbm5lclJlZj17KG5vZGUpID0+IHsgdGhpcy5wcm9wcy5zZXRSZWYobm9kZSk7IH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHNldFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgc2V0UmVmOiAoKSA9PiB7fSxcbiAgb25LZXlEb3duOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==