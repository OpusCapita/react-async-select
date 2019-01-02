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
          noOptionsMessage: function noOptionsMessage() {
            return localizationTexts.noItems || '--';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJPcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwibm9JdGVtcyIsImlnbm9yZUNhc2UiLCJpZ25vcmVBY2NlbnRzIiwibWF0Y2hGcm9tIiwiaGFuZGxlQ2xvc2UiLCJuZXdTdGF0ZSIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFNBQVNDLE1BQWxCLFFBQWdDLDBCQUFoQztBQUNBLFNBQVNDLFlBQVQsUUFBNkIsY0FBN0I7O0FBRUEsT0FBT0MsV0FBUCxNQUF3QixlQUF4Qjs7QUFFQSxPQUFPLDZCQUFQO0FBQ0EsT0FBTywyQkFBUDs7QUFFQSxJQUFN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Q29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBPcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgT3B0aW9uVmFsdWVDaGFuZ2VzKG5leHRQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgdmFsdWUsXG4gICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gdGhpcy5zZXRTdGF0ZSh7IC4uLm5ld1N0YXRlIH0pLFxuICAgICAgb25TZWxlY3Q6IHZhbHVlID0+IHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxvYWRPcHRpb25zLFxuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e2xvYWRPcHRpb25zfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgY29tcG9uZW50cz17eyBEcm9wZG93bkluZGljYXRvciB9fVxuICAgICAgICAgICAgbm9PcHRpb25zTWVzc2FnZT17KCkgPT4gKGxvY2FsaXphdGlvblRleHRzLm5vSXRlbXMgfHwgJy0tJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNob3dNb2RhbCA/XG4gICAgICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cz17bG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIHJlbmRlcmVycz17cmVuZGVyZXJzfVxuICAgICAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhbmRsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGhhbmRsZUNoYW5nZTogKHsgdmFsdWUsIHNldFN0YXRlLCBvblNlbGVjdCB9KSA9PiB7XG4gICAgc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICBvblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==