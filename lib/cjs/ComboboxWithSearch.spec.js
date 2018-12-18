'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ComboboxWithSearch = require('./ComboboxWithSearch');

var _ComboboxWithSearch2 = _interopRequireDefault(_ComboboxWithSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

describe('ComboboxWithSearch', function () {
  it('mounts correctly', function () {
    before(function () {
      undefined.comboboxWithSearch = new _ComboboxWithSearch2.default();
    });

    var props = {
      value: '',
      onSelect: function onSelect() {},
      loadOptions: function loadOptions() {
        return Promise.resolve([{ label: 'a', value: 'a' }]);
      },
      localizationTexts: {
        "close": "Close",
        "select": "Select",
        "field.code": "code",
        "field.description": "description",
        "loading": "Loading...",
        "noItems": "No items",
        "searchBy": "Search by",
        "by": "by"
      },
      modal: {
        title: '',
        fields: ['key'],
        loadOptions: function loadOptions() {
          return Promise.resolve({
            data: [{ key: 'a', value: 'a' }],
            totalCount: 0
          });
        },
        showModal: true,
        onClose: function onClose() {},
        onSelect: function onSelect() {}
      }
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboboxWithSearch2.default, props));
    (0, _chai.expect)(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiYmVmb3JlIiwiY29tYm9ib3hXaXRoU2VhcmNoIiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsIm9uU2VsZWN0IiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxhYmVsIiwibG9jYWxpemF0aW9uVGV4dHMiLCJtb2RhbCIsInRpdGxlIiwiZmllbGRzIiwiZGF0YSIsImtleSIsInRvdGFsQ291bnQiLCJzaG93TW9kYWwiLCJvbkNsb3NlIiwid3JhcHBlciIsInRvIiwibm90IiwiYmUiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBTkE7O0FBUUFBLFNBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ0MsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzNCQyxXQUFPLFlBQU07QUFDWCxnQkFBS0Msa0JBQUwsR0FBMEIsSUFBSUMsNEJBQUosRUFBMUI7QUFDRCxLQUZEOztBQUlBLFFBQU1DLFFBQVE7QUFDWkMsYUFBTyxFQURLO0FBRVpDLGdCQUFVLG9CQUFNLENBQUUsQ0FGTjtBQUdaQyxtQkFBYTtBQUFBLGVBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsQ0FBQyxFQUFFQyxPQUFPLEdBQVQsRUFBY0wsT0FBTyxHQUFyQixFQUFELENBQWhCLENBQU47QUFBQSxPQUhEO0FBSVpNLHlCQUFtQjtBQUNqQixpQkFBUyxPQURRO0FBRWpCLGtCQUFVLFFBRk87QUFHakIsc0JBQWMsTUFIRztBQUlqQiw2QkFBcUIsYUFKSjtBQUtqQixtQkFBVyxZQUxNO0FBTWpCLG1CQUFXLFVBTk07QUFPakIsb0JBQVksV0FQSztBQVFqQixjQUFNO0FBUlcsT0FKUDtBQWNaQyxhQUFPO0FBQ0xDLGVBQU8sRUFERjtBQUVMQyxnQkFBUSxDQUFDLEtBQUQsQ0FGSDtBQUdMUCxxQkFBYTtBQUFBLGlCQUFNQyxRQUFRQyxPQUFSLENBQWdCO0FBQ2pDTSxrQkFBTSxDQUFDLEVBQUVDLEtBQUssR0FBUCxFQUFZWCxPQUFPLEdBQW5CLEVBQUQsQ0FEMkI7QUFFakNZLHdCQUFZO0FBRnFCLFdBQWhCLENBQU47QUFBQSxTQUhSO0FBT0xDLG1CQUFXLElBUE47QUFRTEMsaUJBQVMsbUJBQU0sQ0FBRSxDQVJaO0FBU0xiLGtCQUFVLG9CQUFNLENBQUU7QUFUYjtBQWRLLEtBQWQ7QUEwQkEsUUFBTWMsVUFBVSxtQkFDZCw4QkFBQyw0QkFBRCxFQUF3QmhCLEtBQXhCLENBRGMsQ0FBaEI7QUFHQSxzQkFBT2dCLE9BQVAsRUFBZ0JDLEVBQWhCLENBQW1CQyxHQUFuQixDQUF1QkMsRUFBdkIsQ0FBMEJDLFNBQTFCO0FBQ0QsR0FuQ0Q7QUFvQ0QsQ0FyQ0QiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdlbnp5bWUnO1xuXG5pbXBvcnQgQ29tYm9ib3hXaXRoU2VhcmNoIGZyb20gJy4vQ29tYm9ib3hXaXRoU2VhcmNoJztcblxuZGVzY3JpYmUoJ0NvbWJvYm94V2l0aFNlYXJjaCcsICgpID0+IHtcbiAgaXQoJ21vdW50cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIHRoaXMuY29tYm9ib3hXaXRoU2VhcmNoID0gbmV3IENvbWJvYm94V2l0aFNlYXJjaCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFt7IGxhYmVsOiAnYScsIHZhbHVlOiAnYScgfV0pLFxuICAgICAgbG9jYWxpemF0aW9uVGV4dHM6IHtcbiAgICAgICAgXCJjbG9zZVwiOiBcIkNsb3NlXCIsXG4gICAgICAgIFwic2VsZWN0XCI6IFwiU2VsZWN0XCIsXG4gICAgICAgIFwiZmllbGQuY29kZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJmaWVsZC5kZXNjcmlwdGlvblwiOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgIFwibG9hZGluZ1wiOiBcIkxvYWRpbmcuLi5cIixcbiAgICAgICAgXCJub0l0ZW1zXCI6IFwiTm8gaXRlbXNcIixcbiAgICAgICAgXCJzZWFyY2hCeVwiOiBcIlNlYXJjaCBieVwiLFxuICAgICAgICBcImJ5XCI6IFwiYnlcIlxuICAgICAgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZmllbGRzOiBbJ2tleSddLFxuICAgICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICBkYXRhOiBbeyBrZXk6ICdhJywgdmFsdWU6ICdhJyB9XSxcbiAgICAgICAgICB0b3RhbENvdW50OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgd3JhcHBlciA9IG1vdW50KFxuICAgICAgPENvbWJvYm94V2l0aFNlYXJjaCB7Li4ucHJvcHN9IC8+XG4gICAgKTtcbiAgICBleHBlY3Qod3JhcHBlcikudG8ubm90LmJlLnVuZGVmaW5lZDtcbiAgfSk7XG59KTtcbiJdfQ==