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
      _reactSelect.components.Menu,
      menuProps,
      menuProps.children
    )
  );
};

exports.default = FloatingMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvRmxvYXRpbmdNZW51L0Zsb2F0aW5nTWVudS5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiYXR0YWNobWVudCIsInRhcmdldEF0dGFjaG1lbnQiLCJjb25zdHJhaW50cyIsInRvIiwiRmxvYXRpbmdNZW51IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJwcm9wcyIsIm1lbnVQcm9wcyIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFVBQVU7QUFDZEMsY0FBWSxVQURFO0FBRWRDLG9CQUFrQixhQUZKO0FBR2RDLGVBQWEsQ0FDWDtBQUNFQyxRQUFJLFFBRE47QUFFRUgsZ0JBQVk7QUFGZCxHQURXO0FBSEMsQ0FBaEI7O0FBV0EsSUFBTUksZUFBZSxTQUFmQSxZQUFlLFFBQVM7QUFBQSxNQUNwQkMsaUJBRG9CLEdBQ2dCQyxLQURoQixDQUNwQkQsaUJBRG9CO0FBQUEsTUFDRUUsU0FERiw0QkFDZ0JELEtBRGhCOztBQUU1QixTQUNFO0FBQUMsNkJBQUQ7QUFBQTtBQUNFLGNBQVFELGlCQURWO0FBRUUsZUFBU04sT0FGWDtBQUdFLGtCQUFZO0FBSGQ7QUFLRTtBQUFDLDZCQUFELENBQVksSUFBWjtBQUFxQlEsZUFBckI7QUFDR0EsZ0JBQVVDO0FBRGI7QUFMRixHQURGO0FBV0QsQ0FiRDs7a0JBbUJlSixZIiwiZmlsZSI6IkZsb2F0aW5nTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29tcG9uZW50cyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBUZXRoZXJDb21wb25lbnQgZnJvbSAnLi4vVGV0aGVyQ29tcG9uZW50JztcbmltcG9ydCAnLi9GbG9hdGluZ01lbnUuc2Nzcyc7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIGF0dGFjaG1lbnQ6ICd0b3AgbGVmdCcsXG4gIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gbGVmdCcsXG4gIGNvbnN0cmFpbnRzOiBbXG4gICAge1xuICAgICAgdG86ICd3aW5kb3cnLFxuICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcbiAgICB9LFxuICBdLFxufTtcblxuY29uc3QgRmxvYXRpbmdNZW51ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRyb3Bkb3duRmllbGROb2RlLCAuLi5tZW51UHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxUZXRoZXJDb21wb25lbnRcbiAgICAgIHRhcmdldD17ZHJvcGRvd25GaWVsZE5vZGV9XG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgbWF0Y2hXaWR0aD17dHJ1ZX1cbiAgICA+XG4gICAgICA8Y29tcG9uZW50cy5NZW51IHsuLi5tZW51UHJvcHN9PlxuICAgICAgICB7bWVudVByb3BzLmNoaWxkcmVufVxuICAgICAgPC9jb21wb25lbnRzLk1lbnU+XG4gICAgPC9UZXRoZXJDb21wb25lbnQ+XG4gICk7XG59O1xuXG5GbG9hdGluZ01lbnUucHJvcFR5cGVzID0ge1xuICBkcm9wZG93bkZpZWxkTm9kZTogUHJvcFR5cGVzLmVsZW1lbnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ01lbnU7XG4iXX0=