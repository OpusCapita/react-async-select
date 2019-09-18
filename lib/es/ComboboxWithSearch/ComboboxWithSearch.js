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
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import FloatingMenu from './FloatingMenu';
import SearchModal from '../SearchModal';

import 'react-table/react-table.css';
import './ComboboxWithSearch.scss';

var ICON_SIZE = {
  width: 15,
  height: 15
};

export var DEBOUNCE_LIMIT = 500;

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

    _this.loadOptionsDebounced = AwesomeDebouncePromise(props.loadOptions, DEBOUNCE_LIMIT);
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
        onSelect = _props.onSelect,
        handleChange = _props.handleChange,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        extraProps = _objectWithoutProperties(_props, ['onSelect', 'handleChange', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal']);

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
          loadOptions: this.loadOptionsDebounced,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJBd2Vzb21lRGVib3VuY2VQcm9taXNlIiwiRmxvYXRpbmdNZW51IiwiU2VhcmNoTW9kYWwiLCJJQ09OX1NJWkUiLCJ3aWR0aCIsImhlaWdodCIsIkRFQk9VTkNFX0xJTUlUIiwidmFsdWVCZWNvbWVzRGVmaW5lZE9ySXNDbGVhcmVkIiwibmV4dFByb3BzIiwiY3VycmVudFByb3BzIiwidmFsdWUiLCJvcHRpb25WYWx1ZUNoYW5nZXMiLCJDb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInN0YXRlIiwic2hvd01vZGFsIiwibG9hZE9wdGlvbnNEZWJvdW5jZWQiLCJsb2FkT3B0aW9ucyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJmaW5kRE9NTm9kZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJzZXRTdGF0ZSIsInJlbmRlciIsIm9uU2VsZWN0IiwiaGFuZGxlQ2hhbmdlIiwibG9jYWxpemF0aW9uVGV4dHMiLCJpc0Rpc2FibGVkIiwiZmlsdGVycyIsInJlbmRlcmVycyIsIm1vZGFsUHJvcHMiLCJtb2RhbCIsImV4dHJhUHJvcHMiLCJEcm9wZG93bkluZGljYXRvciIsImhhbmRsZU9wZW4iLCJNZW51IiwibmV3UHJvcHMiLCJub0l0ZW1zIiwibG9hZGluZyIsImlnbm9yZUNhc2UiLCJpZ25vcmVBY2NlbnRzIiwibWF0Y2hGcm9tIiwibm9kZSIsInNldFJlZiIsIm9uS2V5RG93biIsImhhbmRsZUNsb3NlIiwibmV3U3RhdGUiLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0Es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WUFBTTtBQUNqQixXQUFLWixRQUFMLENBQWM7QUFDWlAsaUJBQVc7QUFEQyxLQUFkO0FBR0QsR0FqQ0g7O0FBQUEsT0FtQ0U4QixXQW5DRixHQW1DZ0IsWUFBTTtBQUNsQixXQUFLdkIsUUFBTCxDQUFjO0FBQ1pQLGlCQUFXO0FBREMsS0FBZDtBQUdELEdBdkNIOztBQUFBLE9BeUNFVSxZQXpDRixHQXlDaUIsVUFBQ2YsS0FBRCxFQUFXO0FBQ3hCLFdBQUtHLEtBQUwsQ0FBV1ksWUFBWCxDQUF3QjtBQUN0QmYsa0JBRHNCO0FBRXRCWSxnQkFBVTtBQUFBLGVBQVksT0FBS0EsUUFBTCxjQUFtQndCLFFBQW5CLEVBQVo7QUFBQSxPQUZZO0FBR3RCdEIsZ0JBQVU7QUFBQSxlQUFTLE9BQUtYLEtBQUwsQ0FBV1csUUFBWCxDQUFvQmQsS0FBcEIsQ0FBVDtBQUFBO0FBSFksS0FBeEI7QUFLRCxHQS9DSDtBQUFBOztBQWlKQUUsbUJBQW1CbUMsWUFBbkIsR0FBa0M7QUFDaEM5QixlQUFhO0FBQUEsV0FBTStCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBTjtBQUFBLEdBRG1CO0FBRWhDekIsWUFBVSxvQkFBTSxDQUFFLENBRmM7QUFHaENDLGdCQUFjLDRCQUFtQztBQUFBLFFBQWhDZixLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxRQUF6QlksUUFBeUIsUUFBekJBLFFBQXlCO0FBQUEsUUFBZkUsUUFBZSxRQUFmQSxRQUFlOztBQUMvQ0YsYUFBUyxFQUFFWixZQUFGLEVBQVQ7QUFDQWMsYUFBU2QsS0FBVDtBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQVArQjtBQVFoQ2lCLGNBQVksS0FSb0I7QUFTaENnQixVQUFRLGtCQUFNLENBQUUsQ0FUZ0I7QUFVaENDLGFBQVcscUJBQU0sQ0FBRTtBQVZhLENBQWxDOztBQWFBLGVBQWVoQyxrQkFBZiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEF3ZXNvbWVEZWJvdW5jZVByb21pc2UgZnJvbSAnYXdlc29tZS1kZWJvdW5jZS1wcm9taXNlJztcblxuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL0Zsb2F0aW5nTWVudSc7XG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX0xJTUlUID0gNTAwO1xuXG5jb25zdCB2YWx1ZUJlY29tZXNEZWZpbmVkT3JJc0NsZWFyZWQgPSAobmV4dFByb3BzLCBjdXJyZW50UHJvcHMpID0+ICEhbmV4dFByb3BzLnZhbHVlICE9PSAhIWN1cnJlbnRQcm9wcy52YWx1ZTtcbmNvbnN0IG9wdGlvblZhbHVlQ2hhbmdlcyA9IChuZXh0UHJvcHMsIGN1cnJlbnRQcm9wcykgPT4gbmV4dFByb3BzLnZhbHVlICYmIGN1cnJlbnRQcm9wcy52YWx1ZSAmJlxuICBuZXh0UHJvcHMudmFsdWUudmFsdWUgIT09IGN1cnJlbnRQcm9wcy52YWx1ZS52YWx1ZTtcblxuZXhwb3J0IGNsYXNzIENvbWJvYm94V2l0aFNlYXJjaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgIH0gPSBwcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWUsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkID0gQXdlc29tZURlYm91bmNlUHJvbWlzZShcbiAgICAgIHByb3BzLmxvYWRPcHRpb25zLFxuICAgICAgREVCT1VOQ0VfTElNSVQsXG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZHJvcGRvd25GaWVsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHZhbHVlQmVjb21lc0RlZmluZWRPcklzQ2xlYXJlZChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8IG9wdGlvblZhbHVlQ2hhbmdlcyhuZXh0UHJvcHMsIHRoaXMucHJvcHMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZUNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgIHZhbHVlLFxuICAgICAgc2V0U3RhdGU6IG5ld1N0YXRlID0+IHRoaXMuc2V0U3RhdGUoeyAuLi5uZXdTdGF0ZSB9KSxcbiAgICAgIG9uU2VsZWN0OiB2YWx1ZSA9PiB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgaGFuZGxlQ2hhbmdlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsb2NhbGl6YXRpb25UZXh0cyxcbiAgICAgIGlzRGlzYWJsZWQsXG4gICAgICBmaWx0ZXJzLFxuICAgICAgcmVuZGVyZXJzLFxuICAgICAgbW9kYWw6IG1vZGFsUHJvcHMsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgY29uc3QgTWVudSA9IHByb3BzID0+IHtcbiAgICAgIGNvbnN0IG5ld1Byb3BzID0ge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgZHJvcGRvd25GaWVsZE5vZGU6IHRoaXMuZHJvcGRvd25GaWVsZE5vZGUsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIEZsb2F0aW5nTWVudShuZXdQcm9wcyk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnNEZWJvdW5jZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUpfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBNZW51LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zIHx8ICctLScpfVxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8ICdMb2FkaW5nLi4uJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBpbm5lclJlZj17KG5vZGUpID0+IHsgdGhpcy5wcm9wcy5zZXRSZWYobm9kZSk7IH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoYW5kbGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHNldFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBoYW5kbGVDaGFuZ2U6ICh7IHZhbHVlLCBzZXRTdGF0ZSwgb25TZWxlY3QgfSkgPT4ge1xuICAgIHNldFN0YXRlKHsgdmFsdWUgfSk7XG4gICAgb25TZWxlY3QodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgaXNEaXNhYmxlZDogZmFsc2UsXG4gIHNldFJlZjogKCkgPT4ge30sXG4gIG9uS2V5RG93bjogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21ib2JveFdpdGhTZWFyY2g7XG4iXX0=