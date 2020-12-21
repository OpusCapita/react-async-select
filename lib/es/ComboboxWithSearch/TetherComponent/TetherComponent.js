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

  function TetherComponent(props) {
    _classCallCheck(this, TetherComponent);

    var _this2 = _possibleConstructorReturn(this, _React$PureComponent2.call(this, props));

    _this2.position = function () {
      if (!_this2.tether) {
        _this2.tether = new Tether(_extends({}, _this2.props.options, {
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

    _this2.tetherChild = React.createRef();
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
      this.tetherChildNode = ReactDOM.findDOMNode(this.tetherChild.current);

      var _window$getComputedSt = window.getComputedStyle(this.tetherChildNode).margin.split(' '),
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
}(React.PureComponent);

export { TetherComponent as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0RE9NIiwiVGV0aGVyIiwiVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvcHMiLCJwb3NpdGlvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInJlbmRlciIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsIlRldGhlckNvbXBvbmVudCIsInRldGhlciIsIm9wdGlvbnMiLCJlbGVtZW50IiwidGV0aGVyQ29udGFpbmVyIiwidGFyZ2V0IiwidGV0aGVyQ2hpbGROb2RlIiwiaGVpZ2h0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJtYXJnaW5PZmZzZXQiLCJzdHlsZSIsIm1hdGNoV2lkdGgiLCJ3aWR0aCIsInRldGhlckNoaWxkIiwiY3JlYXRlUmVmIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVuZGVyVGV0aGVyZWRDb250ZW50IiwiY3VycmVudCIsImZpbmRET01Ob2RlIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm1hcmdpbiIsInNwbGl0IiwibWF0Y2giLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRlc3Ryb3lUZXRoZXJlZENvbnRlbnQiLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFdBQXJCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixRQUFuQjs7SUFFTUMseUI7Ozs7Ozs7OztzQ0FNSkMsaUIsZ0NBQW9CO0FBQ2xCLFNBQUtD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ZmlsZSI6IlRldGhlckNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAsIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFRldGhlciBmcm9tICd0ZXRoZXInO1xuXG5jbGFzcyBUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnBvc2l0aW9uKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldGhlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcbiAgICBtYXRjaFdpZHRoOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50ZXRoZXJDaGlsZCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy50ZXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLnJlbmRlclRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMucmVuZGVyVGV0aGVyZWRDb250ZW50KCk7XG4gICAgaWYgKHRoaXMudGV0aGVyQ2hpbGQuY3VycmVudCkge1xuICAgICAgdGhpcy50ZXRoZXJDaGlsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnRldGhlckNoaWxkLmN1cnJlbnQpO1xuICAgICAgbGV0IFttYXJnaW5dID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy50ZXRoZXJDaGlsZE5vZGUpLm1hcmdpbi5zcGxpdCgnICcpO1xuICAgICAgLy8gZXhwZWN0cyB0aGF0IG1hcmdpbiBpcyBpbiBweFxuICAgICAgbWFyZ2luID0gbWFyZ2luLm1hdGNoKC9cXGQrLyk7XG4gICAgICB0aGlzLm1hcmdpbk9mZnNldCA9IG1hcmdpbiAqIDI7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5kZXN0cm95VGV0aGVyZWRDb250ZW50KCk7XG4gIH1cblxuICBwb3NpdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMudGV0aGVyKSB7XG4gICAgICB0aGlzLnRldGhlciA9IG5ldyBUZXRoZXIoe1xuICAgICAgICAuLi50aGlzLnByb3BzLm9wdGlvbnMsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMudGV0aGVyQ29udGFpbmVyLFxuICAgICAgICB0YXJnZXQ6IHRoaXMucHJvcHMudGFyZ2V0LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRldGhlckNoaWxkTm9kZSkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy50ZXRoZXJDaGlsZE5vZGUuY2xpZW50V2lkdGggPyB0aGlzLnRldGhlckNoaWxkTm9kZS5jbGllbnRIZWlnaHQgKyB0aGlzLm1hcmdpbk9mZnNldCA6IDA7XG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5tYXRjaFdpZHRoKSB7XG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3RoaXMucHJvcHMudGFyZ2V0LmNsaWVudFdpZHRofXB4YDtcbiAgICB9XG4gICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgfTtcblxuICBkZXN0cm95VGV0aGVyZWRDb250ZW50KCkge1xuICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICAgIGlmICh0aGlzLnRldGhlcikge1xuICAgICAgdGhpcy50ZXRoZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbmRlclRldGhlcmVkQ29udGVudCgpIHtcbiAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICA8VGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudFxuICAgICAgICByZWY9e3RoaXMudGV0aGVyQ2hpbGR9XG4gICAgICAgIHRhcmdldD17dGhpcy5wcm9wcy50YXJnZXR9XG4gICAgICAgIHBvc2l0aW9uPXt0aGlzLnBvc2l0aW9ufVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudD4sXG4gICAgICB0aGlzLnRldGhlckNvbnRhaW5lcixcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=