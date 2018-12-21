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
          components: { DropdownIndicator: DropdownIndicator }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJ2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQiLCJuZXh0UHJvcHMiLCJjdXJyZW50UHJvcHMiLCJ2YWx1ZSIsIk9wdGlvblZhbHVlQ2hhbmdlcyIsIkNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwic3RhdGUiLCJzaG93TW9kYWwiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsb2FkT3B0aW9ucyIsIm9uU2VsZWN0IiwiaGFuZGxlQ2hhbmdlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJpc0Rpc2FibGVkIiwiZmlsdGVycyIsInJlbmRlcmVycyIsIm1vZGFsUHJvcHMiLCJtb2RhbCIsImV4dHJhUHJvcHMiLCJEcm9wZG93bkluZGljYXRvciIsImhhbmRsZU9wZW4iLCJoYW5kbGVDbG9zZSIsIkNvbXBvbmVudCIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjs7QUFLQSxJQUFNQyxpQ0FBaUMsU0FBakNBLDhCQUFpQyxDQUFDQyxTQUFELEVBQVlDLFlBQVo7QUFBQSxTQUE2QixDQUFDLENBQUNELFVBQVVFLEtBQVosS0FBc0IsQ0FBQyxDQUFDRCxhQUFhQyxLQUFsRTtBQUFBLENBQXZDO0FBQ0EsSUFBTUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0gsU0FBRCxFQUFZQyxZQUFaO0FBQUEsU0FBNkJELFVBQVVFLEtBQVYsSUFBbUJELGFBQWFDLEtBQWhDLElBQ3RERixVQUFVRSxLQUFWLENBQWdCQSxLQUFoQixLQUEwQkQsYUFBYUMsS0FBYixDQUFtQkEsS0FEcEI7QUFBQSxDQUEzQjs7SUFHYUUsa0IsV0FBQUEsa0I7OztBQUNYLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLHNCQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUFBLFFBR2ZILEtBSGUsR0FJYkcsS0FKYSxDQUdmSCxLQUhlOztBQUtqQixVQUFLSSxLQUFMLEdBQWE7QUFDWEosa0JBRFc7QUFFWEssaUJBQVc7QUFGQSxLQUFiO0FBTGlCO0FBU2xCOzsrQkFFREMseUIsc0NBQTBCUixTLEVBQVc7QUFDbkMsUUFBSUQsK0JBQStCQyxTQUEvQixFQUEwQyxLQUFLSyxLQUEvQyxLQUF5REYsbUJBQW1CSCxTQUFuQixFQUE4QixLQUFLSyxLQUFuQyxDQUE3RCxFQUF3RztBQUN0RyxXQUFLSSxRQUFMLENBQWM7QUFDWlAsZUFBT0YsVUFBVUU7QUFETCxPQUFkO0FBR0Q7QUFDRixHOzsrQkFzQkRRLE0scUJBQVM7QUFBQTs7QUFBQSxpQkFXSCxLQUFLTCxLQVhGO0FBQUEsUUFFTE0sV0FGSyxVQUVMQSxXQUZLO0FBQUEsUUFHTEMsUUFISyxVQUdMQSxRQUhLO0FBQUEsUUFJTEMsWUFKSyxVQUlMQSxZQUpLO0FBQUEsUUFLTEMsaUJBTEssVUFLTEEsaUJBTEs7QUFBQSxRQU1MQyxVQU5LLFVBTUxBLFVBTks7QUFBQSxRQU9MQyxPQVBLLFVBT0xBLE9BUEs7QUFBQSxRQVFMQyxTQVJLLFVBUUxBLFNBUks7QUFBQSxRQVNFQyxVQVRGLFVBU0xDLEtBVEs7QUFBQSxRQVVGQyxVQVZFOztBQVlQLFFBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNoQixLQUFELEVBQVc7QUFDbkMsYUFBTyxDQUFDVSxVQUFELElBQ0w7QUFBQTtBQUFBLFVBQUssV0FBVSxxQ0FBZjtBQUNFLHNDQUFDLGdCQUFEO0FBQ0UsZ0JBQUssV0FEUDtBQUVFLGdCQUFLLFFBRlA7QUFHRSxtQkFBUyxPQUFLTztBQUhoQixXQUlNMUIsU0FKTjtBQURGLE9BREY7QUFVRCxLQVhEO0FBWUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHNCQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQ0FBZjtBQUNFLHNDQUFDLGtCQUFELGVBQ013QixVQUROO0FBRUUsc0JBQVlMLFVBRmQ7QUFHRSx1QkFBYUosV0FIZjtBQUlFLG9CQUFVO0FBQUEsbUJBQVMsT0FBS0UsWUFBTCxDQUFrQlgsS0FBbEIsQ0FBVDtBQUFBLFdBSlo7QUFLRSxpQkFBTyxLQUFLSSxLQUFMLENBQVdKLEtBTHBCO0FBTUUsc0JBQVksRUFBRW1CLG9DQUFGO0FBTmQ7QUFERixPQURGO0FBWUksV0FBS2YsS0FBTCxDQUFXQyxTQUFYLEdBQ0UsOEJBQUMscUJBQUQ7QUFDRSxpQkFBUyxLQUFLZ0IsV0FEaEI7QUFFRSxrQkFBVSxLQUFLVixZQUZqQjtBQUdFLDJCQUFtQkMsaUJBSHJCO0FBSUUsaUJBQVNFLE9BSlg7QUFLRSxtQkFBV0M7QUFMYixTQU1NQyxVQU5OLEVBREYsR0FTRTtBQXJCTixLQURGO0FBMEJELEc7OztFQTFGcUNNLGdCOzs7T0FvQnRDRixVLEdBQWEsWUFBTTtBQUNqQixXQUFLYixRQUFMLENBQWM7QUFDWkYsaUJBQVc7QUFEQyxLQUFkO0FBR0QsRzs7T0FFRGdCLFcsR0FBYyxZQUFNO0FBQ2xCLFdBQUtkLFFBQUwsQ0FBYztBQUNaRixpQkFBVztBQURDLEtBQWQ7QUFHRCxHOztPQUVETSxZLEdBQWUsVUFBQ1gsS0FBRCxFQUFXO0FBQ3hCLFdBQUtHLEtBQUwsQ0FBV1EsWUFBWCxDQUF3QjtBQUN0Qlgsa0JBRHNCO0FBRXRCTyxnQkFBVTtBQUFBLGVBQVksT0FBS0EsUUFBTCxjQUFtQmdCLFFBQW5CLEVBQVo7QUFBQSxPQUZZO0FBR3RCYixnQkFBVTtBQUFBLGVBQVMsT0FBS1AsS0FBTCxDQUFXTyxRQUFYLENBQW9CVixLQUFwQixDQUFUO0FBQUE7QUFIWSxLQUF4QjtBQUtELEc7Ozs7QUE2RUhFLG1CQUFtQnNCLFlBQW5CLEdBQWtDO0FBQ2hDZixlQUFhO0FBQUEsV0FBTWdCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBTjtBQUFBLEdBRG1CO0FBRWhDaEIsWUFBVSxvQkFBTSxDQUFFLENBRmM7QUFHaENDLGdCQUFjLDRCQUFtQztBQUFBLFFBQWhDWCxLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxRQUF6Qk8sUUFBeUIsUUFBekJBLFFBQXlCO0FBQUEsUUFBZkcsUUFBZSxRQUFmQSxRQUFlOztBQUMvQ0gsYUFBUyxFQUFFUCxZQUFGLEVBQVQ7QUFDQVUsYUFBU1YsS0FBVDtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQVArQjtBQVFoQ2EsY0FBWTtBQVJvQixDQUFsQzs7a0JBV2VYLGtCIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBTZWFyY2hNb2RhbCBmcm9tICcuL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmNvbnN0IHZhbHVlQmVjb21lc0RlZmluZWRPcklzQ2xlYXJlZCA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gISFuZXh0UHJvcHMudmFsdWUgIT09ICEhY3VycmVudFByb3BzLnZhbHVlO1xuY29uc3QgT3B0aW9uVmFsdWVDaGFuZ2VzID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiBuZXh0UHJvcHMudmFsdWUgJiYgY3VycmVudFByb3BzLnZhbHVlICYmXG4gIG5leHRQcm9wcy52YWx1ZS52YWx1ZSAhPT0gY3VycmVudFByb3BzLnZhbHVlLnZhbHVlO1xuXG5leHBvcnQgY2xhc3MgQ29tYm9ib3hXaXRoU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgfSA9IHByb3BzO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHZhbHVlQmVjb21lc0RlZmluZWRPcklzQ2xlYXJlZChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8IE9wdGlvblZhbHVlQ2hhbmdlcyhuZXh0UHJvcHMsIHRoaXMucHJvcHMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2V0U3RhdGU6IG5ld1N0YXRlID0+IHRoaXMuc2V0U3RhdGUoeyAuLi5uZXdTdGF0ZSB9KSxcbiAgICAgIG9uU2VsZWN0OiB2YWx1ZSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsb2FkT3B0aW9ucyxcbiAgICAgIG9uU2VsZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBoYW5kbGVDaGFuZ2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBtb2RhbDogbW9kYWxQcm9wcyxcbiAgICAgIC4uLmV4dHJhUHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IChwcm9wcykgPT4ge1xuICAgICAgcmV0dXJuICFpc0Rpc2FibGVkICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fc2VhcmNoLWJ1dHRvblwiPlxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVufVxuICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi5leHRyYVByb3BzfVxuICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNEaXNhYmxlZH1cbiAgICAgICAgICAgIGxvYWRPcHRpb25zPXtsb2FkT3B0aW9uc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZSh2YWx1ZSl9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3sgRHJvcGRvd25JbmRpY2F0b3IgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuc3RhdGUuc2hvd01vZGFsID9cbiAgICAgICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzPXtsb2NhbGl6YXRpb25UZXh0c31cbiAgICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgICAgcmVuZGVyZXJzPXtyZW5kZXJlcnN9XG4gICAgICAgICAgICAgIHsuLi5tb2RhbFByb3BzfVxuICAgICAgICAgICAgLz4gOlxuICAgICAgICAgICAgbnVsbFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFuZGxlQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGlzRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZShbXSksXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgaGFuZGxlQ2hhbmdlOiAoeyB2YWx1ZSwgc2V0U3RhdGUsIG9uU2VsZWN0IH0pID0+IHtcbiAgICBzZXRTdGF0ZSh7IHZhbHVlIH0pO1xuICAgIG9uU2VsZWN0KHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3hXaXRoU2VhcmNoO1xuIl19