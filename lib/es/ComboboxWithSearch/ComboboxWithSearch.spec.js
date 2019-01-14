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
    var wrapper = mount(React.createElement(ComboboxWithSearch, props));
    expect(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2gvQ29tYm9ib3hXaXRoU2VhcmNoLnNwZWMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJleHBlY3QiLCJtb3VudCIsIkNvbWJvYm94V2l0aFNlYXJjaCIsImRlc2NyaWJlIiwiaXQiLCJiZWZvcmUiLCJjb21ib2JveFdpdGhTZWFyY2giLCJwcm9wcyIsInZhbHVlIiwib25TZWxlY3QiLCJsb2FkT3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwibGFiZWwiLCJsb2NhbGl6YXRpb25UZXh0cyIsIm1vZGFsIiwidGl0bGUiLCJmaWVsZHMiLCJkYXRhIiwia2V5IiwidG90YWxDb3VudCIsInNob3dNb2RhbCIsIm9uQ2xvc2UiLCJ3cmFwcGVyIiwidG8iLCJub3QiLCJiZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixNQUF2QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsT0FBT0Msa0JBQVAsTUFBK0Isc0JBQS9COztBQUVBQyxTQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkNDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQkMsV0FBTyxZQUFNO0FBQ1gsWUFBS0Msa0JBQUwsR0FBMEIsSUFBSUosa0JBQUosRUFBMUI7QUFDRCxLQUZEOztBQUlBLFFBQU1LLFFBQVE7QUFDWkMsYUFBTyxFQURLO0FBRVpDLGdCQUFVLG9CQUFNLENBQUUsQ0FGTjtBQUdaQyxtQkFBYTtBQUFBLGVBQU1DLFFBQVFDLE9BQVIsQ0FBZ0IsQ0FBQyxFQUFFQyxPQUFPLEdBQVQsRUFBY0wsT0FBTyxHQUFyQixFQUFELENBQWhCLENBQU47QUFBQSxPQUhEO0FBSVpNLHlCQUFtQjtBQUNqQixpQkFBUyxPQURRO0FBRWpCLGtCQUFVLFFBRk87QUFHakIsc0JBQWMsTUFIRztBQUlqQiw2QkFBcUIsYUFKSjtBQUtqQixtQkFBVyxZQUxNO0FBTWpCLG1CQUFXLFVBTk07QUFPakIsb0JBQVksV0FQSztBQVFqQixjQUFNO0FBUlcsT0FKUDtBQWNaQyxhQUFPO0FBQ0xDLGVBQU8sRUFERjtBQUVMQyxnQkFBUSxDQUFDLEtBQUQsQ0FGSDtBQUdMUCxxQkFBYTtBQUFBLGlCQUFNQyxRQUFRQyxPQUFSLENBQWdCO0FBQ2pDTSxrQkFBTSxDQUFDLEVBQUVDLEtBQUssR0FBUCxFQUFZWCxPQUFPLEdBQW5CLEVBQUQsQ0FEMkI7QUFFakNZLHdCQUFZO0FBRnFCLFdBQWhCLENBQU47QUFBQSxTQUhSO0FBT0xDLG1CQUFXLElBUE47QUFRTEMsaUJBQVMsbUJBQU0sQ0FBRSxDQVJaO0FBU0xiLGtCQUFVLG9CQUFNLENBQUU7QUFUYjtBQWRLLEtBQWQ7QUEwQkEsUUFBTWMsVUFBVXRCLE1BQ2Qsb0JBQUMsa0JBQUQsRUFBd0JNLEtBQXhCLENBRGMsQ0FBaEI7QUFHQVAsV0FBT3VCLE9BQVAsRUFBZ0JDLEVBQWhCLENBQW1CQyxHQUFuQixDQUF1QkMsRUFBdkIsQ0FBMEJDLFNBQTFCO0FBQ0QsR0FuQ0Q7QUFvQ0QsQ0FyQ0QiLCJmaWxlIjoiQ29tYm9ib3hXaXRoU2VhcmNoLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdlbnp5bWUnO1xuXG5pbXBvcnQgQ29tYm9ib3hXaXRoU2VhcmNoIGZyb20gJy4vQ29tYm9ib3hXaXRoU2VhcmNoJztcblxuZGVzY3JpYmUoJ0NvbWJvYm94V2l0aFNlYXJjaCcsICgpID0+IHtcbiAgaXQoJ21vdW50cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIHRoaXMuY29tYm9ib3hXaXRoU2VhcmNoID0gbmV3IENvbWJvYm94V2l0aFNlYXJjaCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFt7IGxhYmVsOiAnYScsIHZhbHVlOiAnYScgfV0pLFxuICAgICAgbG9jYWxpemF0aW9uVGV4dHM6IHtcbiAgICAgICAgXCJjbG9zZVwiOiBcIkNsb3NlXCIsXG4gICAgICAgIFwic2VsZWN0XCI6IFwiU2VsZWN0XCIsXG4gICAgICAgIFwiZmllbGQuY29kZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJmaWVsZC5kZXNjcmlwdGlvblwiOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgIFwibG9hZGluZ1wiOiBcIkxvYWRpbmcuLi5cIixcbiAgICAgICAgXCJub0l0ZW1zXCI6IFwiTm8gaXRlbXNcIixcbiAgICAgICAgXCJzZWFyY2hCeVwiOiBcIlNlYXJjaCBieVwiLFxuICAgICAgICBcImJ5XCI6IFwiYnlcIlxuICAgICAgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZmllbGRzOiBbJ2tleSddLFxuICAgICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICBkYXRhOiBbeyBrZXk6ICdhJywgdmFsdWU6ICdhJyB9XSxcbiAgICAgICAgICB0b3RhbENvdW50OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgd3JhcHBlciA9IG1vdW50KFxuICAgICAgPENvbWJvYm94V2l0aFNlYXJjaCB7Li4ucHJvcHN9IC8+XG4gICAgKTtcbiAgICBleHBlY3Qod3JhcHBlcikudG8ubm90LmJlLnVuZGVmaW5lZDtcbiAgfSk7XG59KTtcbiJdfQ==