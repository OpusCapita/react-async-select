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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImV4cGVjdCIsIm1vdW50IiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwiZGVzY3JpYmUiLCJpdCIsImJlZm9yZSIsImNvbWJvYm94V2l0aFNlYXJjaCIsInByb3BzIiwidmFsdWUiLCJvblNlbGVjdCIsImxvYWRPcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsYWJlbCIsImxvY2FsaXphdGlvblRleHRzIiwibW9kYWwiLCJ0aXRsZSIsImZpZWxkcyIsImRhdGEiLCJrZXkiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLE1BQXZCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixRQUF0Qjs7QUFFQSxPQUFPQyxrQkFBUCxNQUErQixzQkFBL0I7O0FBRUFDLFNBQVMsb0JBQVQsRUFBK0IsWUFBTTtBQUNuQ0MsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzNCQyxXQUFPLFlBQU07QUFDWCxZQUFLQyxrQkFBTCxHQUEwQixJQUFJSixrQkFBSixFQUExQjtBQUNELEtBRkQ7O0FBSUEsUUFBTUssUUFBUTtBQUNaQyxhQUFPLEVBREs7QUFFWkMsZ0JBQVUsb0JBQU0sQ0FBRSxDQUZOO0FBR1pDLG1CQUFhO0FBQUEsZUFBTUMsUUFBUUMsT0FBUixDQUFnQixDQUFDLEVBQUVDLE9BQU8sR0FBVCxFQUFjTCxPQUFPLEdBQXJCLEVBQUQsQ0FBaEIsQ0FBTjtBQUFBLE9BSEQ7QUFJWk0seUJBQW1CO0FBQ2pCLGlCQUFTLE9BRFE7QUFFakIsa0JBQVUsUUFGTztBQUdqQixzQkFBYyxNQUhHO0FBSWpCLDZCQUFxQixhQUpKO0FBS2pCLG1CQUFXLFlBTE07QUFNakIsbUJBQVcsVUFOTTtBQU9qQixvQkFBWSxXQVBLO0FBUWpCLGNBQU07QUFSVyxPQUpQO0FBY1pDLGFBQU87QUFDTEMsZUFBTyxFQURGO0FBRUxDLGdCQUFRLENBQUMsS0FBRCxDQUZIO0FBR0xQLHFCQUFhO0FBQUEsaUJBQU1DLFFBQVFDLE9BQVIsQ0FBZ0I7QUFDakNNLGtCQUFNLENBQUMsRUFBRUMsS0FBSyxHQUFQLEVBQVlYLE9BQU8sR0FBbkIsRUFBRCxDQUQyQjtBQUVqQ1ksd0JBQVk7QUFGcUIsV0FBaEIsQ0FBTjtBQUFBLFNBSFI7QUFPTEMsbUJBQVcsSUFQTjtBQVFMQyxpQkFBUyxtQkFBTSxDQUFFLENBUlo7QUFTTGIsa0JBQVUsb0JBQU0sQ0FBRTtBQVRiO0FBZEssS0FBZDtBQTBCQSxRQUFNYyxVQUFVdEIsTUFDZCxvQkFBQyxrQkFBRCxFQUF3Qk0sS0FBeEIsQ0FEYyxDQUFoQjtBQUdBUCxXQUFPdUIsT0FBUCxFQUFnQkMsRUFBaEIsQ0FBbUJDLEdBQW5CLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBMUI7QUFDRCxHQW5DRDtBQW9DRCxDQXJDRCIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJ2VuenltZSc7XG5cbmltcG9ydCBDb21ib2JveFdpdGhTZWFyY2ggZnJvbSAnLi9Db21ib2JveFdpdGhTZWFyY2gnO1xuXG5kZXNjcmliZSgnQ29tYm9ib3hXaXRoU2VhcmNoJywgKCkgPT4ge1xuICBpdCgnbW91bnRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgdGhpcy5jb21ib2JveFdpdGhTZWFyY2ggPSBuZXcgQ29tYm9ib3hXaXRoU2VhcmNoKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoW3sgbGFiZWw6ICdhJywgdmFsdWU6ICdhJyB9XSksXG4gICAgICBsb2NhbGl6YXRpb25UZXh0czoge1xuICAgICAgICBcImNsb3NlXCI6IFwiQ2xvc2VcIixcbiAgICAgICAgXCJzZWxlY3RcIjogXCJTZWxlY3RcIixcbiAgICAgICAgXCJmaWVsZC5jb2RlXCI6IFwiY29kZVwiLFxuICAgICAgICBcImZpZWxkLmRlc2NyaXB0aW9uXCI6IFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJsb2FkaW5nXCI6IFwiTG9hZGluZy4uLlwiLFxuICAgICAgICBcIm5vSXRlbXNcIjogXCJObyBpdGVtc1wiLFxuICAgICAgICBcInNlYXJjaEJ5XCI6IFwiU2VhcmNoIGJ5XCIsXG4gICAgICAgIFwiYnlcIjogXCJieVwiXG4gICAgICB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBmaWVsZHM6IFsna2V5J10sXG4gICAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIGRhdGE6IFt7IGtleTogJ2EnLCB2YWx1ZTogJ2EnIH1dLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDBcbiAgICAgICAgfSksXG4gICAgICAgIHNob3dNb2RhbDogdHJ1ZSxcbiAgICAgICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCB3cmFwcGVyID0gbW91bnQoXG4gICAgICA8Q29tYm9ib3hXaXRoU2VhcmNoIHsuLi5wcm9wc30gLz5cbiAgICApO1xuICAgIGV4cGVjdCh3cmFwcGVyKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICB9KTtcbn0pO1xuIl19