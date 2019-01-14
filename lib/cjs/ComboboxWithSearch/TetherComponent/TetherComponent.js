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
    this.tether.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInBvc2l0aW9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJUZXRoZXJDb21wb25lbnQiLCJ0ZXRoZXIiLCJUZXRoZXIiLCJvcHRpb25zIiwiZWxlbWVudCIsInRldGhlckNvbnRhaW5lciIsInRhcmdldCIsIm1hdGNoV2lkdGgiLCJzdHlsZSIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJUZXRoZXJlZENvbnRlbnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRlc3Ryb3lUZXRoZXJlZENvbnRlbnQiLCJSZWFjdERPTSIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKQTs7O0lBTU1BLHlCOzs7Ozs7Ozs7c0NBTUpDLGlCLGdDQUFvQjtBQUNsQixTQUFLQyxLQUFMLENBQVdDLFFBQVg7QUFDRCxHOztzQ0FFREMsa0IsaUNBQXFCO0FBQ25CLFNBQUtGLEtBQUwsQ0FBV0MsUUFBWDtBQUNELEc7O3NDQUVERSxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLSCxLQUFMLENBQVdJLFFBQWxCO0FBQ0QsRzs7O0VBaEJxQ0MsZ0JBQU1DLGE7O0lBbUJ6QkMsZTs7Ozs7Ozs7Ozs7O3FLQXNCbkJOLFEsR0FBVyxZQUFNO0FBQ2YsVUFBSSxDQUFDLE9BQUtPLE1BQVYsRUFBa0I7QUFDaEIsZUFBS0EsTUFBTCxHQUFjLElBQUlDLGdCQUFKLGNBQ1QsT0FBS1QsS0FBTCxDQUFXVSxPQURGO0FBRVpDLG1CQUFTLE9BQUtDLGVBRkY7QUFHWkMsa0JBQVEsT0FBS2IsS0FBTCxDQUFXYTtBQUhQLFdBQWQ7QUFLRDtBQUNELFVBQUksT0FBS2IsS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLGVBQUtGLGVBQUwsQ0FBcUJHLEtBQXJCLENBQTJCQyxLQUEzQixHQUFzQyxPQUFLaEIsS0FBTCxDQUFXYSxNQUFYLENBQWtCSSxXQUF4RDtBQUNEO0FBQ0QsYUFBS1QsTUFBTCxDQUFZUCxRQUFaO0FBQ0QsSzs7OzRCQTFCREYsaUIsZ0NBQW9CO0FBQ2xCLFNBQUthLGVBQUwsR0FBdUJNLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQUQsYUFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCLEtBQUtULGVBQS9CO0FBQ0EsU0FBS1UscUJBQUw7QUFDRCxHOzs0QkFFRHBCLGtCLGlDQUFxQjtBQUNuQixTQUFLb0IscUJBQUw7QUFDRCxHOzs0QkFFREMsb0IsbUNBQXVCO0FBQ3JCLFNBQUtDLHNCQUFMO0FBQ0QsRzs7NEJBZ0JEQSxzQixxQ0FBeUI7QUFDdkJDLHVCQUFTQyxzQkFBVCxDQUFnQyxLQUFLZCxlQUFyQztBQUNBLFNBQUtKLE1BQUwsQ0FBWW1CLE9BQVo7QUFDQVQsYUFBU0UsSUFBVCxDQUFjUSxXQUFkLENBQTBCLEtBQUtoQixlQUEvQjtBQUNELEc7OzRCQUVEVSxxQixvQ0FBd0I7QUFDdEJHLHVCQUFTdEIsTUFBVCxDQUNFO0FBQUMsK0JBQUQ7QUFBQTtBQUNFLGdCQUFRLEtBQUtILEtBQUwsQ0FBV2EsTUFEckI7QUFFRSxrQkFBVSxLQUFLWjtBQUZqQjtBQUlHLFdBQUtELEtBQUwsQ0FBV0k7QUFKZCxLQURGLEVBT0UsS0FBS1EsZUFQUDtBQVNELEc7OzRCQUVEVCxNLHFCQUFTO0FBQ1AsV0FBTyxJQUFQO0FBQ0QsRzs7O0VBeEQwQ0UsZ0JBQU1DLGE7O2tCQUE5QkMsZSIsImZpbGUiOiJUZXRoZXJDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wLCByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBUZXRoZXIgZnJvbSAndGV0aGVyJztcblxuY2xhc3MgVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMucHJvcHMucG9zaXRpb24oKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRoZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG4gICAgbWF0Y2hXaWR0aDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudGV0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gICAgdGhpcy5yZW5kZXJUZXRoZXJlZENvbnRlbnQoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnJlbmRlclRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5kZXN0cm95VGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBwb3NpdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMudGV0aGVyKSB7XG4gICAgICB0aGlzLnRldGhlciA9IG5ldyBUZXRoZXIoe1xuICAgICAgICAuLi50aGlzLnByb3BzLm9wdGlvbnMsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMudGV0aGVyQ29udGFpbmVyLFxuICAgICAgICB0YXJnZXQ6IHRoaXMucHJvcHMudGFyZ2V0LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm1hdGNoV2lkdGgpIHtcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy5wcm9wcy50YXJnZXQuY2xpZW50V2lkdGh9cHhgO1xuICAgIH1cbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICB9O1xuXG4gIGRlc3Ryb3lUZXRoZXJlZENvbnRlbnQoKSB7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gICAgdGhpcy50ZXRoZXIuZGVzdHJveSgpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyVGV0aGVyZWRDb250ZW50KCkge1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50XG4gICAgICAgIHRhcmdldD17dGhpcy5wcm9wcy50YXJnZXR9XG4gICAgICAgIHBvc2l0aW9uPXt0aGlzLnBvc2l0aW9ufVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudD4sXG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lcixcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=