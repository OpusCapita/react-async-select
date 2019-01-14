var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import { Async as Select } from '@opuscapita/react-select';
import { createFilter } from 'react-select';

import FloatingMenu from './FloatingMenu';
import SearchModal from '../SearchModal';

import 'react-table/react-table.css';
import './ComboboxWithSearch.scss';

var ICON_SIZE = {
  width: 15,
  height: 15
};

var valueBecomesDefinedOrIsCleared = function valueBecomesDefinedOrIsCleared(nextProps, currentProps) {
  return !!nextProps.value !== !!currentProps.value;
};
var optionValueChanges = function optionValueChanges(nextProps, currentProps) {
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

  ComboboxWithSearch.prototype.componentDidMount = function componentDidMount() {
    this.dropdownFieldNode = ReactDOM.findDOMNode(this);
  };

  ComboboxWithSearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (valueBecomesDefinedOrIsCleared(nextProps, this.props) || optionValueChanges(nextProps, this.props)) {
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
    var Menu = function Menu(props) {
      var newProps = _extends({}, props, {
        dropdownFieldNode: _this2.dropdownFieldNode
      });
      return FloatingMenu(newProps);
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
          components: {
            DropdownIndicator: DropdownIndicator,
            Menu: Menu
          },
          noOptionsMessage: function noOptionsMessage() {
            return localizationTexts.noItems || '--';
          },
          loadingMessage: function loadingMessage() {
            return localizationTexts.loading || 'Loading...';
          },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJGbG9hdGluZ01lbnUiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJvcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsImZpbmRET01Ob2RlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiTWVudSIsIm5ld1Byb3BzIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsImhhbmRsZUNsb3NlIiwibmV3U3RhdGUiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFdBQXJCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNB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QUtWLEtBQUwsQ0FBV1UsUUFBWCxDQUFvQmIsS0FBcEIsQ0FBVDtBQUFBO0FBSFksS0FBeEI7QUFLRCxHQTFDSDtBQUFBOztBQXdJQUUsbUJBQW1CK0IsWUFBbkIsR0FBa0M7QUFDaENyQixlQUFhO0FBQUEsV0FBTXNCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBTjtBQUFBLEdBRG1CO0FBRWhDdEIsWUFBVSxvQkFBTSxDQUFFLENBRmM7QUFHaENDLGdCQUFjLDRCQUFtQztBQUFBLFFBQWhDZCxLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxRQUF6QlUsUUFBeUIsUUFBekJBLFFBQXlCO0FBQUEsUUFBZkcsUUFBZSxRQUFmQSxRQUFlOztBQUMvQ0gsYUFBUyxFQUFFVixZQUFGLEVBQVQ7QUFDQWEsYUFBU2IsS0FBVDtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQVArQjtBQVFoQ2dCLGNBQVk7QUFSb0IsQ0FBbEM7O0FBV0EsZUFBZWQsa0JBQWYiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL0Zsb2F0aW5nTWVudSc7XG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBvcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5kcm9wZG93bkZpZWxkTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgb3B0aW9uVmFsdWVDaGFuZ2VzKG5leHRQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgdmFsdWUsXG4gICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gdGhpcy5zZXRTdGF0ZSh7IC4uLm5ld1N0YXRlIH0pLFxuICAgICAgb25TZWxlY3Q6IHZhbHVlID0+IHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxvYWRPcHRpb25zLFxuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IE1lbnUgPSBwcm9wcyA9PiB7XG4gICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIGRyb3Bkb3duRmllbGROb2RlOiB0aGlzLmRyb3Bkb3duRmllbGROb2RlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBGbG9hdGluZ01lbnUobmV3UHJvcHMpO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4uZXh0cmFQcm9wc31cbiAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICBsb2FkT3B0aW9ucz17bG9hZE9wdGlvbnN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUpfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBNZW51LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zIHx8ICctLScpfVxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8ICdMb2FkaW5nLi4uJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNob3dNb2RhbCA/XG4gICAgICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cz17bG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIHJlbmRlcmVycz17cmVuZGVyZXJzfVxuICAgICAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhbmRsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGhhbmRsZUNoYW5nZTogKHsgdmFsdWUsIHNldFN0YXRlLCBvblNlbGVjdCB9KSA9PiB7XG4gICAgc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICBvblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==