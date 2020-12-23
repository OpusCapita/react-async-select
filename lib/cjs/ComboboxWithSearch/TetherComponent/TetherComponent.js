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

  function TetherComponent(props) {
    _classCallCheck(this, TetherComponent);

    var _this2 = _possibleConstructorReturn(this, _React$PureComponent2.call(this, props));

    _this2.position = function () {
      if (!_this2.tether) {
        _this2.tether = new _tether2.default(_extends({}, _this2.props.options, {
          element: _this2.tetherContainer,
          target: _this2.props.target
        }));
      }
      if (_this2.tetherChildNode) {
        var height = _this2.tetherChildNode.clientWidth ? _this2.tetherChildNode.clientHeight + _this2.marginOffset : 0;
        _this2.tetherContainer.style.height = height + 'px';
      }
      if (_this2.props.matchWidth) {
        _this2.tetherContainer.style.width = _this2.props.target.clientWidth + 'px';
      }
      _this2.tether.position();
    };

    _this2.tetherChild = _react2.default.createRef();
    return _this2;
  }

  TetherComponent.prototype.componentDidMount = function componentDidMount() {
    this.tetherContainer = document.createElement('div');
    document.body.appendChild(this.tetherContainer);
    this.renderTetheredContent();
  };

  TetherComponent.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderTetheredContent();
    if (this.tetherChild.current) {
      this.tetherChildNode = _reactDom2.default.findDOMNode(this.tetherChild.current);

      var _window$getComputedSt = window.getComputedStyle(this.tetherChildNode.firstChild).margin.split(' '),
          margin = _window$getComputedSt[0];
      // expects that margin is in px


      margin = margin.match(/\d+/);
      this.marginOffset = margin * 2;
    }
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
        ref: this.tetherChild,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInBvc2l0aW9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJUZXRoZXJDb21wb25lbnQiLCJ0ZXRoZXIiLCJUZXRoZXIiLCJvcHRpb25zIiwiZWxlbWVudCIsInRldGhlckNvbnRhaW5lciIsInRhcmdldCIsInRldGhlckNoaWxkTm9kZSIsImhlaWdodCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwibWFyZ2luT2Zmc2V0Iiwic3R5bGUiLCJtYXRjaFdpZHRoIiwid2lkdGgiLCJ0ZXRoZXJDaGlsZCIsImNyZWF0ZVJlZiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlbmRlclRldGhlcmVkQ29udGVudCIsImN1cnJlbnQiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZpcnN0Q2hpbGQiLCJtYXJnaW4iLCJzcGxpdCIsIm1hdGNoIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkZXN0cm95VGV0aGVyZWRDb250ZW50IiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUpBOzs7SUFNTUEseUI7Ozs7Ozs7OztzQ0FNSkMsaUIsZ0NBQW9CO0FBQ2xCLFNBQUtDLEtBQUwsQ0FBV0MsUUFBWDtBQUNELEc7O3NDQUVEQyxrQixpQ0FBcUI7QUFDbkIsU0FBS0YsS0FBTCxDQUFXQyxRQUFYO0FB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aW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCwgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVGV0aGVyIGZyb20gJ3RldGhlcic7XG5cbmNsYXNzIFRldGhlcmVkQ2hpbGRyZW5Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMucG9zaXRpb24oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnByb3BzLnBvc2l0aW9uKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0aGVyQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRhcmdldDogUHJvcFR5cGVzLmFueS5pc1JlcXVpcmVkLFxuICAgIG1hdGNoV2lkdGg6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRldGhlckNoaWxkID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnRldGhlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICAgIHRoaXMucmVuZGVyVGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5yZW5kZXJUZXRoZXJlZENvbnRlbnQoKTtcbiAgICBpZiAodGhpcy50ZXRoZXJDaGlsZC5jdXJyZW50KSB7XG4gICAgICB0aGlzLnRldGhlckNoaWxkTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMudGV0aGVyQ2hpbGQuY3VycmVudCk7XG4gICAgICBsZXQgW21hcmdpbl0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRldGhlckNoaWxkTm9kZS5maXJzdENoaWxkKS5tYXJnaW4uc3BsaXQoJyAnKTtcbiAgICAgIC8vIGV4cGVjdHMgdGhhdCBtYXJnaW4gaXMgaW4gcHhcbiAgICAgIG1hcmdpbiA9IG1hcmdpbi5tYXRjaCgvXFxkKy8pO1xuICAgICAgdGhpcy5tYXJnaW5PZmZzZXQgPSBtYXJnaW4gKiAyO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuZGVzdHJveVRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgcG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnRldGhlcikge1xuICAgICAgdGhpcy50ZXRoZXIgPSBuZXcgVGV0aGVyKHtcbiAgICAgICAgLi4udGhpcy5wcm9wcy5vcHRpb25zLFxuICAgICAgICBlbGVtZW50OiB0aGlzLnRldGhlckNvbnRhaW5lcixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnByb3BzLnRhcmdldCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy50ZXRoZXJDaGlsZE5vZGUpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMudGV0aGVyQ2hpbGROb2RlLmNsaWVudFdpZHRoID8gdGhpcy50ZXRoZXJDaGlsZE5vZGUuY2xpZW50SGVpZ2h0ICsgdGhpcy5tYXJnaW5PZmZzZXQgOiAwO1xuICAgICAgdGhpcy50ZXRoZXJDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMubWF0Y2hXaWR0aCkge1xuICAgICAgdGhpcy50ZXRoZXJDb250YWluZXIuc3R5bGUud2lkdGggPSBgJHt0aGlzLnByb3BzLnRhcmdldC5jbGllbnRXaWR0aH1weGA7XG4gICAgfVxuICAgIHRoaXMudGV0aGVyLnBvc2l0aW9uKCk7XG4gIH07XG5cbiAgZGVzdHJveVRldGhlcmVkQ29udGVudCgpIHtcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgICBpZiAodGhpcy50ZXRoZXIpIHtcbiAgICAgIHRoaXMudGV0aGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gIH1cblxuICByZW5kZXJUZXRoZXJlZENvbnRlbnQoKSB7XG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgPFRldGhlcmVkQ2hpbGRyZW5Db21wb25lbnRcbiAgICAgICAgcmVmPXt0aGlzLnRldGhlckNoaWxkfVxuICAgICAgICB0YXJnZXQ9e3RoaXMucHJvcHMudGFyZ2V0fVxuICAgICAgICBwb3NpdGlvbj17dGhpcy5wb3NpdGlvbn1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1RldGhlcmVkQ2hpbGRyZW5Db21wb25lbnQ+LFxuICAgICAgdGhpcy50ZXRoZXJDb250YWluZXIsXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19