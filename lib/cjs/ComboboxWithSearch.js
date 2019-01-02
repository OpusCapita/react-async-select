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

var _reactSelect2 = require('react-select');

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
          components: { DropdownIndicator: DropdownIndicator },
          noOptionsMessage: function noOptionsMessage() {
            return localizationTexts.noItems || '--';
          },
          filterOption: (0, _reactSelect2.createFilter)({
            ignoreCase: true,
            ignoreAccents: false,
            matchFrom: 'any'
          })
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
  isDisabled: false
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJ2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQiLCJuZXh0UHJvcHMiLCJjdXJyZW50UHJvcHMiLCJ2YWx1ZSIsIk9wdGlvblZhbHVlQ2hhbmdlcyIsIkNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJzaG93TW9kYWwiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsb2FkT3B0aW9ucyIsIm9uU2VsZWN0IiwiaGFuZGxlQ2hhbmdlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJpc0Rpc2FibGVkIiwiZmlsdGVycyIsInJlbmRlcmVycyIsIm1vZGFsUHJvcHMiLCJtb2RhbCIsImV4dHJhUHJvcHMiLCJEcm9wZG93bkluZGljYXRvciIsImhhbmRsZU9wZW4iLCJub0l0ZW1zIiwiaWdub3JlQ2FzZSIsImlnbm9yZUFjY2VudHMiLCJtYXRjaEZyb20iLCJoYW5kbGVDbG9zZSIsIkNvbXBvbmVudCIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjs7QUFLQSxJQUFNQyxpQ0FBaUMsU0FBakNBLDhCQUFpQyxDQUFDQyxTQUFELEVBQVlDLFlBQVo7QUFBQSxTQUE2QixDQUFDLENBQUNELFVBQVVFLEtBQVosS0FBc0IsQ0FBQyxDQUFDRCxhQUFhQyxLQUFsRTtBQUFBLENBQXZDO0FBQ0EsSUFBTUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0gsU0FBRCxFQUFZQyxZQUFaO0FBQUEsU0FB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QUFFdEJPLGdCQUFVO0FBQUEsZUFBWSxPQUFLQSxRQUFMLGNBQW1Cb0IsUUFBbkIsRUFBWjtBQUFBLE9BRlk7QUFHdEJqQixnQkFBVTtBQUFBLGVBQVMsT0FBS1AsS0FBTCxDQUFXTyxRQUFYLENBQW9CVixLQUFwQixDQUFUO0FBQUE7QUFIWSxLQUF4QjtBQUtELEc7Ozs7QUFtRkhFLG1CQUFtQjBCLFlBQW5CLEdBQWtDO0FBQ2hDbkIsZUFBYTtBQUFBLFdBQU1vQixRQUFRQyxPQUFSLENBQWdCLEVBQWhCLENBQU47QUFBQSxHQURtQjtBQUVoQ3BCLFlBQVUsb0JBQU0sQ0FBRSxDQUZjO0FBR2hDQyxnQkFBYyw0QkFBbUM7QUFBQSxRQUFoQ1gsS0FBZ0MsUUFBaENBLEtBQWdDO0FBQUEsUUFBekJPLFFBQXlCLFFBQXpCQSxRQUF5QjtBQUFBLFFBQWZHLFFBQWUsUUFBZkEsUUFBZTs7QUFDL0NILGFBQVMsRUFBRVAsWUFBRixFQUFUO0FBQ0FVLGFBQVNWLEtBQVQ7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FQK0I7QUFRaENhLGNBQVk7QUFSb0IsQ0FBbEM7O2tCQVdlWCxrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBPcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgT3B0aW9uVmFsdWVDaGFuZ2VzKG5leHRQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgdmFsdWUsXG4gICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gdGhpcy5zZXRTdGF0ZSh7IC4uLm5ld1N0YXRlIH0pLFxuICAgICAgb25TZWxlY3Q6IHZhbHVlID0+IHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxvYWRPcHRpb25zLFxuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e2xvYWRPcHRpb25zfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgY29tcG9uZW50cz17eyBEcm9wZG93bkluZGljYXRvciB9fVxuICAgICAgICAgICAgbm9PcHRpb25zTWVzc2FnZT17KCkgPT4gKGxvY2FsaXphdGlvblRleHRzLm5vSXRlbXMgfHwgJy0tJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNob3dNb2RhbCA/XG4gICAgICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cz17bG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIHJlbmRlcmVycz17cmVuZGVyZXJzfVxuICAgICAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhbmRsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGhhbmRsZUNoYW5nZTogKHsgdmFsdWUsIHNldFN0YXRlLCBvblNlbGVjdCB9KSA9PiB7XG4gICAgc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICBvblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==