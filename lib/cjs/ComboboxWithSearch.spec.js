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
        return Promise.resolve({ options: [{ label: 'a', value: 'a' }] });
      },
      i18n: { getMessage: function getMessage(id) {
          return id;
        } },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiYmVmb3JlIiwiY29tYm9ib3hXaXRoU2VhcmNoIiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsIm9uU2VsZWN0IiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9wdGlvbnMiLCJsYWJlbCIsImkxOG4iLCJnZXRNZXNzYWdlIiwiaWQiLCJtb2RhbCIsInRpdGxlIiwiZmllbGRzIiwiZGF0YSIsImtleSIsInRvdGFsQ291bnQiLCJzaG93TW9kYWwiLCJvbkNsb3NlIiwid3JhcHBlciIsInRvIiwibm90IiwiYmUiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBTkE7O0FBUUFBLFNBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ0MsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzNCQyxXQUFPLFlBQU07QUFDWCxnQkFBS0Msa0JBQUwsR0FBMEIsSUFBSUMsNEJBQUosRUFBMUI7QUFDRCxLQUZEOztBQUlBLFFBQU1DLFFBQVE7QUFDWkMsYUFBTyxFQURLO0FBRVpDLGdCQUFVLG9CQUFNLENBQUUsQ0FGTjtBQUdaQyxtQkFBYTtBQUFBLGVBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUMsU0FBUyxDQUFDLEVBQUVDLE9BQU8sR0FBVCxFQUFjTixPQUFPLEdBQXJCLEVBQUQsQ0FBWCxFQUFoQixDQUFOO0FBQUEsT0FIRDtBQUlaTyxZQUFNLEVBQUVDLFlBQVk7QUFBQSxpQkFBTUMsRUFBTjtBQUFBLFNBQWQsRUFKTTtBQUtaQyxhQUFPO0FBQ0xDLGVBQU8sRUFERjtBQUVMQyxnQkFBUSxDQUFDLEtBQUQsQ0FGSDtBQUdMVixxQkFBYTtBQUFBLGlCQUFNQyxRQUFRQyxPQUFSLENBQWdCO0FBQ2pDUyxrQkFBTSxDQUFDLEVBQUVDLEtBQUssR0FBUCxFQUFZZCxPQUFPLEdBQW5CLEVBQUQsQ0FEMkI7QUFFakNlLHdCQUFZO0FBRnFCLFdBQWhCLENBQU47QUFBQSxTQUhSO0FBT0xDLG1CQUFXLElBUE47QUFRTEMsaUJBQVMsbUJBQU0sQ0FBRSxDQVJaO0FBU0xoQixrQkFBVSxvQkFBTSxDQUFFO0FBVGI7QUFMSyxLQUFkO0FBaUJBLFFBQU1pQixVQUFVLG1CQUNkLDhCQUFDLDRCQUFELEVBQXdCbkIsS0FBeEIsQ0FEYyxDQUFoQjtBQUdBLHNCQUFPbUIsT0FBUCxFQUFnQkMsRUFBaEIsQ0FBbUJDLEdBQW5CLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBMUI7QUFDRCxHQTFCRDtBQTJCRCxDQTVCRCIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJ2VuenltZSc7XG5cbmltcG9ydCBDb21ib2JveFdpdGhTZWFyY2ggZnJvbSAnLi9Db21ib2JveFdpdGhTZWFyY2gnO1xuXG5kZXNjcmliZSgnQ29tYm9ib3hXaXRoU2VhcmNoJywgKCkgPT4ge1xuICBpdCgnbW91bnRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgdGhpcy5jb21ib2JveFdpdGhTZWFyY2ggPSBuZXcgQ29tYm9ib3hXaXRoU2VhcmNoKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBvcHRpb25zOiBbeyBsYWJlbDogJ2EnLCB2YWx1ZTogJ2EnIH1dIH0pLFxuICAgICAgaTE4bjogeyBnZXRNZXNzYWdlOiBpZCA9PiBpZCB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBmaWVsZHM6IFsna2V5J10sXG4gICAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIGRhdGE6IFt7IGtleTogJ2EnLCB2YWx1ZTogJ2EnIH1dLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDBcbiAgICAgICAgfSksXG4gICAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICAgICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCB3cmFwcGVyID0gbW91bnQoXG4gICAgICA8Q29tYm9ib3hXaXRoU2VhcmNoIHsuLi5wcm9wc30gLz5cbiAgICApO1xuICAgIGV4cGVjdCh3cmFwcGVyKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICB9KTtcbn0pO1xuIl19