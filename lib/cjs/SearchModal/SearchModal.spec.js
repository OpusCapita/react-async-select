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
      i18n: { getMessage: function getMessage(id) {
          return id;
        } }
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_SearchModal2.default, props));
    (0, _chai.expect)(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5zcGVjLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJwcm9wcyIsInRpdGxlIiwiZmllbGRzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIm9uU2VsZWN0IiwiaTE4biIsImdldE1lc3NhZ2UiLCJpZCIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQU5BOztBQVFBQSxTQUFTLGFBQVQsRUFBd0IsWUFBTTtBQUM1QkMsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzNCLFFBQU1DLFFBQVE7QUFDWkMsYUFBTyxFQURLO0FBRVpDLGNBQVEsQ0FBQyxLQUFELENBRkk7QUFHWkMsbUJBQWE7QUFBQSxlQUFNQyxRQUFRQyxPQUFSLENBQWdCO0FBQ2pDQyxnQkFBTSxFQUQyQjtBQUVqQ0Msc0JBQVk7QUFGcUIsU0FBaEIsQ0FBTjtBQUFBLE9BSEQ7QUFPWkMsaUJBQVcsSUFQQztBQVFaQyxlQUFTLG1CQUFNLENBQUUsQ0FSTDtBQVNaQyxnQkFBVSxvQkFBTSxDQUFFLENBVE47QUFVWkMsWUFBTSxFQUFFQyxZQUFZO0FBQUEsaUJBQU1DLEVBQU47QUFBQSxTQUFkO0FBVk0sS0FBZDtBQVlBLFFBQU1DLFVBQVUsbUJBQ2QsOEJBQUMscUJBQUQsRUFBaUJkLEtBQWpCLENBRGMsQ0FBaEI7QUFHQSxzQkFBT2MsT0FBUCxFQUFnQkMsRUFBaEIsQ0FBbUJDLEdBQW5CLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBMUI7QUFDRCxHQWpCRDtBQWtCRCxDQW5CRCIsImZpbGUiOiJTZWFyY2hNb2RhbC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcblxuaW1wb3J0IFNlYXJjaE1vZGFsIGZyb20gJy4vU2VhcmNoTW9kYWwnO1xuXG5kZXNjcmliZSgnU2VhcmNoTW9kYWwnLCAoKSA9PiB7XG4gIGl0KCdtb3VudHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgdGl0bGU6ICcnLFxuICAgICAgZmllbGRzOiBbJ2tleSddLFxuICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICB0b3RhbENvdW50OiAwXG4gICAgICB9KSxcbiAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgaTE4bjogeyBnZXRNZXNzYWdlOiBpZCA9PiBpZCB9LFxuICAgIH07XG4gICAgY29uc3Qgd3JhcHBlciA9IG1vdW50KFxuICAgICAgPFNlYXJjaE1vZGFsIHsuLi5wcm9wc30gLz5cbiAgICApO1xuICAgIGV4cGVjdCh3cmFwcGVyKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICB9KTtcbn0pO1xuIl19