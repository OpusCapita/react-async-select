var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import { Async as Select } from '@opuscapita/react-select';
import { createFilter } from 'react-select';

import SearchModal from './SearchModal';

import 'react-table/react-table.css';
import './ComboboxWithSearch.scss';

var ICON_SIZE = {
  width: 15,
  height: 15
};

var valueBecomesDefinedOrIsCleared = function valueBecomesDefinedOrIsCleared(nextProps, currentProps) {
  return !!nextProps.value !== !!currentProps.value;
};
var OptionValueChanges = function OptionValueChanges(nextProps, currentProps) {
  return nextProps.value && currentProps.value && nextProps.value.value !== currentProps.value.value;
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

  ComboboxWithSearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (valueBecomesDefinedOrIsCleared(nextProps, this.props) || OptionValueChanges(nextProps, this.props)) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  ComboboxWithSearch.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        loadOptions = _props.loadOptions,
        onSelect = _props.onSelect,
        handleChange = _props.handleChange,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        extraProps = _objectWithoutProperties(_props, ['loadOptions', 'onSelect', 'handleChange', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal']);

    var DropdownIndicator = function DropdownIndicator(props) {
      return !isDisabled && React.createElement(
        'div',
        { className: 'combobox-with-search__search-button' },
        React.createElement(Icon, _extends({
          type: 'indicator',
          name: 'search',
          onClick: _this2.handleOpen
        }, ICON_SIZE))
      );
    };
    return React.createElement(
      'div',
      { className: 'combobox-with-search' },
      React.createElement(
        'div',
        { className: 'combobox-with-search__combobox' },
        React.createElement(Select, _extends({}, extraProps, {
          isDisabled: isDisabled,
          loadOptions: loadOptions,
          onChange: function onChange(value) {
            return _this2.handleChange(value);
          },
          value: this.state.value,
          components: { DropdownIndicator: DropdownIndicator },
          filterOption: createFilter({
            ignoreCase: true,
            ignoreAccents: false,
            matchFrom: 'any'
          })
        }))
      ),
      this.state.showModal ? React.createElement(SearchModal, _extends({
        onClose: this.handleClose,
        onSelect: this.handleChange,
        localizationTexts: localizationTexts,
        filters: filters,
        renderers: renderers
      }, modalProps)) : null
    );
  };

  return ComboboxWithSearch;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleOpen = function () {
    _this3.setState({
      showModal: true
    });
  };

  this.handleClose = function () {
    _this3.setState({
      showModal: false
    });
  };

  this.handleChange = function (value) {
    _this3.props.handleChange({
      value: value,
      setState: function setState(newState) {
        return _this3.setState(_extends({}, newState));
      },
      onSelect: function onSelect(value) {
        return _this3.props.onSelect(value);
      }
    });
  };
}, _temp);

ComboboxWithSearch.defaultProps = {
  loadOptions: function loadOptions() {
    return Promise.resolve([]);
  },
  onSelect: function onSelect() {},
  handleChange: function handleChange(_ref) {
    var value = _ref.value,
        setState = _ref.setState,
        onSelect = _ref.onSelect;

    setState({ value: value });
    onSelect(value);
    return value;
  },
  isDisabled: false
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJPcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiaWdub3JlQ2FzZSIsImlnbm9yZUFjY2VudHMiLCJtYXRjaEZyb20iLCJoYW5kbGVDbG9zZSIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsU0FBU0MsTUFBbEIsUUFBZ0MsMEJBQWhDO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixjQUE3Qjs7QUFFQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCOztBQUVBLE9BQU8sNkJBQVA7QUFDQSxPQUFPLDJCQUFQOztBQUVBLElBQU1DLFlBQVk7QUFD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QW9CRWlDLFVBcEJGLEdBb0JlLFlBQU07QUFDakIsV0FBS2IsUUFBTCxDQUFjO0FBQ1pGLGlCQUFXO0FBREMsS0FBZDtBQUdELEdBeEJIOztBQUFBLE9BMEJFbUIsV0ExQkYsR0EwQmdCLFlBQU07QUFDbEIsV0FBS2pCLFFBQUwsQ0FBYztBQUNaRixpQkFBVztBQURDLEtBQWQ7QUFHRCxHQTlCSDs7QUFBQSxPQWdDRU0sWUFoQ0YsR0FnQ2lCLFVBQUNYLEtBQUQsRUFBVztBQUN4QixXQUFLRyxLQUFMLENBQVdRLFlBQVgsQ0FBd0I7QUFDdEJYLGtCQURzQjtBQUV0Qk8sZ0JBQVU7QUFBQSxlQUFZLE9BQUtBLFFBQUwsY0FBbUJrQixRQUFuQixFQUFaO0FBQUEsT0FGWTtBQUd0QmYsZ0JBQVU7QUFBQSxlQUFTLE9BQUtQLEtBQUwsQ0FBV08sUUFBWCxDQUFvQlYsS0FBcEIsQ0FBVDtBQUFBO0FBSFksS0FBeEI7QUFLRCxHQXRDSDtBQUFBOztBQXdIQUUsbUJBQW1Cd0IsWUFBbkIsR0FBa0M7QUFDaENqQixlQUFhO0FBQUEsV0FBTWtCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBTjtBQUFBLEdBRG1CO0FBRWhDbEIsWUFBVSxvQkFBTSxDQUFFLENBRmM7QUFHaENDLGdCQUFjLDRCQUFtQztBQUFBLFFBQWhDWCxLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxRQUF6Qk8sUUFBeUIsUUFBekJBLFFBQXlCO0FBQUEsUUFBZkcsUUFBZSxRQUFmQSxRQUFlOztBQUMvQ0gsYUFBUyxFQUFFUCxZQUFGLEVBQVQ7QUFDQVUsYUFBU1YsS0FBVDtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQVArQjtBQVFoQ2EsY0FBWTtBQVJvQixDQUFsQzs7QUFXQSxlQUFlWCxrQkFBZiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBPcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgT3B0aW9uVmFsdWVDaGFuZ2VzKG5leHRQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgdmFsdWUsXG4gICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gdGhpcy5zZXRTdGF0ZSh7IC4uLm5ld1N0YXRlIH0pLFxuICAgICAgb25TZWxlY3Q6IHZhbHVlID0+IHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxvYWRPcHRpb25zLFxuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e2xvYWRPcHRpb25zfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgY29tcG9uZW50cz17eyBEcm9wZG93bkluZGljYXRvciB9fVxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uPXtjcmVhdGVGaWx0ZXIoe1xuICAgICAgICAgICAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgICAgICAgICAgICBpZ25vcmVBY2NlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF0Y2hGcm9tOiAnYW55JyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBoYW5kbGVDaGFuZ2U6ICh7IHZhbHVlLCBzZXRTdGF0ZSwgb25TZWxlY3QgfSkgPT4ge1xuICAgIHNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgb25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=