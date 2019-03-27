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
          ref: function ref(node) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJGbG9hdGluZ01lbnUiLCJTZWFyY2hNb2RhbCIsIklDT05fU0laRSIsIndpZHRoIiwiaGVpZ2h0IiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJvcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwiY29tcG9uZW50RGlkTW91bnQiLCJkcm9wZG93bkZpZWxkTm9kZSIsImZpbmRET01Ob2RlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwibG9hZE9wdGlvbnMiLCJvblNlbGVjdCIsImhhbmRsZUNoYW5nZSIsImxvY2FsaXphdGlvblRleHRzIiwiaXNEaXNhYmxlZCIsImZpbHRlcnMiLCJyZW5kZXJlcnMiLCJtb2RhbFByb3BzIiwibW9kYWwiLCJleHRyYVByb3BzIiwiRHJvcGRvd25JbmRpY2F0b3IiLCJoYW5kbGVPcGVuIiwiTWVudSIsIm5ld1Byb3BzIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsIm5vZGUiLCJzZXRSZWYiLCJvbktleURvd24iLCJoYW5kbGVDbG9zZSIsIm5ld1N0YXRlIiwiZGVmYXVsdFByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9B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ZCxLQUFELEVBQVc7QUFDeEIsV0FBS0csS0FBTCxDQUFXVyxZQUFYLENBQXdCO0FBQ3RCZCxrQkFEc0I7QUFFdEJVLGdCQUFVO0FBQUEsZUFBWSxPQUFLQSxRQUFMLGNBQW1CeUIsUUFBbkIsRUFBWjtBQUFBLE9BRlk7QUFHdEJ0QixnQkFBVTtBQUFBLGVBQVMsT0FBS1YsS0FBTCxDQUFXVSxRQUFYLENBQW9CYixLQUFwQixDQUFUO0FBQUE7QUFIWSxLQUF4QjtBQUtELEdBMUNIO0FBQUE7O0FBNElBRSxtQkFBbUJrQyxZQUFuQixHQUFrQztBQUNoQ3hCLGVBQWE7QUFBQSxXQUFNeUIsUUFBUUMsT0FBUixDQUFnQixFQUFoQixDQUFOO0FBQUEsR0FEbUI7QUFFaEN6QixZQUFVLG9CQUFNLENBQUUsQ0FGYztBQUdoQ0MsZ0JBQWMsNEJBQW1DO0FBQUEsUUFBaENkLEtBQWdDLFFBQWhDQSxLQUFnQztBQUFBLFFBQXpCVSxRQUF5QixRQUF6QkEsUUFBeUI7QUFBQSxRQUFmRyxRQUFlLFFBQWZBLFFBQWU7O0FBQy9DSCxhQUFTLEVBQUVWLFlBQUYsRUFBVDtBQUNBYSxhQUFTYixLQUFUO0FBQ0EsV0FBT0EsS0FBUDtBQUNELEdBUCtCO0FBUWhDZ0IsY0FBWSxLQVJvQjtBQVNoQ2dCLFVBQVEsa0JBQU0sQ0FBRSxDQVRnQjtBQVVoQ0MsYUFBVyxxQkFBTSxDQUFFO0FBVmEsQ0FBbEM7O0FBYUEsZUFBZS9CLGtCQUFmIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgQXN5bmMgYXMgU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VsZWN0JztcbmltcG9ydCB7IGNyZWF0ZUZpbHRlciB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBGbG9hdGluZ01lbnUgZnJvbSAnLi9GbG9hdGluZ01lbnUnO1xuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4uL1NlYXJjaE1vZGFsJztcblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnXG5pbXBvcnQgJy4vQ29tYm9ib3hXaXRoU2VhcmNoLnNjc3MnO1xuXG5jb25zdCBJQ09OX1NJWkUgPSB7XG4gIHdpZHRoOiAxNSxcbiAgaGVpZ2h0OiAxNSxcbn07XG5cbmNvbnN0IHZhbHVlQmVjb21lc0RlZmluZWRPcklzQ2xlYXJlZCA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gISFuZXh0UHJvcHMudmFsdWUgIT09ICEhY3VycmVudFByb3BzLnZhbHVlO1xuY29uc3Qgb3B0aW9uVmFsdWVDaGFuZ2VzID0gKG5leHRQcm9wcywgY3VycmVudFByb3BzKSA9PiBuZXh0UHJvcHMudmFsdWUgJiYgY3VycmVudFByb3BzLnZhbHVlICYmXG4gIG5leHRQcm9wcy52YWx1ZS52YWx1ZSAhPT0gY3VycmVudFByb3BzLnZhbHVlLnZhbHVlO1xuXG5leHBvcnQgY2xhc3MgQ29tYm9ib3hXaXRoU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgfSA9IHByb3BzO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZHJvcGRvd25GaWVsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHZhbHVlQmVjb21lc0RlZmluZWRPcklzQ2xlYXJlZChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8IG9wdGlvblZhbHVlQ2hhbmdlcyhuZXh0UHJvcHMsIHRoaXMucHJvcHMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2V0U3RhdGU6IG5ld1N0YXRlID0+IHRoaXMuc2V0U3RhdGUoeyAuLi5uZXdTdGF0ZSB9KSxcbiAgICAgIG9uU2VsZWN0OiB2YWx1ZSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsb2FkT3B0aW9ucyxcbiAgICAgIG9uU2VsZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBoYW5kbGVDaGFuZ2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIGxvY2FsaXphdGlvblRleHRzLFxuICAgICAgaXNEaXNhYmxlZCxcbiAgICAgIGZpbHRlcnMsXG4gICAgICByZW5kZXJlcnMsXG4gICAgICBtb2RhbDogbW9kYWxQcm9wcyxcbiAgICAgIC4uLmV4dHJhUHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IChwcm9wcykgPT4ge1xuICAgICAgcmV0dXJuICFpc0Rpc2FibGVkICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21ib2JveC13aXRoLXNlYXJjaF9fc2VhcmNoLWJ1dHRvblwiPlxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVufVxuICAgICAgICAgICAgey4uLklDT05fU0laRX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICBjb25zdCBNZW51ID0gcHJvcHMgPT4ge1xuICAgICAgY29uc3QgbmV3UHJvcHMgPSB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICBkcm9wZG93bkZpZWxkTm9kZTogdGhpcy5kcm9wZG93bkZpZWxkTm9kZSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gRmxvYXRpbmdNZW51KG5ld1Byb3BzKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e2xvYWRPcHRpb25zfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlKX1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgICBEcm9wZG93bkluZGljYXRvcixcbiAgICAgICAgICAgICAgTWVudSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBub09wdGlvbnNNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubm9JdGVtcyB8fCAnLS0nKX1cbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlPXsoKSA9PiAobG9jYWxpemF0aW9uVGV4dHMubG9hZGluZyB8fCAnTG9hZGluZy4uLicpfVxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uPXtjcmVhdGVGaWx0ZXIoe1xuICAgICAgICAgICAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgICAgICAgICAgICBpZ25vcmVBY2NlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF0Y2hGcm9tOiAnYW55JyxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgcmVmPXsobm9kZSkgPT4geyB0aGlzLnByb3BzLnNldFJlZihub2RlKTsgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5wcm9wcy5vbktleURvd259XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNob3dNb2RhbCA/XG4gICAgICAgICAgICA8U2VhcmNoTW9kYWxcbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBsb2NhbGl6YXRpb25UZXh0cz17bG9jYWxpemF0aW9uVGV4dHN9XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIHJlbmRlcmVycz17cmVuZGVyZXJzfVxuICAgICAgICAgICAgICB7Li4ubW9kYWxQcm9wc31cbiAgICAgICAgICAgIC8+IDpcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Db21ib2JveFdpdGhTZWFyY2gucHJvcFR5cGVzID0ge1xuICB2YWx1ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSksXG4gIGZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlbmRlcmVyczogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIGhhbmRsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvY2FsaXphdGlvblRleHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbW9kYWw6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgbG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNob3dNb2RhbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9KSxcbiAgc2V0UmVmOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkNvbWJvYm94V2l0aFNlYXJjaC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW10pLFxuICBvblNlbGVjdDogKCkgPT4ge30sXG4gIGhhbmRsZUNoYW5nZTogKHsgdmFsdWUsIHNldFN0YXRlLCBvblNlbGVjdCB9KSA9PiB7XG4gICAgc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICBvblNlbGVjdCh2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgc2V0UmVmOiAoKSA9PiB7fSxcbiAgb25LZXlEb3duOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==