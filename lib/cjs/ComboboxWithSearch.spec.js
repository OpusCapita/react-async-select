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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiYmVmb3JlIiwiY29tYm9ib3hXaXRoU2VhcmNoIiwiQ29tYm9ib3hXaXRoU2VhcmNoIiwicHJvcHMiLCJ2YWx1ZSIsIm9uU2VsZWN0IiwibG9hZE9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9wdGlvbnMiLCJsYWJlbCIsImxvY2FsaXphdGlvblRleHRzIiwibW9kYWwiLCJ0aXRsZSIsImZpZWxkcyIsImRhdGEiLCJrZXkiLCJ0b3RhbENvdW50Iiwic2hvd01vZGFsIiwib25DbG9zZSIsIndyYXBwZXIiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQU5BOztBQVFBQSxTQUFTLG9CQUFULEVBQStCLFlBQU07QUFDbkNDLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUMzQkMsV0FBTyxZQUFNO0FBQ1gsZ0JBQUtDLGtCQUFMLEdBQTBCLElBQUlDLDRCQUFKLEVBQTFCO0FBQ0QsS0FGRDs7QUFJQSxRQUFNQyxRQUFRO0FBQ1pDLGFBQU8sRUFESztBQUVaQyxnQkFBVSxvQkFBTSxDQUFFLENBRk47QUFHWkMsbUJBQWE7QUFBQSxlQUFNQyxRQUFRQyxPQUFSLENBQWdCLEVBQUVDLFNBQVMsQ0FBQyxFQUFFQyxPQUFPLEdBQVQsRUFBY04sT0FBTyxHQUFyQixFQUFELENBQVgsRUFBaEIsQ0FBTjtBQUFBLE9BSEQ7QUFJWk8seUJBQW1CO0FBQ2pCLGlCQUFTLE9BRFE7QUFFakIsa0JBQVUsUUFGTztBQUdqQixzQkFBYyxNQUhHO0FBSWpCLDZCQUFxQixhQUpKO0FBS2pCLG1CQUFXLFlBTE07QUFNakIsbUJBQVcsVUFOTTtBQU9qQixvQkFBWSxXQVBLO0FBUWpCLGNBQU07QUFSVyxPQUpQO0FBY1pDLGFBQU87QUFDTEMsZUFBTyxFQURGO0FBRUxDLGdCQUFRLENBQUMsS0FBRCxDQUZIO0FBR0xSLHFCQUFhO0FBQUEsaUJBQU1DLFFBQVFDLE9BQVIsQ0FBZ0I7QUFDakNPLGtCQUFNLENBQUMsRUFBRUMsS0FBSyxHQUFQLEVBQVlaLE9BQU8sR0FBbkIsRUFBRCxDQUQyQjtBQUVqQ2Esd0JBQVk7QUFGcUIsV0FBaEIsQ0FBTjtBQUFBLFNBSFI7QUFPTEMsbUJBQVcsSUFQTjtBQVFMQyxpQkFBUyxtQkFBTSxDQUFFLENBUlo7QUFTTGQsa0JBQVUsb0JBQU0sQ0FBRTtBQVRiO0FBZEssS0FBZDtBQTBCQSxRQUFNZSxVQUFVLG1CQUNkLDhCQUFDLDRCQUFELEVBQXdCakIsS0FBeEIsQ0FEYyxDQUFoQjtBQUdBLHNCQUFPaUIsT0FBUCxFQUFnQkMsRUFBaEIsQ0FBbUJDLEdBQW5CLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBMUI7QUFDRCxHQW5DRDtBQW9DRCxDQXJDRCIsImZpbGUiOiJDb21ib2JveFdpdGhTZWFyY2guc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJ2VuenltZSc7XG5cbmltcG9ydCBDb21ib2JveFdpdGhTZWFyY2ggZnJvbSAnLi9Db21ib2JveFdpdGhTZWFyY2gnO1xuXG5kZXNjcmliZSgnQ29tYm9ib3hXaXRoU2VhcmNoJywgKCkgPT4ge1xuICBpdCgnbW91bnRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgdGhpcy5jb21ib2JveFdpdGhTZWFyY2ggPSBuZXcgQ29tYm9ib3hXaXRoU2VhcmNoKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICAgIGxvYWRPcHRpb25zOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBvcHRpb25zOiBbeyBsYWJlbDogJ2EnLCB2YWx1ZTogJ2EnIH1dIH0pLFxuICAgICAgbG9jYWxpemF0aW9uVGV4dHM6IHtcbiAgICAgICAgXCJjbG9zZVwiOiBcIkNsb3NlXCIsXG4gICAgICAgIFwic2VsZWN0XCI6IFwiU2VsZWN0XCIsXG4gICAgICAgIFwiZmllbGQuY29kZVwiOiBcImNvZGVcIixcbiAgICAgICAgXCJmaWVsZC5kZXNjcmlwdGlvblwiOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgIFwibG9hZGluZ1wiOiBcIkxvYWRpbmcuLi5cIixcbiAgICAgICAgXCJub0l0ZW1zXCI6IFwiTm8gaXRlbXNcIixcbiAgICAgICAgXCJzZWFyY2hCeVwiOiBcIlNlYXJjaCBieVwiLFxuICAgICAgICBcImJ5XCI6IFwiYnlcIlxuICAgICAgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZmllbGRzOiBbJ2tleSddLFxuICAgICAgICBsb2FkT3B0aW9uczogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICBkYXRhOiBbeyBrZXk6ICdhJywgdmFsdWU6ICdhJyB9XSxcbiAgICAgICAgICB0b3RhbENvdW50OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBzaG93TW9kYWw6IHRydWUsXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgICAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgd3JhcHBlciA9IG1vdW50KFxuICAgICAgPENvbWJvYm94V2l0aFNlYXJjaCB7Li4ucHJvcHN9IC8+XG4gICAgKTtcbiAgICBleHBlY3Qod3JhcHBlcikudG8ubm90LmJlLnVuZGVmaW5lZDtcbiAgfSk7XG59KTtcbiJdfQ==