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
        i18n: this.props.i18n,
        mapTranslationKey: this.props.mapTranslationKey
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

  this.handleChange = function (valueObj) {
    var value = valueObj && valueObj.value;
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
  },
  mapTranslationKey: function mapTranslationKey(key) {
    return key;
  }
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsInN0YXRlIiwic2hvd01vZGFsIiwicmVuZGVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlT3BlbiIsImhhbmRsZUNsb3NlIiwiaTE4biIsIm1hcFRyYW5zbGF0aW9uS2V5IiwibW9kYWwiLCJzZXRTdGF0ZSIsInZhbHVlT2JqIiwib25TZWxlY3QiLCJkZWZhdWx0UHJvcHMiLCJsb2FkT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwib3B0aW9ucyIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsU0FBU0MsTUFBbEIsUUFBZ0MsMEJBQWhDOztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7O0FBRUEsT0FBTyw2QkFBUDtBQUNBLE9BQU8sMkJBQVA7O0FBRUEsSUFBTUMsWUFBWTtBQUNoQkMsU0FBTyxFQURTO0FBRWhCQyxVQUFRO0FBRlEsQ0FBbEI7O0FBS0EsV0FBYUMsa0JBQWI7QUFBQTs7QUFDRSw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixzQkFBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFBQSxRQUdmQyxLQUhlLEdBSWJELEtBSmEsQ0FHZkMsS0FIZTs7QUFLakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hELGtCQURXO0FBRVhFLGlCQUFXO0FBRkEsS0FBYjtBQUxpQjtBQVNsQjs7QUFWSCwrQkFpQ0VDLE1BakNGLHFCQWlDVztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxzQkFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0NBQWY7QUFDRSw0QkFBQyxNQUFELGVBQ00sS0FBS0osS0FEWDtBQUVFLG9CQUFVLEtBQUtLLFlBRmpCO0FBR0UsaUJBQU8sS0FBS0gsS0FBTCxDQUFXRDtBQUhwQixXQURGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSxxQ0FBZjtBQUNFLDhCQUFDLElBQUQ7QUFDRSxrQkFBSyxXQURQO0FBRUUsa0JBQUssUUFGUDtBQUdFLHFCQUFTLEtBQUtLO0FBSGhCLGFBSU1WLFNBSk47QUFERjtBQU5GLE9BREY7QUFnQkUsMEJBQUMsV0FBRDtBQUNFLG1CQUFXLEtBQUtNLEtBQUwsQ0FBV0MsU0FEeEI7QUFFRSxpQkFBUyxLQUFLSSxXQUZoQjtBQUdFLGtCQUFVLEtBQUtGLFlBSGpCO0FBSUUsY0FBTSxLQUFLTCxLQUFMLENBQVdRLElBSm5CO0FBS0UsMkJBQW1CLEtBQUtSLEtBQUwsQ0FBV1M7QUFMaEMsU0FNTSxLQUFLVCxLQUFMLENBQVdVLEtBTmpCO0FBaEJGLEtBREY7QUEyQkQsR0E3REg7O0FBQUE7QUFBQSxFQUF3Q3BCLFNBQXhDO0FBQUE7O0FBQUEsT0FZRWdCLFVBWkYsR0FZZSxZQUFNO0FBQ2pCLFdBQUtLLFFBQUwsQ0FBYztBQUNaUixpQkFBVztBQURDLEtBQWQ7QUFHRCxHQWhCSDs7QUFBQSxPQWtCRUksV0FsQkYsR0FrQmdCLFlBQU07QUFDbEIsV0FBS0ksUUFBTCxDQUFjO0FBQ1pSLGlCQUFXO0FBREMsS0FBZDtBQUdELEdBdEJIOztBQUFBLE9Bd0JFRSxZQXhCRixHQXdCaUIsVUFBQ08sUUFBRCxFQUFjO0FBQzNCLFFBQU1YLFFBQVFXLFlBQVlBLFNBQVNYLEtBQW5DO0FBQ0EsV0FBS1UsUUFBTCxDQUFjO0FBQ1pWO0FBRFksS0FBZDtBQUdBLFdBQUtELEtBQUwsQ0FBV2EsUUFBWCxDQUFvQlosS0FBcEI7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0EvQkg7QUFBQTs7QUFrRkFGLG1CQUFtQmUsWUFBbkIsR0FBa0M7QUFDaENELFlBQVUsb0JBQU0sQ0FBRSxDQURjO0FBRWhDRSxlQUFhO0FBQUEsV0FBTUMsUUFBUUMsT0FBUixDQUFnQixFQUFFQyxTQUFTLEVBQVgsRUFBaEIsQ0FBTjtBQUFBLEdBRm1CO0FBR2hDVCxxQkFBbUI7QUFBQSxXQUFPVSxHQUFQO0FBQUE7QUFIYSxDQUFsQzs7QUFNQSxlQUFlcEIsa0JBQWYiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5leHBvcnQgY2xhc3MgQ29tYm9ib3hXaXRoU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgfSA9IHByb3BzO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZU9iaikgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVPYmogJiYgdmFsdWVPYmoudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fc2VhcmNoLWJ1dHRvblwiPlxuICAgICAgICAgICAgPEljb25cbiAgICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgc2hvd01vZGFsPXt0aGlzLnN0YXRlLnNob3dNb2RhbH1cbiAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICBpMThuPXt0aGlzLnByb3BzLmkxOG59XG4gICAgICAgICAgbWFwVHJhbnNsYXRpb25LZXk9e3RoaXMucHJvcHMubWFwVHJhbnNsYXRpb25LZXl9XG4gICAgICAgICAgey4uLnRoaXMucHJvcHMubW9kYWx9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgaTE4bjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBnZXRNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIG1hcFRyYW5zbGF0aW9uS2V5OiBQcm9wVHlwZXMuZnVuYyxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IG9wdGlvbnM6IFtdIH0pLFxuICBtYXBUcmFuc2xhdGlvbktleToga2V5ID0+IGtleVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3hXaXRoU2VhcmNoO1xuIl19