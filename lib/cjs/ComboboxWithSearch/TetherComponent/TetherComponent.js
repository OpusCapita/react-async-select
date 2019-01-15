'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp, react/forbid-prop-types */


var TetheredChildrenComponent = function (_React$PureComponent) {
  _inherits(TetheredChildrenComponent, _React$PureComponent);

  function TetheredChildrenComponent() {
    _classCallCheck(this, TetheredChildrenComponent);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  TetheredChildrenComponent.prototype.componentDidMount = function componentDidMount() {
    this.props.position();
  };

  TetheredChildrenComponent.prototype.componentDidUpdate = function componentDidUpdate() {
    this.props.position();
  };

  TetheredChildrenComponent.prototype.render = function render() {
    return this.props.children;
  };

  return TetheredChildrenComponent;
}(_react2.default.PureComponent);

var TetherComponent = function (_React$PureComponent2) {
  _inherits(TetherComponent, _React$PureComponent2);

  function TetherComponent() {
    var _temp, _this2, _ret;

    _classCallCheck(this, TetherComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$PureComponent2.call.apply(_React$PureComponent2, [this].concat(args))), _this2), _this2.position = function () {
      if (!_this2.tether) {
        _this2.tether = new _tether2.default(_extends({}, _this2.props.options, {
          element: _this2.tetherContainer,
          target: _this2.props.target
        }));
      }
      if (_this2.props.matchWidth) {
        _this2.tetherContainer.style.width = _this2.props.target.clientWidth + 'px';
      }
      _this2.tether.position();
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  TetherComponent.prototype.componentDidMount = function componentDidMount() {
    this.tetherContainer = document.createElement('div');
    document.body.appendChild(this.tetherContainer);
    this.renderTetheredContent();
  };

  TetherComponent.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderTetheredContent();
  };

  TetherComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    this.destroyTetheredContent();
  };

  TetherComponent.prototype.destroyTetheredContent = function destroyTetheredContent() {
    _reactDom2.default.unmountComponentAtNode(this.tetherContainer);
    if (this.tether) {
      this.tether.destroy();
    }
    document.body.removeChild(this.tetherContainer);
  };

  TetherComponent.prototype.renderTetheredContent = function renderTetheredContent() {
    _reactDom2.default.render(_react2.default.createElement(
      TetheredChildrenComponent,
      {
        target: this.props.target,
        position: this.position
      },
      this.props.children
    ), this.tetherContainer);
  };

  TetherComponent.prototype.render = function render() {
    return null;
  };

  return TetherComponent;
}(_react2.default.PureComponent);

exports.default = TetherComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInBvc2l0aW9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJUZXRoZXJDb21wb25lbnQiLCJ0ZXRoZXIiLCJUZXRoZXIiLCJvcHRpb25zIiwiZWxlbWVudCIsInRldGhlckNvbnRhaW5lciIsInRhcmdldCIsIm1hdGNoV2lkdGgiLCJzdHlsZSIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJUZXRoZXJlZENvbnRlbnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRlc3Ryb3lUZXRoZXJlZENvbnRlbnQiLCJSZWFjdERPTSIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKQTs7O0lBTU1BLHlCOzs7Ozs7Ozs7c0NBTUpDLGlCLGdDQUFvQjtBQUNsQixTQUFLQyxLQUFMLENBQVdDLFFBQVg7QUFDRCxHOztzQ0FFREMsa0IsaUNBQXFCO0FBQ25CLFNBQUtGLEtBQUwsQ0FBV0MsUUFBWDtBQUNELEc7O3NDQUVERSxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLSCxLQUFMLENBQVdJLFFBQWxCO0FBQ0QsRzs7O0VBaEJxQ0MsZ0JBQU1DLGE7O0lBbUJ6QkMsZTs7Ozs7Ozs7Ozs7O3FLQXNCbkJOLFEsR0FBVyxZQUFNO0FBQ2YsVUFBSSxDQUFDLE9BQUtPLE1BQVYsRUFBa0I7QUFDaEIsZUFBS0EsTUFBTCxHQUFjLElBQUlDLGdCQUFKLGNBQ1QsT0FBS1QsS0FBTCxDQUFXVSxPQURGO0FBRVpDLG1CQUFTLE9BQUtDLGVBRkY7QUFHWkMsa0JBQVEsT0FBS2IsS0FBTCxDQUFXYTtBQUhQLFdBQWQ7QUFLRDtBQUNELFVBQUksT0FBS2IsS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLGVBQUtGLGVBQUwsQ0FBcUJHLEtBQXJCLENBQTJCQyxLQUEzQixHQUFzQyxPQUFLaEIsS0FBTCxDQUFXYSxNQUFYLENBQWtCSSxXQUF4RDtBQUNEO0FBQ0QsYUFBS1QsTUFBTCxDQUFZUCxRQUFaO0FBQ0QsSzs7OzRCQTFCREYsaUIsZ0NBQW9CO0FBQ2xCLFNBQUthLGVBQUwsR0FBdUJNLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQUQsYUFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCLEtBQUtULGVBQS9CO0FBQ0EsU0FBS1UscUJBQUw7QUFDRCxHOzs0QkFFRHBCLGtCLGlDQUFxQjtBQUNuQixTQUFLb0IscUJBQUw7QUFDRCxHOzs0QkFFREMsb0IsbUNBQXVCO0FBQ3JCLFNBQUtDLHNCQUFMO0FBQ0QsRzs7NEJBZ0JEQSxzQixxQ0FBeUI7QUFDdkJDLHVCQUFTQyxzQkFBVCxDQUFnQyxLQUFLZCxlQUFyQztBQUNBLFFBQUksS0FBS0osTUFBVCxFQUFpQjtBQUNmLFdBQUtBLE1BQUwsQ0FBWW1CLE9BQVo7QUFDRDtBQUNEVCxhQUFTRSxJQUFULENBQWNRLFdBQWQsQ0FBMEIsS0FBS2hCLGVBQS9CO0FBQ0QsRzs7NEJBRURVLHFCLG9DQUF3QjtBQUN0QkcsdUJBQVN0QixNQUFULENBQ0U7QUFBQywrQkFBRDtBQUFBO0FBQ0UsZ0JBQVEsS0FBS0gsS0FBTCxDQUFXYSxNQURyQjtBQUVFLGtCQUFVLEtBQUtaO0FBRmpCO0FBSUcsV0FBS0QsS0FBTCxDQUFXSTtBQUpkLEtBREYsRUFPRSxLQUFLUSxlQVBQO0FBU0QsRzs7NEJBRURULE0scUJBQVM7QUFDUCxXQUFPLElBQVA7QUFDRCxHOzs7RUExRDBDRSxnQkFBTUMsYTs7a0JBQTlCQyxlIiwiZmlsZSI6IlRldGhlckNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAsIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFRldGhlciBmcm9tICd0ZXRoZXInO1xuXG5jbGFzcyBUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnBvc2l0aW9uKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldGhlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcbiAgICBtYXRjaFdpZHRoOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy50ZXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLnJlbmRlclRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMucmVuZGVyVGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmRlc3Ryb3lUZXRoZXJlZENvbnRlbnQoKTtcbiAgfVxuXG4gIHBvc2l0aW9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy50ZXRoZXIpIHtcbiAgICAgIHRoaXMudGV0aGVyID0gbmV3IFRldGhlcih7XG4gICAgICAgIC4uLnRoaXMucHJvcHMub3B0aW9ucyxcbiAgICAgICAgZWxlbWVudDogdGhpcy50ZXRoZXJDb250YWluZXIsXG4gICAgICAgIHRhcmdldDogdGhpcy5wcm9wcy50YXJnZXQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMubWF0Y2hXaWR0aCkge1xuICAgICAgdGhpcy50ZXRoZXJDb250YWluZXIuc3R5bGUud2lkdGggPSBgJHt0aGlzLnByb3BzLnRhcmdldC5jbGllbnRXaWR0aH1weGA7XG4gICAgfVxuICAgIHRoaXMudGV0aGVyLnBvc2l0aW9uKCk7XG4gIH07XG5cbiAgZGVzdHJveVRldGhlcmVkQ29udGVudCgpIHtcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgICBpZiAodGhpcy50ZXRoZXIpIHtcbiAgICAgIHRoaXMudGV0aGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gIH1cblxuICByZW5kZXJUZXRoZXJlZENvbnRlbnQoKSB7XG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgPFRldGhlcmVkQ2hpbGRyZW5Db21wb25lbnRcbiAgICAgICAgdGFyZ2V0PXt0aGlzLnByb3BzLnRhcmdldH1cbiAgICAgICAgcG9zaXRpb249e3RoaXMucG9zaXRpb259XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9UZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50PixcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLFxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==