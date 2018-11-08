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

  this.handleChange = function (value) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiSUNPTl9TSVpFIiwid2lkdGgiLCJoZWlnaHQiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInZhbHVlIiwic3RhdGUiLCJzaG93TW9kYWwiLCJyZW5kZXIiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVPcGVuIiwiaGFuZGxlQ2xvc2UiLCJsb2NhbGl6YXRpb25UZXh0cyIsIm1vZGFsIiwiQ29tcG9uZW50Iiwic2V0U3RhdGUiLCJvblNlbGVjdCIsImRlZmF1bHRQcm9wcyIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLFNBQU8sRUFEUztBQUVoQkMsVUFBUTtBQUZRLENBQWxCOztJQUthQyxrQixXQUFBQSxrQjs7O0FBQ1gsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBQUEsUUFHZkMsS0FIZSxHQUliRCxLQUphLENBR2ZDLEtBSGU7O0FBS2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFEVztBQUVYRSxpQkFBVztBQUZBLEtBQWI7QUFMaUI7QUFTbEI7OytCQXNCREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxzQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0NBQWY7QUFDRSxzQ0FBQyxrQkFBRCxlQUNNLEtBQUtKLEtBRFg7QUFFRSxvQkFBVSxLQUFLSyxZQUZqQjtBQUdFLGlCQUFPLEtBQUtILEtBQUwsQ0FBV0Q7QUFIcEIsV0FERjtBQU1FO0FBQUE7QUFBQSxZQUFLLFdBQVUscUNBQWY7QUFDRSx3Q0FBQyxnQkFBRDtBQUNFLGtCQUFLLFdBRFA7QUFFRSxrQkFBSyxRQUZQO0FBR0UscUJBQVMsS0FBS0s7QUFIaEIsYUFJTVYsU0FKTjtBQURGO0FBTkYsT0FERjtBQWdCRSxvQ0FBQyxxQkFBRDtBQUNFLG1CQUFXLEtBQUtNLEtBQUwsQ0FBV0MsU0FEeEI7QUFFRSxpQkFBUyxLQUFLSSxXQUZoQjtBQUdFLGtCQUFVLEtBQUtGLFlBSGpCO0FBSUUsMkJBQW1CLEtBQUtMLEtBQUwsQ0FBV1E7QUFKaEMsU0FLTSxLQUFLUixLQUFMLENBQVdTLEtBTGpCO0FBaEJGLEtBREY7QUEwQkQsRzs7O0VBM0RxQ0MsZ0I7OztPQVl0Q0osVSxHQUFhLFlBQU07QUFDakIsV0FBS0ssUUFBTCxDQUFjO0FBQ1pSLGlCQUFXO0FBREMsS0FBZDtBQUdELEc7O09BRURJLFcsR0FBYyxZQUFNO0FBQ2xCLFdBQUtJLFFBQUwsQ0FBYztBQUNaUixpQkFBVztBQURDLEtBQWQ7QUFHRCxHOztPQUVERSxZLEdBQWUsVUFBQ0osS0FBRCxFQUFXO0FBQ3hCLFdBQUtVLFFBQUwsQ0FBYztBQUNaVjtBQURZLEtBQWQ7QUFHQSxXQUFLRCxLQUFMLENBQVdZLFFBQVgsQ0FBb0JYLEtBQXBCO0FBQ0EsV0FBT0EsS0FBUDtBQUNELEc7Ozs7QUErQ0hGLG1CQUFtQmMsWUFBbkIsR0FBa0M7QUFDaENELFlBQVUsb0JBQU0sQ0FBRSxDQURjO0FBRWhDRSxlQUFhO0FBQUEsV0FBTUMsUUFBUUMsT0FBUixDQUFnQixFQUFFQyxTQUFTLEVBQVgsRUFBaEIsQ0FBTjtBQUFBO0FBRm1CLENBQWxDOztrQkFLZWxCLGtCIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgQXN5bmMgYXMgU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19jb21ib2JveFwiPlxuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICBzaG93TW9kYWw9e3RoaXMuc3RhdGUuc2hvd01vZGFsfVxuICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIGxvY2FsaXphdGlvblRleHRzPXt0aGlzLnByb3BzLmxvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgb3B0aW9uczogW10gfSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=