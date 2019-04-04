'use strict';

exports.__esModule = true;
exports.ComboboxWithSearch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIcons = require('@opuscapita/react-icons');

var _reactSelect = require('@opuscapita/react-select');

var _reactSelect2 = require('react-select');

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

var valueBecomesDefinedOrIsCleared = function valueBecomesDefinedOrIsCleared(nextProps, currentProps) {
  return !!nextProps.value !== !!currentProps.value;
};
var optionValueChanges = function optionValueChanges(nextProps, currentProps) {
  return nextProps.value && currentProps.value && nextProps.value.value !== currentProps.value.value;
};

var ComboboxWithSearch = exports.ComboboxWithSearch = (_temp = _class = function (_Component) {
  _inherits(ComboboxWithSearch, _Component);

  function ComboboxWithSearch(props) {
    _classCallCheck(this, ComboboxWithSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;

    _this.state = {
      value: value,
      showModal: false
    };
    return _this;
  }

  ComboboxWithSearch.prototype.componentDidMount = function componentDidMount() {
    this.dropdownFieldNode = _reactDom2.default.findDOMNode(this);
  };

  ComboboxWithSearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (valueBecomesDefinedOrIsCleared(nextProps, this.props) || optionValueChanges(nextProps, this.props)) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  ComboboxWithSearch.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        loadOptions = _props.loadOptions,
        onSelect = _props.onSelect,
        handleChange = _props.handleChange,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        extraProps = _objectWithoutProperties(_props, ['loadOptions', 'onSelect', 'handleChange', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal']);

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
          loadOptions: loadOptions,
          onChange: function onChange(value) {
            return _this2.handleChange(value);
          },
          value: this.state.value,
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
        onSelect: this.handleChange,
        localizationTexts: localizationTexts,
        filters: filters,
        renderers: renderers
      }, modalProps)) : null
    );
  };

  return ComboboxWithSearch;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleOpen = function () {
    _this3.setState({
      showModal: true
    });
  };

  this.handleClose = function () {
    _this3.setState({
      showModal: false
    });
  };

  this.handleChange = function (value) {
    _this3.props.handleChange({
      value: value,
      setState: function setState(newState) {
        return _this3.setState(_extends({}, newState));
      },
      onSelect: function onSelect(value) {
        return _this3.props.onSelect(value);
      }
    });
  };
}, _temp);


ComboboxWithSearch.defaultProps = {
  loadOptions: function loadOptions() {
    return Promise.resolve([]);
  },
  onSelect: function onSelect() {},
  handleChange: function handleChange(_ref) {
    var value = _ref.value,
        setState = _ref.setState,
        onSelect = _ref.onSelect;

    setState({ value: value });
    onSelect(value);
    return value;
  },
  isDisabled: false,
  setRef: function setRef() {},
  onKeyDown: function onKeyDown() {}
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJvcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsb2FkT3B0aW9ucyIsIm9uU2VsZWN0IiwiaGFuZGxlQ2hhbmdlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJpc0Rpc2FibGVkIiwiZmlsdGVycyIsInJlbmRlcmVycyIsIm1vZGFsUHJvcHMiLCJtb2RhbCIsImV4dHJhUHJvcHMiLCJEcm9wZG93bkluZGljYXRvciIsImhhbmRsZU9wZW4iLCJNZW51IiwibmV3UHJvcHMiLCJub0l0ZW1zIiwibG9hZGluZyIsImlnbm9yZUNhc2UiLCJpZ25vcmVBY2NlbnRzIiwibWF0Y2hGcm9tIiwibm9kZSIsInNldFJlZiIsIm9uS2V5RG93biIsImhhbmRsZUNsb3NlIiwiQ29tcG9uZW50IiwibmV3U3RhdGUiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjs7QUFLQSxJQUFNQyxpQ0FBaUMsU0FBakNBLDhCQUFp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QXlCLFFBQXpCQSxRQUF5QjtBQUFBLFFBQWZHLFFBQWUsUUFBZkEsUUFBZTs7QUFDL0NILGFBQVMsRUFBRVgsWUFBRixFQUFUO0FBQ0FjLGFBQVNkLEtBQVQ7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FQK0I7QUFRaENpQixjQUFZLEtBUm9CO0FBU2hDZ0IsVUFBUSxrQkFBTSxDQUFFLENBVGdCO0FBVWhDQyxhQUFXLHFCQUFNLENBQUU7QUFWYSxDQUFsQzs7a0JBYWVoQyxrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgRmxvYXRpbmdNZW51IGZyb20gJy4vRmxvYXRpbmdNZW51JztcbmltcG9ydCBTZWFyY2hNb2RhbCBmcm9tICcuLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5jb25zdCB2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+ICEhbmV4dFByb3BzLnZhbHVlICE9PSAhIWN1cnJlbnRQcm9wcy52YWx1ZTtcbmNvbnN0IG9wdGlvblZhbHVlQ2hhbmdlcyA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gbmV4dFByb3BzLnZhbHVlICYmIGN1cnJlbnRQcm9wcy52YWx1ZSAmJlxuICBuZXh0UHJvcHMudmFsdWUudmFsdWUgIT09IGN1cnJlbnRQcm9wcy52YWx1ZS52YWx1ZTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmRyb3Bkb3duRmllbGROb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCBvcHRpb25WYWx1ZUNoYW5nZXMobmV4dFByb3BzLCB0aGlzLnByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXh0UHJvcHMudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZUNoYW5nZSh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiB0aGlzLnNldFN0YXRlKHsgLi4ubmV3U3RhdGUgfSksXG4gICAgICBvblNlbGVjdDogdmFsdWUgPT4gdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbG9hZE9wdGlvbnMsXG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaGFuZGxlQ2hhbmdlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgbW9kYWw6IG1vZGFsUHJvcHMsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgY29uc3QgTWVudSA9IHByb3BzID0+IHtcbiAgICAgIGNvbnN0IG5ld1Byb3BzID0ge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgZHJvcGRvd25GaWVsZE5vZGU6IHRoaXMuZHJvcGRvd25GaWVsZE5vZGUsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIEZsb2F0aW5nTWVudShuZXdQcm9wcyk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi5leHRyYVByb3BzfVxuICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIGxvYWRPcHRpb25zPXtsb2FkT3B0aW9uc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSl9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgRHJvcGRvd25JbmRpY2F0b3IsXG4gICAgICAgICAgICAgIE1lbnUsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgbm9PcHRpb25zTWVzc2FnZT17KCkgPT4gKGxvY2FsaXphdGlvblRleHRzLm5vSXRlbXMgfHwgJy0tJyl9XG4gICAgICAgICAgICBsb2FkaW5nTWVzc2FnZT17KCkgPT4gKGxvY2FsaXphdGlvblRleHRzLmxvYWRpbmcgfHwgJ0xvYWRpbmcuLi4nKX1cbiAgICAgICAgICAgIGZpbHRlck9wdGlvbj17Y3JlYXRlRmlsdGVyKHtcbiAgICAgICAgICAgICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgaWdub3JlQWNjZW50czogZmFsc2UsXG4gICAgICAgICAgICAgIG1hdGNoRnJvbTogJ2FueScsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIGlubmVyUmVmPXsobm9kZSkgPT4geyB0aGlzLnByb3BzLnNldFJlZihub2RlKTsgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNob3dNb2RhbCA/XG4gICAgICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cz17bG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIHJlbmRlcmVycz17cmVuZGVyZXJzfVxuICAgICAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhbmRsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbiAgc2V0UmVmOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGhhbmRsZUNoYW5nZTogKHsgdmFsdWUsIHNldFN0YXRlLCBvblNlbGVjdCB9KSA9PiB7XG4gICAgc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICBvblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgc2V0UmVmOiAoKSA9PiB7fSxcbiAgb25LZXlEb3duOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==