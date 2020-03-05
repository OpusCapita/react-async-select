var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

export var ComboboxWithSearch = function (_Component) {
  _inherits(ComboboxWithSearch, _Component);

  function ComboboxWithSearch(props) {
    _classCallCheck(this, ComboboxWithSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleOpen = function () {
      _this.setState({
        showModal: true
      });
    };

    _this.handleClose = function () {
      _this.setState({
        showModal: false
      });
    };

    _this.state = {
      showModal: false
    };

    _this.loadOptionsDebounced = AwesomeDebouncePromise(props.loadOptions, DEBOUNCE_LIMIT);
    return _this;
  }

  ComboboxWithSearch.prototype.componentDidMount = function componentDidMount() {
    this.dropdownFieldNode = ReactDOM.findDOMNode(this);
  };

  ComboboxWithSearch.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onSelect = _props.onSelect,
        localizationTexts = _props.localizationTexts,
        isDisabled = _props.isDisabled,
        filters = _props.filters,
        renderers = _props.renderers,
        modalProps = _props.modal,
        value = _props.value,
        extraProps = _objectWithoutProperties(_props, ['onSelect', 'localizationTexts', 'isDisabled', 'filters', 'renderers', 'modal', 'value']);

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
          onChange: onSelect,
          value: value,
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
        onSelect: onSelect,
        localizationTexts: localizationTexts,
        filters: filters,
        renderers: renderers
      }, modalProps)) : null
    );
  };

  return ComboboxWithSearch;
}(Component);

ComboboxWithSearch.defaultProps = {
  loadOptions: function loadOptions() {
    return Promise.resolve([]);
  },
  onSelect: function onSelect() {},
  isDisabled: false,
  setRef: function setRef() {},
  onKeyDown: function onKeyDown() {}
};

export default ComboboxWithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJQcm9wVHlwZXMiLCJJY29uIiwiQXN5bmMiLCJTZWxlY3QiLCJjcmVhdGVGaWx0ZXIiLCJBd2Vzb21lRGVib3VuY2VQcm9taXNlIiwiRmxvYXRpbmdNZW51IiwiU2VhcmNoTW9kYWwiLCJJQ09OX1NJWkUiLCJ3aWR0aCIsImhlaWdodCIsIkRFQk9VTkNFX0xJTUlUIiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJoYW5kbGVPcGVuIiwic2V0U3RhdGUiLCJzaG93TW9kYWwiLCJoYW5kbGVDbG9zZSIsInN0YXRlIiwibG9hZE9wdGlvbnNEZWJvdW5jZWQiLCJsb2FkT3B0aW9ucyIsImNvbXBvbmVudERpZE1vdW50IiwiZHJvcGRvd25GaWVsZE5vZGUiLCJmaW5kRE9NTm9kZSIsInJlbmRlciIsIm9uU2VsZWN0IiwibG9jYWxpemF0aW9uVGV4dHMiLCJpc0Rpc2FibGVkIiwiZmlsdGVycyIsInJlbmRlcmVycyIsIm1vZGFsUHJvcHMiLCJtb2RhbCIsInZhbHVlIiwiZXh0cmFQcm9wcyIsIkRyb3Bkb3duSW5kaWNhdG9yIiwiTWVudSIsIm5ld1Byb3BzIiwibm9JdGVtcyIsImxvYWRpbmciLCJpZ25vcmVDYXNlIiwiaWdub3JlQWNjZW50cyIsIm1hdGNoRnJvbSIsIm5vZGUiLCJzZXRSZWYiLCJvbktleURvd24iLCJkZWZhdWx0UHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFNBQVNDLE1BQWxC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QUFsQjtBQUEwQixXQWpCbEQ7QUFrQkUscUJBQVcsS0FBSzdCLEtBQUwsQ0FBVytCO0FBbEJ4QjtBQURGLE9BREY7QUF3QkksV0FBSzFCLEtBQUwsQ0FBV0YsU0FBWCxHQUNFLG9CQUFDLFdBQUQ7QUFDRSxpQkFBUyxLQUFLQyxXQURoQjtBQUVFLGtCQUFVUSxRQUZaO0FBR0UsMkJBQW1CQyxpQkFIckI7QUFJRSxpQkFBU0UsT0FKWDtBQUtFLG1CQUFXQztBQUxiLFNBTU1DLFVBTk4sRUFERixHQVNFO0FBakNOLEtBREY7QUFzQ0QsR0FuR0g7O0FBQUE7QUFBQSxFQUF3Q2hDLFNBQXhDOztBQTZIQWMsbUJBQW1CaUMsWUFBbkIsR0FBa0M7QUFDaEN6QixlQUFhO0FBQUEsV0FBTTBCLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBTjtBQUFBLEdBRG1CO0FBRWhDdEIsWUFBVSxvQkFBTSxDQUFFLENBRmM7QUFHaENFLGNBQVksS0FIb0I7QUFJaENnQixVQUFRLGtCQUFNLENBQUUsQ0FKZ0I7QUFLaENDLGFBQVcscUJBQU0sQ0FBRTtBQUxhLENBQWxDOztBQVFBLGVBQWVoQyxrQkFBZiIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IEFzeW5jIGFzIFNlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEF3ZXNvbWVEZWJvdW5jZVByb21pc2UgZnJvbSAnYXdlc29tZS1kZWJvdW5jZS1wcm9taXNlJztcblxuaW1wb3J0IEZsb2F0aW5nTWVudSBmcm9tICcuL0Zsb2F0aW5nTWVudSc7XG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi4vU2VhcmNoTW9kYWwnO1xuXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcydcbmltcG9ydCAnLi9Db21ib2JveFdpdGhTZWFyY2guc2Nzcyc7XG5cbmNvbnN0IElDT05fU0laRSA9IHtcbiAgd2lkdGg6IDE1LFxuICBoZWlnaHQ6IDE1LFxufTtcblxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX0xJTUlUID0gNTAwO1xuXG5cbmV4cG9ydCBjbGFzcyBDb21ib2JveFdpdGhTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRPcHRpb25zRGVib3VuY2VkID0gQXdlc29tZURlYm91bmNlUHJvbWlzZShcbiAgICAgIHByb3BzLmxvYWRPcHRpb25zLFxuICAgICAgREVCT1VOQ0VfTElNSVQsXG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZHJvcGRvd25GaWVsZE5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZU9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvblNlbGVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgbG9jYWxpemF0aW9uVGV4dHMsXG4gICAgICBpc0Rpc2FibGVkLFxuICAgICAgZmlsdGVycyxcbiAgICAgIHJlbmRlcmVycyxcbiAgICAgIG1vZGFsOiBtb2RhbFByb3BzLFxuICAgICAgdmFsdWUsXG4gICAgICAuLi5leHRyYVByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSAocHJvcHMpID0+IHtcbiAgICAgIHJldHVybiAhaXNEaXNhYmxlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX3NlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT3Blbn1cbiAgICAgICAgICAgIHsuLi5JQ09OX1NJWkV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgY29uc3QgTWVudSA9IHByb3BzID0+IHtcbiAgICAgIGNvbnN0IG5ld1Byb3BzID0ge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgZHJvcGRvd25GaWVsZE5vZGU6IHRoaXMuZHJvcGRvd25GaWVsZE5vZGUsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIEZsb2F0aW5nTWVudShuZXdQcm9wcyk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvYm94LXdpdGgtc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tYm9ib3gtd2l0aC1zZWFyY2hfX2NvbWJvYm94XCI+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgey4uLmV4dHJhUHJvcHN9XG4gICAgICAgICAgICBpc0Rpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgICAgbG9hZE9wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnNEZWJvdW5jZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25TZWxlY3R9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIERyb3Bkb3duSW5kaWNhdG9yLFxuICAgICAgICAgICAgICBNZW51LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG5vT3B0aW9uc01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5ub0l0ZW1zIHx8ICctLScpfVxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2U9eygpID0+IChsb2NhbGl6YXRpb25UZXh0cy5sb2FkaW5nIHx8ICdMb2FkaW5nLi4uJyl9XG4gICAgICAgICAgICBmaWx0ZXJPcHRpb249e2NyZWF0ZUZpbHRlcih7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUFjY2VudHM6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaEZyb206ICdhbnknLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBpbm5lclJlZj17KG5vZGUpID0+IHsgdGhpcy5wcm9wcy5zZXRSZWYobm9kZSk7IH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMucHJvcHMub25LZXlEb3dufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5zaG93TW9kYWwgP1xuICAgICAgICAgICAgPFNlYXJjaE1vZGFsXG4gICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH1cbiAgICAgICAgICAgICAgbG9jYWxpemF0aW9uVGV4dHM9e2xvY2FsaXphdGlvblRleHRzfVxuICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICByZW5kZXJlcnM9e3JlbmRlcmVyc31cbiAgICAgICAgICAgICAgey4uLm1vZGFsUHJvcHN9XG4gICAgICAgICAgICAvPiA6XG4gICAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQ29tYm9ib3hXaXRoU2VhcmNoLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLFxuICBmaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZW5kZXJlcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBsb2NhbGl6YXRpb25UZXh0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgaXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1vZGFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzaG93TW9kYWw6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHNldFJlZjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Db21ib2JveFdpdGhTZWFyY2guZGVmYXVsdFByb3BzID0ge1xuICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtdKSxcbiAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgc2V0UmVmOiAoKSA9PiB7fSxcbiAgb25LZXlEb3duOiAoKSA9PiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbWJvYm94V2l0aFNlYXJjaDtcbiJdfQ==