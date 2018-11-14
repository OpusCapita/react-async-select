'use strict';

exports.__esModule = true;
exports.ComboboxWithSearch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIcons = require('@opuscapita/react-icons');

var _reactSelect = require('@opuscapita/react-select');

var _SearchModal = require('./SearchModal');

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
var OptionValueChanges = function OptionValueChanges(nextProps, currentProps) {
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

  ComboboxWithSearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (valueBecomesDefinedOrIsCleared(nextProps, this.props) || OptionValueChanges(nextProps, this.props)) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  ComboboxWithSearch.prototype.render = function render() {
    var _this2 = this,
        _extends2;

    var _props = this.props,
        value = _props.value,
        loadOptions = _props.loadOptions,
        onSelect = _props.onSelect,
        handleChange = _props.handleChange,
        localizationTexts = _props.localizationTexts,
        modalProps = _props.modal,
        extraProps = _objectWithoutProperties(_props, ['value', 'loadOptions', 'onSelect', 'handleChange', 'localizationTexts', 'modal']);

    return _react2.default.createElement(
      'div',
      { className: 'combobox-with-search' },
      _react2.default.createElement(
        'div',
        { className: 'combobox-with-search__combobox' },
        _react2.default.createElement(_reactSelect.Async, _extends({}, extraProps, (_extends2 = {
          value: value,
          loadOptions: loadOptions,
          onChange: function onChange(value) {
            return _this2.handleChange(value);
          }
        }, _extends2['value'] = this.state.value, _extends2))),
        _react2.default.createElement(
          'div',
          { className: 'combobox-with-search__search-button' },
          _react2.default.createElement(_reactIcons.Icon, _extends({
            type: 'indicator',
            name: 'search',
            onClick: this.handleOpen
          }, ICON_SIZE))
        )
      ),
      _react2.default.createElement(_SearchModal2.default, _extends({
        showModal: this.state.showModal,
        onClose: this.handleClose,
        onSelect: this.handleChange,
        localizationTexts: localizationTexts
      }, modalProps))
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
    return Promise.resolve({ options: [] });
  },
  onSelect: function onSelect() {},
  handleChange: function handleChange(_ref) {
    var value = _ref.value,
        setState = _ref.setState,
        onSelect = _ref.onSelect;

    setState({ value: value });
    onSelect(value);
    return value;
  }
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJ2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQiLCJuZXh0UHJvcHMiLCJjdXJyZW50UHJvcHMiLCJ2YWx1ZSIsIk9wdGlvblZhbHVlQ2hhbmdlcyIsIkNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJzaG93TW9kYWwiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsb2FkT3B0aW9ucyIsIm9uU2VsZWN0IiwiaGFuZGxlQ2hhbmdlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiaGFuZGxlT3BlbiIsImhhbmRsZUNsb3NlIiwiQ29tcG9uZW50IiwibmV3U3RhdGUiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjs7QUFLQSxJQUFNQyxpQ0FBaUMsU0FBakNBLDhCQUFpQyxDQUFDQyxTQUFELEVBQVlDLFlBQVo7QUFBQSxTQUE2QixDQUFDLENBQUNELFVBQVVFLEtBQVosS0FBc0IsQ0FBQyxDQUFDRCxhQUFhQyxLQUFsRTtBQUFBLENBQXZDO0FBQ0EsSUFBTUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0gsU0FBRCxFQUFZQyxZQUFaO0FBQUEsU0FBNkJELFVBQVVFLEtBQVYsSUFBbUJELGFBQWFDLEtBQWhDLElBQ3RERixVQUFVRSxLQUFWLENBQWdCQSxLQUFoQixLQUEwQkQsYUFBYUMsS0FBYixDQUFtQkEsS0FEcEI7QUFBQSxD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S0FBUDtBQUNEO0FBUCtCLENBQWxDOztrQkFVZUUsa0IiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5jb25zdCB2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+ICEhbmV4dFByb3BzLnZhbHVlICE9PSAhIWN1cnJlbnRQcm9wcy52YWx1ZTtcbmNvbnN0IE9wdGlvblZhbHVlQ2hhbmdlcyA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gbmV4dFByb3BzLnZhbHVlICYmIGN1cnJlbnRQcm9wcy52YWx1ZSAmJlxuICBuZXh0UHJvcHMudmFsdWUudmFsdWUgIT09IGN1cnJlbnRQcm9wcy52YWx1ZS52YWx1ZTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCBPcHRpb25WYWx1ZUNoYW5nZXMobmV4dFByb3BzLCB0aGlzLnByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXh0UHJvcHMudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZUNoYW5nZSh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiB0aGlzLnNldFN0YXRlKHsgLi4ubmV3U3RhdGUgfSksXG4gICAgICBvblNlbGVjdDogdmFsdWUgPT4gdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgICBsb2FkT3B0aW9ucyxcbiAgICAgIG9uU2VsZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBoYW5kbGVDaGFuZ2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgbW9kYWw6IG1vZGFsUHJvcHMsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4uZXh0cmFQcm9wc31cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgIGxvYWRPcHRpb25zPXtsb2FkT3B0aW9uc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSl9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVufVxuICAgICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgIHNob3dNb2RhbD17dGhpcy5zdGF0ZS5zaG93TW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgIHsuLi5tb2RhbFByb3BzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBvcHRpb25zOiBbXSB9KSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBoYW5kbGVDaGFuZ2U6ICh7IHZhbHVlLCBzZXRTdGF0ZSwgb25TZWxlY3QgfSkgPT4ge1xuICAgIHNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgb25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==