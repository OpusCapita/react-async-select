function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

import TetherComponent from '../TetherComponent';
import './FloatingMenu.scss';

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

  return React.createElement(
    TetherComponent,
    {
      target: dropdownFieldNode,
      options: options,
      matchWidth: true
    },
    React.createElement(
      components.Menu,
      menuProps,
      menuProps.children
    )
  );
};

export default FloatingMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvRmxvYXRpbmdNZW51L0Zsb2F0aW5nTWVudS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImNvbXBvbmVudHMiLCJUZXRoZXJDb21wb25lbnQiLCJvcHRpb25zIiwiYXR0YWNobWVudCIsInRhcmdldEF0dGFjaG1lbnQiLCJjb25zdHJhaW50cyIsInRvIiwiRmxvYXRpbmdNZW51IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJwcm9wcyIsIm1lbnVQcm9wcyIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixjQUEzQjs7QUFFQSxPQUFPQyxlQUFQLE1BQTRCLG9CQUE1QjtBQUNBLE9BQU8scUJBQVA7O0FBRUEsSUFBTUMsVUFBVTtBQUNkQyxjQUFZLFVBREU7QUFFZEMsb0JBQWtCLGFBRko7QUFHZEMsZUFBYSxDQUNYO0FBQ0VDLFFBQUksUUFETjtBQUVFSCxnQkFBWTtBQUZkLEdBRFc7QUFIQyxDQUFoQjs7QUFXQSxJQUFNSSxlQUFlLFNBQWZBLFlBQWUsUUFBUztBQUFBLE1BQ3BCQyxpQkFEb0IsR0FDZ0JDLEtBRGhCLENBQ3BCRCxpQkFEb0I7QUFBQSxNQUNFRSxTQURGLDRCQUNnQkQsS0FEaEI7O0FBRTVCLFNBQ0U7QUFBQyxtQkFBRDtBQUFBO0FBQ0UsY0FBUUQsaUJBRFY7QUFFRSxlQUFTTixPQUZYO0FBR0Usa0JBQVk7QUFIZDtBQUtFO0FBQUMsZ0JBQUQsQ0FBWSxJQUFaO0FBQXFCUSxlQUFyQjtBQUNHQSxnQkFBVUM7QUFEYjtBQUxGLEdBREY7QUFXRCxDQWJEOztBQW1CQSxlQUFlSixZQUFmIiwiZmlsZSI6IkZsb2F0aW5nTWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29tcG9uZW50cyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBUZXRoZXJDb21wb25lbnQgZnJvbSAnLi4vVGV0aGVyQ29tcG9uZW50JztcbmltcG9ydCAnLi9GbG9hdGluZ01lbnUuc2Nzcyc7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIGF0dGFjaG1lbnQ6ICd0b3AgbGVmdCcsXG4gIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gbGVmdCcsXG4gIGNvbnN0cmFpbnRzOiBbXG4gICAge1xuICAgICAgdG86ICd3aW5kb3cnLFxuICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcbiAgICB9LFxuICBdLFxufTtcblxuY29uc3QgRmxvYXRpbmdNZW51ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGRyb3Bkb3duRmllbGROb2RlLCAuLi5tZW51UHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxUZXRoZXJDb21wb25lbnRcbiAgICAgIHRhcmdldD17ZHJvcGRvd25GaWVsZE5vZGV9XG4gICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgbWF0Y2hXaWR0aD17dHJ1ZX1cbiAgICA+XG4gICAgICA8Y29tcG9uZW50cy5NZW51IHsuLi5tZW51UHJvcHN9PlxuICAgICAgICB7bWVudVByb3BzLmNoaWxkcmVufVxuICAgICAgPC9jb21wb25lbnRzLk1lbnU+XG4gICAgPC9UZXRoZXJDb21wb25lbnQ+XG4gICk7XG59O1xuXG5GbG9hdGluZ01lbnUucHJvcFR5cGVzID0ge1xuICBkcm9wZG93bkZpZWxkTm9kZTogUHJvcFR5cGVzLmVsZW1lbnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ01lbnU7XG4iXX0=