'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _TetherComponent = require('../TetherComponent');

var _TetherComponent2 = _interopRequireDefault(_TetherComponent);

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
      _reactSelect.components.Menu,
      menuProps,
      menuProps.children
    )
  );
};

exports.default = FloatingMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvRmxvYXRpbmdNZW51L0Zsb2F0aW5nTWVudS5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiYXR0YWNobWVudCIsInRhcmdldEF0dGFjaG1lbnQiLCJjb25zdHJhaW50cyIsInRvIiwiRmxvYXRpbmdNZW51IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJwcm9wcyIsIm1lbnVQcm9wcyIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFVBQVU7QUFDZEMsY0FBWSxVQURFO0FBRWRDLG9CQUFrQixhQUZKO0FBR2RDLGVBQWEsQ0FDWDtBQUNFQyxRQUFJLFFBRE47QUFFRUgsZ0JBQVk7QUFGZCxHQURXO0FBSEMsQ0FBaEI7O0FBV0EsSUFBTUksZUFBZSxTQUFmQSxZQUFlLFFBQVM7QUFBQSxNQUNwQkMsaUJBRG9CLEdBQ2dCQyxLQURoQixDQUNwQkQsaUJBRG9CO0FBQUEsTUFDRUUsU0FERiw0QkFDZ0JELEtBRGhCOztBQUU1QixTQUNFO0FBQUMsNkJBQUQ7QUFBQTtBQUNFLGNBQVFELGlCQURWO0FBRUUsZUFBU04sT0FGWDtBQUdFLGtCQUFZO0FBSGQ7QUFLRTtBQUFDLDZCQUFELENBQVksSUFBWjtBQUFxQlEsZUFBckI7QUFDR0EsZ0JBQVVDO0FBRGI7QUFMRixHQURGO0FBV0QsQ0FiRDs7a0JBbUJlSixZIiwiZmlsZSI6IkZsb2F0aW5nTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29tcG9uZW50cyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBUZXRoZXJDb21wb25lbnQgZnJvbSAnLi4vVGV0aGVyQ29tcG9uZW50JztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgYXR0YWNobWVudDogJ3RvcCBsZWZ0JyxcbiAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBsZWZ0JyxcbiAgY29uc3RyYWludHM6IFtcbiAgICB7XG4gICAgICB0bzogJ3dpbmRvdycsXG4gICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxuICAgIH0sXG4gIF0sXG59O1xuXG5jb25zdCBGbG9hdGluZ01lbnUgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgZHJvcGRvd25GaWVsZE5vZGUsIC4uLm1lbnVQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPFRldGhlckNvbXBvbmVudFxuICAgICAgdGFyZ2V0PXtkcm9wZG93bkZpZWxkTm9kZX1cbiAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICBtYXRjaFdpZHRoPXt0cnVlfVxuICAgID5cbiAgICAgIDxjb21wb25lbnRzLk1lbnUgey4uLm1lbnVQcm9wc30+XG4gICAgICAgIHttZW51UHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2NvbXBvbmVudHMuTWVudT5cbiAgICA8L1RldGhlckNvbXBvbmVudD5cbiAgKTtcbn07XG5cbkZsb2F0aW5nTWVudS5wcm9wVHlwZXMgPSB7XG4gIGRyb3Bkb3duRmllbGROb2RlOiBQcm9wVHlwZXMuZWxlbWVudCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTWVudTtcbiJdfQ==