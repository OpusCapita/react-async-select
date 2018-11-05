/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SearchModal from './SearchModal';

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
    var wrapper = mount(React.createElement(SearchModal, props));
    expect(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5zcGVjLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiZXhwZWN0IiwibW91bnQiLCJTZWFyY2hNb2RhbCIsImRlc2NyaWJlIiwiaXQiLCJwcm9wcyIsInRpdGxlIiwiZmllbGRzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIm9uU2VsZWN0IiwibG9jYWxpemF0aW9uVGV4dHMiLCJ3cmFwcGVyIiwidG8iLCJub3QiLCJiZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsTUFBdkI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLFFBQXRCOztBQUVBLE9BQU9DLFdBQVAsTUFBd0IsZUFBeEI7O0FBRUFDLFNBQVMsYUFBVCxFQUF3QixZQUFNO0FBQzVCQyxLQUFHLGtCQUFILEVBQXVCLFlBQU07QUFDM0IsUUFBTUMsUUFBUTtBQUNaQyxhQUFPLEVBREs7QUFFWkMsY0FBUSxDQUFDLEtBQUQsQ0FGSTtBQUdaQyxtQkFBYTtBQUFBLGVBQU1DLFFBQVFDLE9BQVIsQ0FBZ0I7QUFDakNDLGdCQUFNLEVBRDJCO0FBRWpDQyxzQkFBWTtBQUZxQixTQUFoQixDQUFOO0FBQUEsT0FIRDtBQU9aQyxpQkFBVyxJQVBDO0FBUVpDLGVBQVMsbUJBQU0sQ0FBRSxDQVJMO0FBU1pDLGdCQUFVLG9CQUFNLENBQUUsQ0FUTjtBQVVaQyx5QkFBbUI7QUFDakIsaUJBQVMsT0FEUTtBQUVqQixrQkFBVSxRQUZPO0FBR2pCLHNCQUFjLE1BSEc7QUFJakIsNkJBQXFCLGFBSko7QUFLakIsbUJBQVcsWUFMTTtBQU1qQixtQkFBVyxVQU5NO0FBT2pCLG9CQUFZLFdBUEs7QUFRakIsY0FBTTtBQVJXO0FBVlAsS0FBZDtBQXFCQSxRQUFNQyxVQUFVaEIsTUFDZCxvQkFBQyxXQUFELEVBQWlCSSxLQUFqQixDQURjLENBQWhCO0FBR0FMLFdBQU9pQixPQUFQLEVBQWdCQyxFQUFoQixDQUFtQkMsR0FBbkIsQ0FBdUJDLEVBQXZCLENBQTBCQyxTQUExQjtBQUNELEdBMUJEO0FBMkJELENBNUJEIiwiZmlsZSI6IlNlYXJjaE1vZGFsLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdlbnp5bWUnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmRlc2NyaWJlKCdTZWFyY2hNb2RhbCcsICgpID0+IHtcbiAgaXQoJ21vdW50cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBmaWVsZHM6IFsna2V5J10sXG4gICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHRvdGFsQ291bnQ6IDBcbiAgICAgIH0pLFxuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICBsb2NhbGl6YXRpb25UZXh0czoge1xuICAgICAgICBcImNsb3NlXCI6IFwiQ2xvc2VcIixcbiAgICAgICAgXCJzZWxlY3RcIjogXCJTZWxlY3RcIixcbiAgICAgICAgXCJmaWVsZC5jb2RlXCI6IFwiY29kZVwiLFxuICAgICAgICBcImZpZWxkLmRlc2NyaXB0aW9uXCI6IFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJsb2FkaW5nXCI6IFwiTG9hZGluZy4uLlwiLFxuICAgICAgICBcIm5vSXRlbXNcIjogXCJObyBpdGVtc1wiLFxuICAgICAgICBcInNlYXJjaEJ5XCI6IFwiU2VhcmNoIGJ5XCIsXG4gICAgICAgIFwiYnlcIjogXCJieVwiXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgd3JhcHBlciA9IG1vdW50KFxuICAgICAgPFNlYXJjaE1vZGFsIHsuLi5wcm9wc30gLz5cbiAgICApO1xuICAgIGV4cGVjdCh3cmFwcGVyKS50by5ub3QuYmUudW5kZWZpbmVkO1xuICB9KTtcbn0pO1xuIl19