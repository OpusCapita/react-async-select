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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLnNwZWMuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImJlZm9yZSIsImNvbWJvYm94V2l0aFNlYXJjaCIsIkNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwidmFsdWUiLCJvblNlbGVjdCIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsYWJlbCIsImxvY2FsaXphdGlvblRleHRzIiwibW9kYWwiLCJ0aXRsZSIsImZpZWxkcyIsImRhdGEiLCJrZXkiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQU5BOztBQVFBQSxTQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkNDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQkMsV0FBTyxZQUFNO0FBQ1gsZ0JBQUtDLGtCQUFMLEdBQTBCLElBQUlDLDRCQUFKLEVBQTFCO0FBQ0QsS0FGRDs7QUFJQSxRQUFNQyxRQUFRO0FBQ1pDLGFBQU8sRUFESztBQUVaQyxnQkFBVSxvQkFBTSxDQUFFLENBRk47QUFHWkMsbUJBQWE7QUFBQSxlQUFNQyxRQUFRQyxPQUFSLENBQWdCLENBQUMsRUFBRUMsT0FBTyxHQUFULEVBQWNMLE9BQU8sR0FBckIsRUFBRCxDQUFoQixDQUFOO0FBQUEsT0FIRDtBQUlaTSx5QkFBbUI7QUFDakIsaUJBQVMsT0FEUTtBQUVqQixrQkFBVSxRQUZPO0FBR2pCLHNCQUFjLE1BSEc7QUFJakIsNkJBQXFCLGFBSko7QUFLakIsbUJBQVcsWUFMTTtBQU1qQixtQkFBVyxVQU5NO0FBT2pCLG9CQUFZLFdBUEs7QUFRakIsY0FBTTtBQVJXLE9BSlA7QUFjWkMsYUFBTztBQUNMQyxlQUFPLEVBREY7QUFFTEMsZ0JBQVEsQ0FBQyxLQUFELENBRkg7QUFHTFAscUJBQWE7QUFBQSxpQkFBTUMsUUFBUUMsT0FBUixDQUFnQjtBQUNqQ00sa0JBQU0sQ0FBQyxFQUFFQyxLQUFLLEdBQVAsRUFBWVgsT0FBTyxHQUFuQixFQUFELENBRDJCO0FBRWpDWSx3QkFBWTtBQUZxQixXQUFoQixDQUFOO0FBQUEsU0FIUjtBQU9MQyxtQkFBVyxJQVBOO0FBUUxDLGlCQUFTLG1CQUFNLENBQUUsQ0FSWjtBQVNMYixrQkFBVSxvQkFBTSxDQUFFO0FBVGI7QUFkSyxLQUFkO0FBMEJBLFFBQU1jLFVBQVUsbUJBQ2QsOEJBQUMsNEJBQUQsRUFBd0JoQixLQUF4QixDQURjLENBQWhCO0FBR0Esc0JBQU9nQixPQUFQLEVBQWdCQyxFQUFoQixDQUFtQkMsR0FBbkIsQ0FBdUJDLEVBQXZCLENBQTBCQyxTQUExQjtBQUNELEdBbkNEO0FBb0NELENBckNEIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcblxuaW1wb3J0IENvbWJvYm94V2l0aFNlYXJjaCBmcm9tICcuL0NvbWJvYm94V2l0aFNlYXJjaCc7XG5cbmRlc2NyaWJlKCdDb21ib2JveFdpdGhTZWFyY2gnLCAoKSA9PiB7XG4gIGl0KCdtb3VudHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvbWJvYm94V2l0aFNlYXJjaCA9IG5ldyBDb21ib2JveFdpdGhTZWFyY2goKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZShbeyBsYWJlbDogJ2EnLCB2YWx1ZTogJ2EnIH1dKSxcbiAgICAgIGxvY2FsaXphdGlvblRleHRzOiB7XG4gICAgICAgIFwiY2xvc2VcIjogXCJDbG9zZVwiLFxuICAgICAgICBcInNlbGVjdFwiOiBcIlNlbGVjdFwiLFxuICAgICAgICBcImZpZWxkLmNvZGVcIjogXCJjb2RlXCIsXG4gICAgICAgIFwiZmllbGQuZGVzY3JpcHRpb25cIjogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICBcImxvYWRpbmdcIjogXCJMb2FkaW5nLi4uXCIsXG4gICAgICAgIFwibm9JdGVtc1wiOiBcIk5vIGl0ZW1zXCIsXG4gICAgICAgIFwic2VhcmNoQnlcIjogXCJTZWFyY2ggYnlcIixcbiAgICAgICAgXCJieVwiOiBcImJ5XCJcbiAgICAgIH0sXG4gICAgICBtb2RhbDoge1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGZpZWxkczogWydrZXknXSxcbiAgICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgZGF0YTogW3sga2V5OiAnYScsIHZhbHVlOiAnYScgfV0sXG4gICAgICAgICAgdG90YWxDb3VudDogMFxuICAgICAgICB9KSxcbiAgICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHdyYXBwZXIgPSBtb3VudChcbiAgICAgIDxDb21ib2JveFdpdGhTZWFyY2ggey4uLnByb3BzfSAvPlxuICAgICk7XG4gICAgZXhwZWN0KHdyYXBwZXIpLnRvLm5vdC5iZS51bmRlZmluZWQ7XG4gIH0pO1xufSk7XG4iXX0=