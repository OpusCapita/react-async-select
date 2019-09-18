'use strict';

exports.__esModule = true;
exports.ComboboxWithSearch = exports.DEBOUNCE_LIMIT = undefined;

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

    _this.loadOptionsDebounced = (0, _awesomeDebouncePromise2.default)(props.loadOptions, DEBOUNCE_LIMIT);
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
        onSelect = _props.onSelect,
        handleChange = _props.handleChange,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        extraProps = _objectWithoutProperties(_props, ['onSelect', 'handleChange', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal']);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiREVCT1VOQ0VfTElNSVQiLCJ2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQiLCJuZXh0UHJvcHMiLCJjdXJyZW50UHJvcHMiLCJ2YWx1ZSIsIm9wdGlvblZhbHVlQ2hhbmdlcyIsIkNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJzaG93TW9kYWwiLCJsb2FkT3B0aW9uc0RlYm91bmNlZCIsImxvYWRPcHRpb25zIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiTWVudSIsIm5ld1Byb3BzIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsIm5vZGUiLCJzZXRSZWYiLCJvbktleURvd24iLCJoYW5kbGVDbG9zZSIsIkNvbXBvbmVudCIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJD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QWdCLEVBQWhCLENBQU47QUFBQSxHQURtQjtBQUVoQzFCLFlBQVUsb0JBQU0sQ0FBRSxDQUZjO0FBR2hDQyxnQkFBYyw0QkFBbUM7QUFBQSxRQUFoQ2hCLEtBQWdDLFFBQWhDQSxLQUFnQztBQUFBLFFBQXpCYSxRQUF5QixRQUF6QkEsUUFBeUI7QUFBQSxRQUFmRSxRQUFlLFFBQWZBLFFBQWU7O0FBQy9DRixhQUFTLEVBQUViLFlBQUYsRUFBVDtBQUNBZSxhQUFTZixLQUFUO0FBQ0EsV0FBT0EsS0FBUDtBQUNELEdBUCtCO0FBUWhDa0IsY0FBWSxLQVJvQjtBQVNoQ2dCLFVBQVEsa0JBQU0sQ0FBRSxDQVRnQjtBQVVoQ0MsYUFBVyxxQkFBTSxDQUFFO0FBVmEsQ0FBbEM7O2tCQWFlakMsa0IiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBBd2Vzb21lRGVib3VuY2VQcm9taXNlIGZyb20gJ2F3ZXNvbWUtZGVib3VuY2UtcHJvbWlzZSc7XG5cbmltcG9ydCBGbG9hdGluZ01lbnUgZnJvbSAnLi9GbG9hdGluZ01lbnUnO1xuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4uL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmV4cG9ydCBjb25zdCBERUJPVU5DRV9MSU1JVCA9IDUwMDtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBvcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgdGhpcy5sb2FkT3B0aW9uc0RlYm91bmNlZCA9IEF3ZXNvbWVEZWJvdW5jZVByb21pc2UoXG4gICAgICBwcm9wcy5sb2FkT3B0aW9ucyxcbiAgICAgIERFQk9VTkNFX0xJTUlULFxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmRyb3Bkb3duRmllbGROb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCBvcHRpb25WYWx1ZUNoYW5nZXMobmV4dFByb3BzLCB0aGlzLnByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXh0UHJvcHMudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZUNoYW5nZSh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiB0aGlzLnNldFN0YXRlKHsgLi4ubmV3U3RhdGUgfSksXG4gICAgICBvblNlbGVjdDogdmFsdWUgPT4gdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IE1lbnUgPSBwcm9wcyA9PiB7XG4gICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIGRyb3Bkb3duRmllbGROb2RlOiB0aGlzLmRyb3Bkb3duRmllbGROb2RlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBGbG9hdGluZ01lbnUobmV3UHJvcHMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi5leHRyYVByb3BzfVxuICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIGxvYWRPcHRpb25zPXt0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgICBEcm9wZG93bkluZGljYXRvcixcbiAgICAgICAgICAgICAgTWVudSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBub09wdGlvbnNNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubm9JdGVtcyB8fCAnLS0nKX1cbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCAnTG9hZGluZy4uLicpfVxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uPXtjcmVhdGVGaWx0ZXIoe1xuICAgICAgICAgICAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgICAgICAgICAgICBpZ25vcmVBY2NlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF0Y2hGcm9tOiAnYW55JyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgaW5uZXJSZWY9eyhub2RlKSA9PiB7IHRoaXMucHJvcHMuc2V0UmVmKG5vZGUpOyB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLnByb3BzLm9uS2V5RG93bn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuc3RhdGUuc2hvd01vZGFsID9cbiAgICAgICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzPXtsb2NhbGl6YXRpb25UZXh0c31cbiAgICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgICAgcmVuZGVyZXJzPXtyZW5kZXJlcnN9XG4gICAgICAgICAgICAgIHsuLi5tb2RhbFByb3BzfVxuICAgICAgICAgICAgLz4gOlxuICAgICAgICAgICAgbnVsbFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFuZGxlQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGlzRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxuICBzZXRSZWY6IFByb3BUeXBlcy5mdW5jLFxuICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZShbXSksXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgaGFuZGxlQ2hhbmdlOiAoeyB2YWx1ZSwgc2V0U3RhdGUsIG9uU2VsZWN0IH0pID0+IHtcbiAgICBzZXRTdGF0ZSh7IHZhbHVlIH0pO1xuICAgIG9uU2VsZWN0KHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICBzZXRSZWY6ICgpID0+IHt9LFxuICBvbktleURvd246ICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3hXaXRoU2VhcmNoO1xuIl19