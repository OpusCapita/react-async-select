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
    var wrapper = mount(React.createElement(ComboboxWithSearch, props));
    expect(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImV4cGVjdCIsIm1vdW50IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwiZGVzY3JpYmUiLCJpdCIsImJlZm9yZSIsImNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwidmFsdWUiLCJvblNlbGVjdCIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJvcHRpb25zIiwibGFiZWwiLCJsb2NhbGl6YXRpb25UZXh0cyIsIm1vZGFsIiwidGl0bGUiLCJmaWVsZHMiLCJkYXRhIiwia2V5IiwidG90YWxDb3VudCIsInNob3dNb2RhbCIsIm9uQ2xvc2UiLCJ3cmFwcGVyIiwidG8iLCJub3QiLCJiZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixNQUF2QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsT0FBT0Msa0JBQVAsTUFBK0Isc0JBQS9COztBQUVBQyxTQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkNDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQkMsV0FBTyxZQUFNO0FBQ1gsWUFBS0Msa0JBQUwsR0FBMEIsSUFBSUosa0JBQUosRUFBMUI7QUFDRCxLQUZEOztBQUlBLFFBQU1LLFFBQVE7QUFDWkMsYUFBTyxFQURLO0FBRVpDLGdCQUFVLG9CQUFNLENBQUUsQ0FGTjtBQUdaQyxtQkFBYTtBQUFBLGVBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsRUFBRUMsU0FBUyxDQUFDLEVBQUVDLE9BQU8sR0FBVCxFQUFjTixPQUFPLEdBQXJCLEVBQUQsQ0FBWCxFQUFoQixDQUFOO0FBQUEsT0FIRDtBQUlaTyx5QkFBbUI7QUFDakIsaUJBQVMsT0FEUTtBQUVqQixrQkFBVSxRQUZPO0FBR2pCLHNCQUFjLE1BSEc7QUFJakIsNkJBQXFCLGFBSko7QUFLakIsbUJBQVcsWUFMTTtBQU1qQixtQkFBVyxVQU5NO0FBT2pCLG9CQUFZLFdBUEs7QUFRakIsY0FBTTtBQVJXLE9BSlA7QUFjWkMsYUFBTztBQUNMQyxlQUFPLEVBREY7QUFFTEMsZ0JBQVEsQ0FBQyxLQUFELENBRkg7QUFHTFIscUJBQWE7QUFBQSxpQkFBTUMsUUFBUUMsT0FBUixDQUFnQjtBQUNqQ08sa0JBQU0sQ0FBQyxFQUFFQyxLQUFLLEdBQVAsRUFBWVosT0FBTyxHQUFuQixFQUFELENBRDJCO0FBRWpDYSx3QkFBWTtBQUZxQixXQUFoQixDQUFOO0FBQUEsU0FIUjtBQU9MQyxtQkFBVyxJQVBOO0FBUUxDLGlCQUFTLG1CQUFNLENBQUUsQ0FSWjtBQVNMZCxrQkFBVSxvQkFBTSxDQUFFO0FBVGI7QUFkSyxLQUFkO0FBMEJBLFFBQU1lLFVBQVV2QixNQUNkLG9CQUFDLGtCQUFELEVBQXdCTSxLQUF4QixDQURjLENBQWhCO0FBR0FQLFdBQU93QixPQUFQLEVBQWdCQyxFQUFoQixDQUFtQkMsR0FBbkIsQ0FBdUJDLEVBQXZCLENBQTBCQyxTQUExQjtBQUNELEdBbkNEO0FBb0NELENBckNEIiwiZmlsZSI6IkNvbWJvYm94V2l0aFNlYXJjaC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnZW56eW1lJztcblxuaW1wb3J0IENvbWJvYm94V2l0aFNlYXJjaCBmcm9tICcuL0NvbWJvYm94V2l0aFNlYXJjaCc7XG5cbmRlc2NyaWJlKCdDb21ib2JveFdpdGhTZWFyY2gnLCAoKSA9PiB7XG4gIGl0KCdtb3VudHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvbWJvYm94V2l0aFNlYXJjaCA9IG5ldyBDb21ib2JveFdpdGhTZWFyY2goKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgICAgbG9hZE9wdGlvbnM6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IG9wdGlvbnM6IFt7IGxhYmVsOiAnYScsIHZhbHVlOiAnYScgfV0gfSksXG4gICAgICBsb2NhbGl6YXRpb25UZXh0czoge1xuICAgICAgICBcImNsb3NlXCI6IFwiQ2xvc2VcIixcbiAgICAgICAgXCJzZWxlY3RcIjogXCJTZWxlY3RcIixcbiAgICAgICAgXCJmaWVsZC5jb2RlXCI6IFwiY29kZVwiLFxuICAgICAgICBcImZpZWxkLmRlc2NyaXB0aW9uXCI6IFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJsb2FkaW5nXCI6IFwiTG9hZGluZy4uLlwiLFxuICAgICAgICBcIm5vSXRlbXNcIjogXCJObyBpdGVtc1wiLFxuICAgICAgICBcInNlYXJjaEJ5XCI6IFwiU2VhcmNoIGJ5XCIsXG4gICAgICAgIFwiYnlcIjogXCJieVwiXG4gICAgICB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBmaWVsZHM6IFsna2V5J10sXG4gICAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIGRhdGE6IFt7IGtleTogJ2EnLCB2YWx1ZTogJ2EnIH1dLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDBcbiAgICAgICAgfSksXG4gICAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICAgICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCB3cmFwcGVyID0gbW91bnQoXG4gICAgICA8Q29tYm9ib3hXaXRoU2VhcmNoIHsuLi5wcm9wc30gLz5cbiAgICApO1xuICAgIGV4cGVjdCh3cmFwcGVyKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICB9KTtcbn0pO1xuIl19