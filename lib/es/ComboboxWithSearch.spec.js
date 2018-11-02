var _this = this;

/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ComboboxWithSearch from './ComboboxWithSearch';

describe('ComboboxWithSearch', function () {
  it('mounts correctly', function () {
    before(function () {
      _this.comboboxWithSearch = new ComboboxWithSearch();
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
    var wrapper = mount(React.createElement(ComboboxWithSearch, props));
    expect(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImV4cGVjdCIsIm1vdW50IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwiZGVzY3JpYmUiLCJpdCIsImJlZm9yZSIsImNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwidmFsdWUiLCJvblNlbGVjdCIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJvcHRpb25zIiwibGFiZWwiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImlkIiwibW9kYWwiLCJ0aXRsZSIsImZpZWxkcyIsImRhdGEiLCJrZXkiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLE1BQXZCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixRQUF0Qjs7QUFFQSxPQUFPQyxrQkFBUCxNQUErQixzQkFBL0I7O0FBRUFDLFNBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ0MsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzNCQyxXQUFPLFlBQU07QUFDWCxZQUFLQyxrQkFBTCxHQUEwQixJQUFJSixrQkFBSixFQUExQjtBQUNELEtBRkQ7O0FBSUEsUUFBTUssUUFBUTtBQUNaQyxhQUFPLEVBREs7QUFFWkMsZ0JBQVUsb0JBQU0sQ0FBRSxDQUZOO0FBR1pDLG1CQUFhO0FBQUEsZUFBTUMsUUFBUUMsT0FBUixDQUFnQixFQUFFQyxTQUFTLENBQUMsRUFBRUMsT0FBTyxHQUFULEVBQWNOLE9BQU8sR0FBckIsRUFBRCxDQUFYLEVBQWhCLENBQU47QUFBQSxPQUhEO0FBSVpPLFlBQU0sRUFBRUMsWUFBWTtBQUFBLGlCQUFNQyxFQUFOO0FBQUEsU0FBZCxFQUpNO0FBS1pDLGFBQU87QUFDTEMsZUFBTyxFQURGO0FBRUxDLGdCQUFRLENBQUMsS0FBRCxDQUZIO0FBR0xWLHFCQUFhO0FBQUEsaUJBQU1DLFFBQVFDLE9BQVIsQ0FBZ0I7QUFDakNTLGtCQUFNLENBQUMsRUFBRUMsS0FBSyxHQUFQLEVBQVlkLE9BQU8sR0FBbkIsRUFBRCxDQUQyQjtBQUVqQ2Usd0JBQVk7QUFGcUIsV0FBaEIsQ0FBTjtBQUFBLFNBSFI7QUFPTEMsbUJBQVcsSUFQTjtBQVFMQyxpQkFBUyxtQkFBTSxDQUFFLENBUlo7QUFTTGhCLGtCQUFVLG9CQUFNLENBQUU7QUFUYjtBQUxLLEtBQWQ7QUFpQkEsUUFBTWlCLFVBQVV6QixNQUNkLG9CQUFDLGtCQUFELEVBQXdCTSxLQUF4QixDQURjLENBQWhCO0FBR0FQLFdBQU8wQixPQUFQLEVBQWdCQyxFQUFoQixDQUFtQkMsR0FBbkIsQ0FBdUJDLEVBQXZCLENBQTBCQyxTQUExQjtBQUNELEdBMUJEO0FBMkJELENBNUJEIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcblxuaW1wb3J0IENvbWJvYm94V2l0aFNlYXJjaCBmcm9tICcuL0NvbWJvYm94V2l0aFNlYXJjaCc7XG5cbmRlc2NyaWJlKCdDb21ib2JveFdpdGhTZWFyY2gnLCAoKSA9PiB7XG4gIGl0KCdtb3VudHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvbWJvYm94V2l0aFNlYXJjaCA9IG5ldyBDb21ib2JveFdpdGhTZWFyY2goKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IG9wdGlvbnM6IFt7IGxhYmVsOiAnYScsIHZhbHVlOiAnYScgfV0gfSksXG4gICAgICBpMThuOiB7IGdldE1lc3NhZ2U6IGlkID0+IGlkIH0sXG4gICAgICBtb2RhbDoge1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGZpZWxkczogWydrZXknXSxcbiAgICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgZGF0YTogW3sga2V5OiAnYScsIHZhbHVlOiAnYScgfV0sXG4gICAgICAgICAgdG90YWxDb3VudDogMFxuICAgICAgICB9KSxcbiAgICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHdyYXBwZXIgPSBtb3VudChcbiAgICAgIDxDb21ib2JveFdpdGhTZWFyY2ggey4uLnByb3BzfSAvPlxuICAgICk7XG4gICAgZXhwZWN0KHdyYXBwZXIpLnRvLm5vdC5iZS51bmRlZmluZWQ7XG4gIH0pO1xufSk7XG4iXX0=