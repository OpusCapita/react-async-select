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
    if (this.tether) {
      this.tether.destroy();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0RE9NIiwiVGV0aGVyIiwiVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvcHMiLCJwb3NpdGlvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInJlbmRlciIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsIlRldGhlckNvbXBvbmVudCIsInRldGhlciIsIm9wdGlvbnMiLCJlbGVtZW50IiwidGV0aGVyQ29udGFpbmVyIiwidGFyZ2V0IiwibWF0Y2hXaWR0aCIsInN0eWxlIiwid2lkdGgiLCJjbGllbnRXaWR0aCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlbmRlclRldGhlcmVkQ29udGVudCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZGVzdHJveVRldGhlcmVkQ29udGVudCIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5COztJQUVNQyx5Qjs7Ozs7Ozs7O3NDQU1KQyxpQixnQ0FBb0I7QUFDbEIsU0FBS0MsS0FBTCxDQUFXQyxRQUFYO0FBQ0QsRzs7c0NBRURDLGtCLGlDQUFxQjtBQUNuQixTQUFLRixLQUFMLENBQVdDLFFBQVg7QUFDRCxHOztzQ0FFREUsTSxxQkFBUztBQUNQLFdBQU8sS0FBS0gsS0FBTCxDQUFXSSxRQUFsQjtBQUNELEc7OztFQWhCcUNWLE1BQU1XLGE7O0lBbUJ6QkMsZTs7Ozs7Ozs7Ozs7O3FLQXNCbkJMLFEsR0FBVyxZQUFNO0FBQ2YsVUFBSSxDQUFDLE9BQUtNLE1BQVYsRUFBa0I7QUFDaEIsZUFBS0EsTUFBTCxHQUFjLElBQUlWLE1BQUosY0FDVCxPQUFLRyxLQUFMLENBQVdRLE9BREY7QUFFWkMsbUJBQVMsT0FBS0MsZUFGRjtBQUdaQyxrQkFBUSxPQUFLWCxLQUFMLENBQVdXO0FBSFAsV0FBZDtBQUtEO0FBQ0QsVUFBSSxPQUFLWCxLQUFMLENBQVdZLFVBQWYsRUFBMkI7QUFDekIsZUFBS0YsZUFBTCxDQUFxQkcsS0FBckIsQ0FBMkJDLEtBQTNCLEdBQXNDLE9BQUtkLEtBQUwsQ0FBV1csTUFBWCxDQUFrQkksV0FBeEQ7QUFDRDtBQUNELGFBQUtSLE1BQUwsQ0FBWU4sUUFBWjtBQUNELEs7Ozs0QkExQkRGLGlCLGdDQUFvQjtBQUNsQixTQUFLVyxlQUFMLEdBQXVCTSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0FELGFBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLVCxlQUEvQjtBQUNBLFNBQUtVLHFCQUFMO0FBQ0QsRzs7NEJBRURsQixrQixpQ0FBcUI7QUFDbkIsU0FBS2tCLHFCQUFMO0FBQ0QsRzs7NEJBRURDLG9CLG1DQUF1QjtBQUNyQixTQUFLQyxzQkFBTDtBQUNELEc7OzRCQWdCREEsc0IscUNBQXlCO0FBQ3ZCMUIsYUFBUzJCLHNCQUFULENBQWdDLEtBQUtiLGVBQXJDO0FBQ0EsUUFBSSxLQUFLSCxNQUFULEVBQWlCO0FBQ2YsV0FBS0EsTUFBTCxDQUFZaUIsT0FBWjtBQUNEO0FBQ0RSLGFBQVNFLElBQVQsQ0FBY08sV0FBZCxDQUEwQixLQUFLZixlQUEvQjtBQUNELEc7OzRCQUVEVSxxQixvQ0FBd0I7QUFDdEJ4QixhQUFTTyxNQUFULENBQ0U7QUFBQywrQkFBRDtBQUFBO0FBQ0UsZ0JBQVEsS0FBS0gsS0FBTCxDQUFXVyxNQURyQjtBQUVFLGtCQUFVLEtBQUtWO0FBRmpCO0FBSUcsV0FBS0QsS0FBTCxDQUFXSTtBQUpkLEtBREYsRUFPRSxLQUFLTSxlQVBQO0FBU0QsRzs7NEJBRURQLE0scUJBQVM7QUFDUCxXQUFPLElBQVA7QUFDRCxHOzs7RUExRDBDVCxNQUFNVyxhOztTQUE5QkMsZSIsImZpbGUiOiJUZXRoZXJDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1tdWx0aS1jb21wLCByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBUZXRoZXIgZnJvbSAndGV0aGVyJztcblxuY2xhc3MgVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMucHJvcHMucG9zaXRpb24oKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRoZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG4gICAgbWF0Y2hXaWR0aDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudGV0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gICAgdGhpcy5yZW5kZXJUZXRoZXJlZENvbnRlbnQoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnJlbmRlclRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5kZXN0cm95VGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBwb3NpdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMudGV0aGVyKSB7XG4gICAgICB0aGlzLnRldGhlciA9IG5ldyBUZXRoZXIoe1xuICAgICAgICAuLi50aGlzLnByb3BzLm9wdGlvbnMsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMudGV0aGVyQ29udGFpbmVyLFxuICAgICAgICB0YXJnZXQ6IHRoaXMucHJvcHMudGFyZ2V0LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm1hdGNoV2lkdGgpIHtcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy5wcm9wcy50YXJnZXQuY2xpZW50V2lkdGh9cHhgO1xuICAgIH1cbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICB9O1xuXG4gIGRlc3Ryb3lUZXRoZXJlZENvbnRlbnQoKSB7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gICAgaWYgKHRoaXMudGV0aGVyKSB7XG4gICAgICB0aGlzLnRldGhlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyVGV0aGVyZWRDb250ZW50KCkge1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50XG4gICAgICAgIHRhcmdldD17dGhpcy5wcm9wcy50YXJnZXR9XG4gICAgICAgIHBvc2l0aW9uPXt0aGlzLnBvc2l0aW9ufVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudD4sXG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lcixcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=