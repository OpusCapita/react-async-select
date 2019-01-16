import React from 'react';
import Select from '../../src/index';

import {
  modalLoadOptions,
  comboLoadOptions,
} from './utils';

const CustomPanel = ({ selectedRow }) => { // eslint-disable-line react/prop-types
  return selectedRow ? (
    <div style={{ overflow: 'hidden' }}>
      <pre>
        { JSON.stringify(selectedRow, null, '  ') }
      </pre>
    </div>
  ) : "Select an item for additional information";
};

export const ExampleComponent = () => {
  return (
    <div>
      <h4>Custom sidepanel</h4>
      <Select
        localizationTexts={{
          "close": "Close",
          "select": "Select",
          "field.code": "code",
          "field.description": "description",
          "column.code": "Code",
          "column.description": "Description",
          "searchBy": "Search by",
          "by": "by",
          "noItems": "No items",
          "previous": "PREV",
          "next": "NEXT",
          "loading": "LOADING",
          "noData": "NODATA",
          "page": "PAGE",
          "of": "OF",
          "rows": "ROWS",
          "pageJump": "JUMP",
          "rowsSelector": "RPP",
        }}
        value={{ value: 'b', label: 'second char commonStr' }}
        loadOptions={comboLoadOptions}
        onSelect={value => console.log({ value })}
        isOptionDisabled={option => option.disabled}
        modal={{
          title: 'Search entries',
          fields: [
            'code',
            'description',
          ],
          loadOptions: modalLoadOptions,
          components: {
            RightPanel: CustomPanel,
          }
        }}
      />
    </div>
  );
};

export default ExampleComponent;
