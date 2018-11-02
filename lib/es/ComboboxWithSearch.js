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
        i18n: this.props.i18n
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
  }
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsInN0YXRlIiwic2hvd01vZGFsIiwicmVuZGVyIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlT3BlbiIsImhhbmRsZUNsb3NlIiwiaTE4biIsIm1vZGFsIiwic2V0U3RhdGUiLCJ2YWx1ZU9iaiIsIm9uU2VsZWN0IiwiZGVmYXVsdFByb3BzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFNBQVNDLE1BQWxCLFFBQWdDLDBCQUFoQzs7QUFFQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCOztBQUVBLE9BQU8sNkJBQVA7QUFDQSxPQUFPLDJCQUFQOztBQUVBLElBQU1DLFlBQVk7QUFDaEJDLFNBQU8sRUFEUztBQUVoQkMsVUFBUTtBQUZRLENBQWxCOztBQUtBLFdBQWFDLGtCQUFiO0FBQUE7O0FBQ0UsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsc0JBQU1BLEtBQU4sQ0FEaUI7O0FBQUE7O0FBQUEsUUFHZkMsS0FIZSxHQUliRCxLQUphLENBR2ZDLEtBSGU7O0FBS2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFEVztBQUVYRSxpQkFBVztBQUZBLEtBQWI7QUFMaUI7QUFTbEI7O0FBVkgsK0JBaUNFQyxNQWpDRixxQkFpQ1c7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsc0JBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdDQUFmO0FBQ0UsNEJBQUMsTUFBRCxlQUNNLEtBQUtKLEtBRFg7QUFFRSxvQkFBVSxLQUFLSyxZQUZqQjtBQUdFLGlCQUFPLEtBQUtILEtBQUwsQ0FBV0Q7QUFIcEIsV0FERjtBQU1FO0FBQUE7QUFBQSxZQUFLLFdBQVUscUNBQWY7QUFDRSw4QkFBQyxJQUFEO0FBQ0Usa0JBQUssV0FEUDtBQUVFLGtCQUFLLFFBRlA7QUFHRSxxQkFBUyxLQUFLSztBQUhoQixhQUlNVixTQUpOO0FBREY7QUFORixPQURGO0FBZ0JFLDBCQUFDLFdBQUQ7QUFDRSxtQkFBVyxLQUFLTSxLQUFMLENBQVdDLFNBRHhCO0FBRUUsaUJBQVMsS0FBS0ksV0FGaEI7QUFHRSxrQkFBVSxLQUFLRixZQUhqQjtBQUlFLGNBQU0sS0FBS0wsS0FBTCxDQUFXUTtBQUpuQixTQUtNLEtBQUtSLEtBQUwsQ0FBV1MsS0FMakI7QUFoQkYsS0FERjtBQTBCRCxHQTVESDs7QUFBQTtBQUFBLEVBQXdDbkIsU0FBeEM7QUFBQTs7QUFBQSxPQVlFZ0IsVUFaRixHQVllLFlBQU07QUFDakIsV0FBS0ksUUFBTCxDQUFjO0FBQ1pQLGlCQUFXO0FBREMsS0FBZDtBQUdELEdBaEJIOztBQUFBLE9Ba0JFSSxXQWxCRixHQWtCZ0IsWUFBTTtBQUNsQixXQUFLRyxRQUFMLENBQWM7QUFDWlAsaUJBQVc7QUFEQyxLQUFkO0FBR0QsR0F0Qkg7O0FBQUEsT0F3QkVFLFlBeEJGLEdBd0JpQixVQUFDTSxRQUFELEVBQWM7QUFDM0IsUUFBTVYsUUFBUVUsWUFBWUEsU0FBU1YsS0FBbkM7QUFDQSxXQUFLUyxRQUFMLENBQWM7QUFDWlQ7QUFEWSxLQUFkO0FBR0EsV0FBS0QsS0FBTCxDQUFXWSxRQUFYLENBQW9CWCxLQUFwQjtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQS9CSDtBQUFBOztBQWdGQUYsbUJBQW1CYyxZQUFuQixHQUFrQztBQUNoQ0QsWUFBVSxvQkFBTSxDQUFFLENBRGM7QUFFaENFLGVBQWE7QUFBQSxXQUFNQyxRQUFRQyxPQUFSLENBQWdCLEVBQUVDLFNBQVMsRUFBWCxFQUFoQixDQUFOO0FBQUE7QUFGbUIsQ0FBbEM7O0FBS0EsZUFBZWxCLGtCQUFmIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgQXN5bmMgYXMgU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWVPYmopID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlT2JqICYmIHZhbHVlT2JqLnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVufVxuICAgICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgIHNob3dNb2RhbD17dGhpcy5zdGF0ZS5zaG93TW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgaTE4bj17dGhpcy5wcm9wcy5pMThufVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzLm1vZGFsfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIGkxOG46IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgZ2V0TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgb3B0aW9uczogW10gfSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=