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
          }),
          innerRef: function innerRef(node) {
            _this2.props.setRef(node);
          },
          onKeyDown: this.props.onKeyDown
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
  isDisabled: false,
  setRef: function setRef() {},
  onKeyDown: function onKeyDown() {}
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJGbG9hdGluZ01lbnUiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJvcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsImZpbmRET01Ob2RlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiTWVudSIsIm5ld1Byb3BzIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsIm5vZGUiLCJzZXRSZWYiLCJvbktleURvd24iLCJoYW5kbGVDbG9zZSIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9B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QUNkLEtBQUQsRUFBVztBQUN4QixXQUFLRyxLQUFMLENBQVdXLFlBQVgsQ0FBd0I7QUFDdEJkLGtCQURzQjtBQUV0QlUsZ0JBQVU7QUFBQSxlQUFZLE9BQUtBLFFBQUwsY0FBbUJ5QixRQUFuQixFQUFaO0FBQUEsT0FGWTtBQUd0QnRCLGdCQUFVO0FBQUEsZUFBUyxPQUFLVixLQUFMLENBQVdVLFFBQVgsQ0FBb0JiLEtBQXBCLENBQVQ7QUFBQTtBQUhZLEtBQXhCO0FBS0QsR0ExQ0g7QUFBQTs7QUE0SUFFLG1CQUFtQmtDLFlBQW5CLEdBQWtDO0FBQ2hDeEIsZUFBYTtBQUFBLFdBQU15QixRQUFRQyxPQUFSLENBQWdCLEVBQWhCLENBQU47QUFBQSxHQURtQjtBQUVoQ3pCLFlBQVUsb0JBQU0sQ0FBRSxDQUZjO0FBR2hDQyxnQkFBYyw0QkFBbUM7QUFBQSxRQUFoQ2QsS0FBZ0MsUUFBaENBLEtBQWdDO0FBQUEsUUFBekJVLFFBQXlCLFFBQXpCQSxRQUF5QjtBQUFBLFFBQWZHLFFBQWUsUUFBZkEsUUFBZTs7QUFDL0NILGFBQVMsRUFBRVYsWUFBRixFQUFUO0FBQ0FhLGFBQVNiLEtBQVQ7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FQK0I7QUFRaENnQixjQUFZLEtBUm9CO0FBU2hDZ0IsVUFBUSxrQkFBTSxDQUFFLENBVGdCO0FBVWhDQyxhQUFXLHFCQUFNLENBQUU7QUFWYSxDQUFsQzs7QUFhQSxlQUFlL0Isa0JBQWYiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBBc3luYyBhcyBTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL0Zsb2F0aW5nTWVudSc7XG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuY29uc3QgdmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiAhIW5leHRQcm9wcy52YWx1ZSAhPT0gISFjdXJyZW50UHJvcHMudmFsdWU7XG5jb25zdCBvcHRpb25WYWx1ZUNoYW5nZXMgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+IG5leHRQcm9wcy52YWx1ZSAmJiBjdXJyZW50UHJvcHMudmFsdWUgJiZcbiAgbmV4dFByb3BzLnZhbHVlLnZhbHVlICE9PSBjdXJyZW50UHJvcHMudmFsdWUudmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZSxcbiAgICB9ID0gcHJvcHM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5kcm9wZG93bkZpZWxkTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHwgb3B0aW9uVmFsdWVDaGFuZ2VzKG5leHRQcm9wcywgdGhpcy5wcm9wcykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgdmFsdWUsXG4gICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gdGhpcy5zZXRTdGF0ZSh7IC4uLm5ld1N0YXRlIH0pLFxuICAgICAgb25TZWxlY3Q6IHZhbHVlID0+IHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxvYWRPcHRpb25zLFxuICAgICAgb25TZWxlY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGhhbmRsZUNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgLi4uZXh0cmFQcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzKSA9PiB7XG4gICAgICByZXR1cm4gIWlzRGlzYWJsZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoX19zZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9wZW59XG4gICAgICAgICAgICB7Li4uSUNPTl9TSVpFfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IE1lbnUgPSBwcm9wcyA9PiB7XG4gICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIGRyb3Bkb3duRmllbGROb2RlOiB0aGlzLmRyb3Bkb3duRmllbGROb2RlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBGbG9hdGluZ01lbnUobmV3UHJvcHMpO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fY29tYm9ib3hcIj5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICB7Li4uZXh0cmFQcm9wc31cbiAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgICBsb2FkT3B0aW9ucz17bG9hZE9wdGlvbnN9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUpfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBNZW51LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zIHx8ICctLScpfVxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8ICdMb2FkaW5nLi4uJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBpbm5lclJlZj17KG5vZGUpID0+IHsgdGhpcy5wcm9wcy5zZXRSZWYobm9kZSk7IH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHNldFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBoYW5kbGVDaGFuZ2U6ICh7IHZhbHVlLCBzZXRTdGF0ZSwgb25TZWxlY3QgfSkgPT4ge1xuICAgIHNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgb25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHNldFJlZjogKCkgPT4ge30sXG4gIG9uS2V5RG93bjogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=