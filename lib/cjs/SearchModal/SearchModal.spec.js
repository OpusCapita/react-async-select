'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _SearchModal = require('./SearchModal');

var _SearchModal2 = _interopRequireDefault(_SearchModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

describe('SearchModal', function () {
  it('mounts correctly', function () {
    var props = {
      title: '',
      fields: ['key'],
      loadOptions: function loadOptions() {
        return Promise.resolve({
          data: [],
          totalCount: 0
        });
      },
      showModal: true,
      onClose: function onClose() {},
      onSelect: function onSelect() {},
      localizationTexts: {
        "close": "Close",
        "select": "Select",
        "field.code": "code",
        "field.description": "description",
        "loading": "Loading...",
        "noItems": "No items",
        "searchBy": "Search by",
        "by": "by"
      }
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_SearchModal2.default, props));
    (0, _chai.expect)(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5zcGVjLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJwcm9wcyIsInRpdGxlIiwiZmllbGRzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIm9uU2VsZWN0IiwibG9jYWxpemF0aW9uVGV4dHMiLCJ3cmFwcGVyIiwidG8iLCJub3QiLCJiZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFOQTs7QUFRQUEsU0FBUyxhQUFULEVBQXdCLFlBQU07QUFDNUJDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQixRQUFNQyxRQUFRO0FBQ1pDLGFBQU8sRUFESztBQUVaQyxjQUFRLENBQUMsS0FBRCxDQUZJO0FBR1pDLG1CQUFhO0FBQUEsZUFBTUMsUUFBUUMsT0FBUixDQUFnQjtBQUNqQ0MsZ0JBQU0sRUFEMkI7QUFFakNDLHNCQUFZO0FBRnFCLFNBQWhCLENBQU47QUFBQSxPQUhEO0FBT1pDLGlCQUFXLElBUEM7QUFRWkMsZUFBUyxtQkFBTSxDQUFFLENBUkw7QUFTWkMsZ0JBQVUsb0JBQU0sQ0FBRSxDQVROO0FBVVpDLHlCQUFtQjtBQUNqQixpQkFBUyxPQURRO0FBRWpCLGtCQUFVLFFBRk87QUFHakIsc0JBQWMsTUFIRztBQUlqQiw2QkFBcUIsYUFKSjtBQUtqQixtQkFBVyxZQUxNO0FBTWpCLG1CQUFXLFVBTk07QUFPakIsb0JBQVksV0FQSztBQVFqQixjQUFNO0FBUlc7QUFWUCxLQUFkO0FBcUJBLFFBQU1DLFVBQVUsbUJBQ2QsOEJBQUMscUJBQUQsRUFBaUJaLEtBQWpCLENBRGMsQ0FBaEI7QUFHQSxzQkFBT1ksT0FBUCxFQUFnQkMsRUFBaEIsQ0FBbUJDLEdBQW5CLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBMUI7QUFDRCxHQTFCRDtBQTJCRCxDQTVCRCIsImZpbGUiOiJTZWFyY2hNb2RhbC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5kZXNjcmliZSgnU2VhcmNoTW9kYWwnLCAoKSA9PiB7XG4gIGl0KCdtb3VudHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZmllbGRzOiBbJ2tleSddLFxuICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICB0b3RhbENvdW50OiAwXG4gICAgICB9KSxcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgbG9jYWxpemF0aW9uVGV4dHM6IHtcbiAgICAgICAgXCJjbG9zZVwiOiBcIkNsb3NlXCIsXG4gICAgICAgIFwic2VsZWN0XCI6IFwiU2VsZWN0XCIsXG4gICAgICAgIFwiZmllbGQuY29kZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJmaWVsZC5kZXNjcmlwdGlvblwiOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgIFwibG9hZGluZ1wiOiBcIkxvYWRpbmcuLi5cIixcbiAgICAgICAgXCJub0l0ZW1zXCI6IFwiTm8gaXRlbXNcIixcbiAgICAgICAgXCJzZWFyY2hCeVwiOiBcIlNlYXJjaCBieVwiLFxuICAgICAgICBcImJ5XCI6IFwiYnlcIlxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHdyYXBwZXIgPSBtb3VudChcbiAgICAgIDxTZWFyY2hNb2RhbCB7Li4ucHJvcHN9IC8+XG4gICAgKTtcbiAgICBleHBlY3Qod3JhcHBlcikudG8ubm90LmJlLnVuZGVmaW5lZDtcbiAgfSk7XG59KTtcbiJdfQ==