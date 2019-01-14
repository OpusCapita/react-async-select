var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-multi-comp, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tether from 'tether';

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
}(React.PureComponent);

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
        _this2.tether = new Tether(_extends({}, _this2.props.options, {
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
    ReactDOM.unmountComponentAtNode(this.tetherContainer);
    this.tether.destroy();
    document.body.removeChild(this.tetherContainer);
  };

  TetherComponent.prototype.renderTetheredContent = function renderTetheredContent() {
    ReactDOM.render(React.createElement(
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
}(React.PureComponent);

export { TetherComponent as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0RE9NIiwiVGV0aGVyIiwiVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvcHMiLCJwb3NpdGlvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInJlbmRlciIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsIlRldGhlckNvbXBvbmVudCIsInRldGhlciIsIm9wdGlvbnMiLCJlbGVtZW50IiwidGV0aGVyQ29udGFpbmVyIiwidGFyZ2V0IiwibWF0Y2hXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJjbGllbnRXaWR0aCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlbmRlclRldGhlcmVkQ29udGVudCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZGVzdHJveVRldGhlcmVkQ29udGVudCIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5COztJQUVNQyx5Qjs7Ozs7Ozs7O3NDQU1KQyxpQixnQ0FBb0I7QUFDbEIsU0FBS0MsS0FBTCxDQUFXQyxRQUFYO0FBQ0QsRzs7c0NBRURDLGtCLGlDQUFxQjtBQUNuQixTQUFLRixLQUFMLENBQVdDLFFBQVg7QUFDRCxHOztzQ0FFREUsTSxxQkFBUztBQUNQLFdBQU8sS0FBS0gsS0FBTCxDQUFXSSxRQUFsQjtBQUNELEc7OztFQWhCcUNWLE1BQU1XLGE7O0lBbUJ6QkMsZTs7Ozs7Ozs7Ozs7O3FLQXNCbkJMLFEsR0FBVyxZQUFNO0FBQ2YsVUFBSSxDQUFDLE9BQUtNLE1BQVYsRUFBa0I7QUFDaEIsZUFBS0EsTUFBTCxHQUFjLElBQUlWLE1BQUosY0FDVCxPQUFLRyxLQUFMLENBQVdRLE9BREY7QUFFWkMsbUJBQVMsT0FBS0MsZUFGRjtBQUdaQyxrQkFBUSxPQUFLWCxLQUFMLENBQVdXO0FBSFAsV0FBZDtBQUtEO0FBQ0QsVUFBSSxPQUFLWCxLQUFMLENBQVdZLFVBQWYsRUFBMkI7QUFDekIsZUFBS0YsZUFBTCxDQUFxQkcsS0FBckIsQ0FBMkJDLEtBQTNCLEdBQXNDLE9BQUtkLEtBQUwsQ0FBV1csTUFBWCxDQUFrQkksV0FBeEQ7QUFDRDtBQUNELGFBQUtSLE1BQUwsQ0FBWU4sUUFBWjtBQUNELEs7Ozs0QkExQkRGLGlCLGdDQUFvQjtBQUNsQixTQUFLVyxlQUFMLEdBQXVCTSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0FELGFBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLVCxlQUEvQjtBQUNBLFNBQUtVLHFCQUFMO0FBQ0QsRzs7NEJBRURsQixrQixpQ0FBcUI7QUFDbkIsU0FBS2tCLHFCQUFMO0FBQ0QsRzs7NEJBRURDLG9CLG1DQUF1QjtBQUNyQixTQUFLQyxzQkFBTDtBQUNELEc7OzRCQWdCREEsc0IscUNBQXlCO0FBQ3ZCMUIsYUFBUzJCLHNCQUFULENBQWdDLEtBQUtiLGVBQXJDO0FBQ0EsU0FBS0gsTUFBTCxDQUFZaUIsT0FBWjtBQUNBUixhQUFTRSxJQUFULENBQWNPLFdBQWQsQ0FBMEIsS0FBS2YsZUFBL0I7QUFDRCxHOzs0QkFFRFUscUIsb0NBQXdCO0FBQ3RCeEIsYUFBU08sTUFBVCxDQUNFO0FBQUMsK0JBQUQ7QUFBQTtBQUNFLGdCQUFRLEtBQUtILEtBQUwsQ0FBV1csTUFEckI7QUFFRSxrQkFBVSxLQUFLVjtBQUZqQjtBQUlHLFdBQUtELEtBQUwsQ0FBV0k7QUFKZCxLQURGLEVBT0UsS0FBS00sZUFQUDtBQVNELEc7OzRCQUVEUCxNLHFCQUFTO0FBQ1AsV0FBTyxJQUFQO0FBQ0QsRzs7O0VBeEQwQ1QsTUFBTVcsYTs7U0FBOUJDLGUiLCJmaWxlIjoiVGV0aGVyQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCwgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgVGV0aGVyIGZyb20gJ3RldGhlcic7XG5cbmNsYXNzIFRldGhlcmVkQ2hpbGRyZW5Db21wb25lbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMucG9zaXRpb24oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnByb3BzLnBvc2l0aW9uKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0aGVyQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRhcmdldDogUHJvcFR5cGVzLmFueS5pc1JlcXVpcmVkLFxuICAgIG1hdGNoV2lkdGg6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnRldGhlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICAgIHRoaXMucmVuZGVyVGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5yZW5kZXJUZXRoZXJlZENvbnRlbnQoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuZGVzdHJveVRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgcG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnRldGhlcikge1xuICAgICAgdGhpcy50ZXRoZXIgPSBuZXcgVGV0aGVyKHtcbiAgICAgICAgLi4udGhpcy5wcm9wcy5vcHRpb25zLFxuICAgICAgICBlbGVtZW50OiB0aGlzLnRldGhlckNvbnRhaW5lcixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnByb3BzLnRhcmdldCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5tYXRjaFdpZHRoKSB7XG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3RoaXMucHJvcHMudGFyZ2V0LmNsaWVudFdpZHRofXB4YDtcbiAgICB9XG4gICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgfTtcblxuICBkZXN0cm95VGV0aGVyZWRDb250ZW50KCkge1xuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICAgIHRoaXMudGV0aGVyLmRlc3Ryb3koKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbmRlclRldGhlcmVkQ29udGVudCgpIHtcbiAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICA8VGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudFxuICAgICAgICB0YXJnZXQ9e3RoaXMucHJvcHMudGFyZ2V0fVxuICAgICAgICBwb3NpdGlvbj17dGhpcy5wb3NpdGlvbn1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L1RldGhlcmVkQ2hpbGRyZW5Db21wb25lbnQ+LFxuICAgICAgdGhpcy50ZXRoZXJDb250YWluZXIsXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19