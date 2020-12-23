'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _TetherComponent = require('../TetherComponent');

var _TetherComponent2 = _interopRequireDefault(_TetherComponent);

require('./FloatingMenu.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var options = {
  attachment: 'top left',
  targetAttachment: 'bottom left',
  constraints: [{
    to: 'window',
    attachment: 'together'
  }]
};

var FloatingMenu = function FloatingMenu(props) {
  var dropdownFieldNode = props.dropdownFieldNode,
      menuProps = _objectWithoutProperties(props, ['dropdownFieldNode']);

  return _react2.default.createElement(
    _TetherComponent2.default,
    {
      target: dropdownFieldNode,
      options: options,
      matchWidth: true
    },
    _react2.default.createElement(
      'div',
      { className: 'combobox-with-search-floating-menu' },
      _react2.default.createElement(
        _reactSelect.components.Menu,
        menuProps,
        menuProps.children
      )
    )
  );
};

exports.default = FloatingMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvRmxvYXRpbmdNZW51L0Zsb2F0aW5nTWVudS5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiYXR0YWNobWVudCIsInRhcmdldEF0dGFjaG1lbnQiLCJjb25zdHJhaW50cyIsInRvIiwiRmxvYXRpbmdNZW51IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJwcm9wcyIsIm1lbnVQcm9wcyIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFVBQVU7QUFDZEMsY0FBWSxVQURFO0FBRWRDLG9CQUFrQixhQUZKO0FBR2RDLGVBQWEsQ0FDWDtBQUNFQyxRQUFJLFFBRE47QUFFRUgsZ0JBQVk7QUFGZCxHQURXO0FBSEMsQ0FBaEI7O0FBV0EsSUFBTUksZUFBZSxTQUFmQSxZQUFlLFFBQVM7QUFBQSxNQUNwQkMsaUJBRG9CLEdBQ2dCQyxLQURoQixDQUNwQkQsaUJBRG9CO0FBQUEsTUFDRUUsU0FERiw0QkFDZ0JELEtBRGhCOztBQUU1QixTQUNFO0FBQUMsNkJBQUQ7QUFBQTtBQUNFLGNBQVFELGlCQURWO0FBRUUsZUFBU04sT0FGWDtBQUdFLGtCQUFZO0FBSGQ7QUFLRTtBQUFBO0FBQUEsUUFBSyxXQUFVLG9DQUFmO0FBQ0U7QUFBQywrQkFBRCxDQUFZLElBQVo7QUFBcUJRLGlCQUFyQjtBQUNHQSxrQkFBVUM7QUFEYjtBQURGO0FBTEYsR0FERjtBQWFELENBZkQ7O2tCQXFCZUosWSIsImZpbGUiOiJGbG9hdGluZ01lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbXBvbmVudHMgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgVGV0aGVyQ29tcG9uZW50IGZyb20gJy4uL1RldGhlckNvbXBvbmVudCc7XG5pbXBvcnQgJy4vRmxvYXRpbmdNZW51LnNjc3MnO1xuXG5jb25zdCBvcHRpb25zID0ge1xuICBhdHRhY2htZW50OiAndG9wIGxlZnQnLFxuICB0YXJnZXRBdHRhY2htZW50OiAnYm90dG9tIGxlZnQnLFxuICBjb25zdHJhaW50czogW1xuICAgIHtcbiAgICAgIHRvOiAnd2luZG93JyxcbiAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcicsXG4gICAgfSxcbiAgXSxcbn07XG5cbmNvbnN0IEZsb2F0aW5nTWVudSA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBkcm9wZG93bkZpZWxkTm9kZSwgLi4ubWVudVByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8VGV0aGVyQ29tcG9uZW50XG4gICAgICB0YXJnZXQ9e2Ryb3Bkb3duRmllbGROb2RlfVxuICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgIG1hdGNoV2lkdGg9e3RydWV9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbWJvYm94LXdpdGgtc2VhcmNoLWZsb2F0aW5nLW1lbnUnPlxuICAgICAgICA8Y29tcG9uZW50cy5NZW51IHsuLi5tZW51UHJvcHN9PlxuICAgICAgICAgIHttZW51UHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvY29tcG9uZW50cy5NZW51PlxuICAgICAgPC9kaXY+XG4gICAgPC9UZXRoZXJDb21wb25lbnQ+XG4gICk7XG59O1xuXG5GbG9hdGluZ01lbnUucHJvcFR5cGVzID0ge1xuICBkcm9wZG93bkZpZWxkTm9kZTogUHJvcFR5cGVzLmVsZW1lbnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ01lbnU7XG4iXX0=