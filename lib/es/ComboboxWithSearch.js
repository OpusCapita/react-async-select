var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import { Async as Select } from '@opuscapita/react-select';

import SearchModal from './SearchModal';

import 'react-table/react-table.css';
import './ComboboxWithSearch.scss';

var ICON_SIZE = {
  width: 15,
  height: 15
};

export var ComboboxWithSearch = (_temp = _class = function (_Component) {
  _inherits(ComboboxWithSearch, _Component);

  function ComboboxWithSearch(props) {
    _classCallCheck(this, ComboboxWithSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var value = props.value;

    _this.state = {
      value: value,
      showModal: false
    };
    return _this;
  }

  ComboboxWithSearch.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'combobox-with-search' },
      React.createElement(
        'div',
        { className: 'combobox-with-search__combobox' },
        React.createElement(Select, _extends({}, this.props, {
          onChange: this.handleChange,
          value: this.state.value
        })),
        React.createElement(
          'div',
          { className: 'combobox-with-search__search-button' },
          React.createElement(Icon, _extends({
            type: 'indicator',
            name: 'search',
            onClick: this.handleOpen
          }, ICON_SIZE))
        )
      ),
      React.createElement(SearchModal, _extends({
        showModal: this.state.showModal,
        onClose: this.handleClose,
        onSelect: this.handleChange,
        localizationTexts: this.props.localizationTexts
      }, this.props.modal))
    );
  };

  return ComboboxWithSearch;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleOpen = function () {
    _this2.setState({
      showModal: true
    });
  };

  this.handleClose = function () {
    _this2.setState({
      showModal: false
    });
  };

  this.handleChange = function (value) {
    _this2.setState({
      value: value
    });
    _this2.props.onSelect(value);
    return value;
  };
}, _temp);

ComboboxWithSearch.defaultProps = {
  onSelect: function onSelect() {},
  loadOptions: function loadOptions() {
    return Promise.resolve({ options: [] });
  }
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsInN0YXRlIiwic2hvd01vZGFsIiwicmVuZGVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlT3BlbiIsImhhbmRsZUNsb3NlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJtb2RhbCIsInNldFN0YXRlIiwib25TZWxlY3QiLCJkZWZhdWx0UHJvcHMiLCJsb2FkT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsU0FBU0MsTUFBbEIsUUFBZ0MsMEJBQWhDOztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7O0FBRUEsT0FBTyw2QkFBUDtBQUNBLE9BQU8sMkJBQVA7O0FBRUEsSUFBTUMsWUFBWTtBQUNoQkMsU0FBTyxFQURTO0FBRWhCQyxVQUFRO0FBRlEsQ0FBbEI7O0FBS0EsV0FBYUMsa0JBQWI7QUFBQTs7QUFDRSw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixzQkFBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFBQSxRQUdmQyxLQUhlLEdBSWJELEtBSmEsQ0FHZkMsS0FIZTs7QUFLakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hELGtCQURXO0FBRVhFLGlCQUFXO0FBRkEsS0FBYjtBQUxpQjtBQVNsQjs7QUFWSCwrQkFnQ0VDLE1BaENGLHFCQWdDVztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxzQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0NBQWY7QUFDRSw0QkFBQyxNQUFELGVBQ00sS0FBS0osS0FEWDtBQUVFLG9CQUFVLEtBQUtLLFlBRmpCO0FBR0UsaUJBQU8sS0FBS0gsS0FBTCxDQUFXRDtBQUhwQixXQURGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSxxQ0FBZjtBQUNFLDhCQUFDLElBQUQ7QUFDRSxrQkFBSyxXQURQO0FBRUUsa0JBQUssUUFGUDtBQUdFLHFCQUFTLEtBQUtLO0FBSGhCLGFBSU1WLFNBSk47QUFERjtBQU5GLE9BREY7QUFnQkUsMEJBQUMsV0FBRDtBQUNFLG1CQUFXLEtBQUtNLEtBQUwsQ0FBV0MsU0FEeEI7QUFFRSxpQkFBUyxLQUFLSSxXQUZoQjtBQUdFLGtCQUFVLEtBQUtGLFlBSGpCO0FBSUUsMkJBQW1CLEtBQUtMLEtBQUwsQ0FBV1E7QUFKaEMsU0FLTSxLQUFLUixLQUFMLENBQVdTLEtBTGpCO0FBaEJGLEtBREY7QUEwQkQsR0EzREg7O0FBQUE7QUFBQSxFQUF3Q25CLFNBQXhDO0FBQUE7O0FBQUEsT0FZRWdCLFVBWkYsR0FZZSxZQUFNO0FBQ2pCLFdBQUtJLFFBQUwsQ0FBYztBQUNaUCxpQkFBVztBQURDLEtBQWQ7QUFHRCxHQWhCSDs7QUFBQSxPQWtCRUksV0FsQkYsR0FrQmdCLFlBQU07QUFDbEIsV0FBS0csUUFBTCxDQUFjO0FBQ1pQLGlCQUFXO0FBREMsS0FBZDtBQUdELEdBdEJIOztBQUFBLE9Bd0JFRSxZQXhCRixHQXdCaUIsVUFBQ0osS0FBRCxFQUFXO0FBQ3hCLFdBQUtTLFFBQUwsQ0FBYztBQUNaVDtBQURZLEtBQWQ7QUFHQSxXQUFLRCxLQUFMLENBQVdXLFFBQVgsQ0FBb0JWLEtBQXBCO0FBQ0EsV0FBT0EsS0FBUDtBQUNELEdBOUJIO0FBQUE7O0FBNkVBRixtQkFBbUJhLFlBQW5CLEdBQWtDO0FBQ2hDRCxZQUFVLG9CQUFNLENBQUUsQ0FEYztBQUVoQ0UsZUFBYTtBQUFBLFdBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUMsU0FBUyxFQUFYLEVBQWhCLENBQU47QUFBQTtBQUZtQixDQUFsQzs7QUFLQSxlQUFlakIsa0JBQWYiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5leHBvcnQgY2xhc3MgQ29tYm9ib3hXaXRoU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgfSA9IHByb3BzO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVufVxuICAgICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgIHNob3dNb2RhbD17dGhpcy5zdGF0ZS5zaG93TW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e3RoaXMucHJvcHMubG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWx9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBvcHRpb25zOiBbXSB9KSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==