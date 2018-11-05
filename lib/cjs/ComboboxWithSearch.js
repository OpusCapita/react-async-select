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
        localizationTexts: this.props.localizationTexts
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInZhbHVlIiwic3RhdGUiLCJzaG93TW9kYWwiLCJyZW5kZXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVPcGVuIiwiaGFuZGxlQ2xvc2UiLCJsb2NhbGl6YXRpb25UZXh0cyIsIm1vZGFsIiwiQ29tcG9uZW50Iiwic2V0U3RhdGUiLCJ2YWx1ZU9iaiIsIm9uU2VsZWN0IiwiZGVmYXVsdFByb3BzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQkMsU0FBTyxFQURTO0FBRWhCQyxVQUFRO0FBRlEsQ0FBbEI7O0lBS2FDLGtCLFdBQUFBLGtCOzs7QUFDWCw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixzQkFBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFBQSxRQUdmQyxLQUhlLEdBSWJELEtBSmEsQ0FHZkMsS0FIZTs7QUFLakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hELGtCQURXO0FBRVhFLGlCQUFXO0FBRkEsS0FBYjtBQUxpQjtBQVNsQjs7K0JBdUJEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHNCQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQ0FBZjtBQUNFLHNDQUFDLGtCQUFELGVBQ00sS0FBS0osS0FEWDtBQUVFLG9CQUFVLEtBQUtLLFlBRmpCO0FBR0UsaUJBQU8sS0FBS0gsS0FBTCxDQUFXRDtBQUhwQixXQURGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSxxQ0FBZjtBQUNFLHdDQUFDLGdCQUFEO0FBQ0Usa0JBQUssV0FEUDtBQUVFLGtCQUFLLFFBRlA7QUFHRSxxQkFBUyxLQUFLSztBQUhoQixhQUlNVixTQUpOO0FBREY7QUFORixPQURGO0FBZ0JFLG9DQUFDLHFCQUFEO0FBQ0UsbUJBQVcsS0FBS00sS0FBTCxDQUFXQyxTQUR4QjtBQUVFLGlCQUFTLEtBQUtJLFdBRmhCO0FBR0Usa0JBQVUsS0FBS0YsWUFIakI7QUFJRSwyQkFBbUIsS0FBS0wsS0FBTCxDQUFXUTtBQUpoQyxTQUtNLEtBQUtSLEtBQUwsQ0FBV1MsS0FMakI7QUFoQkYsS0FERjtBQTBCRCxHOzs7RUE1RHFDQyxnQjs7O09BWXRDSixVLEdBQWEsWUFBTTtBQUNqQixXQUFLSyxRQUFMLENBQWM7QUFDWlIsaUJBQVc7QUFEQyxLQUFkO0FBR0QsRzs7T0FFREksVyxHQUFjLFlBQU07QUFDbEIsV0FBS0ksUUFBTCxDQUFjO0FBQ1pSLGlCQUFXO0FBREMsS0FBZDtBQUdELEc7O09BRURFLFksR0FBZSxVQUFDTyxRQUFELEVBQWM7QUFDM0IsUUFBTVgsUUFBUVcsWUFBWUEsU0FBU1gsS0FBbkM7QUFDQSxXQUFLVSxRQUFMLENBQWM7QUFDWlY7QUFEWSxLQUFkO0FBR0EsV0FBS0QsS0FBTCxDQUFXYSxRQUFYLENBQW9CWixLQUFwQjtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHOzs7O0FBK0NIRixtQkFBbUJlLFlBQW5CLEdBQWtDO0FBQ2hDRCxZQUFVLG9CQUFNLENBQUUsQ0FEYztBQUVoQ0UsZUFBYTtBQUFBLFdBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUMsU0FBUyxFQUFYLEVBQWhCLENBQU47QUFBQTtBQUZtQixDQUFsQzs7a0JBS2VuQixrQiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBTZWFyY2hNb2RhbCBmcm9tICcuL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlT2JqKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZU9iaiAmJiB2YWx1ZU9iai52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICBzaG93TW9kYWw9e3RoaXMuc3RhdGUuc2hvd01vZGFsfVxuICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzPXt0aGlzLnByb3BzLmxvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgb3B0aW9uczogW10gfSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=