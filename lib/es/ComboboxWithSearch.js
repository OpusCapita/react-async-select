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
          components: { DropdownIndicator: DropdownIndicator }
        }))
      ),
      React.createElement(SearchModal, _extends({
        showModal: this.state.showModal,
        onClose: this.handleClose,
        onSelect: this.handleChange,
        localizationTexts: localizationTexts,
        filters: filters,
        renderers: renderers
      }, modalProps))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJPcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiaGFuZGxlQ2xvc2UiLCJuZXdTdGF0ZSIsImRlZmF1bHRQcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFNBQVNDLE1BQWxCLFFBQWdDLDBCQUFoQzs7QUFFQSxPQUFPQyxXQUFQLE1BQXdCLGVBQXhCOztBQUVBLE9BQU8sNkJBQVA7QUFDQSxPQUFPLDJCQUFQOztBQUVBLElBQU1DLFlBQVk7QUFDaEJDLFNBQU8sRUFEUztBQUVoQkMsVUFBUTtBQUZRLENBQWxCOztBQUtBLElBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQUNDLFNBQUQsRUFB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Z0NFTSxZQWhDRixHQWdDaUIsVUFBQ1gsS0FBRCxFQUFXO0FBQ3hCLFdBQUtHLEtBQUwsQ0FBV1EsWUFBWCxDQUF3QjtBQUN0Qlgsa0JBRHNCO0FBRXRCTyxnQkFBVTtBQUFBLGVBQVksT0FBS0EsUUFBTCxjQUFtQmUsUUFBbkIsRUFBWjtBQUFBLE9BRlk7QUFHdEJaLGdCQUFVO0FBQUEsZUFBUyxPQUFLUCxLQUFMLENBQVdPLFFBQVgsQ0FBb0JWLEtBQXBCLENBQVQ7QUFBQTtBQUhZLEtBQXhCO0FBS0QsR0F0Q0g7QUFBQTs7QUFnSEFFLG1CQUFtQnFCLFlBQW5CLEdBQWtDO0FBQ2hDZCxlQUFhO0FBQUEsV0FBTWUsUUFBUUMsT0FBUixDQUFnQixFQUFoQixDQUFOO0FBQUEsR0FEbUI7QUFFaENmLFlBQVUsb0JBQU0sQ0FBRSxDQUZjO0FBR2hDQyxnQkFBYyw0QkFBbUM7QUFBQSxRQUFoQ1gsS0FBZ0MsUUFBaENBLEtBQWdDO0FBQUEsUUFBekJPLFFBQXlCLFFBQXpCQSxRQUF5QjtBQUFBLFFBQWZHLFFBQWUsUUFBZkEsUUFBZTs7QUFDL0NILGFBQVMsRUFBRVAsWUFBRixFQUFUO0FBQ0FVLGFBQVNWLEtBQVQ7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FQK0I7QUFRaENhLGNBQVk7QUFSb0IsQ0FBbEM7O0FBV0EsZUFBZVgsa0JBQWYiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmltcG9ydCAncmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzJ1xuaW1wb3J0ICcuL0NvbWJvYm94V2l0aFNlYXJjaC5zY3NzJztcblxuY29uc3QgSUNPTl9TSVpFID0ge1xuICB3aWR0aDogMTUsXG4gIGhlaWdodDogMTUsXG59O1xuXG5jb25zdCB2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+ICEhbmV4dFByb3BzLnZhbHVlICE9PSAhIWN1cnJlbnRQcm9wcy52YWx1ZTtcbmNvbnN0IE9wdGlvblZhbHVlQ2hhbmdlcyA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gbmV4dFByb3BzLnZhbHVlICYmIGN1cnJlbnRQcm9wcy52YWx1ZSAmJlxuICBuZXh0UHJvcHMudmFsdWUudmFsdWUgIT09IGN1cnJlbnRQcm9wcy52YWx1ZS52YWx1ZTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fCBPcHRpb25WYWx1ZUNoYW5nZXMobmV4dFByb3BzLCB0aGlzLnByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHZhbHVlOiBuZXh0UHJvcHMudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZUNoYW5nZSh7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiB0aGlzLnNldFN0YXRlKHsgLi4ubmV3U3RhdGUgfSksXG4gICAgICBvblNlbGVjdDogdmFsdWUgPT4gdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbG9hZE9wdGlvbnMsXG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaGFuZGxlQ2hhbmdlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgbW9kYWw6IG1vZGFsUHJvcHMsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4uZXh0cmFQcm9wc31cbiAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICBsb2FkT3B0aW9ucz17bG9hZE9wdGlvbnN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUpfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7IERyb3Bkb3duSW5kaWNhdG9yIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxTZWFyY2hNb2RhbFxuICAgICAgICAgIHNob3dNb2RhbD17dGhpcy5zdGF0ZS5zaG93TW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgcmVuZGVyZXJzPXtyZW5kZXJlcnN9XG4gICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KSxcbiAgZmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgcmVuZGVyZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFuZGxlQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9jYWxpemF0aW9uVGV4dHM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGlzRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtb2RhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH0pLFxufTtcblxuQ29tYm9ib3hXaXRoU2VhcmNoLmRlZmF1bHRQcm9wcyA9IHtcbiAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZShbXSksXG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgaGFuZGxlQ2hhbmdlOiAoeyB2YWx1ZSwgc2V0U3RhdGUsIG9uU2VsZWN0IH0pID0+IHtcbiAgICBzZXRTdGF0ZSh7IHZhbHVlIH0pO1xuICAgIG9uU2VsZWN0KHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIGlzRGlzYWJsZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tYm9ib3hXaXRoU2VhcmNoO1xuIl19