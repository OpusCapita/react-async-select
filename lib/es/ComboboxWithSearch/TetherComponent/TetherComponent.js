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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvVGV0aGVyQ29tcG9uZW50L1RldGhlckNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0RE9NIiwiVGV0aGVyIiwiVGV0aGVyZWRDaGlsZHJlbkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicHJvcHMiLCJwb3NpdGlvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInJlbmRlciIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsIlRldGhlckNvbXBvbmVudCIsInRldGhlciIsIm9wdGlvbnMiLCJlbGVtZW50IiwidGV0aGVyQ29udGFpbmVyIiwidGFyZ2V0IiwidGV0aGVyQ2hpbGROb2RlIiwiaGVpZ2h0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJtYXJnaW5PZmZzZXQiLCJzdHlsZSIsIm1hdGNoV2lkdGgiLCJ3aWR0aCIsInRldGhlckNoaWxkIiwiY3JlYXRlUmVmIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVuZGVyVGV0aGVyZWRDb250ZW50IiwiY3VycmVudCIsImZpbmRET01Ob2RlIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZpcnN0Q2hpbGQiLCJtYXJnaW4iLCJzcGxpdCIsIm1hdGNoIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkZXN0cm95VGV0aGVyZWRDb250ZW50IiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsUUFBbkI7O0lBRU1DLHlCOzs7Ozs7Ozs7c0NBTUpDLGlCLGdDQUFvQjtBQUNsQixTQUFLQyxLQUFMLENBQVdDLFFBQVg7QUFDRCxHOztzQ0FFREMsa0IsaUNBQXFCO0FBQ25CLFNBQUtGLEtBQUwsQ0FBV0MsUUFBWDtBQUNELEc7O3NDQUVERSxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLSCxLQUFMLENBQVdJLFFBQWxCO0FBQ0QsRzs7O0VBaEJxQ1YsTUFBTVcsYTs7SUFtQnpCQyxlOzs7QUFRbkIsMkJBQVlOLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxrREFDakIsaUNBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsV0EwQm5CQyxRQTFCbUIsR0EwQlIsWUFBTTtBQUNmLFVBQUksQ0FBQyxPQUFLTSxNQUFWLEVBQWtCO0FBQ2hCLGVBQUtBLE1BQUwsR0FBYyxJQUFJVixNQUFKLGNBQ1QsT0FBS0csS0FBTCxDQUFXUSxPQURGO0FBRVpDLG1CQUFTLE9BQUtDLGVBRkY7QUFHWkMsa0JBQVEsT0FBS1gsS0FBTCxDQUFXVztBQUhQLFdBQWQ7QUFLRDtBQUNELFVBQUksT0FBS0MsZUFBVCxFQUEwQjtBQUN4QixZQUFNQyxTQUFTLE9BQUtELGVBQUwsQ0FBcUJFLFdBQXJCLEdBQW1DLE9BQUtGLGVBQUwsQ0FBcUJHLFlBQXJCLEdBQW9DLE9BQUtDLFlBQTVFLEdBQTJGLENBQTFHO0FBQ0EsZUFBS04sZUFBTCxDQUFxQk8sS0FBckIsQ0FBMkJKLE1BQTNCLEdBQXVDQSxNQUF2QztBQUNEO0FBQ0QsVUFBSSxPQUFLYixLQUFMLENBQVdrQixVQUFmLEVBQTJCO0FBQ3pCLGVBQUtSLGVBQUwsQ0FBcUJPLEtBQXJCLENBQTJCRSxLQUEzQixHQUFzQyxPQUFLbkIsS0FBTCxDQUFXVyxNQUFYLENBQWtCRyxXQUF4RDtBQUNEO0FBQ0QsYUFBS1AsTUFBTCxDQUFZTixRQUFaO0FBQ0QsS0ExQ2tCOztBQUVqQixXQUFLbUIsV0FBTCxHQUFtQjFCLE1BQU0yQixTQUFOLEVBQW5CO0FBRmlCO0FBR2xCOzs0QkFFRHRCLGlCLGdDQUFvQjtBQUNsQixTQUFLVyxlQUFMLEdBQXVCWSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQ0FELGFBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQixLQUFLZixlQUEvQjtBQUNBLFNBQUtnQixxQkFBTDtBQUNELEc7OzRCQUVEeEIsa0IsaUNBQXFCO0FBQ25CLFNBQUt3QixxQkFBTDtBQUNBLFFBQUksS0FBS04sV0FBTCxDQUFpQk8sT0FBckIsRUFBOEI7QUFDNUIsV0FBS2YsZUFBTCxHQUF1QmhCLFNBQVNnQyxXQUFULENBQXFCLEtBQUtSLFdBQUwsQ0FBaUJPLE9BQXRDLENBQXZCOztBQUQ0QixrQ0FFYkUsT0FBT0MsZ0JBQVAsQ0FBd0IsS0FBS2xCLGVBQUwsQ0FBcUJtQixVQUE3QyxFQUF5REMsTUFBekQsQ0FBZ0VDLEtBQWhFLENBQXNFLEdBQXRFLENBRmE7QUFBQSxVQUV2QkQsTUFGdUI7QUFHNUI7OztBQUNBQSxlQUFTQSxPQUFPRSxLQUFQLENBQWEsS0FBYixDQUFUO0FBQ0EsV0FBS2xCLFlBQUwsR0FBb0JnQixTQUFTLENBQTdCO0FBQ0Q7QUFDRixHOzs0QkFFREcsb0IsbUNBQXVCO0FBQ3JCLFNBQUtDLHNCQUFMO0FBQ0QsRzs7NEJBb0JEQSxzQixxQ0FBeUI7QUFDdkJ4QyxhQUFTeUMsc0JBQVQsQ0FBZ0MsS0FBSzNCLGVBQXJDO0FBQ0EsUUFBSSxLQUFLSCxNQUFULEVBQWlCO0FBQ2YsV0FBS0EsTUFBTCxDQUFZK0IsT0FBWjtBQUNEO0FBQ0RoQixhQUFTRSxJQUFULENBQWNlLFdBQWQsQ0FBMEIsS0FBSzdCLGVBQS9CO0FBQ0QsRzs7NEJBRURnQixxQixvQ0FBd0I7QUFDdEI5QixhQUFTTyxNQUFULENBQ0U7QUFBQywrQkFBRDtBQUFBO0FBQ0UsYUFBSyxLQUFLaUIsV0FEWjtBQUVFLGdCQUFRLEtBQUtwQixLQUFMLENBQVdXLE1BRnJCO0FBR0Usa0JBQVUsS0FBS1Y7QUFIakI7QUFLRyxXQUFLRCxLQUFMLENBQVdJO0FBTGQsS0FERixFQVFFLEtBQUtNLGVBUlA7QUFVRCxHOzs0QkFFRFAsTSxxQkFBUztBQUNQLFdBQU8sSUFBUDtBQUNELEc7OztFQTNFMENULE1BQU1XLGE7O1NBQTlCQyxlIiwiZmlsZSI6IlRldGhlckNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAsIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFRldGhlciBmcm9tICd0ZXRoZXInO1xuXG5jbGFzcyBUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnBvc2l0aW9uKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvbigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldGhlckNvbXBvbmVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcbiAgICBtYXRjaFdpZHRoOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50ZXRoZXJDaGlsZCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy50ZXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGV0aGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLnJlbmRlclRldGhlcmVkQ29udGVudCgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMucmVuZGVyVGV0aGVyZWRDb250ZW50KCk7XG4gICAgaWYgKHRoaXMudGV0aGVyQ2hpbGQuY3VycmVudCkge1xuICAgICAgdGhpcy50ZXRoZXJDaGlsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnRldGhlckNoaWxkLmN1cnJlbnQpO1xuICAgICAgbGV0IFttYXJnaW5dID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy50ZXRoZXJDaGlsZE5vZGUuZmlyc3RDaGlsZCkubWFyZ2luLnNwbGl0KCcgJyk7XG4gICAgICAvLyBleHBlY3RzIHRoYXQgbWFyZ2luIGlzIGluIHB4XG4gICAgICBtYXJnaW4gPSBtYXJnaW4ubWF0Y2goL1xcZCsvKTtcbiAgICAgIHRoaXMubWFyZ2luT2Zmc2V0ID0gbWFyZ2luICogMjtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmRlc3Ryb3lUZXRoZXJlZENvbnRlbnQoKTtcbiAgfVxuXG4gIHBvc2l0aW9uID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy50ZXRoZXIpIHtcbiAgICAgIHRoaXMudGV0aGVyID0gbmV3IFRldGhlcih7XG4gICAgICAgIC4uLnRoaXMucHJvcHMub3B0aW9ucyxcbiAgICAgICAgZWxlbWVudDogdGhpcy50ZXRoZXJDb250YWluZXIsXG4gICAgICAgIHRhcmdldDogdGhpcy5wcm9wcy50YXJnZXQsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGV0aGVyQ2hpbGROb2RlKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnRldGhlckNoaWxkTm9kZS5jbGllbnRXaWR0aCA/IHRoaXMudGV0aGVyQ2hpbGROb2RlLmNsaWVudEhlaWdodCArIHRoaXMubWFyZ2luT2Zmc2V0IDogMDtcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm1hdGNoV2lkdGgpIHtcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy5wcm9wcy50YXJnZXQuY2xpZW50V2lkdGh9cHhgO1xuICAgIH1cbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICB9O1xuXG4gIGRlc3Ryb3lUZXRoZXJlZENvbnRlbnQoKSB7XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLnRldGhlckNvbnRhaW5lcik7XG4gICAgaWYgKHRoaXMudGV0aGVyKSB7XG4gICAgICB0aGlzLnRldGhlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy50ZXRoZXJDb250YWluZXIpO1xuICB9XG5cbiAgcmVuZGVyVGV0aGVyZWRDb250ZW50KCkge1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxUZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50XG4gICAgICAgIHJlZj17dGhpcy50ZXRoZXJDaGlsZH1cbiAgICAgICAgdGFyZ2V0PXt0aGlzLnByb3BzLnRhcmdldH1cbiAgICAgICAgcG9zaXRpb249e3RoaXMucG9zaXRpb259XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9UZXRoZXJlZENoaWxkcmVuQ29tcG9uZW50PixcbiAgICAgIHRoaXMudGV0aGVyQ29udGFpbmVyLFxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==