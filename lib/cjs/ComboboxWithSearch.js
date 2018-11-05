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
        i18n: this.props.i18n,
        mapTranslationKey: this.props.mapTranslationKey
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
  },
  mapTranslationKey: function mapTranslationKey(key) {
    return key;
  }
};

exports.default = ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInZhbHVlIiwic3RhdGUiLCJzaG93TW9kYWwiLCJyZW5kZXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVPcGVuIiwiaGFuZGxlQ2xvc2UiLCJpMThuIiwibWFwVHJhbnNsYXRpb25LZXkiLCJtb2RhbCIsIkNvbXBvbmVudCIsInNldFN0YXRlIiwidmFsdWVPYmoiLCJvblNlbGVjdCIsImRlZmF1bHRQcm9wcyIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJvcHRpb25zIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLFNBQU8sRUFEUztBQUVoQkMsVUFBUTtBQUZRLENBQWxCOztJQUthQyxrQixXQUFBQSxrQjs7O0FBQ1gsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBQUEsUUFHZkMsS0FIZSxHQUliRCxLQUphLENBR2ZDLEtBSGU7O0FBS2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFEVztBQUVYRSxpQkFBVztBQUZBLEtBQWI7QUFMaUI7QUFTbEI7OytCQXVCREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxzQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0NBQWY7QUFDRSxzQ0FBQyxrQkFBRCxlQUNNLEtBQUtKLEtBRFg7QUFFRSxvQkFBVSxLQUFLSyxZQUZqQjtBQUdFLGlCQUFPLEtBQUtILEtBQUwsQ0FBV0Q7QUFIcEIsV0FERjtBQU1FO0FBQUE7QUFBQSxZQUFLLFdBQVUscUNBQWY7QUFDRSx3Q0FBQyxnQkFBRDtBQUNFLGtCQUFLLFdBRFA7QUFFRSxrQkFBSyxRQUZQO0FBR0UscUJBQVMsS0FBS0s7QUFIaEIsYUFJTVYsU0FKTjtBQURGO0FBTkYsT0FERjtBQWdCRSxvQ0FBQyxxQkFBRDtBQUNFLG1CQUFXLEtBQUtNLEtBQUwsQ0FBV0MsU0FEeEI7QUFFRSxpQkFBUyxLQUFLSSxXQUZoQjtBQUdFLGtCQUFVLEtBQUtGLFlBSGpCO0FBSUUsY0FBTSxLQUFLTCxLQUFMLENBQVdRLElBSm5CO0FBS0UsMkJBQW1CLEtBQUtSLEtBQUwsQ0FBV1M7QUFMaEMsU0FNTSxLQUFLVCxLQUFMLENBQVdVLEtBTmpCO0FBaEJGLEtBREY7QUEyQkQsRzs7O0VBN0RxQ0MsZ0I7OztPQVl0Q0wsVSxHQUFhLFlBQU07QUFDakIsV0FBS00sUUFBTCxDQUFjO0FBQ1pULGlCQUFXO0FBREMsS0FBZDtBQUdELEc7O09BRURJLFcsR0FBYyxZQUFNO0FBQ2xCLFdBQUtLLFFBQUwsQ0FBYztBQUNaVCxpQkFBVztBQURDLEtBQWQ7QUFHRCxHOztPQUVERSxZLEdBQWUsVUFBQ1EsUUFBRCxFQUFjO0FBQzNCLFFBQU1aLFFBQVFZLFlBQVlBLFNBQVNaLEtBQW5DO0FBQ0EsV0FBS1csUUFBTCxDQUFjO0FBQ1pYO0FBRFksS0FBZDtBQUdBLFdBQUtELEtBQUwsQ0FBV2MsUUFBWCxDQUFvQmIsS0FBcEI7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsRzs7OztBQW1ESEYsbUJBQW1CZ0IsWUFBbkIsR0FBa0M7QUFDaENELFlBQVUsb0JBQU0sQ0FBRSxDQURjO0FBRWhDRSxlQUFhO0FBQUEsV0FBTUMsUUFBUUMsT0FBUixDQUFnQixFQUFFQyxTQUFTLEVBQVgsRUFBaEIsQ0FBTjtBQUFBLEdBRm1CO0FBR2hDVixxQkFBbUI7QUFBQSxXQUFPVyxHQUFQO0FBQUE7QUFIYSxDQUFsQzs7a0JBTWVyQixrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBTZWFyY2hNb2RhbCBmcm9tICcuL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlT2JqKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZU9iaiAmJiB2YWx1ZU9iai52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICBzaG93TW9kYWw9e3RoaXMuc3RhdGUuc2hvd01vZGFsfVxuICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIGkxOG49e3RoaXMucHJvcHMuaTE4bn1cbiAgICAgICAgICBtYXBUcmFuc2xhdGlvbktleT17dGhpcy5wcm9wcy5tYXBUcmFuc2xhdGlvbktleX1cbiAgICAgICAgICB7Li4udGhpcy5wcm9wcy5tb2RhbH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBpMThuOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGdldE1lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbiAgbWFwVHJhbnNsYXRpb25LZXk6IFByb3BUeXBlcy5mdW5jLFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgb3B0aW9uczogW10gfSksXG4gIG1hcFRyYW5zbGF0aW9uS2V5OiBrZXkgPT4ga2V5XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=