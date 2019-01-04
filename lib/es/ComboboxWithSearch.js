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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJPcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsImhhbmRsZUNsb3NlIiwibmV3U3RhdGUiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQix5QkFBckI7QUFDQSxTQUFTQyxTQUFTQyxNQUFsQixRQUFnQywwQkFBaEM7QUFDQSxTQUFTQyxZQUFULFFBQTZCLGNBQTdCOztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7O0FBRUEsT0FBTyw2QkFBUDtBQUNBLE9BQU8sMkJBQVA7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QUFmIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5jb25zdCB2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+ICEhbmV4dFByb3BzLnZhbHVlICE9PSAhIWN1cnJlbnRQcm9wcy52YWx1ZTtcbmNvbnN0IE9wdGlvblZhbHVlQ2hhbmdlcyA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gbmV4dFByb3BzLnZhbHVlICYmIGN1cnJlbnRQcm9wcy52YWx1ZSAmJlxuICBuZXh0UHJvcHMudmFsdWUudmFsdWUgIT09IGN1cnJlbnRQcm9wcy52YWx1ZS52YWx1ZTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCBPcHRpb25WYWx1ZUNoYW5nZXMobmV4dFByb3BzLCB0aGlzLnByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXh0UHJvcHMudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZUNoYW5nZSh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiB0aGlzLnNldFN0YXRlKHsgLi4ubmV3U3RhdGUgfSksXG4gICAgICBvblNlbGVjdDogdmFsdWUgPT4gdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbG9hZE9wdGlvbnMsXG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaGFuZGxlQ2hhbmdlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgbW9kYWw6IG1vZGFsUHJvcHMsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4uZXh0cmFQcm9wc31cbiAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICBsb2FkT3B0aW9ucz17bG9hZE9wdGlvbnN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUpfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7IERyb3Bkb3duSW5kaWNhdG9yIH19XG4gICAgICAgICAgICBub09wdGlvbnNNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubm9JdGVtcyB8fCAnLS0nKX1cbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCAnTG9hZGluZy4uLicpfVxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uPXtjcmVhdGVGaWx0ZXIoe1xuICAgICAgICAgICAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgICAgICAgICAgICBpZ25vcmVBY2NlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF0Y2hGcm9tOiAnYW55JyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBoYW5kbGVDaGFuZ2U6ICh7IHZhbHVlLCBzZXRTdGF0ZSwgb25TZWxlY3QgfSkgPT4ge1xuICAgIHNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgb25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=