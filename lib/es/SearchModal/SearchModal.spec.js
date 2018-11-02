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
      i18n: { getMessage: function getMessage(id) {
          return id;
        } }
    };
    var wrapper = mount(React.createElement(SearchModal, props));
    expect(wrapper).to.not.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZWFyY2hNb2RhbC9TZWFyY2hNb2RhbC5zcGVjLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiZXhwZWN0IiwibW91bnQiLCJTZWFyY2hNb2RhbCIsImRlc2NyaWJlIiwiaXQiLCJwcm9wcyIsInRpdGxlIiwiZmllbGRzIiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIm9uU2VsZWN0IiwiaTE4biIsImdldE1lc3NhZ2UiLCJpZCIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixNQUF2QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsUUFBdEI7O0FBRUEsT0FBT0MsV0FBUCxNQUF3QixlQUF4Qjs7QUFFQUMsU0FBUyxhQUFULEVBQXdCLFlBQU07QUFDNUJDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQixRQUFNQyxRQUFRO0FBQ1pDLGFBQU8sRUFESztBQUVaQyxjQUFRLENBQUMsS0FBRCxDQUZJO0FBR1pDLG1CQUFhO0FBQUEsZUFBTUMsUUFBUUMsT0FBUixDQUFnQjtBQUNqQ0MsZ0JBQU0sRUFEMkI7QUFFakNDLHNCQUFZO0FBRnFCLFNBQWhCLENBQU47QUFBQSxPQUhEO0FBT1pDLGlCQUFXLElBUEM7QUFRWkMsZUFBUyxtQkFBTSxDQUFFLENBUkw7QUFTWkMsZ0JBQVUsb0JBQU0sQ0FBRSxDQVROO0FBVVpDLFlBQU0sRUFBRUMsWUFBWTtBQUFBLGlCQUFNQyxFQUFOO0FBQUEsU0FBZDtBQVZNLEtBQWQ7QUFZQSxRQUFNQyxVQUFVbEIsTUFDZCxvQkFBQyxXQUFELEVBQWlCSSxLQUFqQixDQURjLENBQWhCO0FBR0FMLFdBQU9tQixPQUFQLEVBQWdCQyxFQUFoQixDQUFtQkMsR0FBbkIsQ0FBdUJDLEVBQXZCLENBQTBCQyxTQUExQjtBQUNELEdBakJEO0FBa0JELENBbkJEIiwiZmlsZSI6IlNlYXJjaE1vZGFsLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdlbnp5bWUnO1xuXG5pbXBvcnQgU2VhcmNoTW9kYWwgZnJvbSAnLi9TZWFyY2hNb2RhbCc7XG5cbmRlc2NyaWJlKCdTZWFyY2hNb2RhbCcsICgpID0+IHtcbiAgaXQoJ21vdW50cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBmaWVsZHM6IFsna2V5J10sXG4gICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHRvdGFsQ291bnQ6IDBcbiAgICAgIH0pLFxuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICBpMThuOiB7IGdldE1lc3NhZ2U6IGlkID0+IGlkIH0sXG4gICAgfTtcbiAgICBjb25zdCB3cmFwcGVyID0gbW91bnQoXG4gICAgICA8U2VhcmNoTW9kYWwgey4uLnByb3BzfSAvPlxuICAgICk7XG4gICAgZXhwZWN0KHdyYXBwZXIpLnRvLm5vdC5iZS51bmRlZmluZWQ7XG4gIH0pO1xufSk7XG4iXX0=