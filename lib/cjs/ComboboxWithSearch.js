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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIZE = {
  width: 15,
  height: 15
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

  ComboboxWithSearch.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'combobox-with-search' },
      _react2.default.createElement(
        'div',
        { className: 'combobox-with-search__combobox' },
        _react2.default.createElement(_reactSelect.Async, _extends({}, this.props, {
          onChange: this.handleChange,
          value: this.state.value
        })),
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
        i18n: this.props.i18n
      }, this.props.modal))
    );
  };

  return ComboboxWithSearch;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleOpen = function () {
    _this2.setState({
      showModal: true
    });
  };

  this.handleClose = function () {
    _this2.setState({
      showModal: false
    });
  };

  this.handleChange = function (valueObj) {
    var value = valueObj && valueObj.value;
    _this2.setState({
      value: value
    });
    _this2.props.onSelect(value);
    return value;
  };
}, _temp);


ComboboxWithSearch.defaultProps = {
  onSelect: function onSelect() {},
  loadOptions: function loadOptions() {
    return Promise.resolve({ options: [] });
  }
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInZhbHVlIiwic3RhdGUiLCJzaG93TW9kYWwiLCJyZW5kZXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVPcGVuIiwiaGFuZGxlQ2xvc2UiLCJpMThuIiwibW9kYWwiLCJDb21wb25lbnQiLCJzZXRTdGF0ZSIsInZhbHVlT2JqIiwib25TZWxlY3QiLCJkZWZhdWx0UHJvcHMiLCJsb2FkT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPLEVBRFM7QUFFaEJDLFVBQVE7QUFGUSxDQUFsQjs7SUFLYUMsa0IsV0FBQUEsa0I7OztBQUNYLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLHNCQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUFBLFFBR2ZDLEtBSGUsR0FJYkQsS0FKYSxDQUdmQyxLQUhlOztBQUtqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEQsa0JBRFc7QUFFWEUsaUJBQVc7QUFGQSxLQUFiO0FBTGlCO0FBU2xCOzsrQkF1QkRDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsc0JBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdDQUFmO0FBQ0Usc0NBQUMsa0JBQUQsZUFDTSxLQUFLSixLQURYO0FBRUUsb0JBQVUsS0FBS0ssWUFGakI7QUFHRSxpQkFBTyxLQUFLSCxLQUFMLENBQVdEO0FBSHBCLFdBREY7QUFNRTtBQUFBO0FBQUEsWUFBSyxXQUFVLHFDQUFmO0FBQ0Usd0NBQUMsZ0JBQUQ7QUFDRSxrQkFBSyxXQURQO0FBRUUsa0JBQUssUUFGUDtBQUdFLHFCQUFTLEtBQUtLO0FBSGhCLGFBSU1WLFNBSk47QUFERjtBQU5GLE9BREY7QUFnQkUsb0NBQUMscUJBQUQ7QUFDRSxtQkFBVyxLQUFLTSxLQUFMLENBQVdDLFNBRHhCO0FBRUUsaUJBQVMsS0FBS0ksV0FGaEI7QUFHRSxrQkFBVSxLQUFLRixZQUhqQjtBQUlFLGNBQU0sS0FBS0wsS0FBTCxDQUFXUTtBQUpuQixTQUtNLEtBQUtSLEtBQUwsQ0FBV1MsS0FMakI7QUFoQkYsS0FERjtBQTBCRCxHOzs7RUE1RHFDQyxnQjs7O09BWXRDSixVLEdBQWEsWUFBTTtBQUNqQixXQUFLSyxRQUFMLENBQWM7QUFDWlIsaUJBQVc7QUFEQyxLQUFkO0FBR0QsRzs7T0FFREksVyxHQUFjLFlBQU07QUFDbEIsV0FBS0ksUUFBTCxDQUFjO0FBQ1pSLGlCQUFXO0FBREMsS0FBZDtBQUdELEc7O09BRURFLFksR0FBZSxVQUFDTyxRQUFELEVBQWM7QUFDM0IsUUFBTVgsUUFBUVcsWUFBWUEsU0FBU1gsS0FBbkM7QUFDQSxXQUFLVSxRQUFMLENBQWM7QUFDWlY7QUFEWSxLQUFkO0FBR0EsV0FBS0QsS0FBTCxDQUFXYSxRQUFYLENBQW9CWixLQUFwQjtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHOzs7O0FBaURIRixtQkFBbUJlLFlBQW5CLEdBQWtDO0FBQ2hDRCxZQUFVLG9CQUFNLENBQUUsQ0FEYztBQUVoQ0UsZUFBYTtBQUFBLFdBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUMsU0FBUyxFQUFYLEVBQWhCLENBQU47QUFBQTtBQUZtQixDQUFsQzs7a0JBS2VuQixrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBTZWFyY2hNb2RhbCBmcm9tICcuL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlT2JqKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZU9iaiAmJiB2YWx1ZU9iai52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICBzaG93TW9kYWw9e3RoaXMuc3RhdGUuc2hvd01vZGFsfVxuICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIGkxOG49e3RoaXMucHJvcHMuaTE4bn1cbiAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBpMThuOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGdldE1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IG9wdGlvbnM6IFtdIH0pLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3hXaXRoU2VhcmNoO1xuIl19